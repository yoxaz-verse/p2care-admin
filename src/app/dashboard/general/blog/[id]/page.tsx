"use client";
import { queryAdmin } from "@/app/providers";
import Title from "@/components/titles";
import { uploadLogo } from "@/content/assets";
import { getData, patchData, postMultipart } from "@/core/apiHandler";
import { GeneralRoutes } from "@/core/apiRoutes";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function page() {
  const path = usePathname();
  const router = useRouter();
  const { id } = useParams();
  const breadCrumps = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "General",
      link: "/dashboard/general",
    },
    {
      name: "Blog details",
      link: path,
    },
  ];
  const [file, setFile] = useState<File>();
  const [uploadImageUrl, setUploadImageUrl] = useState<string>(uploadLogo);
  const {
    data: getBlogDetails,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: () => {
      return getData(`${GeneralRoutes.blog}/${id}`, {});
    },
  });
  const addImage = useMutation({
    mutationKey: ["addImage-blog"],
    mutationFn: (data: any) => {
      return postMultipart(`/blog/image/${id}`, {}, data);
    },
    onSuccess: (data: any) => {
      toast.success("Image is uploaded successfully", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: ["blogDetails", id] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response.data, {
        position: "top-right",
        className: "bg-green-500",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      alert("No file uploaded");
      return;
    }
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("image", file);
    addImage.mutate(formData);
  };

  return (
    <>
      {isLoading ? (
        <Spinner title="Loading Doctor Details" />
      ) : (
        <div className="flex flex-col w-full gap-4 p-[1rem]">
          <Breadcrumbs color="secondary">
            {breadCrumps.map((h: any, index: any) => {
              return (
                <BreadcrumbItem key={index} onClick={() => router.push(h.link)}>
                  {h.name}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumbs>
          <div className="flex flex-row justify-between w-full gap-4">
            <Title title={getBlogDetails?.data.data?.title} />
            <div className="flex flex-row gap-4 items-center justify-between"></div>
          </div>
          <Card className="flex flex-col justify-ceneter items-center">
            <CardBody className="grid grid-cols-1  gap-4 items-center  h-full">
              <div className="grid grid-cols-2 gap-2 items-center">
                <div className="flex items-center justify-center">
                  <label htmlFor="blogImageInput" className="cursor-pointer">
                    <Avatar
                      src={
                        getBlogDetails?.data.data?.image
                          ? getBlogDetails?.data.data?.image.path
                          : uploadImageUrl
                      }
                      alt="docImage"
                      className="w-full h-full rounded-xl"
                    />
                    <input
                      id="blogImageInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e: any) => {
                        handleChange(e);
                      }}
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    label="Blog Title"
                    isReadOnly={true}
                    value={getBlogDetails?.data.data?.title}
                    placeholder="Blog Title"
                  />
                  <Textarea
                    label="Blog Description"
                    value={getBlogDetails?.data.data?.description}
                    isReadOnly={true}
                    placeholder="Blog Description"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}

export default page;
