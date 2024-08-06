"use client";
import Page from "@/components/Page/PageAll";
import Title, { SubTitle } from "@/components/titles";
import { Doctor } from "@/core/apiRoutes";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

const DepartmentTableColums = [
  {
    name: "Name",
    uid: "name",
    type: "text"
  },
  {
    name: "Department Name",
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


export default function Dev() {
  const arr = ["Status 1", "Status 2", "Status 3"];
  return (
    <div className="flex flex-col w-full">
      <Title title="Leads" />
      <SubTitle title="Department" />
      <Tabs color="secondary" aria-label="Options">
        {arr.map((a: any, index: any) => {
          return <Tab key={index} name={a} title={a}>
            <Card shadow="none">
              <Page api={Doctor.department} apiKey="getdepartment" columns={DepartmentTableColums} title={a} needAddModal={false} />
            </Card>
          </Tab>
        })}
      </Tabs>
      <SubTitle title="Doctors" />
      <Tabs color="secondary" aria-label="Options">
        {arr.map((a: any, index: any) => {
          return <Tab key={index} name={a} title={a}>
            <Card shadow="none">
              <Page
                api={Doctor.department}
                apiKey="getdepartment"
                columns={DepartmentTableColums}
                title={a}
                needAddModal={false} />
              <Page
                api={Doctor.department}
                apiKey="getdepartment"
                columns={DepartmentTableColums}
                title={a}
                needAddModal={false} />

            </Card>
          </Tab>
        })}
      </Tabs>
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
    </div>
  )
}
