"use client";
import Page from "@/components/Page/PageAll";
import Title, { SubTitle } from "@/components/titles";
import { getData, postData } from "@/core/apiHandler";
import { Doctor } from "@/core/apiRoutes";
import {
  Tabs,
  Tab,
  Card,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const DepartmentTableColums = [
  {
    name: "Name",
    uid: "name",
    type: "text",
  },
  {
    name: "Enquiry Type",
    uid: "enquiryType",
    type: "text",
  },
  {
    name: "Email",
    uid: "email",
    type: "text",
  },
  {
    name: "Message",
    uid: "message",
    type: "textbox",
  },
  {
    name: "Status",
    uid: "enquiryStatus",
    type: "enquiryStatus",
  },
  {
    name: "Actions",
    uid: "action",
    type: "action",
  },
];
const appointmentColumns = [
  { name: "Doctor Name", uid: "doctorName", type: "text" },
  { name: "Patient Name", uid: "patientName", type: "text" },
  {
    name: "Status",
    uid: "appstatus",
    type: "appstatus",
  },
  { name: "Price(in Rs)", uid: "price", type: "text" },
  {
    name: "Appointment Time",
    uid: "doctorSlot",
    type: "doctorSlot",
  },
];
const HospitalTableColums = [
  {
    name: "Name",
    uid: "name",
    type: "text",
  },
  {
    name: "Email",
    uid: "email",
    type: "text",
  },
  {
    name: "Status",
    uid: "status",
    type: "leadsStatus",
  },
  {
    name: "Actions",
    uid: "action",
    type: "action",
  },
];
const breadCrumbs = [
  {
    name: "Department",
    link: "#department",
  },
  {
    name: "Contacts",
    link: "#contacts",
  },
  {
    name: "Services",
    link: "#services",
  },
];

export default function Dev() {
  const router = useRouter();
  const arr = ["Status 1", "Status 2", "Status 3"];

  const { data: status, isLoading } = useQuery({
    queryKey: ["getstatus"],
    queryFn: () => {
      return getData("/enquiry-status", {});
    },
  });

  const { data: type, isLoading: isLoadingType } = useQuery({
    queryKey: ["gettype"],
    queryFn: () => {
      return getData("/enquiry-type", {});
    },
  });
  console.log(type?.data.data);
  return (
    <div className="flex flex-col w-full">
      <Title title="Leads" />
      <Breadcrumbs color="secondary">
        {type?.data.data.map((h: any, index: any) => {
          return (
            <BreadcrumbItem
              key={index}
              className="cursor-pointer"
              onClick={() => router.push(h._id)}
            >
              {h.name}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
      {type?.data.data.map((t: any, index: any) => {
        return (
          <section key={t._id} className="w-full" id={t.name}>
            <SubTitle title={t.name} />
            <Tabs color="secondary" aria-label="Options">
              {status?.data.data.map((a: any, index: any) => {
                return (
                  <Tab key={a._id} name={a.name} title={a.name}>
                    <Card shadow="none">
                      <Page
                        api={`/enquiry/all/leads/?type=${t._id}&status=${a?._id}`}
                        apiKey={`get-${a?.name}-${t?._id}`}
                        columns={DepartmentTableColums}
                        title={a.name}
                        needAddModal={false}
                      />
                    </Card>
                  </Tab>
                );
              })}
            </Tabs>
          </section>
        );
      })}
      <Page
        needAddModal={false}
        api={Doctor.appointments}
        apiKey="appointments"
        columns={appointmentColumns}
        title="Appointment"
      />
    </div>
  );
}
