"use client";
import CountCard, { CountCardProps } from "@/components/Cards/Count-Card";
import GraphCard from "@/components/Cards/Graphcard";
import CommonTable from "@/components/CommonTable";
import { CountCardsList, months } from "@/utilis/content";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { tablecolums } from "../content/table-columns";
import { DetailsData } from "../content/tableData";

export default function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const handlePagination = (page: number) => {
    setPage(page + 1);
  }

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <h3 className="font-extrabold text-[20px] md:text-[44px]">Dashboard</h3>
        <div className="grid  grid-cols-2 md:grid-cols-4 gap-2 xl:grid-cols-5">
          {CountCardsList.map((c: CountCardProps, index: number) => (
            <CountCard key={index} count={c.count} title={c.title} icon={c.icon} />
          ))}
        </div>
        <GraphCard />

        <div className="bg-white rounded-xl">
          <div className="flex w-full flex-row justify-between p-[1rem]">
            <h3 className="text-[24px] font-semibold">Deals Details</h3>
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
          <CommonTable
            columns={tablecolums["Deals"]}
            totalItems={DetailsData.length}
            currentPage={page}
            tableData={DetailsData}
            isLoading={false}
            isSuccess={true}
            isError={false}
            onPageChange={(page) => handlePagination(page)}
          />
        </div>
      </div>
    </>
  )
}
