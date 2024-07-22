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
} from "@nextui-org/react";



interface AddModalProps {
  title: string;
  columns: any;
  api: string,
  apiKey: string[];
}
import { postData } from "@/core/apiHandler";
import { useMutation } from "@tanstack/react-query";
import { queryAdmin } from "@/app/providers";
import { toast } from "sonner";

export default function AddModal({ title, columns, api, apiKey }: AddModalProps) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);


  const AddModalData = useMutation({
    mutationKey: [`add-${title}`],
    mutationFn: (data: any) => {
      return postData(api, data, {});
    },
    onSuccess: (data: any) => {
      queryAdmin.invalidateQueries({ queryKey: apiKey });
    }
  })
  const handleSubmit = async (e: any, close: () => void) => {
    e.preventDefault();
    setSubmitting(true);
    const formElement = e.target as HTMLFormElement;
    const inputs = formElement.querySelectorAll("input, textarea");
    const data: any = {};

    inputs.forEach((input: any) => {
      const name = input.name;
      const value = input.value;
      console.log(inputs, value);
      if (name !== "" && name !== "main image") {
        data[name] = value;
      }
    });






    console.log(data);
    AddModalData.mutate(data);
    if (AddModalData.error) {
      toast.error("Data upload failed", {
        position: "top-right"
      });
      setSubmitting(false);
      close();
    } else {
      toast.success("Data uploaded successfully", {
        position: "top-right"
      });
      setSubmitting(false);
      close();
    }
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
