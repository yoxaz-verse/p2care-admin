"use client";
import { Types } from "@/content/tableData";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useCallback } from "react";
import Image from "next/image";

type ViewModalProp = "sm" | "md" | "lg" | "full";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  keys: Types[];
  data: any;
  size: ViewModalProp;
}

export default function ViewModal({
  isOpen,
  onOpenChange,
  title,
  data,
  keys,
  size,
}: ModalProps) {
  const renderData = useCallback(() => {
    return keys.map((k: Types) => {
      console.log(k.key);
      if (k.type === "text") {
        return (
          <Input
            key={k.value}
            type="text"
            className={`${size === "full" ? "w-[60vh]" : "w-full"}`}
            placeholder={data[k.value]}
            label={k.value}
            value={data[k.key]}
            readOnly
          />
        );
      }
      if (k.type === "text" && k.key === "Admin Name") {
        return (
          <Input
            key={k.value}
            type="text"
            className={`${size === "full" ? "w-[60vh]" : "w-full"}`}
            placeholder={data[k.value]}
            label={"Admin Name"}
            value={data[k.key]}
            readOnly
          />
        );
      }
      else if (k.type === "image") {
        return <></>;
      } else {
        return null;
      }
    });
  }, [keys, data]);

  return (
    <Modal
      isOpen={isOpen}
      size={size}
      className="w-screen"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              View {title}
            </ModalHeader>
            <ModalBody className="self-center">{renderData()}</ModalBody>
            <ModalFooter>
              <Button color="primary" variant="solid" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
