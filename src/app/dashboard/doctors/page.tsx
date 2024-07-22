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
    { name: "Phone", uid: "code", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Department", uid: "department", type: "departmentDropdown"
    },
    { name: "Designation", uid: "Designation", type: "desginationDropDown" }
  ]
  return (
    <>
      <div className="flex flex-col w-full p-[1rem] gap-4">
        <Title title={"Doctors"} />
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
        })}
        <Page api={Doctor.docotor} apiKey="doctor" columns={docColumns} title="Doctors" />
      </div>
    </>
  );
};

export default Doctors;
