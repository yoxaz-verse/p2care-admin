"use client";
import CurdTable from "@/components/Api/curdTable";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditModal from "@/components/Modals/EditModal";
import ViewModal from "@/components/Modals/newViewModal";
import { GenderRoutes } from "@/core/apiRoutes";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenView, onOpen: onOpenView, onOpenChange: onOpenViewChange, onClose: onCloseView } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenEditChange, onClose: onCloseEdit } = useDisclosure();

  const [currData, setCurrData] = useState<any>();
  const handleDeleteData = (data: any) => {
    onOpen();
    setCurrData(data);
  }
  const handleEditData = (data: any) => {
    onOpenEdit();
    setCurrData(data)
  }
  const columns = [
    { name: "NAME", uid: "name", type: "text" },
    { name: "ACTIONS", uid: "actions", type: "action" },
  ]

  const handleViewData = (data: any) => {
    onOpenView();
    setCurrData(data);
  }
  const [page, setPage] = useState<number>();
  return (
    <main className="w-full p-5">
      <CurdTable
        api={GenderRoutes.gender}
        queryKey={["genders"]}
        title="Gender"
        columns={columns}
        onOpenCreate={() => { }}
        onOpenDelete={(data: any) => handleDeleteData(data)}
        onOpenEdit={(data: any) => handleEditData(data)}
        onOpenView={(data: any) => handleViewData(data)}
      />
      <ViewModal isOpen={isOpenView} onOpenChange={onOpenViewChange} title="Gender" columns={columns} data={currData} large={false} onClose={onCloseView} />
      <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange} data={currData} api={GenderRoutes.gender} queryKey={["genders"]} title={"Gender"} />
      <EditModal isOpen={isOpenEdit} onOpenChange={onOpenEditChange} data={currData} api={GenderRoutes.gender} apiKey={["edit-genders"]} newCols={columns} title="Gender" />
    </main>
  );
}
