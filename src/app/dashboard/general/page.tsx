"use client";

import React from "react";
import Page from "@/components/Page/PageAll";
import { GeneralRoutes } from "@/core/apiRoutes";

const General = () => {
  const blogColumns = [
    { name: "Title", uid: "title", type: "text" },
    { name: "Description", uid: "description", type: "text" },
    { name: "ACTIONS", uid: "actions", type: "action" },
  ];
  return (
    <>
      <div className="w-full flex flex-col">
        <Page
          apiKey="blog"
          title="Blog"
          api={GeneralRoutes.blog}
          columns={blogColumns}
        />
      </div>
    </>
  );
};

export default General;
