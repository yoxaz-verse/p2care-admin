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
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";


interface ViewModalProps {
  title: string;
  isOpen: boolean;
  onOpenChange: () => any;
  onClose: () => any;
  data: any;
  columns: any;
  large: boolean;
  DropDownData?: any
}

const ViewModal: React.FC<ViewModalProps> = ({
  title,
  isOpen,
  onClose,
  onOpenChange,
  data,
  columns,
  DropDownData,
  large,
}) => {
  const [loading, setLoading] = useState(true);

  console.log(DropDownData?.district?.items);
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
    console.log(column);
    if (column.name === "Admin Name") {
      return <Input key={index} label={"Admin Name"} value={data.name || ""} disabled />;
    }
    switch (column.type) {
      case "text":
        return <Input key={index} label={column.name} value={value || ""} disabled />;
      case "number":
        return <Input key={index} label={column.name} value={value || ""} disabled />;
      case "districtDropdown":
        return (
          <>

            <Autocomplete
              label="Select an District"
              selectedKey={value}
              isLoading={DropDownData.district.isLoading}
              items={DropDownData.district.items}
              className="max-w-full"
            >
              {DropDownData.district.items.map((d: any) => (
                <AutocompleteItem key={d.name} value={d.name}>{d.name}</AutocompleteItem>
              ))}
            </Autocomplete>
          </>
        );
      case "departmentDropdown":
        return (
          <Autocomplete
            label="Select an Department"
            className="max-w-full"
          >
            {DropDownData["department"].map((d: any) => (
              <AutocompleteItem key={d._id} value={d._id}>
                {d.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        );

      case "designationDropdown":
        return (
          <Autocomplete
            label="Select an Desigantion"
            className="max-w-full"
          >
            {DropDownData["desgination"].map((d: any) => (
              <AutocompleteItem key={d._id} value={d._id}>
                {d.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        );

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
