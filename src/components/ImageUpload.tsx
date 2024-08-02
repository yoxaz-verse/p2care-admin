"use client";
import { queryAdmin } from "@/app/providers";
import { postMultipart } from "@/core/apiHandler";
import { Button, Avatar } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  getapikey: string;
  postapi: string;
  images: string[];
}


export function ImageUploadMutiple({ images, getapikey, postapi }: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const addImage = useMutation({
    mutationKey: [`add images`],
    mutationFn: (formData: FormData) => {
      return postMultipart(postapi, {}, formData);
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.success("Images uploaded successfully", {
        position: "top-right",
        className: "bg-green-300"
      })
      queryAdmin.invalidateQueries({ queryKey: [getapikey] });
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files) return;

    const newFile = e.target.files[0];
    if (newFile) {
      const newImageUrls = [...imageUrls];
      const newFiles = [...files];
      newFiles[index] = newFile;

      const reader = new FileReader();
      reader.onloadend = () => {
        newImageUrls[index] = reader.result as string;
        setImageUrls(newImageUrls);
      };
      reader.readAsDataURL(newFile);
      setFiles(newFiles);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      if (file) {
        formData.append(`image${index}`, file);
      }
    });
    addImage.mutate(formData);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center justify-center">
            <label htmlFor={`image-upload-${index}`} className="cursor-pointer">
              <Avatar
                src={images[index] ? images[index] : "https://i.pravatar.cc/150?u=a04258114e29026708c"}
                alt={`image-${index}`}
                className="w-80 h-80 rounded-full"
              />
              <input
                id={`image-upload-${index}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, index)}
              />
            </label>
          </div>
        ))}
      </div>
      <Button onClick={handleUpload} disabled={files.length === 0}>
        Upload Images
      </Button>
    </div>
  );
}

interface ImageSingleProps {
  getapikey: string,
  postapi: string
  image: any,
  id: any
}
export function ImageSingle({ image, getapikey, id, postapi }: ImageSingleProps) {
  console.log(image);
  const [File, setfile] = useState<any>(null);
  const [uploadImageUrl, setUploadImageUrl] = useState<any>(null);
  const addImage = useMutation({
    mutationKey: ["post image"],
    mutationFn: (data: FormData) => {
      console.log(data);
      return postMultipart(`${postapi}/${id}`, {}, data);
    },
    onSuccess: (data: any) => {
      queryAdmin.invalidateQueries({ queryKey: [getapikey] });
    }
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (!e.target.files) {
      alert("No file uploaded");
      return;
    }
    const file = e.target.files[0];
    setfile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    const formData: FormData = new FormData();
    console.log(file);
    console.log(formData.append("image", file));
    addImage.mutate(formData);
  };
  return (
    <div className="flex items-center justify-center">
      <label htmlFor="imageinput" className="cursor-pointer">
        <Avatar
          src={image ? image?.path : uploadImageUrl || "https://i.pravatar.cc/150?u=a04258114e29026708c"}
          alt="docImage"
          className="w-full h-full rounded-xl"
        />
        <input
          id="imageinput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e: any) => {
            handleChange(e);
          }}
        />
      </label>
    </div>
  )
}

