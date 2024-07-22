"use client";
import CurdTable from "@/components/Api/curdTable";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditModal from "@/components/Modals/EditModal";
import ViewModal from "@/components/Modals/newViewModal";
import { GenderRoutes } from "@/core/apiRoutes";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";


interface Page {
  api: string,
  title: string,
  columns: any[],
  apiKey: string
}

export default function Page({ api, title, columns, apiKey }: Page) {
  console.log(api, title)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onOpenChange: onOpenViewChange,
    onClose: onCloseView,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenEditChange,
    onClose: onCloseEdit,
  } = useDisclosure();

  const [currData, setCurrData] = useState<any>();
  const handleDeleteData = (data: any) => {
    onOpen();
    setCurrData(data);
  };
  const handleEditData = (data: any) => {
    onOpenEdit();
    setCurrData(data);
  };
  /*
  const columns = [
    { name: "NAME", uid: "name", type: "text" },
    { name: "ACTIONS", uid: "actions", type: "action" },
  ];
  */

  const handleViewData = (data: any) => {
    onOpenView();
    setCurrData(data);
  };
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);

  return (
    <main className="w-full p-5">
      <CurdTable
        api={api}
        queryKey={[apiKey, page.toString()]}
        title={title}
        columns={columns}
        onOpenCreate={() => { }}
        onOpenDelete={(data: any) => handleDeleteData(data)}
        onOpenEdit={(data: any) => handleEditData(data)}
        onOpenView={(data: any) => handleViewData(data)}
        page={page}
        setPage={setPage}
        limit={limit}
      />
      <ViewModal
        isOpen={isOpenView}
        onOpenChange={onOpenViewChange}
        title={title}
        columns={columns}
        data={currData}
        large={false}
        onClose={onCloseView}
      />
      <DeleteModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        data={currData}
        api={api}
        queryKey={[apiKey]}
        title={title}
      />
      <EditModal
        isOpen={isOpenEdit}
        onOpenChange={onOpenEditChange}
        data={currData}
        api={api}
        apiKey={[apiKey]}
        newCols={columns}
        title={title}
      />
    </main>
  );
}
