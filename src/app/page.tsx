"use client";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { adminLogo } from "./content/assets";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleNaviagtion = () => {
    router.push("/dashboard");
  }
  return (
    <>
      <div className="flex flex-col shadow-xl justify-center items-center bg-[#F4F4F5] h-[100vh]">
        <form className="flex flex-col gap-2 items-center shaodw-xl w-[50vh] md:w-[80vh]  bg-white p-[.5rem] md:p-[1rem] rounded-xl">
          <Image src={adminLogo} alt="adminLogo" width={100} height={100} />
          <Input placeholder="Email" label="Email" labelPlacement="outside" />
          <Input placeholder="Password" label="Password" labelPlacement="outside" />
          <Button color="primary" className="text-[18px] w-full" onClick={() => handleNaviagtion()}>Submit</Button>
        </form>
      </div>
    </>
  );
}
