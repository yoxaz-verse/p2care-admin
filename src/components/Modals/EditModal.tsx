import React, { use, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Chip,
  Image,
  Textarea,
  Spinner,
  Autocomplete,
  AutocompleteItem,
  TimeInput,
  DateInput,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { patchData } from "@/core/apiHandler";
import { toast } from "sonner";
import MutationLoading from "../Loading/mutationLoading";
import { queryAdmin } from "@/app/providers";
import { LocationRoutes } from "@/core/apiRoutes";
import { CalendarDate, getDayOfWeek, parseDate, Time } from "@internationalized/date";
import { getData } from "@/core/apiHandler";

interface EditModalProps {
  title: string;
  data: any;
  isOpen: boolean;
  DropDownData?: any;
  queryKey: string[];
  api: string;
  apiKey: string[];
  newCols: any[];
  onOpenChange: () => any;
}

export default function EditModal({
  title,
  data,
  newCols,
  api,
  DropDownData,
  apiKey,
  queryKey,
  isOpen,
  onOpenChange,
}: EditModalProps) {
  const [currdata, setCurrData] = useState<any>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [appointmentDate, setappointmentDate] = useState<any>("");
  const [slotData, setSlotData] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [district, setDistrict] = useState<any>("");
  const [appointmentTime, setappointmentTime] = useState<any>("");
  useEffect(() => {
    if (!data) return;
    setCurrData(data);
    if (data?.doctorSlot) {
      setappointmentDate(data?.doctorSlot?.slotTime);
      const date = new Date(currdata?.doctorSlot?.slotTime);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      setappointmentTime({
        hours,
        minutes
      });
    }
    setLoading(false);
  }, [data]);

  const handleChangeCurrentData = (field: any, value: any) => {
    setCurrData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateData = useMutation({
    mutationKey: [`edit-${apiKey}`],
    mutationFn: (data: any) => {
      console.log(data);
      return patchData(api + `/${data.id}`, data.data, {});
    },
    onSuccess: () => {
      toast.success("Data updated successfully", {
        position: "top-right",
        className: "bg-green-300"
      });
      queryAdmin.invalidateQueries({
        queryKey: apiKey,
      });
      queryAdmin.invalidateQueries({ queryKey: queryKey })
      setSubmitting(false);
      close();
    },
    onError: (error) => {
      toast.error("An error occurred while updating data.");
      console.error("Error updating data:", error);
      setSubmitting(false);
      close();
    },
  });
  const handleSubmit = async (e: React.FormEvent, close: () => void) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (api === "/appointment") {
        const nDate = new Date(appointmentDate);
        console.log(appointmentTime);
        nDate.setHours(appointmentTime.hour);
        console.log(slotData);
        nDate.setMinutes(appointmentTime.minutes);
        const d = {
          date: nDate,
          doctorSlotId: slotData._id,
          startTime: slotData.slotTime,
          isRescheduled: true
        }
        updateData.mutate({ data: d, id: data._id });
        return;
      } else {
        updateData.mutate({ data: currdata, id: data._id });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("An error occurred while updating data.");
      close();
    } finally {
      setSubmitting(false);
      close();
    }
  };
  const { data: getDoctorSlot, isLoading: isLoadingslot } = useQuery({
    queryKey: ["getSlots", appointmentDate],
    queryFn: () => {
      return getData(`/doctor-slot/${currdata?.doctor?._id}/?date=${appointmentDate}`, {});
    },
    enabled: !!currdata?.doctor?._id
  });

  return (
    <Modal
      isOpen={isOpen}
      className="overflow-y-scroll"
      onOpenChange={onOpenChange}
      placement="top-center"
      onClose={() => {
        setSubmitting(false);
      }}
    >
      {submitting && <MutationLoading />}
      <ModalContent>
        {(onClose) => (
          <form onSubmit={(e) => handleSubmit(e, onClose)}>
            <ModalHeader className="flex flex-col gap-1">{`Edit ${title}`}</ModalHeader>
            <ModalBody>
              {newCols
                .filter((col: any) => col.name.toLowerCase() !== "actions")
                .map((column: any, index: number) => {
                  if (column.uid === "metaTitle" || column.uid === "metaDescription") {
                    <Textarea
                      key={index}
                      label={column.name}
                      placeholder={column.name}
                      value={currdata[column.uid]}
                      onChange={(e) =>
                        handleChangeCurrentData(
                          column.uid,
                          e.target.value
                        )
                      }
                      name={column.uid}
                      required
                    />
                  }
                  switch (column.uid) {
                    case "doctorName":
                      return (
                        <Input
                          key={index}
                          label={column.name}
                          placeholder={column.name}
                          value={currdata?.doctor?.name || ""}
                          readOnly={true}
                          name={column.name.toLowerCase()}
                          required
                        />
                      );
                    case "price":
                      return (
                        <Input
                          key={index}
                          label={column.name}
                          placeholder={column.name}
                          value={currdata?.doctor?.price || ""}
                          readOnly={true}
                          name={column.name.toLowerCase()}
                          required
                        />
                      );

                    case "patientName":
                      return (
                        <Input
                          key={index}
                          label={column.name}
                          placeholder={column.name}
                          value={currdata?.patient?.name || ""}
                          readOnly={true}
                          name={column.name.toLowerCase()}
                          required
                        />
                      );
                  }
                  switch (column.type) {
                    case "text":
                      return (
                        <Input
                          key={index}
                          label={column.name}
                          placeholder={column.name}
                          value={currdata[column.name.toLowerCase()] || ""}
                          onChange={(e) =>
                            handleChangeCurrentData(
                              column.name.toLowerCase(),
                              e.target.value
                            )
                          }
                          name={column.name.toLowerCase()}
                          required
                        />
                      );
                    case "districtDropdown":
                      return (
                        <Autocomplete
                          label="Select an District"
                          defaultSelectedKey={currdata[column.name.toLowerCase()] || ""}
                          onSelectionChange={(e) => handleChangeCurrentData(column.name.toLowerCase(), e)}
                          className="max-w-full"
                        >
                          {DropDownData?.district?.items.map((d: any) => (
                            <AutocompleteItem key={d._id} value={d._id}>
                              {d.name}
                            </AutocompleteItem>
                          ))}
                        </Autocomplete>
                      );
                    case "departmentDropdown":
                      return (
                        <Autocomplete
                          defaultSelectedKey={currdata[column.name.toLowerCase()]?._id || ""}
                          isLoading={DropDownData.department.isLoading}
                          items={DropDownData.department.items}
                          label="Select an Department"
                          className="max-w-full"
                        >
                          {DropDownData.department.items.map((d: any) => (
                            <AutocompleteItem key={d._id} value={d._id}>
                              {d.name}
                            </AutocompleteItem>
                          ))}
                        </Autocomplete>
                      );
                    case "genderDropdown":
                      return (
                        <Autocomplete
                          defaultSelectedKey={currdata[column.name.toLowerCase()]?._id || ""}
                          label="Select an Gender"
                          isLoading={DropDownData.gender.isLoading}
                          items={DropDownData.gender.items}
                          className="max-w-full"
                        >
                          {DropDownData.gender.items.map((d: any) => (
                            <AutocompleteItem key={d._id} value={d._id}>
                              {d.name}
                            </AutocompleteItem>
                          ))}
                        </Autocomplete>
                      );
                    case "designationDropdown":
                      return (
                        <Autocomplete
                          defaultSelectedKey={currdata[column.name.toLowerCase()]._id || ""}
                          label="Select an Desigantion"
                          isLoading={DropDownData.designation.isLoading}
                          items={DropDownData.designation.items}
                          className="max-w-full"
                        >
                          {DropDownData.designation.items.map((d: any) => (
                            <AutocompleteItem key={d._id} value={d._id}>
                              {d.name}
                            </AutocompleteItem>
                          ))}
                        </Autocomplete>
                      );


                    case "number":
                      return (
                        <Input
                          key={index}
                          label={column.name}
                          placeholder={column.name}
                          value={currdata[column.name.toLowerCase()] || ""}
                          onChange={(e) =>
                            handleChangeCurrentData(
                              column.name.toLowerCase(),
                              e.target.value
                            )
                          }
                          name={column.name.toLowerCase()}
                          required
                        />
                      );
                    case "textbox":
                      return (
                        <Textarea
                          key={index}
                          label={column.name}
                          placeholder={column.name}
                          value={currdata[column.name.toLowerCase()] || ""}
                          onChange={(e) =>
                            handleChangeCurrentData(
                              column.name.toLowerCase(),
                              e.target.value
                            )
                          }
                          required
                        />
                      );
                    case "doctorSlot":
                      const appdate = new Date(appointmentDate);
                      const appyear = appdate.getUTCFullYear();
                      const month = appdate.getUTCMonth() + 1;
                      const paddedMonth = month >= 10 ? month : `0${month}`;
                      const appday = appdate.getUTCDate();
                      return (
                        <div className="flex flex-col gap-4 w-full">
                          <Input label="Session" readOnly value={currdata?.doctorSlot?.session.toUpperCase()} />
                          <TimeInput
                            label="Doctor Appointment"
                            isReadOnly={true}
                            labelPlacement="outside"
                            color="primary"
                            value={new Time(Number(appointmentTime.hour), Number(appointmentTime.minutes))}
                          />
                          {!isNaN(appdate.getTime()) && (
                            <DateInput
                              label="Appointment Date"
                              onChange={(e: any) => {
                                const { day, year, month } = e;
                                const newDate = new Date(year, month - 1, day);
                                setappointmentDate(newDate);
                              }}
                              defaultValue={parseDate(`${appyear}-${paddedMonth}-${appday}`)}
                              labelPlacement="inside"
                            />
                          )}
                          <h3 className="text-lg font-bold">Select the Time Slot</h3>
                          <div className="flex flex-row gap-4 w-full">
                            {getDoctorSlot?.data.data.length > 0 ? (
                              getDoctorSlot?.data.data.map((data: any, index: any) => {
                                const date = new Date(data.slotTime);
                                const hours = String(date.getUTCHours()).padStart(2, '0');
                                const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                                const period = Number(hours) >= 12 ? "PM" : "AM";
                                return (
                                  <Chip
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setSlotData(data);
                                      setappointmentTime({
                                        hour: hours,
                                        minutes
                                      });
                                      console.log(appointmentTime);
                                    }}
                                    key={index}
                                    color="primary"
                                  >
                                    {`${hours}:${minutes} ${period}`}
                                  </Chip>
                                );
                              })
                            ) : (
                              <p>No Slots available for this day</p>
                            )}
                          </div>
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => onClose()}>
                Close
              </Button>
              <Button isLoading={submitting} color="secondary" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal >
  );
}
