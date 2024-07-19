"use client";
import { useState } from "react";
import { generateTabColumns } from "@/app/content/table-columns";
import Title from "@/components/titles";
import { generateTable } from "@/utilis/content";
import generateData from "@/app/content/tableData";

export default function HospitalDetail() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any>();
  const handlePageChange = (page: number) => {
    setPage(page + 1);
  }
  const handleView = () => {

  }
  return (
    <>
      <Title title="HospitalDetail" />
      <h1 className='text-[15px] font-bold md:text-[30px]'>Consulations</h1>
      {generateTable({
        columns: generateTabColumns({ onView: () => handleView(), setData: setData, type: "Status 1", tableName: "Doctors" }),
        isSuccess: true,
        currentPage: page,
        onPageChange: (currentPage: any) => handlePageChange(currentPage),
        tableData: generateData({ tableName: "Doctors" }),
        isLoading: false,
        totalItems: generateData({ tableName: "Doctors" }).length,
        isError: false
      })}
    </>
  )
}
