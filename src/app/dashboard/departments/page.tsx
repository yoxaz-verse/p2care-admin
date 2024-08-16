"use client";
import Page from "@/components/Page/PageAll";
import Title, { SubTitle } from "@/components/titles";
import { getData } from "@/core/apiHandler";
import { Doctor, HospitalRoutes } from "@/core/apiRoutes";
import { Card, Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function Department() {


  const departmentColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Code", uid: "code", type: "text" },
    { name: "Description", uid: "description", type: "textbox" },
    { name: "MetaTitle", uid: "metaTitle", type: "text" },
    { name: "MetaDescription", uid: "metaDescription", type: "textbox" },
    {
      name: "Actions", uid: "action", type: "action"
    }
  ]
  const enquiryColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phone", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Status", uid: "status", type: "enquirystatus"
    },
    {
      name: "Actions", uid: "action", type: "action"
    }
  ]

  const { data: status, isLoading } = useQuery({
    queryKey: ["getstatus"],
    queryFn: () => {
      return getData("/enquiry-status", {});
    },
  });
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
      uid: "enquiryStatus",
      type: "enquiryStatus"
    },
    {
      name: "Actions",
      uid: "action",
      type: "action"
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2 p-[1rem] w-full">
        <Title title="Departments" />
        <Page apiKey="department" api={Doctor.department} columns={departmentColumns} title="Department" />
        <SubTitle title="Department" />
        <Tabs color="secondary" aria-label="Options">
          {status?.data.data.map((a: any, index: any) => {
            return <Tab key={a._id} name={a.name} title={a.name}>
              <Card shadow="none">

                <Page
                  api={`/enquiry/all/leads/?type=66a716539f1827dd3868920b&status=${a?._id}`}
                  apiKey={`get-${a?.name}-department`}
                  columns={DepartmentTableColums}
                  title={a.name}
                  needAddModal={false} />
              </Card>
            </Tab>
          })}
        </Tabs>

      </div>
    </>
  );
}
