"use client";
import { useState } from "react";
import DeleteModal from "@/components/Modals/DeleteModal";
import Title from "@/components/titles";
import { BreadcrumbItem, Breadcrumbs, Button, useDisclosure } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { HospitalRoutes } from "@/core/apiRoutes";

const breadCrumps = [
  {
    name: "Dashboard",
    link: "/dashboard"
  },
  {
    name: "Department",
    link: "/dashboard/departments"
  },
  {
    name: "Department Details",
    link: window.location.href
  }
]

export default function() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { id } = useParams();
  const [isedit, setisEdit] = useState(false);
  return (
    <div className="flex flex-col w-full gap-4">
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

    </div>
  )
}
