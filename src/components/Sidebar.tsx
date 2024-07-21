"use client";
import { SideBarLink, SideBarLinkProps } from "@/utilis/content";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import LogoutModal from "./Modals/Logout";
import { motion } from "framer-motion";

interface ViewProps {
  view: boolean;
  setView: Dispatch<SetStateAction<boolean>>;
}

export default function SideBar({ view, setView }: ViewProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <motion.div
        animate={{ width: view ? 0 : 300 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        exit={{
          width: 0,
          transition: { delay: 4, duration: 5 },
        }}
        className={` relative  bg-white z-50 flex flex-col h-[80vh] justify-around rounded-lg shadow-md `}
      >
        <div className="flex flex-col gap-4 w-full ">
          {SideBarLink.map((s: SideBarLinkProps) => {
            return (
              <>
                <Link href={s.link} key={s.name}>
                  <motion.div
                    animate={
                      !view
                        ? { opacity: 1, display: "block" }
                        : {
                            opacity: 0,
                            transitionEnd: {
                              display: "none",
                            },
                          }
                    }
                    transition={{ duration: 0.2 }}
                    className={`${
                      s.link !== s.link
                        ? "bg-[#4880FF] text-white p-4  rounded-lg  font-bold h-[50px]"
                        : "h-[30px]"
                    } mx-2  text-lg text-center hover:cursor-pointer`}
                  >
                    {s.name}
                  </motion.div>
                </Link>
              </>
            );
          })}
        </div>
      </motion.div>
      <LogoutModal onOpenChange={onOpenChange} isOpen={isOpen} />
    </>
  );
}
