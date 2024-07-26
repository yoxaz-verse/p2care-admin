"use client";
import CurdTable from "@/components/Api/curdTable";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditModal from "@/components/Modals/EditModal";
import ViewModal from "@/components/Modals/newViewModal";
import { Doctor, GenderRoutes } from "@/core/apiRoutes";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Page {
  api: string;
  title: string;
  columns: any[];
  apiKey: string;
  dropDownData?: any;
  searchBy?: string[];
}

export default function Page({
  api,
  title,
  columns,
  apiKey,
  dropDownData,
  searchBy,
}: Page) {
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

  const router = useRouter();
  const handleViewData = (data: any) => {
    if (api === Doctor.docotor) {
      setCurrData(data);
      router.push(`/doctor/${currData._id}`);
    } else if (api == Doctor.enquiry || api == Doctor.appointments) {
      setCurrData(data.data);
      if (data.type === "doctor") {
        router.push(`/dashboard/doctor/${currData._id}`);
      }
      if (data.type === "user") {
        router.push(`/dashboard/user/${currData._id}`);
      }
    } else {
      onOpenView();
      setCurrData(data);
    }
  };
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [search, setSearch] = useState<string>("");

  return (
    <main className="w-full p-5">
      <CurdTable
        api={api}
        queryKey={[apiKey, page.toString()]}
        title={title}
        columns={columns}
        DropDownData={dropDownData}
        onOpenCreate={() => {}}
        onOpenDelete={(data: any) => handleDeleteData(data)}
        onOpenEdit={(data: any) => handleEditData(data)}
        onOpenView={(data: any) => handleViewData(data)}
        page={page}
        setPage={setPage}
        limit={limit}
        search={search}
        setSearch={setSearch}
        searchBy={searchBy}
      />
      <ViewModal
        isOpen={isOpenView}
        onOpenChange={onOpenViewChange}
        title={title}
        columns={columns}
        data={currData}
        large={false}
        DropDownData={dropDownData}
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
        queryKey={[apiKey]}
        api={api}
        DropDownData={dropDownData}
        apiKey={[apiKey]}
        newCols={columns}
        title={title}
      />
    </main>
  );
}
