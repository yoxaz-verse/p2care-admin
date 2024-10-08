"use client";
import { useState, useEffect } from "react";
import DeleteModal from "@/components/Modals/DeleteModal";
import Title from "@/components/titles";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { Doctor, HospitalRoutes } from "@/core/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getData, patchData, postMultipart } from "@/core/apiHandler";
import { queryAdmin } from "@/app/providers";
import Page from "@/components/Page/PageAll";
import { useAsyncList } from "@react-stately/data";
import { ImageSingle } from "@/components/ImageUpload";
import { toast } from "sonner";
import { uploadLogo } from "@/content/assets";

export default function DepartmentDetails() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const path = usePathname();
  const { id } = useParams();
  const breadCrumps = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Department", link: "/dashboard/departments" },
    { name: "Department Details", link: path },
  ];
  const {
    data: getDepartment,
    isLoading,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ["getDepartment"],
    queryFn: () => getData(`${Doctor.department}/${id}`, {}),
  });

  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    code: "",
  });

  useEffect(() => {
    console.log(getDepartment?.data.data);
    if (getDepartment?.data?.data) {
      setFormData({
        name: getDepartment.data.data.name,
        description: getDepartment.data.data.description,
        metaTitle: getDepartment.data.data.metaTitle,
        metaDescription: getDepartment.data.data.metaDescription,
        code: getDepartment.data.data.code,
      });
    }
  }, [getDepartment]);

  const updateData = useMutation({
    mutationKey: ["update-department"],
    mutationFn: (data: any) =>
      patchData(`${Doctor.department}/${id}`, data, {}),
    onSuccess: (data: any) => {
      console.log(data.data);
      queryAdmin.invalidateQueries({ queryKey: ["getDepartment"] });
    },
    onError: (error: any) => {
      console.log(error.response.data);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const enquiryColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Status",
      uid: "status",
      type: "enquirystatus",
    },
    {
      name: "Actions",
      uid: "actions",
      type: "actions",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateData.mutate(formData);
  };
  const [isEdit, setisEdit] = useState<boolean>(false);

  const addImage = useMutation({
    mutationKey: ["addBanner-Department"],
    mutationFn: (data: any) => {
      return postMultipart(`/department/upload/banner/${id}`, {}, data);
    },
    onSuccess: (data: any) => {
      toast.success("Banner is uploaded successfully", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: ["getDepartment"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response.data, {
        position: "top-right",
        className: "bg-green-500",
      });
    },
  });

  const [file, setFile] = useState<File>();
  const [uploadImageUrl, setUploadImageUrl] = useState<string>(uploadLogo);

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
    <div className="flex flex-col gap-4 w-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-4 p-[1rem]">
            <Breadcrumbs color="secondary" className="text-xl font-bold">
              {breadCrumps.map((b) => (
                <BreadcrumbItem
                  key={b.name}
                  onClick={() => router.push(b.link)}
                >
                  {b.name}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>

            <div className="flex flex-row justify-between items-center w-full">
              <Title title={getDepartment?.data?.data?.name} />
              <div className="flex flex-row gap-4">
                <Button
                  color="primary"
                  radius="full"
                  onClick={() => setisEdit(true)}
                >
                  Edit
                </Button>

                <Button color="danger" radius="full" onClick={onOpen}>
                  Delete
                </Button>
              </div>
            </div>
            <DeleteModal
              onOpenChange={onOpenChange}
              title="Hospital"
              data={id}
              isOpen={isOpen}
              api={Doctor.department}
              queryKey={["Doctor"]}
            />
          </div>
          <Card shadow="sm" radius="lg">
            <CardHeader className="text-xl font-bold">
              Department Details
            </CardHeader>
            <CardBody className="flex flex-row h-full items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full"
              >
                <div className="flex gap-5">
                  <ImageSingle
                    id={id}
                    getapikey="getDepartment"
                    postapi={"/department/upload"}
                    image={getDepartment?.data?.data?.image}
                  />
                  <label
                    htmlFor="departmentBannerUpload"
                    className="cursor-pointer"
                  >
                    <Avatar
                      src={
                        getDepartment?.data.data?.banner
                          ? getDepartment?.data.data?.banner.path
                          : uploadImageUrl
                      }
                      alt="department Banner"
                      className="w-full h-full rounded-xl"
                    />
                    <input
                      id="departmentBannerUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e: any) => {
                        handleChange(e);
                      }}
                    />
                  </label>
                </div>
                <Input
                  name="name"
                  value={formData.name}
                  label="Name"
                  onChange={handleInputChange}
                />
                <Textarea
                  name="description"
                  value={formData.description}
                  label="Description"
                  onChange={handleInputChange}
                />
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <Input
                    name="metaTitle"
                    value={formData.metaTitle}
                    label="Meta Title"
                    onChange={handleInputChange}
                  />
                  <Textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    label="Meta Description"
                    onChange={handleInputChange}
                  />
                </div>
                <Input
                  name="code"
                  value={formData.code}
                  label="Code"
                  onChange={handleInputChange}
                />
                {isEdit && (
                  <Button type="submit" color="primary" className="text-xl">
                    Submit
                  </Button>
                )}
              </form>
            </CardBody>
          </Card>
        </div>
      )}
      <Page
        needAddModal={false}
        api={`${Doctor.enquiry}/individual/${id}`}
        apiKey="enquiryByHospital"
        columns={enquiryColumns}
        title={`${getDepartment?.data?.data?.name} Enquiry`}
      />
    </div>
  );
}
