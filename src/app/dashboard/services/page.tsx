"use client";
import { useState } from 'react';
import { generateTabColumns } from '@/app/content/table-columns'
import generateData from '@/app/content/tableData'
import Title from '@/components/titles'
import { generateTable } from '@/utilis/content'
import React from 'react'

const Services = () => {
  const [page, setPage] = useState<any>(1);
  const [data, setData] = useState<any>();
  const handlePageChange = (page: number) => {
    setPage(page + 1);
  }
  const handleView = () => {

  }
  return (

    <div className='flex flex-col w-full gap-4'>
      <Title title={"Services"} />
      {generateTable({
        columns: generateTabColumns({ onView: () => handleView(), setData: setData, type: "Status 1", tableName: "Services" }),
        isSuccess: true,
        currentPage: page,
        onPageChange: (currentPage: any) => handlePageChange(currentPage),
        tableData: generateData({ tableName: "Services" }),
        isLoading: false,
        totalItems: generateData({ tableName: "Services" }).length,
        isError: false
      })}
    </div>

  )
}

export default Services
