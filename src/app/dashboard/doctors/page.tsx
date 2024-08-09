"use client";
import { generateTabColumns } from "@/content/table-columns";
import generateData from "@/content/tableData";
import Title from "@/components/titles";
import { generateTable } from "@/utilis/content";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import Page from "@/components/Page/PageAll";
import { DesignationRoutes, Doctor, GenderRoutes } from "@/core/apiRoutes";
import { Button, DateInput, DatePicker, TimeInput, Switch } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import DoctorComponent from "@/components/DoctorComponent";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/core/apiHandler";
import { useAsyncList } from "@react-stately/data";

const Doctors = () => {
  const appointmentColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Appointment Time", uid: "appointment", type: "appointmentTime"
    },
    {
      name: "Actions", uid: "action", type: "action"
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
      name: "Actions", uid: "action", type: "action"
    }
  ]
  const list = useAsyncList<any>({
    async load() {
      let res = await getData(DesignationRoutes.desgination, {});
      let json = await res.data.data.data;

      return {
        items: json
      };
    },
  });
  const genderList = useAsyncList<any>({
    async load() {
      let res = await getData(GenderRoutes.gender, {});
      let json = await res.data.data.data;

      return {
        items: json
      };
    },
  });
  const list1 = useAsyncList<any>({
    async load() {
      let res = await getData(Doctor.department, {});
      let json = await res.data.data.data;

      return {
        items: json
      };
    },
  });
  return (
    <>
      <div className="flex flex-col w-full p-[1rem] gap-4">
        <Title title={"Doctors"} />
        <DoctorComponent DesignationData={list} DepartmentData={list1} GenderData={genderList} />
        <Page needAddModal={false} api={Doctor.enquiry} apiKey="enquiryByHospital" columns={enquiryColumns} title="Enquiry" />
        <Page needAddModal={false} api={Doctor.appointments} apiKey="appointments" columns={appointmentColumns} title="Appointment" />
      </div>
    </>
  );
};

export default Doctors;
