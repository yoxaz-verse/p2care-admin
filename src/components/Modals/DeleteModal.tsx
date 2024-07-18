import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react"

interface ModalProps {
  isOpen: boolean,
  onOpenChange: () => any;
  title: string;
}
export default function DeleteModal({ isOpen, onOpenChange, title }: ModalProps) {
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
                <Button color="danger" onPress={onClose}>
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
