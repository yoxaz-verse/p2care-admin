import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  Chip,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Image,
  Textarea,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";



interface AddModalProps {
  title: string;
  columns: any;
  DropDownData?: any;
  api: string,
  apiKey: string[];
}
import { getData, postData } from "@/core/apiHandler";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryAdmin } from "@/app/providers";
import { toast } from "sonner";
import { DesignationRoutes, Doctor, HospitalRoutes, LocationRoutes } from "@/core/apiRoutes";

export default function AddModal({ title, columns, api, apiKey, DropDownData }: AddModalProps) {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);
  const [district, setDistrict] = useState<any>();
  const [city, setCity] = useState<any>();
  const [department, setDepartment] = useState<any>();
  const [gender, setGender] = useState<any>();
  const [designation, setDesignation] = useState<any>();
  console.log(api, apiKey);
  const AddModalData = useMutation({
    mutationKey: [`add-${apiKey}`],
    mutationFn: (data: any) => {
      console.log(data);
      return postData(api, data, {});
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.success("Data added successfully", {
        position: "top-right",
        className: "bg-green-300"
      })
      queryAdmin.invalidateQueries({ queryKey: apiKey });
      setSubmitting(false);
      onClose();
    },
    onError: (data: any) => {
      setSubmitting(false);
      onClose();
    }
  })
  function toCamelCase(str: string) {
    console.log(str);
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
  const handleSubmit = async (e: any, close: () => void) => {
    e.preventDefault();
    setSubmitting(true);
    const formElement = e.target as HTMLFormElement;
    const inputs = formElement.querySelectorAll("input, textarea");
    const data: any = {};

    inputs.forEach((input: any) => {
      const name = input.name;
      const value = input.value;
      console.log(name, value);
      if (name === "metadescription") {
        data["metaDescription"] = value;
      }
      if (name === "metatitle") {
        data["metaTitle"] = value;
      }
      if (name !== "" && name !== "main image") {
        const camelCaseName = toCamelCase(name);
        console.log(camelCaseName);
        data[camelCaseName] = value;
      }
    });
    console.log("data", data);
    if (api === Doctor.docotor) {
      api = Doctor.quick;
      const docInput = {
        ...data,
        department,
        designation,
        gender
      }
      AddModalData.mutate(docInput);
    }
    if (api === HospitalRoutes.hospital) {
      api = HospitalRoutes.quick;
      const hosInput = {
        ...data,
        district,
        city
      }
      AddModalData.mutate(hosInput);
    }

    if (api === Doctor.procedure) {
      const procedureData = {
        ...data,
        department
      }
      AddModalData.mutate(procedureData);
    }
    if (api === LocationRoutes.city) {
      const cityInput = {
        ...data,
        district
      }
      console.log(data);
      AddModalData.mutate(cityInput);
    } else {

      AddModalData.mutate(data);
    }
    close();
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-violet-700 text-white">{`Add ${title}`}</Button>
      <Modal
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="overflow-y-scroll"
        onClose={() => {
          setSubmitting(false);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form
                onSubmit={(e) => {
                  handleSubmit(e, onClose);
                }}
              >
                <ModalHeader className="flex flex-col gap-1">{`Add ${title}`}</ModalHeader>
                <ModalBody>
                  {columns.map((column: any, columnIndex: number) => {
                    switch (column.type) {
                      case "text":
                        return (
                          <Input key={columnIndex} label={column.name} name={column.name.toLowerCase()} placeholder={column.name} required />
                        );
                      case "password":
                        return (
                          <Input type="password" key={columnIndex} label={column.name} name={column.name.toLowerCase()} placeholder={column.name} required />
                        );
                      case "number":
                        return (
                          <Input key={columnIndex} label={column.name} name={column.name.toLowerCase()} placeholder={column.name} required />
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
                      case "genderDropdown":
                        return (
                          <Autocomplete
                            label="Select an Gender"
                            selectedKey={gender}
                            isLoading={DropDownData.gender.isLoading}
                            items={DropDownData.gender.items}
                            onSelectionChange={(e) => setGender(e)}
                            className="max-w-full"
                          >
                            {DropDownData.gender.items.map((d: any) => (
                              <AutocompleteItem key={d._id} value={d._id}>
                                {d.name}
                              </AutocompleteItem>
                            ))}
                          </Autocomplete>
                        );

                      case "departmentDropdown":
                        return (
                          <Autocomplete
                            label="Select an Department"
                            selectedKey={department}
                            isLoading={DropDownData.department.isLoading}
                            items={DropDownData.department.items}
                            onSelectionChange={(e) => setDepartment(e)}
                            className="max-w-full"
                          >
                            {DropDownData.department.items.map((d: any) => (
                              <AutocompleteItem key={d._id} value={d._id}>
                                {d.name}
                              </AutocompleteItem>
                            ))}
                          </Autocomplete>
                        );
                      case "desginationDropDown":
                        return (
                          <Autocomplete
                            label="Select an Desigantion"
                            selectedKey={designation}
                            onSelectionChange={(e) => setDesignation(e)}
                            className="max-w-full"
                          >
                            {DropDownData?.designation.items.map((d: any) => (
                              <AutocompleteItem key={d._id} value={d._id}>
                                {d.name}
                              </AutocompleteItem>
                            ))}
                          </Autocomplete>
                        );
                      case "textbox":
                        return (
                          <Textarea key={columnIndex} label={column.name} name={column.name.toLowerCase()} placeholder={column.name} required />
                        );
                      case "action":
                        return null;
                      default:
                        return null;
                    }
                  })}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={() => {
                    onClose()
                  }}>
                    Close
                  </Button>
                  <Button isLoading={submitting} color="secondary" type="submit">
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal >
    </>
  );
}
