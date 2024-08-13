"use client";
import Page from "@/components/Page/PageAll";
import Title, { SubTitle } from "@/components/titles";
import { getData, postData } from "@/core/apiHandler";
import { Doctor } from "@/core/apiRoutes";
import { Tabs, Tab, Card, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const DepartmentTableColums = [
  {
    name: "Name",
    uid: "name",
    type: "text"
  },
  {
    name: "Enquiry Type",
    uid: "enquiryType",
    type: "text",
  },
  {
    name: "Email",
    uid: "email",
    type: "text"
  },
  {
    name: "Message",
    uid: "message",
    type: "textbox"
  },
  {
    name: "Status",
    uid: "enquirystatus",
    type: "leadsStatus"
  },
  {
    name: "Actions",
    uid: "action",
    type: "action"
  },
];
const HospitalTableColums = [
  {
    name: "Name",
    uid: "name",
    type: "text"
  },
  {
    name: "Hospital Name",
    uid: "name",
    type: "text"
  },
  {
    name: "Email",
    uid: "email",
    type: "text"
  },
  {
    name: "Status",
    uid: "status",
    type: "leadsStatus"
  },
  {
    name: "Actions",
    uid: "action",
    type: "action"
  },
];
const ServiceCol = [
  {
    name: "Name",
    uid: "name",
    type: "text"
  },
  {
    name: "Service Name",
    uid: "name",
    type: "text"
  },
  {
    name: "Email",
    uid: "Email",
    type: "text"
  },
  {
    name: "Status",
    uid: "status",
    type: "leadsStatus"
  },
  {
    name: "Actions",
    uid: "action",
    type: "action"
  },
];

const HospitalDoctorCol = [
  {
    name: "Name",
    uid: "name",
    type: "text"
  },
  {
    name: "Hospital Name",
    uid: "hospitalname",
    type: "text"
  },
  {
    name: "Doctor Name",
    uid: "doctorname",
    type: "text"
  },
  {
    name: "Email",
    uid: "email",
    type: "text"
  },
  {
    name: "Status",
    uid: "Status",
    type: "leadsStatus"
  },
  {
    name: "Actions",
    uid: "action",
    type: "action"
  },
];


const breadCrumbs = [
  {
    name: "Department",
    link: "#department"
  },
  {
    name: "Contacts",
    link: "#contacts"
  },
  {
    name: "Services",
    link: "#services"
  }
]

export default function Dev() {
  const router = useRouter();
  const arr = ["Status 1", "Status 2", "Status 3"];

  const { data: status, isLoading } = useQuery({
    queryKey: ["getstatus"],
    queryFn: () => {
      return getData("/enquiry-status", {});
    },
  });

  return (
    <div className="flex flex-col w-full">
      <Title title="Leads" />
      <Breadcrumbs color="secondary">
        {breadCrumbs.map((h: any, index: any) => {
          return <BreadcrumbItem key={index} className="cursor-pointer" onClick={() => router.push(h.link)}>{h.name}</BreadcrumbItem>
        })}
      </Breadcrumbs>
      <section className="w-full" id="department">
        <SubTitle title="Department" />
        <Tabs color="secondary" aria-label="Options">
          {status?.data.data.map((a: any, index: any) => {
            return <Tab key={a._id} name={a.name} title={a.name}>
              <Card shadow="none">
                <Page
                  api={`/enquiry`}
                  apiKey="get-department"
                  columns={DepartmentTableColums}
                  title={a.name}
                  needAddModal={false} />
              </Card>
            </Tab>
          })}
        </Tabs>
      </section>
      <section className="w-full" id="doctors">
        <SubTitle title="Doctors" />
        <Tabs color="secondary" aria-label="Options">
          {status?.data.data.map((a: any, index: any) => {
            return <Tab key={index} name={a.name} title={a.name}>
              <Card shadow="none">
                <Page
                  api={`/enquiry/leads/?status=${a?.enquiryStatus?._id}&type=${a?.enquiryType?._id}`}
                  apiKey="get-doctor"
                  columns={DepartmentTableColums}
                  title={a.name}
                  needAddModal={false} />
                <Page
                  api={Doctor.department}
                  apiKey="get-doctor"
                  columns={DepartmentTableColums}
                  title={a.name}
                  needAddModal={false} />
              </Card>
            </Tab>
          })}
        </Tabs>
      </section>
      <section className="w-full" id="hospital">
        <SubTitle title="Hospiatal" />
        <Tabs color="secondary" aria-label="Options">
          {arr.map((a: any, index: any) => {
            return <Tab key={index} name={a} title={a}>
              <Card shadow="none">
                <Page api={Doctor.department} apiKey="getdepartment" columns={HospitalTableColums} title={a} needAddModal={false} />
              </Card>
            </Tab>
          })}
        </Tabs>
      </section>
      <section className="w-full" id="hospitalDoc">
        <SubTitle title="Doctors by Hospital" />
        <Tabs color="secondary" aria-label="Options">
          {arr.map((a: any, index: any) => {
            return <Tab key={index} name={a} title={a}>
              <Card shadow="none">
                <Page
                  api={Doctor.department}
                  apiKey="getdepartment" columns={HospitalDoctorCol} title={a} needAddModal={false} />
              </Card>
            </Tab>
          })}
        </Tabs>
      </section>
      <section className="w-full" id="services">
        <SubTitle title="Services" />
        <Tabs color="secondary" aria-label="Options">
          {arr.map((a: any, index: any) => {
            return <Tab key={index} name={a} title={a}>
              <Card shadow="none">
                <Page
                  api={Doctor.department}
                  apiKey="getdepartment"
                  columns={ServiceCol}
                  title={a}
                  needAddModal={false} />
              </Card>
            </Tab>
          })}
        </Tabs>
      </section>
      <section className="w-full" id="contacts">
        <SubTitle title="General Contacts" />
        <Tabs color="secondary" aria-label="Options">
          {arr.map((a: any, index: any) => {
            return <Tab key={index} name={a} title={a}>
              <Card shadow="none">
                <Page
                  api={Doctor.department}
                  apiKey="getdepartment"
                  columns={ServiceCol}
                  title={a}
                  needAddModal={false} />
              </Card>
            </Tab>
          })}
        </Tabs>
      </section>
    </div>
  )
}
