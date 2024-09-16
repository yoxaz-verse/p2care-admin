"use client";
import CurdTable from "@/components/Api/curdTable";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditModal from "@/components/Modals/EditModal";
import ViewModal from "@/components/Modals/newViewModal";
import {
  Doctor,
  GenderRoutes,
  patientRoutes,
  offerRoute,
  HospitalRoutes,
  serviceRoutes,
  LocationRoutes,
} from "@/core/apiRoutes";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Page {
  api: string;
  title: string;
  columns: any[];
  apiKey: string;
  needAddModal?: boolean;
  dropDownData?: any;
  searchBy?: string[];
}

export default function Page({
  api,
  title,
  columns,
  needAddModal = true,
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
    console.log(data);
  };
  const handleEditData = (data: any) => {
    onOpenEdit();
    setCurrData(data);
  };

  const router = useRouter();
  const handleViewData = (data: any) => {
    if (api === Doctor.docotor) {
      router.push(`/dashboard/doctors/${data._id}`);
      return;
    } else if (api == Doctor.enquiry || api == Doctor.appointments) {
      setCurrData(data.data);
      if (data.type === "doctor") {
        console.log(currData);
        //router.push(`/dashboard/doctor/${currData._id}`);
      }
      if (data.type === "user") {
        router.push(`/dashboard/user/${data._id}`);
      }
    }
    if (api == Doctor.department) {
      router.push(`/dashboard/departments/${data._id}`);
      return;
    }
    if (api == offerRoute) {
      return router.push(`/dashboard/offers/${data._id}`);
    }
    if (api == patientRoutes.patient) {
      router.push(`/dashboard/users/${data._id}`);
      return;
    }
    if (api == HospitalRoutes.hospital) {
      router.push(`/dashboard/hospitals/${data._id}`);
      return;
    }
    if (api == serviceRoutes.service) {
      router.push(`/dashboard/services/${data._id}`);
      return;
    }
    // if (api == LocationRoutes.city) {
    //   router.push(`/dashboard/city/${data._id}`);
    //   return;
    // }
    else {
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
        queryKey={[apiKey, page.toString(), search]}
        title={title}
        columns={columns}
        DropDownData={dropDownData}
        onOpenCreate={() => {}}
        onOpenDelete={(data: any) => handleDeleteData(data)}
        onOpenEdit={(data: any) => handleEditData(data)}
        onOpenView={(data: any) => handleViewData(data)}
        page={page}
        addModal={needAddModal}
        setPage={setPage}
        limit={limit}
        search={search}
        setSearch={(search) => {
          setSearch(search);
        }}
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
