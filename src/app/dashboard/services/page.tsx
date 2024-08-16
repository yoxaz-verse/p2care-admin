"use client";
import { useState } from "react";
import Title, { SubTitle } from "@/components/titles";
import React from "react";
import Page from "@/components/Page/PageAll";
import { Doctor, serviceRoutes } from "@/core/apiRoutes";
import { Card, Tab, Tabs } from "@nextui-org/react";
import { getData } from "@/core/apiHandler";
import { useQuery } from "@tanstack/react-query";

const Services = () => {
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
  const servicesArr = [
    { name: "Title", uid: "title", type: "text" },
    { name: "Description", uid: "description", type: "text" },
    {
      name: "Actions", uid: "action", type: "action"
    }

  ]
  const HospitalTableColums = [
    {
      name: "Name",
      uid: "name",
      type: "text"
    },
    {
      name: "Email",
      uid: "email",
      type: "text"
    },
    {
      name: "Status",
      uid: "status",
      type: "leadsStatus"
    },
    {
      name: "Actions",
      uid: "action",
      type: "action"
    },
  ];
  const { data: status, isLoading } = useQuery({
    queryKey: ["getstatus"],
    queryFn: () => {
      return getData("/enquiry-status", {});
    },
  });
  return (
    <div className="flex flex-col w-full gap-4">
      <Title title={"Services"} />
      <Page
        api={serviceRoutes.service}

        apiKey="services"
        title="Services"
        columns={servicesArr}
        needAddModal={true} />
      <SubTitle title="Services" />
      <Tabs color="secondary" aria-label="Options">
        {status?.data.data.map((a: any, index: any) => {
          return <Tab key={index} name={a.name} title={a.name}>
            <Card shadow="none">
              <Page
                api={`/enquiry/all/leads/?type=66a716539f1827dd38689202&status=${a?._id}`}
                apiKey={`get-${a?.name}-services`}
                columns={HospitalTableColums}
                title={a.name}
                needAddModal={false} />
            </Card>
          </Tab>
        })}
      </Tabs>

    </div>
  );
};

export default Services;
