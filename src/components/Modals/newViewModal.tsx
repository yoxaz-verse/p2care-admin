"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Image,
  Textarea,
  Spinner,
  Chip,
} from "@nextui-org/react";

interface ViewModalProps {
  title: string;
  isOpen: boolean;
  onOpenChange: () => any;
  onClose: () => any;
  data: any;
  columns: any;
  large: boolean;
}

const ViewModal: React.FC<ViewModalProps> = ({
  title,
  isOpen,
  onClose,
  onOpenChange,
  data,
  columns,
  large,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      /* const altImage = Array(5).fill({
         data: "/01.png"
       });
      // setFiles(data.images && data.images.length > 0 ? data.images : altImage);
      setTabs(data.projectDetails || []);
     */
      setLoading(false);
    }
  }, [data]);

  const renderField = (column: any, value: any, index: number) => {
    switch (column.type) {
      case "text":
        return <Input key={index} label={column.name} value={value || ""} disabled />;
      case "image":
        return (
          <div key={index}>
            <label>{column.name}:</label>
            {data.image ? (
              <Image src={data.image} alt={column.name} width={200} height={200} />
            ) : (
              <Image src="/01.png" alt="default" width={200} height={200} />
            )}
          </div>
        );
      case "textbox":
        return <Textarea key={index} label={column.name} value={value || ""} disabled />;
      /*
    case "images":
      return (
        <div key={index}>
          <label>{column.name}:</label>
          <div className="flex flex-row overflow-x-scroll">
            {files && files.length > 0 ? (
              files.map((imgUrl: any, imgIndex: any) => (
                <Image
                  key={imgIndex}
                  src={imgUrl}
                  alt={`${column.name}-${imgIndex}`}
                  width={200}
                  height={200}
                />
              ))
            ) : (
              <Image src="/01.png" alt="default" width={200} height={200} />
            )}
          </div>
        </div>
      );
        */
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      className="overflow-y-scroll"
      size={large ? "xl" : "lg"}
      onOpenChange={onOpenChange}
      placement="center"
      isDismissable={false}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>View {title}</ModalHeader>
        <ModalBody>
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-6">
              {columns.map((column: any, index: number) =>
                renderField(column, data ? data[column.name.toLowerCase()] : null, index)
              )}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewModal;
