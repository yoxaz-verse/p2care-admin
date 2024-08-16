"use client";
import Title from "@/components/titles";
import React from "react";
import Page from "@/components/Page/PageAll";
import { DesignationRoutes, Doctor, GenderRoutes, HospitalRoutes } from "@/core/apiRoutes";
import { Button, DateInput, DatePicker, TimeInput, Switch, Tabs, Card, Tab } from "@nextui-org/react";
import DoctorComponent from "@/components/DoctorComponent";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/core/apiHandler";
import { useAsyncList } from "@react-stately/data";

const Doctors = () => {
  const appointmentColumns = [
    { name: "Doctor Name", uid: "doctorName", type: "text" },
    { name: "Patient Name", uid: "patientName", type: "text" },
    {
      name: "Status",
      uid: "appstatus",
      type: "appstatus"
    },
    { name: "Price(in Rs)", uid: "price", type: "text" },
    {
      name: "Appointment Time", uid: "doctorSlot", type: "doctorSlot"
    },
  ];

  const enquiryColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phone", type: "text" },
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
  const { data: status, isLoading } = useQuery({
    queryKey: ["getstatus"],
    queryFn: () => {
      return getData("/enquiry-status", {});
    },
  });

  return (
    <>
      <div className="flex flex-col w-full p-[1rem] gap-4">
        <Title title={"Doctors"} />
        <DoctorComponent DesignationData={list} DepartmentData={list1} GenderData={genderList} />
        <Tabs color="secondary" aria-label="Options">
          {status?.data.data.map((a: any, index: any) => {
            return <Tab key={index} name={a.name} title={a.name}>
              <Card shadow="none">
                <Page
                  api={`/enquiry/all/leads/?type=66a716539f1827dd38689205&status=${a?._id}`}
                  apiKey={`get-${a?.name}-doctors`}
                  columns={enquiryColumns}
                  title={a.name}
                  needAddModal={false} />
              </Card>
            </Tab>
          })}
        </Tabs>
        <Page
          needAddModal={false}
          api={Doctor.appointments}
          apiKey="appointments"
          columns={appointmentColumns}
          title="Appointment" />
      </div>
    </>
  );
};

export default Doctors;
