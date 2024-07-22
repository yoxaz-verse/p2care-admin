import React from "react";
import QueryComponent from "./queryComponent";
import CustomTable from "../New Table";
import { Button, Spacer } from "@nextui-org/react";
import Title, { SubTitle } from "../titles";
import { useRouter } from "next/navigation";
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
      <Title title={"Page Title"} />
      <Spacer y={5} />
      <div className="flex justify-between">
        <SubTitle title={props.title} />
        <div>
          <Button color="secondary" onClick={props.onOpenCreate}>
            Create
          </Button>
        </div>
      </div>
      <Spacer y={3} />
      <QueryComponent api={props.api} queryKey={props.queryKey}>
        {(data) => {
          return (
            <CustomTable
              title="Genders"
              data={data}
              columns={props.columns}
              onOpenEdit={() => {}}
              onOpenView={() => {
                if (props.redirect) {
                  router.push(props.redirect);
                } else {
                }
              }}
              onOpenDelete={() => {}}
            />
          );
        }}
      </QueryComponent>
    </div>
  );
}

export default CurdTable;
