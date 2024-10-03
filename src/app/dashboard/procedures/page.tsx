"use client";
import Page from "@/components/Page/PageAll";
import Title, { SubTitle } from "@/components/titles";
import { getData } from "@/core/apiHandler";
import { Doctor, HospitalRoutes } from "@/core/apiRoutes";
import { Card, Tab, Tabs } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useQuery } from "@tanstack/react-query";

export default function Department() {
  const { data: getProceudre } = useQuery({
    queryKey: ["get-prodcedure"],
    queryFn: () => {
      return getData(Doctor.procedure, {});
    },
  });

  const procedureColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Department", uid: "department", type: "departmentDropdown" },
    {
      name: "Actions",
      uid: "actions",
      type: "actions",
    },
  ];
  const list1 = useAsyncList<any>({
    async load() {
      let res = await getData(Doctor.department, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const DropDownData = {
    department: list1,
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-[1rem] w-full">
        <Title title="Departments" />
        <Page
          dropDownData={DropDownData}
          api={Doctor.procedure}
          apiKey="procedure"
          columns={procedureColumns}
          title={`Procedures`}
        />
      </div>
    </>
  );
}
