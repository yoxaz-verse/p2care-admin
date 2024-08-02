"use client";
import Title from "@/components/titles";
import React from "react";
import Page from "@/components/Page/PageAll";
import { HospitalRoutes, LocationRoutes } from "@/core/apiRoutes";
import { useAsyncList } from "@react-stately/data";
import { getData } from "@/core/apiHandler";


const Hospitals = () => {
  const Hospitalcolumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    { name: "Phone", uid: "phone", type: "text" },
    { name: "City", uid: "city", type: "cityDropdown" },
    { name: "District", uid: "district", type: "districtDropdown" },
    { name: "Actions", uid: "action", type: "action" }
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
  const list = useAsyncList<any>({
    async load() {
      let res = await getData(LocationRoutes.district, {});
      let json = await res.data.data.data;

      return {
        items: json
      };
    },
  });
  const list2 = useAsyncList<any>({
    async load() {
      let res = await getData(LocationRoutes.city, {});
      let json = await res.data.data.data;

      return {
        items: json
      };
    },
  });
  const DropDownData = {
    district: list,
    city: list2
  };
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
        <Page dropDownData={DropDownData} columns={Hospitalcolumns} api={HospitalRoutes.hospital} apiKey="hospital" title="Hospital Details" />
        <Page needAddModal={false} api={HospitalRoutes.enquiry} apiKey="enquiryforHospital" columns={enquiryColumns} title={`Enquiries for All Hospitals`} />
        <Page needAddModal={false} api={HospitalRoutes.appointment} apiKey="appointments" columns={appointmentColumns} title="Appointment for All Hospitals" />
      </div>
    </>
  );
};

export default Hospitals;
