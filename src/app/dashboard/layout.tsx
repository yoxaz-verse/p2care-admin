"use client";
import { Avatar } from "@nextui-org/react";
import { adminLogo, profilelogo } from "../content/assets";
import Image from "next/image";
import SideBar from "@/components/Sidebar";
import { IoIosMenu } from "react-icons/io";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { FaBell } from "react-icons/fa";
import { languange } from "@/utilis/content";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-row px-4  h-[70px] w-full justify-between  items-center">
        <Image src={adminLogo} width={100} height={65} alt="adminLogo" />
        <div className="flex flex-row w-1/3 items-center gap-3">
          <IoIosMenu size={40} />
          <Input placeholder="Search" variant="bordered" className="border-none" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <FaBell fill="#3D42DF" size={30} />
          <Select
            placeholder="Select the languange"
            selectedKeys={["english"]}
            className="w-[150px] bg-white rounded-none"
          >
            {languange.map((animal: any) => (
              <SelectItem key={animal.key}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Avatar name="Admin" src={profilelogo} />
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-[14px]">Admin</h3>
            <p className="text-[12px]">Admin</p>
          </div>
        </div>
      </div>
      <div className="flex bg-[#F5F6FA] h-full flex-row gap-4">
        <SideBar />
        {children}
      </div>
    </>
  );
}

