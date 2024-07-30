"use client";
import { useState, useEffect } from "react";
import DeleteModal from "@/components/Modals/DeleteModal";
import Title from "@/components/titles";
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardHeader, Input, Spinner, Textarea, useDisclosure } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { Doctor, HospitalRoutes } from "@/core/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getData, patchData } from "@/core/apiHandler";
import { queryAdmin } from "@/app/providers";
import Page from "@/components/Page/PageAll";
import { useAsyncList } from "@react-stately/data";
import { list } from "postcss";

const breadCrumps = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Department", link: "/dashboard/departments" },
  { name: "Department Details", link: window.location.href },
];

export default function DepartmentDetails() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { id } = useParams();

  const { data: getDepartment, isLoading, isError, isFetched } = useQuery({
    queryKey: ["getDepartment", id],
    queryFn: () => getData(Doctor.department, { id }),
  });

  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    code: "",
  });

  useEffect(() => {
    if (getDepartment?.data?.data?.data[0]) {
      setFormData({
        name: getDepartment.data.data.data[0].name,
        description: getDepartment.data.data.data[0].description,
        metaTitle: getDepartment.data.data.data[0].metaTitle,
        metaDescription: getDepartment.data.data.data[0].metaDescription,
        code: getDepartment.data.data.data[0].code,
      });
    }
  }, [getDepartment]);
  const { data: getProceudre } = useQuery({
    queryKey: ["get-prodcedure"],
    queryFn: () => {
      return getData(Doctor.procedure, {});
    }
  })
  console.log(getProceudre?.data.data);
  const updateData = useMutation({
    mutationKey: ["update-department"],
    mutationFn: (data: any) => patchData(`${Doctor.department}/${id}`, data, {}),
    onSuccess: (data: any) => {
      console.log(data.data);
      queryAdmin.invalidateQueries({ queryKey: ["getDepartment"] });
    },
    onError: (error: any) => {
      console.log(error.response.data);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const appointmentColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Appointment Time", uid: "appointment", type: "appointmentTime"
    },
    {
      name: "Actions", uid: "actions", type: "actions"
    }
  ]
  const procedureColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Department", uid: "department", type: "departmentDropdown" },
    {
      name: "Actions", uid: "actions", type: "actions"
    }
  ]
  const list1 = useAsyncList<any>({
    async load() {
      let res = await getData(Doctor.department, {});
      let json = await res.data.data.data;

      return {
        items: json
      };
    },
  });
  const DropDownData = {
    "department": list1
  }
  const enquiryColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Status", uid: "status", type: "enquirystatus"
    },
    {
      name: "Actions", uid: "actions", type: "actions"
    }
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateData.mutate(formData);
  };
  const [isEdit, setisEdit] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4 w-full">
      {isLoading ? <Spinner /> : (
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-4 p-[1rem]">
            <Breadcrumbs color="secondary" className="text-xl font-bold">
              {breadCrumps.map((b) => (
                <BreadcrumbItem key={b.name} onClick={() => router.push(b.link)}>
                  {b.name}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>

            <div className="flex flex-row justify-between items-center w-full">
              <Title title={getDepartment?.data?.data?.data[0]?.name} />
              <div className="flex flex-row gap-4">
                <Button color="primary" radius="full" onClick={() => setisEdit(true)}>Edit</Button>
                <Button color="danger" radius="full" onClick={onOpen}>Delete</Button>
              </div>
            </div>
            <DeleteModal
              onOpenChange={onOpenChange}
              title="Hospital"
              data={id}
              isOpen={isOpen}
              api={HospitalRoutes.hospital}
              queryKey={["Doctor"]}
            />
          </div>
          <Card shadow="sm" radius="lg">
            <CardHeader className="text-xl font-bold">Department Details</CardHeader>
            <CardBody className="flex flex-row h-full items-center justify-center">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
                  <Button type="submit" color="primary" className="text-xl">Submit</Button>
                )}
              </form>
            </CardBody>
          </Card>
        </div>
      )}
      <Page needAddModal={false} api={Doctor.enquiry} apiKey="enquiryByHospital" columns={enquiryColumns} title={`${getDepartment?.data?.data?.data[0]?.name} Enquiry`} />
      <Page needAddModal={false} api={Doctor.appointments} apiKey="appointments" columns={appointmentColumns} title={`${getDepartment?.data?.data?.data[0]?.name} Appointment`} />
      <Page dropDownData={DropDownData} api={Doctor.procedure} apiKey="procedure" columns={procedureColumns} title={`${getDepartment?.data?.data?.data[0]?.name} Procedures`} />
    </div>
  );
}
