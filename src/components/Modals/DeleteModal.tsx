import { queryAdmin } from "@/app/providers";
import { deleteData } from "@/core/apiHandler";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface ModalProps {
  isOpen: boolean,
  onOpenChange: () => any;
  title: string;
  api: string;
  queryKey: any
}
export default function DeleteModal({ isOpen, onOpenChange, title, api, queryKey }: ModalProps) {
  const removeData = useMutation({
    mutationKey: [`delete-${title}`],
    mutationFn: () => {
      return deleteData(api, {});
    },
    onSuccess: (data: any) => {
      if (data.data) {
        queryAdmin.invalidateQueries({ queryKey: queryKey });
        console.log(data.data);
        toast.success("Data Deleted sucessfully", {
          position: "top-right"
        });
        setisLoading(false);
      }
    },
    onError: (error: any) => {
      console.log(error.response.data);
      setisLoading(false);
    }
  })
  const [isLoading, setisLoading] = useState(false);
  const handleClose = (onClose: () => any) => {
    setisLoading(true);
    removeData.mutate();
    onClose();
  }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete {title}</ModalHeader>
              <ModalBody className="self-start">
                <p className="text-tableContent font-semibold">
                  Are you sure you want to delete ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button isLoading={isLoading} color="danger" onPress={() => handleClose(onClose)}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
