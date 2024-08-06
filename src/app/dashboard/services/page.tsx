"use client";
import { useState } from "react";
import { generateTabColumns } from "@/content/table-columns";
import generateData from "@/content/tableData";
import Title from "@/components/titles";
import { generateTable } from "@/utilis/content";
import React from "react";
import Page from "@/components/Page/PageAll";
import { Doctor, serviceRoutes } from "@/core/apiRoutes";

const Services = () => {
  const [page, setPage] = useState<any>(1);
  const [data, setData] = useState<any>();
  const handlePageChange = (page: number) => {
    setPage(page + 1);
  };
  const handleView = () => { };
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
  return (
    <div className="flex flex-col w-full gap-4">
      <Title title={"Services"} />
      <Page
        api={serviceRoutes.service}

        apiKey="services"
        title="Services"
        columns={servicesArr}
        needAddModal={true} />
      <Page needAddModal={false} api={Doctor.enquiry}
        apiKey="enquiryByHospital" columns={enquiryColumns} title="Enquiry" />

    </div>
  );
};

export default Services;
