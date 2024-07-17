"use client";
import { SideBarLink, SideBarLinkProps } from "@/utilis/content";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";

export default function SideBar() {
  const router = useRouter();
  const [name, setName] = useState("Dashboard");
  const handleChange = (s: SideBarLinkProps) => {
    setName(s.name);
    router.push(s.link);
  }
  return (
    <>
      <div className="w-1/8 bg-white flex flex-col h-[80vh] justify-between px-4 gap-4">
        <div className="flex flex-col gap-2 w-full items-center justify-center">
          {SideBarLink.map((s: SideBarLinkProps) => {
            return (
              <>
                <h3 onClick={() => handleChange(s)} className={`${name === s.name ? "bg-[#4880FF] text-white p-4 self-center rounded-xl  font-bold h-[50px]" : "h-[25px]"} w-[240px] text-lg hover:cursor-pointer`}>{s.name}</h3>
              </>
            )
          })}
        </div>
        <div className="flex flex-col w-full">
          <h3 className="flex flex-row gap-2 text-xl items-center">
            <IoIosSettings />
            <p>Settings</p>
          </h3>
          <h3 className="flex flex-row gap-2 text-xl items-center">
            <FaPowerOff />
            <p>Logout</p>
          </h3>
        </div>
      </div >
    </>
  )
}
