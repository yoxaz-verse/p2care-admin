"use client";
import { useState } from "react";
import { generateTabColumns } from "@/content/table-columns";
import Title from "@/components/titles";
import { generateTable } from "@/utilis/content";
import generateData from "@/content/tableData";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import DeleteModal from "@/components/Modals/DeleteModal";
import { Doctor, HospitalRoutes, LocationRoutes } from "@/core/apiRoutes";
import Page from "@/components/Page/PageAll";
import AttachCard from "@/components/AttachCard";
import DataCard from "@/components/Cards/DataCard";
import { getData } from "@/core/apiHandler";
import { useAsyncList } from "@react-stately/data";

export default function HospitalDetail() {
  const path = usePathname();
  const breadCrumps = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Hospital",
      link: "/dashboard/hospitals",
    },
    {
      name: "Hospital Details",
      link: path,
    },
  ];
  const router = useRouter();
  const { id } = useParams();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [isEdit, setisEdit] = useState<boolean>(false);
  const appointmentColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Appointment Time",
      uid: "appointment",
      type: "appointmentTime",
    },
    {
      name: "Actions",
      uid: "actions",
      type: "actions",
    },
  ];
  const enquiryColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Status",
      uid: "status",
      type: "enquirystatus",
    },
    {
      name: "Actions",
      uid: "actions",
      type: "actions",
    },
  ];
  const HospitalColums = [
    { name: "Hospital Image", uid: "image", type: "image" },
    { name: "Hospital Name", uid: "name", type: "text" },
    { name: "Hospital Phone", uid: "phone", type: "text" },
    { name: "Hospital Email", uid: "email", type: "text" },
    { name: "City", uid: "city", type: "cityDropdown" },
    { name: "District", uid: "district", type: "districtDropdown" },
  ];
  const HospitalDescriptionColums = [
    { name: "Hospital Description", uid: "description", type: "textbox" },
    { name: "About", uid: "about", type: "textbox" },
    { name: "Avilable Days", uid: "availableDays", type: "array" },
    { name: "Modes of Payment", uid: "modesOfPayment", type: "text" },
    { name: "No Of Beds", uid: "noOfBeds", type: "number" },
    { name: "No Of Ambulances", uid: "noOfAmbulances", type: "number" },
  ];
  const docDepartmentColumns = [
    { name: "Doctor Name", uid: "name", type: "text" },
    { name: "Department Name", uid: "name", type: "text" },
    { name: "Doctor Email", uid: "email", type: "text" },
    { name: "Doctor Phone", uid: "phone", type: "text" },
    {
      name: "Actions",
      uid: "actions6",
      type: "actions6",
    },
  ];
  const list = useAsyncList<any>({
    async load() {
      let res = await getData(LocationRoutes.district, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const list2 = useAsyncList<any>({
    async load() {
      let res = await getData(LocationRoutes.city, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const DropDownData = {
    district: list,
    city: list2,
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 p-[1rem]">
          <Breadcrumbs color="secondary" className="text-xl font-bold">
            {breadCrumps.map((b: any, index: any) => {
              return (
                <BreadcrumbItem key={index} onClick={() => router.push(b.link)}>
                  {b.name}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumbs>

          <DataCard
            getapikey="gethospital"
            DropDownData={DropDownData}
            postimageapikey={HospitalRoutes.image}
            editApikey="edithospital"
            columns={HospitalColums}
            title={"Hospital Details"}
            editapi={HospitalRoutes.quick}
            getapi={HospitalRoutes.hospital}
            id={id}
            setIsEdit={setisEdit}
            onOpen={onOpen}
          />
          <DataCard
            getapikey="gethospitaldescription"
            editApikey="edithospitaldescription"
            columns={HospitalDescriptionColums}
            title={"Hospital Description"}
            editapi={HospitalRoutes.description}
            getapi={HospitalRoutes.hospital}
            id={id}
          />
          <DeleteModal
            onOpenChange={onOpenChange}
            title="Hospital"
            data={id}
            isOpen={isOpen}
            api={HospitalRoutes.hospital}
            queryKey={["Docotor"]}
          />
        </div>
        <Page
          needAddModal={false}
          api={HospitalRoutes.enquiry}
          apiKey="enquiryforHospital"
          columns={enquiryColumns}
          title={`Enquiries for Apollo Hospital`}
        />
        <Page
          needAddModal={false}
          api={HospitalRoutes.appointment}
          apiKey="appointments"
          columns={appointmentColumns}
          title="Appointment for Apollo Hospital"
        />
        <Page
          api={HospitalRoutes.department}
          apiKey="doctor-department"
          columns={docDepartmentColumns}
          title="Docotor in Departments for Apollo Hospital"
        />
      </div>
    </>
  );
}
