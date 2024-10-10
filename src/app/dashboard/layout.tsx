"use client";
import { Avatar } from "@nextui-org/react";
import { adminLogo, profilelogo } from "../../content/assets";
import Image from "next/image";
import SideBar from "@/components/Sidebar";
import { IoIosMenu } from "react-icons/io";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { FaBell } from "react-icons/fa";
import { languange } from "@/utilis/content";
import { useState } from "react";

function NavBar(props: { view: boolean; setView: any }) {
  return (
    <div className="flex flex-row px-4 fixed bg-[#F5F6FA] z-50 h-[70px] w-full justify-between  items-center">
      <IoIosMenu
        onClick={() => props.setView(!props.view)}
        className="cursor-pointer"
        size={40}
      />{" "}
      <Image src={adminLogo} width={100} height={65} alt="adminLogo" />
      <div className="flex flex-row w-full md:w-1/3 justify-start gap-3">
        <Input
          placeholder="Search"
          variant="bordered"
          className="border-none"
        />
      </div>
      <div className="hidden md:flex flex-row items-center gap-2">
        <FaBell fill="#3D42DF" size={30} />
        {/* <Select
          placeholder="Select the languange"
          defaultSelectedKeys={["english"]}
          className="w-[150px] bg-white rounded-none"
        >
          {languange.map((animal: any) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select> */}
        <Avatar name="Admin" src={profilelogo} />
        <div className="flex flex-col justify-center items-center">
          {/* <h3 className="text-[14px]">Admin</h3> */}
          {/* <p className="text-[12px]">Admin</p> */}
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [view, setView] = useState(false);
  return (
    <>
      <NavBar view={view} setView={setView}></NavBar>
      <div className="flex  bg-[#F5F6FA] min-h-[100vh] pt-[50px] flex-row gap-4">
        <SideBar view={view} setView={setView} />
        {children}
      </div>
    </>
  );
}
