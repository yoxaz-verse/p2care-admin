"use client";
import { Types } from "@/app/content/tableData";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button, Input } from "@nextui-org/react";
import React, { useEffect, useCallback } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  keys: Types[];
  data: any;
}

export default function ViewModal({ isOpen, onOpenChange, title, data, keys }: ModalProps) {

  const renderData = useCallback(() => {
    return keys.map((k: Types) => {
      if (k.type === "text") {
        return (
          <Input
            key={k.value}
            type="text"
            className="w-[70vh]"
            placeholder={data[k.value]}
            label={k.value}
            value={data[k.key]}
            readOnly
          />
        );
      } else if (k.type === "image") {
        return (
          <></>
        )
      }
      else {
        return null;
      }
    });
  }, [keys, data]);

  useEffect(() => {
    console.log(data.name);
    console.log(keys[0].key);
  }, [data, keys]);

  return (
    <Modal isOpen={isOpen} size="full" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">View {title}</ModalHeader>
            <ModalBody className="self-center">
              {renderData()}
            </ModalBody>
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
