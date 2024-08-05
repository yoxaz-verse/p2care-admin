"use client";

import { queryAdmin } from "@/app/providers";
import { uploadImage } from "@/content/assets";
import { getData, postMultipart } from "@/core/apiHandler";
import { HospitalRoutes } from "@/core/apiRoutes";
import {
  Autocomplete,
  AutocompleteItem,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function HospitalDetail({ params }: { params: { id: string } }) {
  // id from params

  const [uploadImageSrc, setUploadImageSrc] = useState<string>(uploadImage);
  const breadCrumps = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Hospital",
      link: "/dashboard/hospitals",
    },
    {
      name: "Hospital Details",
      link: `/dashboard/hospitals/${params.id}`,
    },
  ];
  const router = useRouter();

  // fetch
  const data = useQuery({
    queryKey: ["hospital", params.id],
    queryFn: () => getData(HospitalRoutes.hospital + `/${params.id}`, {}),
  });

  useEffect(() => {
    if (data.isSuccess) {
      if (data?.data?.data?.data.image) {
        setUploadImageSrc(data?.data?.data?.data.image.path);
      }
    }
  }, [data]);

  const imageMutation = useMutation({
    mutationKey: ["post image"],
    mutationFn: (data: FormData) => {
      return postMultipart(
        HospitalRoutes.hospital + "/image" + `/${params.id}`,
        {},
        data
      );
    },
    onSuccess: (data: any) => {
      // stop loading
      toast.success("Image Saved Successfully");
      queryAdmin.invalidateQueries({ queryKey: ["hospital", params.id] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  type SWCharacter = {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
  };
  let city = useAsyncList<SWCharacter>({
    async load({ signal, filterText }) {
      let res = await fetch(
        `https://swapi.py4e.com/api/people/?search=${filterText}`,
        { signal }
      );
      let json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 p-[1rem]">
          <Breadcrumbs color="secondary" className="text-xl font-bold">
            {breadCrumps.map((b: any, index: any) => {
              return (
                <BreadcrumbItem key={index} onClick={() => router.push(b.link)}>
                  {b.name}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumbs>
        </div>
        <div className="bg-white p-5 rounded-lg max-h-[500px]">
          <div className="flex justify-between px-5">
            <h1 className="text-[15px] md:text-[35px] text-secondary-300">
              Hospital Name
            </h1>
            <div className="flex gap-2">
              <Button color="primary">Publish</Button>
              <Button color="danger">Delete</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 p-5">
            <form>
              <label htmlFor="hospital-image" className="text-secondary-300">
                <Image
                  src={uploadImageSrc}
                  width={2000}
                  height={2000}
                  className="cursor-pointer w-full h-[300px] p-5 object-contain"
                  alt="hospital"
                />
              </label>
              <input
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  // if no file selected
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUploadImageSrc(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                  const formData = new FormData();
                  formData.append("image", file);
                  imageMutation.mutate(formData);
                }}
                className="hidden"
                id="hospital-image"
                type="file"
              />
            </form>
            <form className="flex flex-col gap-2">
              <Input
                label="Hospital Name"
                placeholder="Hospital Name"
                className="w-full"
              />
              {/* email */}
              <Input label="Email" placeholder="Email" className="w-full" />
              {/* phone */}
              <Input label="Phone" placeholder="Phone" className="w-full" />
              {/* city */}
              <Autocomplete
                className="max-w-xs"
                inputValue={city.filterText}
                isLoading={city.isLoading}
                items={city.items}
                label="Select a character"
                placeholder="Type to search..."
                variant="bordered"
                onInputChange={city.setFilterText}
              >
                {(item) => (
                  <AutocompleteItem key={item.name} className="capitalize">
                    {item.name ?? "No Name"}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              {/* district */}
              <Input
                label="District"
                placeholder="District"
                className="w-full"
              />
              {/* submit */}
              <Button type="submit" color="primary">
                Save
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
