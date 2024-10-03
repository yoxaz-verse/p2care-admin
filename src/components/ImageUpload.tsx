"use client";
import { queryAdmin } from "@/app/providers";
import { uploadLogo } from "@/content/assets";
import { postMultipart } from "@/core/apiHandler";
import { Button, Avatar } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  getapikey: string;
  id: any;
  postapi: string;
  images: any;
}
export function ImageUploadMultiple({
  images,
  getapikey,
  id,
  postapi,
}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<any[]>([]);

  const addImage = useMutation({
    mutationKey: ["add-images"],
    mutationFn: (formData: FormData) =>
      postMultipart(`${postapi}/${id}`, {}, formData),
    onSuccess: (data: any) => {
      toast.success("Images uploaded successfully", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: [getapikey] });
    },
    onError: (error: any) => {
      toast.error("Failed to upload images", {
        position: "top-right",
        className: "bg-red-300",
      });
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
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
        formData.append(`images`, file);
      }
    });
    addImage.mutate(formData);
  };

  useEffect(() => {
    if (images) {
      setImageUrls(images.map((image: any) => image.path));
    }
  }, [images]);

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-row w-full gap-4">
        {imageUrls.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center"
          >
            <label htmlFor={`image-upload-${index}`} className="cursor-pointer">
              <Avatar
                src={item}
                alt={`image-${index}`}
                className="w-[200px] h-[200px] rounded-xl"
              />
              <input
                id={`image-upload-${index}`}
                type="file"
                accept="image/*"
                className="hidden"
                // max allow 5 images
                disabled={index >= 5}
                onChange={(e) => handleFileChange(e, index)}
              />
            </label>
          </div>
        ))}
        {
          // if images less than 5, add more
          imageUrls.length < 5 && (
            <div className="flex flex-row items-center justify-center">
              <label
                htmlFor={`image-upload-${imageUrls.length}`}
                className="cursor-pointer"
              >
                <Avatar
                  src={uploadLogo}
                  alt={`image-${imageUrls.length}`}
                  className="w-[200px] h-[200px] rounded-xl"
                />
                <input
                  id={`image-upload-${imageUrls.length}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, imageUrls.length)}
                />
              </label>
            </div>
          )
        }
      </div>
      <Button className="w-1/4" onClick={handleUpload} color="primary">
        Upload Images
      </Button>
    </div>
  );
}

interface ImageSingleProps {
  getapikey: string;
  postapi: string;
  image: any;
  id: any;
}
export function ImageSingle({
  image,
  getapikey,
  id,
  postapi,
}: ImageSingleProps) {
  const [File, setfile] = useState<any>(null);
  const [uploadImageUrl, setUploadImageUrl] = useState<any>(uploadLogo);
  const addImage = useMutation({
    mutationKey: ["post image"],
    mutationFn: (data: FormData) => {
      return postMultipart(`${postapi}/${id}`, {}, data);
    },
    onSuccess: (data: any) => {
      toast.success("Image uploaded successfully", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: [getapikey] });
    },
    onError: (error: any) => {
      toast.error("Image uploaded error", {
        position: "top-right",
        className: "bg-red-300",
      });
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    formData.append("image", file);
    addImage.mutate(formData);
  };
  return (
    <div className="flex items-center justify-center">
      <label htmlFor="imageinput" className="cursor-pointer">
        <Avatar
          src={image ? image?.path : uploadImageUrl || uploadLogo}
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
  );
}
