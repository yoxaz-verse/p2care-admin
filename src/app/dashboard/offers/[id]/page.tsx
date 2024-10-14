"use client";

import { queryAdmin } from "@/app/providers";
import { uploadLogo } from "@/content/assets";
import { getData, postMultipart } from "@/core/apiHandler";
import { offerRoute } from "@/core/apiRoutes";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  Input,
  Spacer,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function OffersPage() {
  const path = usePathname();
  const router = useRouter();
  const { id } = useParams();

  const breadCrumps = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Offer", link: "/dashboard/offers" },
    { name: "Offer Details", link: path },
  ];

  const [uploadImageUrl, setUploadImageUrl] = useState<string>(uploadLogo);

  const { data: offerDetails } = useQuery({
    queryKey: ["offerDetails", id],
    queryFn: () => getData(`${offerRoute}/${id}`, {}),
  });

  const addImage = useMutation({
    mutationKey: ["addImage-offer"],
    mutationFn: (data: FormData) =>
      postMultipart(`/offer/upload/${id}`, {}, data),
    onSuccess: () => {
      toast.success("Image uploaded successfully", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: ["offerDetails", id] });
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data || "Image upload failed", {
        position: "top-right",
        className: "bg-red-500",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      toast.error("No file selected", {
        position: "top-right",
        className: "bg-red-500",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImageUrl(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);

    const formData = new FormData();
    formData.append("image", selectedFile);
    addImage.mutate(formData);
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <Breadcrumbs color="secondary" className="text-xl font-bold">
        {breadCrumps.map((crumb, index) => (
          <BreadcrumbItem key={index} onClick={() => router.push(crumb.link)}>
            {crumb.name}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>

      <Card>
        <CardBody className="grid grid-cols-1 gap-4 items-center h-full">
          <div className="gap-2 items-center">
            <div className="flex items-center justify-center">
              <label htmlFor="offerImageInput" className="cursor-pointer">
                <Avatar
                  src={
                    offerDetails?.data.data?.image
                      ? offerDetails.data.data.image.path
                      : uploadImageUrl
                  }
                  alt="Offer Image"
                  className="w-full h-full rounded-xl"
                />
                <input
                  id="offerImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </div>
            <Spacer y={2} />
            <div className="flex flex-col gap-2">
              <Input
                label="Title"
                isReadOnly
                value={offerDetails?.data.data?.title || ""}
                placeholder="Title"
              />
              <Input
                label="Link"
                isReadOnly
                value={offerDetails?.data.data?.link || ""}
                placeholder="Link"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
