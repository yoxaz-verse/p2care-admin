"use client";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { adminLogo } from "../content/assets";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/core/apiHandler";
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { AdminRoutes } from "@/core/apiRoutes";

export default function Home() {
  const router = useRouter();
  const handleNaviagtion = () => {
    router.push("/dashboard");
  };
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const handleChange = (e: any, type: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [type]: e,
    }));
  };
  const adminLogin = useMutation({
    mutationKey: ["adminLogin"],
    mutationFn: (data: any) => {
      return postData(AdminRoutes.adminLogin, data, {});
    },
    onSuccess: (data: any) => {
      console.log(data);
      setLoading(false);
      toast.success(data.data.message, {
        position: "top-right",
      });
      handleNaviagtion();
    },
    onError: (error: any) => {
      setLoading(false);
      console.log(error);

      toast.error(error.response.data.message || error.response.data.error, {
        position: "top-right",
      });
    },
  });
  const [loading, setLoading] = useState(false);
  function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    adminLogin.mutate(formData);
  }
  return (
    <>
      <div className="flex flex-col shadow-xl justify-center items-center bg-[#F4F4F5] h-[100vh]">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-2 items-center shaodw-xl w-[50vh] md:w-[80vh]  bg-white p-[.5rem] md:p-[1rem] rounded-xl"
        >
          <Image src={adminLogo} alt="adminLogo" width={100} height={100} />
          <Input
            onValueChange={(e) => handleChange(e, "email")}
            placeholder="Email"
            label="Email"
            labelPlacement="outside"
          />
          <Input
            onValueChange={(e) => handleChange(e, "password")}
            placeholder="Password"
            label="Password"
            labelPlacement="outside"
          />
          <Button
            type="submit"
            isLoading={loading}
            color="primary"
            className="text-[18px] w-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
