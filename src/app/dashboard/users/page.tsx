"use client";
import { generateTabColumns } from "@/content/table-columns";
import generateData from "@/content/tableData";
import Title from "@/components/titles";
import { generateTable } from "@/utilis/content";
import React, { useState } from "react";
import Page from "@/components/Page/PageAll";
import { AdminRoutes } from "@/core/apiRoutes";

const Users = () => {
  const [page, setPage] = useState<any>(1);

  const userColumns = [

  ]
  const adminColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    { name: "Password", uid: "password", type: "password" },
    { name: "Actions", uid: "actions", type: "actions" }
  ]
  return (
    <div className="w-full flex flex-col">
      <Title title="Users" />
      <Page api={AdminRoutes.admin} apiKey={"admin"} columns={adminColumns} title="Admin" />
    </div>
  );
};

export default Users;
