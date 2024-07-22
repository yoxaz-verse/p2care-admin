"use client";
import Page from "@/components/Page/PageAll";
import { Doctor } from "@/core/apiRoutes";

export default function Department() {


  const departmentColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Code", uid: "code", type: "text" },
    { name: "Description", uid: "description", type: "textbox" },
    { name: "MetaTitle", uid: "metaTitle", type: "text" },
    { name: "MetaDescription", uid: "metaDescription", type: "textbox" }
  ]
  return (
    <>
      <Page apiKey="department" api={Doctor.department} columns={departmentColumns} title="Department" />
    </>
  );
}
