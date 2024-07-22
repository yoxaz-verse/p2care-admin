import React from "react";
import QueryComponent from "./queryComponent";
import CustomTable from "../New Table";
import { Button, Spacer, useDisclosure } from "@nextui-org/react";
import Title, { SubTitle } from "../titles";
import { useRouter } from "next/navigation";
import AddModal from "../Modals/newAddModal";
import { postData } from "@/core/apiHandler";
interface ICurdTableProps {
  title: string;
  api: string;
  queryKey: string[];
  columns: any;
  onOpenEdit: (data: any) => void;
  onOpenDelete: (data: any) => void;
  onOpenView: (data: any) => void;
  onOpenCreate: (data: any) => void;
  redirect?: string;
}

function CurdTable(props: ICurdTableProps) {
  const router = useRouter();
  return (
    <div className="w-full">
      <Title title={props.title} />
      <Spacer y={5} />
      <div className="flex justify-between">
        <SubTitle title={props.title} />
        <AddModal title={props.title} columns={props.columns} api={props.api} apiKey={props.queryKey} />
      </div>
      <Spacer y={3} />
      <QueryComponent api={props.api} queryKey={props.queryKey}>
        {(data) => {
          return (
            <CustomTable
              title="Genders"
              data={data}
              columns={props.columns}
              onOpenEdit={(data: any) => props.onOpenEdit(data)}
              onOpenView={(data: any) => props.onOpenView(data)}
              onOpenDelete={(data: any) => props.onOpenDelete(data)}
            />
          );
        }}
      </QueryComponent>
    </div>
  );
}

export default CurdTable;
