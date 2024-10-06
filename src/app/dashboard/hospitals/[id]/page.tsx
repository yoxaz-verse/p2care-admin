"use client";
import { Fragment, useState } from "react";
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
  Chip,
  Input,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import DeleteModal from "@/components/Modals/DeleteModal";
import { Doctor, HospitalRoutes, LocationRoutes } from "@/core/apiRoutes";
import Page from "@/components/Page/PageAll";
import AttachCard from "@/components/AttachCard";
import DataCard from "@/components/Cards/DataCard";
import { getData, patchData } from "@/core/apiHandler";
import { useAsyncList } from "@react-stately/data";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryAdmin } from "@/app/providers";

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
    { name: "Hospital Images", uid: "images", type: "images" },
  ];
  const HospitalAddressColums = [
    { name: "Address", uid: "address", type: "text" },
    { name: "PinCode", uid: "pincode", type: "text" },
    { name: "Location Url", uid: "locationUrl", type: "text" },
  ];
  const HospitalDescriptionColums = [
    { name: "Hospital Description", uid: "description", type: "textbox" },
    { name: "About", uid: "about", type: "textbox" },
    { name: "VistingTime", uid: "vistingTime", type: "vistingTime" },
    { name: "Avilable Days", uid: "availableDays", type: "array" },
    { name: "Modes of Payment", uid: "modesOfPayment", type: "array2" },
    { name: "No Of Beds", uid: "noOfBeds", type: "number" },
    { name: "No Of Ambulances", uid: "noOfAmbulances", type: "number" },
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
      return patchData(`/hospital/top/${id}`, data, {});
    },
    onSuccess: () => {
      toast.success("Hospital is marked as top", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: ["gethospital", id] });
    },
    onError: () => {
      toast.success("Hospital is marked as top failed", {
        position: "top-right",
        className: "bg-red-300",
      });
    },
  });
  const {
    data: getHospital,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["gethospital", id],
    queryFn: async () => {
      return await getData(`${HospitalRoutes.hospital}/${id}`, {});
    },
  });

  const handleChangeTop = (e: any) => {
    e.preventDefault();
    const item = {
      isTop: !getHospital?.data.data.isMain,
    };
    console.log(item);
    markAsTop.mutate(item);
  };
  const doctorList = useAsyncList<any>({
    async load() {
      let res = await getData(Doctor.docotor, {});
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
  const editService = useMutation({
    mutationKey: ["hospital"],
    mutationFn: (data: any) => {
      return patchData(
        `${HospitalRoutes.hospital}/publish/test/${id}`,
        data,
        {}
      );
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.success("Hospital Published!", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: ["gethospital", id] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  const handlePublish = () => {
    const item = {
      isPublished: !getHospital?.data.data.isPublished,
    };
    editService.mutate(item);
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
          <div className="flex flex-row justify-between w-full itms-center">
            <Title title="Hospital Detail" />
            <div className="flex flex-row items-center gap-2">
              {getHospital?.data.data && (
                <>
                  <Switch
                    size="lg"
                    color="success"
                    onClick={() => handlePublish()}
                    defaultSelected={getHospital?.data.data?.isPublished}
                    aria-label="Automatic updates"
                    className="text-md"
                  >
                    Publish
                  </Switch>
                  <Switch
                    size="lg"
                    color="success"
                    onClick={(e) => handleChangeTop(e)}
                    defaultSelected={getHospital?.data.data?.isMain}
                    aria-label="Automatic updates"
                    className="text-xl"
                  >
                    Mark the Hospital as Top
                  </Switch>
                </>
              )}
              <Button radius="full" onClick={() => onOpen()} color="danger">
                Delete
              </Button>
            </div>
          </div>
          <DataCard
            getapikey="gethospital"
            DropDownData={DropDownData}
            postimageapikey={HospitalRoutes.image}
            postimagesapikey={HospitalRoutes.images}
            editApikey="edithospital"
            columns={HospitalColums}
            title={"Hospital Details"}
            editapi={HospitalRoutes.quick}
            getapi={HospitalRoutes.hospital}
            id={id}
            onOpen={onOpen}
          />

          <DataCard
            getapikey="gethospital"
            editApikey="edithospitaldescription"
            columns={HospitalDescriptionColums}
            isDelete={false}
            title={"Hospital Description"}
            editapi={HospitalRoutes.description}
            getapi={HospitalRoutes.hospital}
            id={id}
          />
          <DataCard
            getapikey="gethospital"
            editApikey="edithospitaladdress"
            columns={HospitalAddressColums}
            isDelete={false}
            title={"Hospital Address"}
            editapi={HospitalRoutes.address}
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
          api={`${HospitalRoutes.enquiry}/individual/${id}`}
          apiKey="enquiryforHospital"
          columns={enquiryColumns}
          title={`Enquiries`}
        />

        <AttachCard
          id={id}
          getapi={HospitalRoutes.getdoctor}
          api={HospitalRoutes.adddoctor}
          title="Add Doctor"
          DropDown={doctorList}
        />
        <AttachCard
          id={id}
          getapi={HospitalRoutes.department}
          api={HospitalRoutes.department}
          title="Add Department"
          DropDown={departmentList}
        />
      </div>
    </>
  );
}
