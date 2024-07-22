import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ReactNode } from "react";

export default function AddModal({
  title,
  children,
  onOpen,
  isOpen,
  onOpenChange,
}: {
  title: string;
  children: ReactNode;
  isOpen: any;
  onOpenChange: () => any;
  onOpen: () => any;
}) {
  return (
    <>
      {
        // idLaoding ? (
        //   <div className="flex justify-center items-center">
        //     <Spinner color="secondary" size="large" />
      }
      <Button onPress={onOpen} className="bg-blue-600 text-white">
        Add {title}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add {title}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
