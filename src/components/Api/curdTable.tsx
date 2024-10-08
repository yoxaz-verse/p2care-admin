import React from "react";
import QueryComponent from "./queryComponent";
import CustomTable from "../New Table";
import { Input, Spacer } from "@nextui-org/react";
import { SubTitle } from "../titles";
import AddModal from "../Modals/newAddModal";
import { SearchIcon } from "@/icons/searchIcon";

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
  addModal?: boolean;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  limit: number;
  search?: string;
  searchBy?: string[];
}

function CurdTable(props: ICurdTableProps) {
  return (
    <div className="w-full">
      <Spacer y={5} />
      <div className="flex justify-between">
        <SubTitle title={props.title} />
        <div className="flex items-center  gap-4">
          {props.searchBy && props.searchBy.length > 0 && (
            <Input
              type="text"
              label="Search"
              className="bg-white border rounded-sm"
              placeholder={`Search by ${
                props.searchBy.map((item) => item).join(", ") || ""
              }`}
              labelPlacement="inside"
              onChange={(e) => {
                const delayDebounceFn = setTimeout(() => {
                  props.setSearch(e.target.value);
                  props.setPage(1);
                }, 1000);

                return () => clearTimeout(delayDebounceFn);
              }}
              startContent={
                <SearchIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          )}
          {props.addModal && (
            <AddModal
              title={props.title}
              columns={props.columns}
              DropDownData={props.DropDownData}
              api={props.api}
              apiKey={props.queryKey}
            />
          )}
        </div>
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
          console.log("Api", data);
          return (
            <CustomTable
              title={props.title}
              data={data}
              getApi={props.queryKey}
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
