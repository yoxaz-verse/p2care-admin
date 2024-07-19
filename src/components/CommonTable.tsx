import React, { Suspense } from "react";
import { Table, TableHeader, TableColumn, TableBody, Pagination, Spinner, TableCell, TableRow } from "@nextui-org/react";
export default function CommonTable(props: {
  columns: {
    key: string;
    label: string;
    logic: (item: any) => any;
  }[];
  tableData: any;
  totalItems: number;
  onPageChange: (page: number) => void;
  currentPage: number;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}) {
  console.log(props.tableData);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Table
        shadow="md"
        className="overflow-x-scroll"
        style={{
          outline: "none",
          border: "none",
          width: "100%",
        }}
      >
        <TableHeader>
          {props.columns.map((column) => (
            <TableColumn className="font-bold" key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={props.isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={props.isLoading ? " " : "No data found."}
          onError={() => <div>error</div>}
        >
          {props.tableData?.map((item: any, index: number) => (
            <TableRow key={index}>
              {props.columns.map((column) => (
                <TableCell key={column.key}>{column.logic(item)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={props.currentPage}
          total={props.totalItems > 5 ? Math.ceil(props.totalItems / 5) : 1}
          onChange={(page) => {
            props.onPageChange(page);
          }}
        />
      </div>
    </Suspense>
  );
}
