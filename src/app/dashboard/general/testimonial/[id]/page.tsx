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

function Page() {
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
      name: "Testimonial details",
      link: path,
    },
  ];
  const [file, setFile] = useState<File>();
  const [uploadImageUrl, setUploadImageUrl] = useState<string>(uploadLogo);
  const {
    data: getTestimonialDetails,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ["testimonialDetails", id],
    queryFn: () => {
      return getData(`${GeneralRoutes.testimonial}/${id}`, {});
    },
  });
  const addImage = useMutation({
    mutationKey: ["addImage-testimonial"],
    mutationFn: (data: any) => {
      return postMultipart(`/testimonial/image/${id}`, {}, data);
    },
    onSuccess: (data: any) => {
      toast.success("Image is uploaded successfully", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: ["testimonialDetails", id] });
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
            <Title title={getTestimonialDetails?.data.data?.title} />
            <div className="flex flex-row gap-4 items-center justify-between"></div>
          </div>
          <Card className="flex flex-col justify-ceneter items-center">
            <CardBody className="grid grid-cols-1  gap-4 items-center  h-full">
              <div className="grid grid-cols-2 gap-2 items-center">
                <div className="flex items-center justify-center">
                  <label
                    htmlFor="testimonialImageInput"
                    className="cursor-pointer"
                  >
                    <Avatar
                      src={
                        getTestimonialDetails?.data.data?.image
                          ? getTestimonialDetails?.data.data?.image.path
                          : uploadImageUrl
                      }
                      alt="docImage"
                      className="w-full h-full rounded-xl"
                    />
                    <input
                      id="testimonialImageInput"
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
                    label="Testimonial Name"
                    isReadOnly={true}
                    value={getTestimonialDetails?.data.data?.name}
                    placeholder="Testimonial Name"
                  />
                  <Textarea
                    label="Testimonial Message"
                    value={getTestimonialDetails?.data.data?.message}
                    isReadOnly={true}
                    placeholder="Testimonial Message"
                  />
                  <Input
                    label="Testimonial Designation"
                    isReadOnly={true}
                    value={getTestimonialDetails?.data.data?.designation}
                    placeholder="Testimonial Designation"
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

export default Page;
