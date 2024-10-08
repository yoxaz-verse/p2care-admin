"use client";
import { SideBarLink, SideBarLinkProps } from "@/utilis/content";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { Button, Divider, Spacer, useDisclosure } from "@nextui-org/react";
import LogoutModal from "./Modals/Logout";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface ViewProps {
  view: boolean;
  setView: Dispatch<SetStateAction<boolean>>;
}
export default function SideBar({ view, setView }: ViewProps) {
  const pathname = usePathname();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <motion.div
        animate={{ width: view ? 0 : 300 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={` w-[24%]  h-[100%] mt-[75px] pt-5  bg-white z-50 flex flex-col  justify-between rounded-lg shadow-md `}
      >
        <div className="flex flex-col gap-4 w-full">
          {SideBarLink.map((s: SideBarLinkProps) => {
            return (
              <>
                <Link href={s.link} key={s.name}>
                  <motion.div
                    animate={
                      !view
                        ? { x: 0, width: 300, display: "block" }
                        : {
                            x: -150,
                            width: 0,
                            transitionEnd: {
                              display: "none",
                            },
                          }
                    }
                    // onClick={() =>  setView(true)}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className={`${
                      s.link === pathname
                        ? "bg-[#4880FF] text-white   rounded-lg  font-bold "
                        : ""
                    } ms-2 me-2 max-w-[280px] select-none p-2  h-[40px] text-lg  cursor-pointer`}
                  >
                    {s.name}
                  </motion.div>
                </Link>
              </>
            );
          })}
          <Spacer y={2} />
          {!view && (
            <motion.div transition={{ duration: 1, ease: "easeInOut" }}>
              <Button
                onPress={onOpen}
                className=" flex flex-row bg-inherit cursor-pointer w-full gap-2 bg-gray-100"
              >
                <FaPowerOff size={20} />
                <p>Logout</p>
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
      <LogoutModal onOpenChange={onOpenChange} isOpen={isOpen} />
    </>
  );
}
