"use client";
import { queryAdmin } from "@/app/providers";
import DeleteModal from "@/components/Modals/DeleteModal";
import Page from "@/components/Page/PageAll";
import Title from "@/components/titles";
import { getData, patchData } from "@/core/apiHandler";
import { Doctor, patientRoutes } from "@/core/apiRoutes";
import {
  BreadcrumbItem,
  Image,
  Input,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
  Avatar,
  Spinner,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSystemErrorMap } from "util";

export default function UserName() {
  const router = useRouter();
  const path = usePathname();
  const breadCrumps = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "User",
      link: "/dashboard/users",
    },
    {
      name: "User Details",
      link: path,
    },
  ];

  const appointmentColumns = [
    { name: "Doctor Name", uid: "name", type: "text" },
    { name: "User Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Appointment Time",
      uid: "appointment",
      type: "appointmentTime",
    },
    {
      name: "Actions",
      uid: "actions5",
      type: "actions4",
    },
  ];
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
      uid: "actions5",
      type: "actions5",
    },
  ];
  const { id } = useParams();
  const [formData, setformData] = useState<any>({
    name: "",
    phone: "",
    email: "",
  });
  const {
    data: getPateintData,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["getPateintData"],
    queryFn: () => {
      return getData(`${patientRoutes.patient}/${id}`, {});
    },
  });

  useEffect(() => {
    if (isFetched) {
      setformData((prev: any) => ({
        ...prev,
        name: getPateintData?.data.data.name,
        email: getPateintData?.data.data.email,
        phone: getPateintData?.data.data.phone,
      }));
    }
  }, [isFetched]);
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (isLoading) {
    <div className="flex items-center justify-center h-[80%]">
      <Spinner />
    </div>;
  }
  const handleEdit = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: (data: any) => {
      return patchData(patientRoutes.patient, { id }, data);
    },
    onSuccess: (data: any) => {
      console.log(data.data);
      toast.success("Updated succesfully", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: ["getPateintData"] });
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEdit.mutate(formData);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <Breadcrumbs color="secondary" className="text-xl font-bold">
          {breadCrumps.map((h: any, index: any) => {
            return (
              <BreadcrumbItem
                key={index}
                className="text-xl font-bold cursor-pointer"
                onClick={() => router.push(h.link)}
              >
                {h.name}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
        <div className="flex flex-row justify-between items-center w-full">
          <Title title={getPateintData?.data?.data?.name} />
          <div className="flex flex-row gap-4">
            <Button
              color="primary"
              radius="full"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </Button>
            <Button color="danger" radius="full" onClick={() => onOpen()}>
              Delete
            </Button>
          </div>
        </div>
        <DeleteModal
          data={id}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          title="User"
          api={patientRoutes.patient}
          queryKey={["user"]}
        />
      </div>
      <Card className="w-full" radius="lg" shadow="lg">
        <CardHeader className="text-3xl font-bold">User Details</CardHeader>
        <CardBody className="flex flex-col  gap-4   h-full">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-full flex flex-col h-full gap-4 items-center"
          >
            <Avatar
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              className="w-[300px] h-[300px]"
            />
            <Input
              label="Patient Name"
              onValueChange={(e) =>
                setformData((prev: any) => ({
                  ...prev,
                  name: e,
                }))
              }
              value={formData.name}
              placeholder="Patient Name"
            />
            <Input
              label="Patient Email"
              value={formData.email}
              onValueChange={(e) =>
                setformData((prev: any) => ({
                  ...prev,
                  email: e,
                }))
              }
              placeholder="Patient Email"
            />
            <Input
              label="Patient Phone"
              value={formData.phone}
              onValueChange={(e) =>
                setformData((prev: any) => ({
                  ...prev,
                  phone: e,
                }))
              }
              placeholder="Patient Phone"
            />

            {isEdit && (
              <Button
                variant="ghost"
                color="secondary"
                radius="full"
                className="w-full md:w-1/2"
              >
                Submit
              </Button>
            )}
          </form>
        </CardBody>
      </Card>
      <Page
        needAddModal={false}
        api={Doctor.appointments}
        apiKey="appointments"
        columns={appointmentColumns}
        title={`${getPateintData?.data.data.name}'s Appointment`}
      />
      <Page
        needAddModal={false}
        api={Doctor.enquiry}
        apiKey="enquiries"
        columns={enquiryColumns}
        title={`${getPateintData?.data.data.name}'s Enquiries`}
      />
    </div>
  );
}
