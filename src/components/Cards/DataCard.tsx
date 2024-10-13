"use client";
import { getData, patchData } from "@/core/apiHandler";
import {
  Input,
  Textarea,
  Button,
  Card,
  CardBody,
  Spinner,
  Autocomplete,
  AutocompleteItem,
  Chip,
  Select,
  SelectItem,
  Spacer,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Title, { SubTitle } from "../titles";
import { Fragment, useEffect, useState } from "react";
import { queryAdmin } from "@/app/providers";
import { toast } from "sonner";
import { ImageSingle, ImageUploadMultiple } from "../ImageUpload";
import { HospitalRoutes } from "@/core/apiRoutes";

interface DataCardProps {
  columns: any[];
  title: string;
  getapi: string;
  DropDownData?: any;
  getapikey: string;
  isDelete?: boolean;
  editapi: string;
  editApikey: string;
  id: any;
  postimageapikey?: string;
  postimagesapikey?: string;
  onOpen?: () => void;
  setIsEdit?: (val: boolean) => void;
}

export default function DataCard({
  columns,
  title,
  id,
  getapi,
  getapikey,
  postimageapikey,
  editapi,
  isDelete,
  DropDownData,
  postimagesapikey,
  editApikey,
  onOpen,
}: DataCardProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [avilDaysEdit, setavailEdit] = useState<boolean>(false);
  const [modesEdit, setmodesEdit] = useState<boolean>(false);
  const {
    data: getValue,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [getapikey, id],
    queryFn: async () => {
      return await getData(`${getapi}/${id}`, {});
    },
  });
  const [avialableDays, setavailableDays] = useState<any>(new Set());
  const [modes, setmodes] = useState<any>(new Set());
  const mode = ["Credit Card", "UPI", "Debit Card", "Cash"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [formData, setFormData] = useState<any>({});
  const handleChange = (val: any, type: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [type]: val,
    }));
  };
  const [district, setDistrict] = useState<any>();
  const [city, setCity] = useState<any>();
  const [service, setService] = useState<any>();
  const handlePut = useMutation({
    mutationKey: [editApikey],
    mutationFn: (data: any) => {
      return patchData(`${editapi}/${id}`, data, {});
    },
    onSuccess: (data: any) => {
      console.log(data.data);
      toast.success(`${title} is updated successfully`, {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: [getapikey] });
      setIsEdit(false);
    },
    onError: (error: any) => {
      console.log(error.response.data.error);
      toast.error(`Error in updating ${error.response.data.error}`, {
        position: "top-right",
        className: "bg-red-300",
      });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      console.log("data", getValue.data.data);
    }
    setCity(getValue?.data?.data?.city?._id);
    console.log(city);

    setmodes(new Set(getValue?.data?.data?.modesOfPayment));
    console.log("visitingTime", getValue?.data?.data?.visitingTime);
    setavailableDays(new Set(getValue?.data?.data?.availableDays));
    setDistrict(getValue?.data?.data?.district?._id);
    setVistingTime(getValue?.data?.data?.visitingTime || []);
  }, [isSuccess, getValue, city]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Edit API:", editapi);

    let updatedFormData = { ...formData }; // Copy the existing form data

    if (editapi === HospitalRoutes.quick) {
      updatedFormData = {
        ...updatedFormData,
        // district: district, // Use latest district state
        // city: city, // Use latest city state
      };
    }

    if (editapi === HospitalRoutes.description) {
      console.log("Handling description edit");
      console.log("visitingTime:", visitingTime);
      console.log("availableDays:", avialableDays);
      console.log("modes:", modes);
      console.log("current formData:", formData);

      updatedFormData = {
        ...updatedFormData,
        // availableDays: Array.from(avialableDays), // Use latest availableDays state
        // modesOfPayment: Array.from(modes), // Use latest modes state
        // visitingTime: visitingTime, // Use latest visitingTime state
      };
    }

    console.log("Updated formData:", updatedFormData);

    // Call mutate with the latest form data
    handlePut.mutate(updatedFormData);
  };

  interface VisitngTime {
    from: string;
    to: string;
  }
  const [visitingTime, setVistingTime] = useState<VisitngTime[]>([]);
  const [valTime, setValTime] = useState<VisitngTime>({
    from: "",
    to: "",
  });
  const deleteVisiting = (index: number) => {
    setVistingTime((prev) => prev.filter((_, i) => i !== index));
  };
  const [editVisit, seteditVisit] = useState<boolean>(false);
  const pushVisting = (from: string, to: string) => {
    const time: VisitngTime = {
      from: from,
      to: to,
    };
    setVistingTime((prev) => [...prev, time]);
    seteditVisit(false);
    setValTime({
      from: "",
      to: "",
    });
  };

  useEffect(() => {
    console.log(getValue?.data?.data);
    if (getValue?.data?.data) {
      columns?.map((c: any) => {
        setFormData((prevFormData: any) => ({
          ...prevFormData,
          [c.uid]: getValue?.data?.data[c.uid],
        }));
      });
      setVistingTime(getValue?.data?.data?.visitingTime || []);
    }
  }, [getValue]);

  return isLoading ? (
    <>
      {" "}
      <Spinner title={`Loading ${title} details`} color="primary" />{" "}
    </>
  ) : (
    <Card className="w-full">
      <CardBody>
        <>
          <div className="flex flex-row justify-between items-center w-full">
            <SubTitle title={title} />
            <div className="flex flex-row gap-4">
              <Button
                color="primary"
                radius="full"
                onClick={() => {
                  setIsEdit && setIsEdit(true);
                }}
              >
                Edit
              </Button>
              {isDelete && (
                <Button
                  color="danger"
                  radius="full"
                  onClick={() => {
                    onOpen && onOpen();
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center p-[1rem]"
          >
            {columns?.map((c: any, index: number) => {
              switch (c.type) {
                case "images":
                  return postimagesapikey ? (
                    <ImageUploadMultiple
                      postapi={postimagesapikey}
                      images={getValue?.data?.data[c.uid]}
                      id={id}
                      getapikey={getapikey}
                    />
                  ) : null;

                case "image":
                  return postimageapikey ? (
                    <ImageSingle
                      id={id}
                      image={getValue?.data?.data[c.uid]}
                      getapikey={getapikey}
                      postapi={postimageapikey}
                    />
                  ) : null;
                case "text":
                  return isEdit ? (
                    <Input
                      key={index}
                      type="text"
                      onChange={(e) => handleChange(e.target.value, c.uid)}
                      value={formData[c.uid] || ""}
                      label={c.name}
                    />
                  ) : (
                    <Input
                      key={index}
                      type="text"
                      readOnly
                      value={formData[c.uid] || ""}
                      label={c.name}
                    />
                  );
                case "number":
                  return isEdit ? (
                    <Input
                      key={index}
                      type="number"
                      onChange={(e) => handleChange(e.target.value, c.uid)}
                      defaultValue={
                        formData[c.uid] || getValue?.data?.data[c.uid] || ""
                      }
                      label={c.name}
                    />
                  ) : (
                    <Input
                      key={index}
                      readOnly
                      type="number"
                      defaultValue={
                        formData[c.uid] || getValue?.data?.data[c.uid] || ""
                      }
                      label={c.name}
                    />
                  );
                case "array2":
                  return (
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-row items-center gap-4">
                        <h3 className="text-xl font-bold">Modes of Payment</h3>
                        {isEdit && (
                          <Button
                            color="primary"
                            radius="lg"
                            onClick={() => setmodesEdit(true)}
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-row gap-4">
                        {Array.from(modes).map((day: any, index: any) => (
                          <Chip
                            key={index}
                            color="primary"
                            variant="flat"
                            onClose={() => {
                              setmodes((prevDays: any) => {
                                const newDays = new Set(prevDays);
                                newDays.delete(day);
                                return newDays;
                              });
                            }}
                          >
                            {day}
                          </Chip>
                        ))}
                      </div>
                      {modesEdit && (
                        <Select
                          size="sm"
                          label="Select Modes of Payment"
                          onChange={(e: any) => {
                            const selectedDay = e.target.value;
                            console.log(selectedDay);
                            if (selectedDay)
                              setmodes((prevDays: any) =>
                                new Set(prevDays).add(selectedDay)
                              );
                            console.log("mode");
                            console.log(mode);

                            setmodesEdit(false);
                          }}
                          className="max-w-sm"
                        >
                          {mode.map((day: any) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    </div>
                  );

                case "array":
                  return (
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-row items-center gap-4">
                        <h3 className="text-xl font-bold">Available Days</h3>
                        {isEdit && (
                          <Button
                            color="primary"
                            radius="lg"
                            onClick={() => setavailEdit(true)}
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-row w-full gap-4">
                        {Array.from(avialableDays).map(
                          (day: any, index: any) => (
                            <Chip
                              key={index}
                              color="primary"
                              variant="flat"
                              onClose={() => {
                                setavailableDays((prevDays: any) => {
                                  const newDays = new Set(prevDays);
                                  newDays.delete(day);
                                  return newDays;
                                });
                              }}
                            >
                              {day}
                            </Chip>
                          )
                        )}
                      </div>
                      {avilDaysEdit && (
                        <Select
                          size="sm"
                          label="Select an Available Day"
                          onChange={(e: any) => {
                            const selectedDay = e.target.value;
                            setavailableDays((prevDays: any) =>
                              new Set(prevDays).add(selectedDay)
                            );
                            console.log(selectedDay);

                            setavailEdit(false);
                          }}
                          className="max-w-sm"
                        >
                          {days.map((day: any) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    </div>
                  );
                case "textbox":
                  return isEdit ? (
                    <Textarea
                      key={index}
                      onChange={(e) => handleChange(e.target.value, c.uid)}
                      value={formData[c.uid] || ""}
                      label={c.name}
                    />
                  ) : (
                    <Textarea
                      key={index}
                      readOnly
                      value={formData[c.uid] || ""}
                      label={c.name}
                    />
                  );
                case "vistingTime":
                  return (
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row items-center gap-3">
                        <h3 className="font-bold text-lg">Visitng Time</h3>
                        {isEdit && (
                          <Button
                            className="w-[20px]"
                            color="primary"
                            onClick={() => seteditVisit(true)}
                          >
                            Add
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="flex flex-wrap w-1/2 gap-3">
                          {visitingTime.map((v: VisitngTime, index: number) => (
                            <Fragment key={index}>
                              <Chip
                                color="primary"
                                variant="flat"
                                className="w-20 h-10 border border-blue-300 text-md"
                                onClose={() => deleteVisiting(index)}
                              >
                                {v.from} - {v.to}
                              </Chip>
                            </Fragment>
                          ))}
                        </div>
                        {editVisit && (
                          <div className="flex flex-col md:flex-row w-full gap-4">
                            <Input
                              label="From"
                              type="time"
                              onValueChange={(e) =>
                                setValTime((prev: any) => ({
                                  ...prev,
                                  from: e,
                                }))
                              }
                              defaultValue={valTime.from}
                            />
                            <Input
                              label="To"
                              type="time"
                              onValueChange={(e) => {
                                setValTime((prev: any) => ({
                                  ...prev,
                                  to: e,
                                }));
                              }}
                              defaultValue={valTime.to}
                            />

                            <Button
                              color="primary"
                              onClick={() =>
                                pushVisting(valTime.from, valTime.to)
                              }
                            >
                              Save
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                case "districtDropdown":
                  return isEdit ? (
                    <Autocomplete
                      disabled
                      label="Select an District"
                      selectedKey={district}
                      isLoading={DropDownData?.district?.isLoading}
                      items={DropDownData?.district?.items}
                      onSelectionChange={(e) => {
                        setDistrict(e);
                        handleChange(e as string, "district");
                      }}
                      className="max-w-full"
                    >
                      {DropDownData?.district?.items.map((d: any) => (
                        <AutocompleteItem key={d._id} value={d._id}>
                          {d.name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  ) : (
                    <Autocomplete
                      label="Select an District"
                      selectedKey={district}
                      isLoading={DropDownData?.district?.isLoading}
                      items={DropDownData?.district?.items}
                      className="max-w-full"
                      isDisabled
                    >
                      {DropDownData?.district?.items.map((d: any) => (
                        <AutocompleteItem key={d._id} value={d._id}>
                          {d.name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  );
                case "servicedropdown":
                  return isEdit ? (
                    <Autocomplete
                      disabled
                      label="Select an Service"
                      selectedKey={service}
                      isLoading={DropDownData?.service?.isLoading}
                      items={DropDownData?.service?.items}
                      onSelectionChange={(e) => {
                        setService(e);
                        handleChange(e as string, "serviceId");
                      }}
                      className="max-w-full"
                    >
                      {DropDownData?.district?.items.map((d: any) => (
                        <AutocompleteItem key={d._id} value={d._id}>
                          {d.name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  ) : (
                    <Autocomplete
                      label="Select an District"
                      selectedKey={service}
                      isLoading={DropDownData?.service?.isLoading}
                      items={DropDownData?.service?.items}
                      // onSelectionChange={(e) => {
                      //   setService(e);
                      //   handleChange(e as string, "serviceId");
                      // }}
                      className="max-w-full"
                      isDisabled
                    >
                      {DropDownData?.district?.items.map((d: any) => (
                        <AutocompleteItem key={d._id} value={d._id}>
                          {d.name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                  );
                case "cityDropdown":
                  return isEdit ? (
                    <Autocomplete
                      label="Select an city"
                      disabled={district === ""}
                      defaultSelectedKey={city}
                      isLoading={DropDownData?.city?.isLoading}
                      items={DropDownData?.city?.items}
                      onSelectionChange={(e) => {
                        setCity(e);
                        handleChange(e as string, "city");
                      }}
                      className="max-w-full"
                      // isDisabled
                    >
                      {DropDownData?.city?.items
                        .filter((item: any) => {
                          return item?.district?._id === district;
                        })
                        .map((d: any) => (
                          <AutocompleteItem key={d._id} value={d._id}>
                            {d.name}
                          </AutocompleteItem>
                        ))}
                    </Autocomplete>
                  ) : (
                    <Autocomplete
                      label="Select an city"
                      disabled={district === ""}
                      selectedKey={city}
                      isLoading={DropDownData?.city?.isLoading}
                      items={DropDownData?.city?.items}
                      onSelectionChange={(e) => {
                        // alert(e);
                        setCity(e);
                      }}
                      className="max-w-full"
                      isDisabled
                    >
                      {DropDownData?.city?.items
                        .filter((item: any) => {
                          return item?.district?._id === district;
                        })
                        .map((d: any) => (
                          <AutocompleteItem key={d._id} value={d._id}>
                            {d.name}
                          </AutocompleteItem>
                        ))}
                    </Autocomplete>
                  );

                default:
                  return null;
              }
            })}
            {isEdit && (
              <div className="w-full">
                <Button
                  type="submit"
                  className="w-full place-self-center"
                  color="primary"
                  radius="full"
                >
                  Submit
                </Button>
                <Spacer y={3} />
                <Button
                  onClick={() => setIsEdit(false)}
                  className="w-full place-self-center"
                  color="danger"
                  variant="ghost"
                  radius="full"
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </>
      </CardBody>
    </Card>
  );
}
