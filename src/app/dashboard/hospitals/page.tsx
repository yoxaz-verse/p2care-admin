"use client";
import CommonTable from '@/components/CommonTable'
import Title from '@/components/titles'
import { Avatar, Button, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { months } from '@/utilis/content'
import { useState, useEffect } from "react";
import { DetailsData, HospitalData, HospitalType } from '@/app/content/tableData';
import AddModal from '@/components/Modals/AddModal';
import { FaEye } from 'react-icons/fa';
import { IoTrashBin } from 'react-icons/io5';
import DeleteModal from '@/components/Modals/DeleteModal';
import ViewModal from '@/components/Modals/ViewModal';

const Hospitals = () => {
  const [page, setPage] = useState<any>(1);
  const handlePagination = (page: number) => {
    setPage(page + 1);
  }
  const [data, setData] = useState<any>({});
  const Hospitalcolumns: any = [
    {
      key: "Hospital Name",
      label: "Hospital Name",
      logic: (item: any) => {
        return (
          <div className="flex flex-row items-center text-tableContent gap-2">
            <Avatar src={item.image[0].src} />
            <h3>{item.name}</h3>
          </div>
        );
      }
    },
    {
      key: "Location",
      label: "Location",
      logic: (item: any) => {
        return (
          <h3 className="text-tableContent">{item.Location}</h3>
        );
      }
    },
    {
      key: "Amount",
      label: "Amount",
      logic: (item: any) => {
        return (
          <h3 className="text-tableContent">₹{item.amount}</h3>
        );
      }
    },
    {
      key: "No of doctors",
      type: "number",
      label: "No of Doctors",
      logic: (item: any) => {
        console.log(item);
        return (
          <h3 className="text-tableContent">{item.NoofDocs}</h3>
        )
      }
    },
    {
      key: "No of Speciality",
      type: "number",
      label: "No of Speciality",
      logic: (item: any) => {
        console.log(item);
        return (
          <h3 className="text-tableContent">{item.NoofSepciality}</h3>
        )
      }
    },
    {
      key: "Actions",
      label: "Actions",
      logic: (item: any) => {
        return (<div className="flex flex-row gap-3">
          {item.actions[0] === "View" && (
            <Button isIconOnly onPress={() => {
              onOpen();
              setData(item);
            }} className='bg-inherit shadow-xl' radius="full">
              <FaEye />
            </Button>
          )}
          {item.actions[1] === "Delete" && (
            <Button isIconOnly onPress={onOpenView} className='bg-inherit shadow-xl' radius="full">
              <IoTrashBin className='fill-red-500' />
            </Button>
          )}
        </div>
        );
      }
    }
  ]


  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenView, onOpen: onOpenView, onOpenChange: onOpenChangeView } = useDisclosure();
  return (
    <>
      <div className='flex flex-col w-full'>
        <Title title={"Hopitals"} />
        <div className="bg-white rounded-xl">
          <div className="flex flex-row w-full justify-between p-[1rem]">
            <h3 className="text-[24px] font-semibold">Hospitals Details</h3>
            <div className='flex w-1/2 self-end  flex-row gap-2'>
              <AddModal title='Hospital' />
              <Select
                variant="bordered"
                defaultSelectedKeys={["january"]}
                className="max-w-xs rounded-none"
              >
                {months.map((animal: any) => (
                  <SelectItem key={animal.key} value={animal.key}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <CommonTable
            columns={Hospitalcolumns}
            totalItems={HospitalData.length}
            currentPage={page}
            tableData={HospitalData}
            isLoading={false}
            isSuccess={true}
            isError={false}
            onPageChange={(page) => handlePagination(page)}
          />
        </div>
      </div>
      <ViewModal onOpenChange={onOpenChange} isOpen={isOpen} title='Hospital' keys={HospitalType} data={data} />
      <DeleteModal onOpenChange={onOpenChangeView} isOpen={isOpenView} title='Hospital' />
    </>
  )
}

export default Hospitals
