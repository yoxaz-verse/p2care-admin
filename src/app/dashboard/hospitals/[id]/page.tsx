"use client";
import { useState } from "react";
import { generateTabColumns } from "@/content/table-columns";
import Title from "@/components/titles";
import { generateTable } from "@/utilis/content";
import generateData from "@/content/tableData";
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Input, useDisclosure } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import DeleteModal from "@/components/Modals/DeleteModal";
import { Doctor, HospitalRoutes } from "@/core/apiRoutes";
import Page from "@/components/Page/PageAll";


const breadCrumps = [
  {
    name: "Dashboard",
    link: "/dashboard"
  },
  {
    name: "Hospital",
    link: "/dashboard/hospitals"
  },
  {
    name: "Hospital Details",
    link: window.location.href
  }
]



export default function HospitalDetail() {
  const router = useRouter();
  const { id } = useParams();
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [isEdit, setisEdit] = useState<boolean>(false);
  const appointmentColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Appointment Time", uid: "appointment", type: "appointmentTime"
    },
    {
      name: "Actions", uid: "actions", type: "actions"
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
  const docDepartmentColumns = [
    { name: "Doctor Name", uid: "name", type: "text" },
    { name: "Department Name", uid: "name", type: "text" },
    { name: "Doctor Email", uid: "email", type: "text" },
    { name: "Doctor Phone", uid: "email", type: "text" },
    {
      name: "Actions", uid: "actions6", type: "actions6"
    }
  ]
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 p-[1rem]">
          <Breadcrumbs color="secondary" className="text-xl font-bold">
            {breadCrumps.map((b: any) => {
              return <BreadcrumbItem onClick={() => router.push(b.link)}>{b.name}</BreadcrumbItem>
            })}
          </Breadcrumbs>
          <div className="flex flex-row justify-between items-center w-full">
            <Title title="Apollo Hosptial" />
            <div className="flex flex-row gap-4">
              <Button color="primary" radius="full" onClick={() => setisEdit(true)}>Edit</Button>
              <Button color="danger" radius="full" onClick={() => onOpen()}>Delete</Button>
            </div>
          </div>
          <DeleteModal onOpenChange={onOpenChange} title="Hospital" data={id} isOpen={isOpen} api={HospitalRoutes.hospital} queryKey={["Docotor"]} />
        </div>
        <Card>
          <CardHeader className="text-xl font-bold">Hospital Details</CardHeader>
          <CardBody className="flex flex-col  gap-4 items-center  h-full">
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-[300px] h-[300px]" />
            {isEdit ? (
              <>
                <Input
                  label="Hospital Name"
                  placeholder="Docotor Name"
                />
                <Input
                  label="Hospital Email"
                  placeholder="Hospital Email"
                />
                <Input
                  label="Hospital Phone"
                  placeholder="Hospital Phone"
                />
                <div className="flex flex-row w-full justify-between gap-3">
                  <Input label="City" placeholder="City" />
                  <Input label="District" placeholder="District" />
                </div>
              </>
            ) : (<>
              <Input
                label="Hospital Name"
                isReadOnly
                placeholder="Hospital Name"
              />
              <Input
                label="Hospital Email"
                isReadOnly
                placeholder="Hospital Email"
              />
              <Input
                label="Hospital Phone"
                isReadOnly
                placeholder="Hospital Phone"
              />
              <div className="flex flex-row w-full justify-between gap-3">
                <Input label="City" placeholder="City" />
                <Input label="District" placeholder="District" />
              </div>
            </>)}
            {isEdit &&
              <Button variant="ghost" color="secondary" radius="full" className="w-full md:w-1/2">
                Submit
              </Button>
            }
          </CardBody>
        </Card>
        <Page api={HospitalRoutes.enquiry} apiKey="enquiryforHospital" columns={enquiryColumns} title={`Enquiries for Apollo Hospital`} />
        <Page api={HospitalRoutes.appointment} apiKey="appointments" columns={appointmentColumns} title="Appointment for Apollo Hospital" />
        <Page api={HospitalRoutes.department} apiKey="doctor-department" columns={docDepartmentColumns} title="Docotor in Departments for Apollo Hospital" />
      </div>
    </>
  );
}
