"use client";
import DeleteModal from "@/components/Modals/DeleteModal";
import Page from "@/components/Page/PageAll";
import Title from "@/components/titles";
import { Doctor, userRoutes } from "@/core/apiRoutes";
import { BreadcrumbItem, Image, Input, Breadcrumbs, Button, Card, CardBody, CardHeader, useDisclosure, Avatar } from "@nextui-org/react"
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const breadCrumps = [
  {
    name: "Dashboard",
    link: "/dashboard"
  },
  {
    name: "User",
    link: "/dashboard/users"
  },
  {
    name: "User Details",
    link: window.location.href
  }
]


export default function() {
  const router = useRouter();
  const appointmentColumns = [
    { name: "Doctor Name", uid: "name", type: "text" },
    { name: "User Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Appointment Time", uid: "appointment", type: "appointmentTime"
    },
    {
      name: "Actions", uid: "actions5", type: "actions4"
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
      name: "Actions", uid: "actions5", type: "actions5"
    }
  ]
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <Breadcrumbs color="secondary" className="text-xl font-bold">
          {breadCrumps.map((b: any) => {
            return <BreadcrumbItem onClick={() => router.push(b.link)}>{b.name}</BreadcrumbItem>
          })}
        </Breadcrumbs>
        <div className="flex flex-row justify-between items-center w-full">
          <Title title="John Doe" />
          <div className="flex flex-row gap-4">
            <Button color="primary" radius="full" onClick={() => setIsEdit(true)}>Edit</Button>
            <Button color="danger" radius="full" onClick={() => onOpen()}>Delete</Button>
          </div>
        </div>
        <DeleteModal data={id} isOpen={isOpen} onOpenChange={onOpenChange} title="User" api={userRoutes.user}
          queryKey={["user"]} />
      </div>
      <Card className="w-full" radius="lg" shadow="lg">
        <CardHeader className="text-3xl font-bold">User Details</CardHeader>
        <CardBody className="flex flex-col  gap-4 items-center  h-full">
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-[300px] h-[300px]" />
          {isEdit ? (
            <>
              <Input
                label="Doctor Name"
                placeholder="Docotor Name"
              />
              <Input
                label="Doctor Email"
                placeholder="Docotor Email"
              />
              <Input
                label="Doctor Phone"
                placeholder="Docotor Phone"
              />
            </>
          ) : (<>
            <Input
              label="Doctor Name"
              isReadOnly
              placeholder="Docotor Name"
            />
            <Input
              label="Doctor Email"
              isReadOnly
              placeholder="Docotor Email"
            />
            <Input
              label="Doctor Phone"
              isReadOnly
              placeholder="Docotor Phone"
            />
          </>)}
          {isEdit &&
            <Button variant="ghost" color="secondary" radius="full" className="w-full md:w-1/2">
              Submit
            </Button>
          }
        </CardBody>
      </Card>
      <Page needAddModal={false} api={Doctor.appointments} apiKey="appointments" columns={appointmentColumns} title={`John Doe's Appointment`} />
      <Page needAddModal={false} api={Doctor.enquiry} apiKey="enquiries" columns={enquiryColumns} title={`John Doe's Enquiries`} />
    </div>
  )
}
