import React from "react";
import QueryComponent from "./queryComponent";
import CustomTable from "../New Table";
import { Spacer } from "@nextui-org/react";
import Title, { SubTitle } from "../titles";
import AddModal from "../Modals/newAddModal";

interface ICurdTableProps {
  title: string;
  api: string;
  queryKey: string[];
  columns: any;
  DropDownData?: any;
  onOpenEdit: (data: any) => void;
  onOpenDelete: (data: any) => void;
  onOpenView: (data: any) => void;
  onOpenCreate: (data: any) => void;
  redirect?: string;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  search?: string;
}

function CurdTable(props: ICurdTableProps) {
  return (
    <div className="w-full">
      <Spacer y={5} />
      <div className="flex justify-between">
        <SubTitle title={props.title} />
        <AddModal
          title={props.title}
          columns={props.columns}
          DropDownData={props.DropDownData}
          api={props.api}
          apiKey={props.queryKey}
        />
      </div>
      <Spacer y={3} />
      <QueryComponent
        api={props.api}
        queryKey={props.queryKey}
        page={props.page}
        limit={props.limit}
        search={props.search}
      >
        {(data) => {
          return (
            <CustomTable
              title={props.title}
              data={data}
              columns={props.columns}
              onOpenEdit={(data: any) => props.onOpenEdit(data)}
              onOpenView={(data: any) => props.onOpenView(data)}
              onOpenDelete={(data: any) => props.onOpenDelete(data)}
              setPage={props.setPage}
              limit={props.limit}
            />
          );
        }}
      </QueryComponent>
    </div>
  );
}

export default CurdTable;
