"use client";
import Title from "@/components/titles";
import React from "react";
import Page from "@/components/Page/PageAll";
import { HospitalRoutes } from "@/core/apiRoutes";

const Hospitals = () => {
  const Hospitalcolumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
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
      <div className="flex flex-col w-full">
        <Title title={"Hopitals"} />
        <Page columns={Hospitalcolumns} api={HospitalRoutes.hospital} apiKey="hospital" title="Hospital Details" />
        <Page needAddModal={false} api={HospitalRoutes.enquiry} apiKey="enquiryforHospital" columns={enquiryColumns} title={`Enquiries for All Hospitals`} />
        <Page needAddModal={false} api={HospitalRoutes.appointment} apiKey="appointments" columns={appointmentColumns} title="Appointment for All Hospitals" />
      </div>
    </>
  );
};

export default Hospitals;
