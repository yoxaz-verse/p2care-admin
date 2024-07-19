import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input, useDisclosure } from "@nextui-org/react";

export default function AddModal({ title }: { title: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} className="bg-blue-600 text-white">Add {title}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add {title}</ModalHeader>
              <ModalBody>
                <Input label="Hospital Name" />
                <Input label="Location" />
                <Input label="No of Specialities" />
                <Input label="No of Amount" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
