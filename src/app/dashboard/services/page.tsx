"use client";
import { useState } from "react";
import { generateTabColumns } from "@/content/table-columns";
import generateData from "@/content/tableData";
import Title from "@/components/titles";
import { generateTable } from "@/utilis/content";
import React from "react";
import Page from "@/components/Page/PageAll";
import { Doctor } from "@/core/apiRoutes";

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
      name: "Actions", uid: "actions", type: "actions"
    }
  ]
  return (
    <div className="flex flex-col w-full gap-4">
      <Title title={"Services"} />
      {generateTable({
        columns: generateTabColumns({
          onView: () => handleView(),
          setData: setData,
          type: "Status 1",
          tableName: "Services",
        }),
        isSuccess: true,
        currentPage: page,
        onPageChange: (currentPage: any) => handlePageChange(currentPage),
        tableData: generateData({ tableName: "Services" }),
        isLoading: false,
        totalItems: generateData({ tableName: "Services" }).length,
        isError: false,
      })}
      <Page needAddModal={false} api={Doctor.enquiry} apiKey="enquiryByHospital" columns={enquiryColumns} title="Enquiry" />

    </div>
  );
};

export default Services;
