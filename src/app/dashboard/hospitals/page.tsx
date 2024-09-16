"use client";
import Title, { SubTitle } from "@/components/titles";
import React from "react";
import Page from "@/components/Page/PageAll";
import { HospitalRoutes, LocationRoutes } from "@/core/apiRoutes";
import { useAsyncList } from "@react-stately/data";
import { getData } from "@/core/apiHandler";
import { useQuery } from "@tanstack/react-query";
import { Card, Tab, Tabs } from "@nextui-org/react";

const Hospitals = () => {
  const Hospitalcolumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    { name: "Phone", uid: "phone", type: "text" },
    { name: "District", uid: "district", type: "districtDropdown" },
    { name: "City", uid: "city", type: "cityDropdown" },
    { name: "Actions", uid: "action", type: "action" },
  ];
  const HospitalTableColums = [
    {
      name: "Name",
      uid: "name",
      type: "text",
    },
    {
      name: "Email",
      uid: "email",
      type: "text",
    },
    {
      name: "Status",
      uid: "status",
      type: "leadsStatus",
    },
    {
      name: "Actions",
      uid: "action",
      type: "action",
    },
  ];
  const appointmentColumns = [
    { name: "Doctor Name", uid: "doctorName", type: "text" },
    { name: "Patient Name", uid: "patientName", type: "text" },
    {
      name: "Status",
      uid: "appstatus",
      type: "appstatus",
    },
    { name: "Price(in Rs)", uid: "price", type: "text" },
    {
      name: "Appointment Time",
      uid: "doctorSlot",
      type: "doctorSlot",
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
  const enquiryColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phone", type: "text" },
    {
      name: "Status",
      uid: "enquiryStatus",
      type: "status",
    },
    {
      name: "Message",
      uid: "message",
      type: "textbox",
    },
    {
      name: "Action",
      uid: "action",
      type: "action",
    },
  ];
  const { data: status, isLoading } = useQuery({
    queryKey: ["getstatus"],
    queryFn: () => {
      return getData("/enquiry-status", {});
    },
  });
  return (
    <>
      <div className="flex flex-col w-full">
        <Title title={"Hopitals"} />
        <Page
          dropDownData={DropDownData}
          columns={Hospitalcolumns}
          api={HospitalRoutes.hospital}
          apiKey="hospital"
          title="Hospital Details"
        />
        <SubTitle title="All Hospital Enquiry" />
        <Tabs color="secondary" aria-label="Options">
          {status?.data.data.map((a: any, index: any) => {
            return (
              <Tab key={index} name={a.name} title={a.name}>
                <Card shadow="none">
                  <Page
                    api={`/enquiry/all/leads/?type=66a716539f1827dd38689208&status=${a?._id}`}
                    apiKey={`get-${a?.name}-hospital`}
                    columns={HospitalTableColums}
                    title={a.name}
                    needAddModal={false}
                  />
                </Card>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </>
  );
};

export default Hospitals;
