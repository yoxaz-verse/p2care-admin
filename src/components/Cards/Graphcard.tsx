"use client";
import { months } from "@/utilis/content";
import { Select, SelectItem } from "@nextui-org/react";

export default function GraphCard() {
  return (
    <>
      <div className="bg-white rounded-xl">
        <div className="flex flex-row p-5 justify-between">
          <h3 className="text-[24px] font-semibold">Sales Details</h3>
          <Select
            selectedKeys={["january"]}
            className="max-w-xs"
          >
            {months.map((animal: any) => (
              <SelectItem key={animal.key}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div >
    </>
  )
}
