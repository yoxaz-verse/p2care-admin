"use client";
import { getData, patchData } from "@/core/apiHandler";
import { Input, Textarea, Button, Card, CardBody, Spinner, Autocomplete, AutocompleteItem, Chip, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Title from "../titles";
import { useEffect, useState } from "react";
import { queryAdmin } from "@/app/providers";
import { toast } from "sonner";
import { ImageSingle } from "../ImageUpload";
import { HospitalRoutes } from "@/core/apiRoutes";

interface DataCardProps {
  columns: any[];
  title: string;
  getapi: string;
  DropDownData?: any;
  getapikey: string;
  editapi: string;
  editApikey: string;
  id: any;
  postimageapikey?: string;
}

export default function DataCard({
  columns,
  title,
  id,
  getapi,
  getapikey,
  postimageapikey,
  editapi,
  DropDownData,
  editApikey
}: DataCardProps) {
  const [avilDaysEdit, setavailEdit] = useState<boolean>(false);

  const { data: getValue, isLoading } = useQuery({
    queryKey: [getapikey],
    queryFn: async () => {
      return await getData(`${getapi}/${id}`, {})
    }
  });
  const [avialableDays, setavailableDays] = useState<any>(new Set());

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [formData, setFormData] = useState<any>({});
  const handleChange = (val: any, type: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [type]: val
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
        className: "bg-green-300"
      })
      queryAdmin.invalidateQueries({ queryKey: [getapikey] });
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(`Error in updating ${title}`, {
        position: "top-right",
        className: "bg-red-300"
      });
    }
  });
  useEffect(() => {
    console.log(getValue);
    setCity(getValue?.data.data.city._id);
    setDistrict(getValue?.data.data.district._id);

  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editapi === HospitalRoutes.quick) {
      setFormData((data: any) => ({
        ...data,
        district,
        availableDays: avialableDays,
        city
      }));
    }
    handlePut.mutate(formData);
  };

  return (
    isLoading ? <> <Spinner title={`Loading ${title} details`} color="primary" />  </> : (
      <Card className="w-full">
        <CardBody>
          <>
            <Title title={title} />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center p-[1rem]">
              {columns.map((c: any, index: number) => {
                switch (c.type) {
                  case "image":
                    return postimageapikey ? <ImageSingle id={id} image={getValue?.data?.data[c.uid]} getapikey={getapikey} postapi={postimageapikey} /> : null;
                  case "text":
                    return (
                      <Input
                        key={index}
                        type="text"
                        onChange={(e) => handleChange(e.target.value, c.name.toLowerCase())}
                        value={formData[c.name.toLowerCase()] || getValue?.data?.data[c.uid] || ""}
                        label={c.name}
                      />
                    );
                  case "number":
                    return (
                      <Input
                        key={index}
                        type="number"
                        onChange={(e) => handleChange(e.target.value, c.name.toLowerCase())}
                        value={formData[c.name.toLowerCase()] || getValue?.data?.data[c.uid] || ""}
                        label={c.name}
                      />
                    );
                  case "array":
                    return (
                      <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-row items-center gap-4 w-1/4">
                          <h3 className="text-xl font-bold">Available Days</h3>
                          <Button color="primary" radius="lg" onClick={() => setavailEdit(true)}>Edit</Button>
                        </div>
                        <div className="flex flex-row gap-4">
                          {Array.from(avialableDays).map((day: any, index: any) => (
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
                          ))}
                        </div>
                        {avilDaysEdit && (
                          <Select
                            size="sm"
                            label="Select an Available Day"
                            onChange={(e: any) => {
                              const selectedDay = e.target.value;
                              if (selectedDay) {
                                setavailableDays((prevDays: any) => new Set(prevDays).add(selectedDay));
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


                    )
                  case "textbox":
                    return (
                      <Textarea
                        key={index}
                        onChange={(e) => handleChange(e.target.value, c.name.toLowerCase())}
                        value={formData[c.name.toLowerCase()] || getValue?.data?.data[c.uid] || ""}
                        label={c.name}
                      />
                    );
                  case "districtDropdown":
                    return (
                      <Autocomplete
                        label="Select an District"
                        selectedKey={district}
                        isLoading={DropDownData.district.isLoading}
                        items={DropDownData.district.items}
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
                        selectedKey={city}
                        isLoading={DropDownData.city.isLoading}
                        items={DropDownData.city.items}
                        onSelectionChange={(e) => setCity(e)}
                        className="max-w-full"
                      >
                        {DropDownData?.city?.items.map((d: any) => (
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
              <Button type="submit" className="w-full" color="secondary" radius="full">Submit</Button>
            </form>
          </>
        </CardBody >
      </Card >
    )
  );
}
