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
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Title, { SubTitle } from "../titles";
import { useEffect, useState } from "react";
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
  const { data: getValue, isLoading, isSuccess } = useQuery({
    queryKey: [getapikey],
    queryFn: async () => {
      return await getData(`${getapi}/${id}`, {});
    },
  });
  const [avialableDays, setavailableDays] = useState<any>(new Set());
  const [modes, setmodes] = useState<any>(new Set());
  const mode = ["Credit Card", "UPI", "Debit Card", "Cash"]
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
    setmodes(new Set(getValue?.data?.data?.modesOfPayment));
    console.log(getValue);
    setavailableDays(new Set(getValue?.data?.data?.availableDays));
    setDistrict(getValue?.data?.data?.district?._id);
  }, [isSuccess, getValue]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(editapi);
    if (editapi === HospitalRoutes.quick) {
      setFormData((data: any) => ({
        ...data,
        district,
        city,
      }));
    }
    if (editapi === HospitalRoutes.description) {
      setFormData((data: any) => ({
        ...data,
        availableDays: Array.from(avialableDays),
        modesOfPayment: Array.from(modes)
      }));
    }
    console.log(formData);
    handlePut.mutate(formData);
  };

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
            {columns.map((c: any, index: number) => {
              switch (c.type) {
                case "images":
                  return postimagesapikey ? (
                    <ImageUploadMultiple postapi={postimagesapikey} images={getValue?.data?.data[c.uid]} id={id} getapikey={getapikey} />
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
                  return (
                    <Input
                      key={index}
                      type="text"
                      onChange={(e) =>
                        handleChange(e.target.value, c.uid)
                      }
                      value={
                        formData[c.uid] ||
                        getValue?.data?.data[c.uid] ||
                        ""
                      }
                      label={c.name}
                    />
                  );
                case "number":
                  return (
                    <Input
                      key={index}
                      type="number"
                      onChange={(e) =>
                        handleChange(e.target.value, c.uid)
                      }
                      value={
                        formData[c.uid] ||
                        getValue?.data?.data[c.uid] ||
                        ""
                      }
                      label={c.name}
                    />
                  );
                case "array2":
                  return (
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-row items-center gap-4">
                        <h3 className="text-xl font-bold">Modes of Payment</h3>
                        <Button
                          color="primary"
                          radius="lg"
                          onClick={() => setmodesEdit(true)}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="flex flex-row gap-4">
                        {Array.from(modes).map(
                          (day: any, index: any) => (
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
                          )
                        )}
                      </div>
                      {modesEdit && (
                        <Select
                          size="sm"
                          label="Select Modes of Payment"
                          onChange={(e: any) => {
                            const selectedDay = e.target.value;
                            if (selectedDay) {
                              setmodes((prevDays: any) =>
                                new Set(prevDays).add(selectedDay)
                              );
                              setmodesEdit(false);
                            }
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
                            if (selectedDay) {
                              setavailableDays((prevDays: any) =>
                                new Set(prevDays).add(selectedDay)
                              );
                              setavailEdit(false);
                            }
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
                  return (
                    <Textarea
                      key={index}
                      onChange={(e) =>
                        handleChange(e.target.value, c.uid)
                      }
                      value={
                        formData[c.uid] ||
                        getValue?.data?.data[c.uid] ||
                        ""
                      }
                      label={c.name}
                    />
                  );
                case "districtDropdown":
                  return (
                    isEdit ?
                      <Autocomplete
                        disabled
                        label="Select an District"
                        defaultSelectedKey={district}
                        isLoading={DropDownData?.district?.isLoading}
                        items={DropDownData?.district?.items}
                        className="max-w-full"
                      >
                        {DropDownData?.district?.items.map((d: any) => (
                          <AutocompleteItem key={d._id} value={d._id}>
                            {d.name}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                      : <Autocomplete
                        label="Select an District"
                        defaultSelectedKey={district}
                        isLoading={DropDownData?.district?.isLoading}
                        items={DropDownData?.district?.items}
                        onSelectionChange={(e) => setDistrict(e)}
                        className="max-w-full"
                      >
                        {DropDownData?.district?.items.map((d: any) => (
                          <AutocompleteItem key={d._id} value={d._id}>
                            {d.name}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>

                  );
                case "cityDropdown":
                  return (
                    <Autocomplete
                      label="Select an city"
                      disabled={district === ''}
                      defaultSelectedKey={city}
                      isLoading={DropDownData?.city?.isLoading}
                      items={DropDownData?.city?.items}
                      onSelectionChange={(e) => setCity(e)}
                      className="max-w-full"
                    >
                      {DropDownData?.city?.items.filter((item: any) => {
                        return item?.district?._id === district
                      }).map((d: any) => (
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
              <>
                <Button
                  type="submit"
                  className="w-full place-self-center"
                  color="primary"
                  radius="full"
                >
                  Submit
                </Button>
                <Button
                  onClick={() => setIsEdit(false)}
                  className="w-full place-self-center"
                  color="danger"
                  variant="ghost"
                  radius="full"
                >
                  Cancel
                </Button>
              </>
            )}
          </form>
        </>
      </CardBody>
    </Card>
  );
}
