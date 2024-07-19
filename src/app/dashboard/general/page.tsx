"use client";
import { generateTabColumns } from '@/app/content/table-columns';
import generateData from '@/app/content/tableData';
import Title from '@/components/titles'
import { generateTable } from '@/utilis/content'
import React, { useState } from 'react'

const General = () => {
  const [page, setPage] = useState<any>(1);
  const [data, setData] = useState<any>();
  const handleView = () => {

  }
  const handlePageChange = (page: number) => {
    setPage(page + 1);
  }
  return (
    <>
      <div className='w-full flex flex-col'>
        <Title title='General' />
        {
          generateTable({
            columns: generateTabColumns({ onView: () => handleView(), setData: setData, type: "Status 1", tableName: "Doctors" }),
            isSuccess: true,
            currentPage: page,
            onPageChange: (currentPage: any) => handlePageChange(currentPage),
            tableData: generateData({ tableName: "Doctors" }),
            isLoading: false,
            totalItems: generateData({ tableName: "Doctors" }).length,
            isError: false
          })
        }
      </div>
    </>
  )
}

export default General
