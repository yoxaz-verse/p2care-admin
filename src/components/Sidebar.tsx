"use client";
import { SideBarLink, SideBarLinkProps } from "@/utilis/content";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { SetStateAction, useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import LogoutModal from "./Modals/Logout";

interface ViewProps {
  view: boolean
}

export default function SideBar({ view }: ViewProps) {
  const router = useRouter();
  const [name, setName] = useState("Dashboard");
  const handleChange = (s: SideBarLinkProps) => {
    setName(s.name);
    router.push(s.link);
  }
  useEffect(() => {
    if (window.location.href.split('/').length !== 4) {
      const side = window.location.href.split('/')[4];
      setName(side.charAt(0).toUpperCase() + side.slice(1));
    } else {
      setName('Dashboard');
    }
  }, [name]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className={`w-1/8 ${view ? "block" : "hidden"} md:block bg-white flex flex-col h-[80vh] justify-around rounded-lg shadow-md px-4 gap-4`}>
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          {SideBarLink.map((s: SideBarLinkProps) => {
            return (
              <>
                <h3 onClick={() => handleChange(s)} className={`${name === s.name ? "bg-[#4880FF] text-white p-4  rounded-lg  font-bold h-[50px]" : "h-[25px]"} w-[240px] text-lg text-center hover:cursor-pointer`}>{s.name}</h3>
              </>
            )
          })}
        </div>

        <div className="flex flex-col h-1/2 items-center justify-center gap-4 w-full">
          <Divider orientation="horizontal" />
          <Button className="flex bg-inherit flex-row cursor-pointer gap-2 text-xl items-center">
            <IoIosSettings size={20} />
            <p>Settings</p>
          </Button>
          <Button onPress={onOpen} className="flex flex-row bg-inherit cursor-pointer gap-2 text-xl items-center">
            <FaPowerOff size={20} />
            <p>Logout</p>
          </Button>
        </div>
      </div >
      <LogoutModal onOpenChange={onOpenChange} isOpen={isOpen} />
    </>
  )
}
