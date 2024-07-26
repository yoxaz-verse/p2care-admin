"use client";
import { generateTabColumns } from "@/content/table-columns";
import generateData from "@/content/tableData";
import Title from "@/components/titles";
import { generateTable } from "@/utilis/content";
import React, { useState } from "react";
import Page from "@/components/Page/PageAll";
import { AdminRoutes, Doctor, userRoutes } from "@/core/apiRoutes";

const Users = () => {

  const userColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Actions", uid: "actions", type: "actions" }
  ]
  const adminColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    { name: "Password", uid: "password", type: "password" },
    { name: "Actions", uid: "actions", type: "actions" }
  ]
  const appointmentColumns = [
    { name: "Doctor Name", uid: "name", type: "text" },
    { name: "User Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Appointment Time", uid: "appointment", type: "appointmentTime"
    },
    {
      name: "Actions", uid: "actions4", type: "actions4"
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
      name: "Actions", uid: "actions4", type: "actions4"
    }
  ]
  return (
    <div className="w-full flex flex-col">
      <Title title="Users" />
      <Page api={AdminRoutes.admin} apiKey={"admin"} columns={adminColumns} title="Admin" />
      <Page api={userRoutes.user} apiKey={"users"} columns={userColumns} title="Patient" />
      <Page needAddModal={false} api={Doctor.appointments} apiKey="appointments" columns={appointmentColumns} title="Appointment" />
      <Page needAddModal={false} api={Doctor.enquiry} apiKey="enquiries" columns={enquiryColumns} title="Enquiries" />
    </div>
  );
};

export default Users;
