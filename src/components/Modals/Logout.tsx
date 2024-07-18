"use client";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react"
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean,
  onOpenChange: () => any;
}
export default function LogoutModal({ isOpen, onOpenChange }: ModalProps) {
  const router = useRouter();
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody className="self-start">
                <p className="text-tableContent font-semibold">
                  Are you sure you want to Logout ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="danger" onPress={() => router.push("/admin")}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
