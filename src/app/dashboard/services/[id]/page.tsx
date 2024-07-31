"use client";
import DeleteModal from "@/components/Modals/DeleteModal";
import Page from "@/components/Page/PageAll";
import Title from "@/components/titles";
import { Doctor, HospitalRoutes } from "@/core/apiRoutes";
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Input, useDisclosure } from "@nextui-org/react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
          <Title title="Service 1" />
          <div className="flex flex-row gap-4">
            <Button color="primary" radius="full" onClick={() => setIsEdit(true)}>Edit</Button>
            <Button color="danger" radius="full" onClick={() => onOpen()}>Delete</Button>
          </div>
        </div>
        <DeleteModal onOpenChange={onOpenChange} title="Serivice" data={id} isOpen={isOpen} api={HospitalRoutes.hospital} queryKey={["Docotor"]} />
      </div>
      <Card shadow="lg" radius="lg">
        <CardHeader className="text-[15px] md:text-[30px] font-bold">Service Details</CardHeader>
        <CardBody className="flex flex-col justify-center items-center gap-4 h-[30vh]">
          <Input
            label="Service Name"
            isReadOnly={isEdit}
            placeholder="Service Name"
          />
          <Input
            label="Hospital Name"
            isReadOnly={isEdit}
            placeholder="Hospital Name"
          />
          {isEdit && (
            <Button type="submit" className="w-1/2" radius="full" color="primary">Submit</Button>
          )}
        </CardBody>
      </Card>
      <Page needAddModal={false} api={Doctor.enquiry} apiKey="enquiryByHospital" columns={enquiryColumns} title={`Enquiry`} />
    </div>
  )
}
