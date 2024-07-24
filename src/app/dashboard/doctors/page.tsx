"use client";
import { generateTabColumns } from "@/content/table-columns";
import generateData from "@/content/tableData";
import Title from "@/components/titles";
import { generateTable } from "@/utilis/content";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import Page from "@/components/Page/PageAll";
import { Doctor } from "@/core/apiRoutes";
import { Button, DateInput, DatePicker, TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";

const Doctors = () => {
  const [page, setPage] = useState<number>(1);
  const handlePageChange = (page: number) => {
    setPage(page + 1);
  };
  const router = useRouter();
  const handleView = () => {
    router.push("/dashboard/doctors/1");
  };
  const [data, setData] = useState<any>();

  const docColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Department", uid: "department", type: "departmentDropdown"
    },
    { name: "Designation", uid: "Designation", type: "desginationDropDown" },
    { name: "Actions", uid: "actions", type: "actions" }
  ]
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
  return (
    <>
      <div className="flex flex-col w-full p-[1rem] gap-4">
        <Title title={"Doctors"} />
        {/*
        <h1 className="text-[15px] font-bold md:text-[30px]">Consulations</h1>
        {generateTable({
          columns: generateTabColumns({
            onView: () => handleView(),
            setData: setData,
            type: "Status 1",
            tableName: "Consulation",
          }),
          isSuccess: true,
          currentPage: page,
          onPageChange: (currentPage: any) => handlePageChange(currentPage),
          tableData: generateData({ tableName: "Consulation" }),
          isLoading: false,
          totalItems: generateData({ tableName: "Consulation" }).length,
          isError: false,
        })}
        <h1 className="text-[15px] font-bold md:text-[30px]">Enquiries</h1>
        {generateTable({
          columns: generateTabColumns({
            onView: () => handleView(),
            setData: setData,
            type: "Status 1",
            tableName: "Doctors",
          }),
          isSuccess: true,
          currentPage: page,
          onPageChange: (currentPage: any) => handlePageChange(currentPage),
          tableData: generateData({ tableName: "Doctors" }),
          isLoading: false,
          totalItems: generateData({ tableName: "Doctors" }).length,
          isError: false,
        })}
        <h1 className="text-[15px] font-bold md:text-[30px]">Doctor List</h1>
        {generateTable({
          columns: generateTabColumns({
            onView: () => handleView(),
            setData: setData,
            type: "Status 1",
            tableName: "Doctors",
          }),
          isSuccess: true,
          currentPage: page,
          onPageChange: (currentPage: any) => handlePageChange(currentPage),
          tableData: generateData({ tableName: "Doctors" }),
          isLoading: false,
          totalItems: generateData({ tableName: "Doctors" }).length,
          isError: false,
        })} */}
        <Page api={Doctor.docotor} apiKey="doctor" columns={docColumns} title="Doctor" />
        <Page api={Doctor.enquiry} apiKey="enquiryByHospital" columns={enquiryColumns} title="Enquiry" />
        <Page api={Doctor.appointments} apiKey="appointments" columns={appointmentColumns} title="Appointment" />
      </div>
    </>
  );
};

export default Doctors;
