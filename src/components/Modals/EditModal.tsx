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
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { patchData } from "@/core/apiHandler";
import { toast } from "sonner";
import MutationLoading from "../Loading/mutationLoading";
import { queryAdmin } from "@/app/providers";
import { LocationRoutes } from "@/core/apiRoutes";

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

  const [loading, setLoading] = useState<boolean>(true);
  const [district, setDistrict] = useState<any>("");
  useEffect(() => {
    if (!data) return;
    setCurrData(data);
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
      toast.success("Data updated successfully");
      queryAdmin.invalidateQueries({
        queryKey: apiKey,
      });
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
    console.log(currdata);
    setSubmitting(true);
    try {
      updateData.mutate({ data: currdata, id: data._id });
      queryAdmin.invalidateQueries({ queryKey: queryKey })
    } catch (error) {
      console.error("Error updating data:", error);
      alert("An error occurred while updating data.");
      close();
    } finally {
      setSubmitting(false);
      close();
    }
  };

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
                          defaultSelectedKey={currdata[column.name.toLowerCase()] || ""}
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

                    case "designationDropdown":
                      return (
                        <Autocomplete
                          defaultSelectedKey={currdata[column.name.toLowerCase()] || ""}
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
