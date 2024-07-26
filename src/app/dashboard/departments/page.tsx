"use client";
import Page from "@/components/Page/PageAll";
import Title from "@/components/titles";
import { Doctor, HospitalRoutes } from "@/core/apiRoutes";

export default function Department() {


  const departmentColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Code", uid: "code", type: "text" },
    { name: "Description", uid: "description", type: "textbox" },
    { name: "MetaTitle", uid: "metaTitle", type: "text" },
    { name: "MetaDescription", uid: "metaDescription", type: "textbox" }
  ]
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


  return (
    <>
      <div className="flex flex-col gap-2 p-[1rem] w-full">
        <Title title="Departments" />
        <Page apiKey="department" api={Doctor.department} columns={departmentColumns} title="Department" />
        <Page needAddModal={false} api={HospitalRoutes.enquiry} apiKey="enquiryforDepartments" columns={enquiryColumns} title={`Enquiries for All Departments`} />
      </div>
    </>
  );
}
