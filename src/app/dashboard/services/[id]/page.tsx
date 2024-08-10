"use client";
import { queryAdmin } from "@/app/providers";
import AttachCard from "@/components/AttachCard";
import DataCard from "@/components/Cards/DataCard";
import DeleteModal from "@/components/Modals/DeleteModal";
import Page from "@/components/Page/PageAll";
import Title from "@/components/titles";
import { getData, patchData } from "@/core/apiHandler";
import { Doctor, HospitalRoutes, serviceRoutes } from "@/core/apiRoutes";
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Input, Switch, useDisclosure } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ServiceName() {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const header = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Service",
      link: "/dashboard/services"
    },
    {
      name: "Service Detail",
      link: path
    }
  ]
  const enquiryColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Status", uid: "status", type: "enquirystatus"
    },
    {
      name: "Actions", uid: "actions", type: "actions"
    }
  ]

  const serviceCols = [
    { name: "Service Image", uid: "image", type: "image" },
    { name: "Service Name", uid: "title", type: "text" },
    { name: "Service Description", uid: "description", type: "textbox" },
  ]
  const departmentList = useAsyncList<any>({
    async load() {
      let res = await getData(Doctor.department, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const markAsTop = useMutation({
    mutationKey: ["markAsTop"],
    mutationFn: (data: any) => {
      return patchData(`/service/top/${id}`, data, {});
    },
    onSuccess: () => {
      toast.success("Service is marked as top", {
        position: "top-right",
        className: "bg-green-300"
      })
      queryAdmin.invalidateQueries({ queryKey: ["getservice", id] });
    }
  });
  const { data: getservice, isLoading, isSuccess } = useQuery({
    queryKey: ["getservice", id],
    queryFn: async () => {
      return await getData(`${serviceRoutes.service}/${id}`, {});
    },
  });
  const handleChangeTop = (e: any) => {
    e.preventDefault();
    const item = {
      isTop: !getservice?.data?.data?.isMain
    }
    console.log(item);
    markAsTop.mutate(item);
  }

  const hospitalList = useAsyncList<any>({
    async load() {
      let res = await getData(HospitalRoutes.hospital, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const doctorList = useAsyncList<any>({
    async load() {
      let res = await getData(Doctor.docotor, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full gap-4 p-[1rem]">
        <Breadcrumbs color="secondary">
          {header.map((h: any, index: any) => {
            return <BreadcrumbItem key={index} className="text-xl font-bold cursor-pointer" onClick={() => router.push(h.link)}>{h.name}</BreadcrumbItem>
          })}
        </Breadcrumbs>
        <div className="flex flex-row justify-between items-center w-full">
          <Title title="Service Details" />
          <div className="flex flex-row gap-4">
            <Switch
              size="lg"
              color="success"
              onClick={(e) => handleChangeTop(e)}
              isSelected={getservice?.data.data?.isMain}
              aria-label="Automatic updates" className="text-xl">Mark the Service as Top</Switch>
            <Button color="danger" radius="full" onClick={() => onOpen()}>Delete</Button>
          </div>
        </div>
        <DeleteModal onOpenChange={onOpenChange} title="Serivice" data={id} isOpen={isOpen} api={serviceRoutes.service} queryKey={["service"]} />
      </div>
      <DataCard
        editApikey="servicename"
        editapi={serviceRoutes.service}
        getapi={serviceRoutes.service}
        postimageapikey={serviceRoutes.image}
        getapikey="getservice"
        title="Service Details"
        columns={serviceCols}
        id={id}
      />
      <AttachCard
        id={id}
        getapi={serviceRoutes.addDepartment}
        api={serviceRoutes.addDepartment}
        title="Add Department"
        DropDown={departmentList} />
      <AttachCard
        id={id}
        getapi={serviceRoutes.addHospital}
        api={serviceRoutes.addHospital}
        title="Add Hospital"
        DropDown={hospitalList} />
      <AttachCard
        id={id}
        getapi={serviceRoutes.addDoctor}
        api={serviceRoutes.addDoctor}
        title="Add Doctor"
        DropDown={doctorList} />


      <Page needAddModal={false} api={Doctor.enquiry} apiKey="enquiryByHospital" columns={enquiryColumns} title={`Enquiry`} />
    </div>
  )
}
