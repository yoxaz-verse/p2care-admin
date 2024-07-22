"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  Pagination,
  Textarea,
  Link,
  Button,
} from "@nextui-org/react";
// import { getData } from "@/backend/Services/firestore";
import Image from "next/image";
// import { EyeIcon } from "../Icons/EyeIcon";
// import { EditIcon } from "../Icons/EditIcon";
// import { DeleteIcon } from "../Icons/DeleteIcon";
import { useRouter } from "next/navigation";
import { users } from "./data";
import { TbEyeDiscount } from "react-icons/tb";
import { ImBin } from "react-icons/im";
import { FaPencilAlt } from "react-icons/fa";
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

interface CustomTableProps {
  title: string;
  data: any;
  columns: any;
  // generateRandomId: () => void;
  onOpenEdit: (data: any) => any;
  onOpenDelete: (data: any) => any;
  onOpenView: (data: any) => any;
}
export default function CustomTable({
  title,
  data,
  columns,
  onOpenEdit,
  onOpenView,
  onOpenDelete,
}: CustomTableProps) {
  const [table_data, setTableData] = React.useState(users);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  console.log(data);

  const navigate = useRouter();
  const renderCell = React.useCallback(
    (data: any, columnKey: React.Key) => {
      const cellValue = data[columnKey as keyof any];
      const post_code = data["postal code"];
      console.log(columnKey);

    switch (columnKey) {
      case "name":
        return <h3>{data.name}</h3>;
      case "complete_date":
        return <h3>{data.completion_date}</h3>;
      case "project_link":
        return (
          <Link href={data.project_link} target="_blank" underline={"hover"}>
            {data.project_link}
          </Link>
        );
      case "heading":
        return <h3>{data.heading}</h3>;
      case "youtubeLink":
        return (
          <Link href={data.youtubeLink} target="_blank" underline={"hover"}>
            {data.youtubeLink}
          </Link>
        );
      case "image":
        return <Image src={data.image} alt={"images"} width={50} height={50} />;
      case "images":
        return (
          <Image src={data.images[0]} alt={"images"} width={50} height={50} />
        );
      case "description":
        return (
          <Textarea
            isReadOnly
            defaultValue={data.description}
            className="max-w-xs"
          />
        );
      case "resume":
        return (
          <Button color="secondary" onClick={() => navigate.push(data.resume)}>
            Click Here
          </Button>
        );
      case "postal code":
        return post_code;
      case "project_details":
        return (
          <div className="flex flex-col gap-4">
            {data?.projectDetails &&
              data.projectDetails.map((p: any, index: number) => (
                <Chip color="primary" key={index}>
                  {p}
                </Chip>
              ))}
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {data.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[data.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "action":
        return (
          <>
            <div className="relative flex items-center gap-2">
              <Button
                isIconOnly
                className="bg-transparent"
                onClick={() => {
                  console.log(data);
                  onOpenView(data);
                }}
              >
                {" "}
                <TbEyeDiscount />
              </Button>
              <Button
                isIconOnly
                className="bg-red-500"
                onClick={() => {
                  onOpenDelete(data);
                }}
              >
                {" "}
                <ImBin className="fill-white" />
              </Button>
            </div>
          </>
        );
      case "action3":
        return (
          <>
            <div className="relative flex items-center gap-2">
              <Button
                isIconOnly
                className="bg-transparent"
                onClick={() => {
                  onOpenDelete(data);
                }}
              >
                {" "}
                {/* <DeleteIcon className="fill-red-400" /> */}
                <ImBin className="fill-white" />

              </Button>
            </div>
          </>
        );
      case "action2":
        return (
          <>
            <div className="relative flex items-center gap-2">
              <Button
                isIconOnly
                className="bg-transparent"
                onClick={() => {
                  onOpenView(data);
                }}
              >
                {" "}
                {/* <EyeIcon /> */}
                <TbEyeDiscount />
              </Button>
            </div>
          </>
        );

      case "actions":
        return (
          <>
            <div className="relative flex items-center gap-2">
              <Button
                isIconOnly
                className="bg-transparent"
                onClick={() => {
                  onOpenView(data);
                }}
              >
                {" "}
                {/* <EyeIcon /> */}
              </Button>
              <Button
                isIconOnly
                className="bg-transparent"
                onClick={() => {
                  onOpenEdit(data);
                }}
              >
                {" "}
                {/* <EditIcon /> */}
              </Button>
              <Button
                isIconOnly
                className="bg-transparent"
                onClick={() => {
                  onOpenDelete(data);
                }}
              >
                {" "}
                {/* <DeleteIcon className="fill-red-400" /> */}
              </Button>
            </div>
          </>
        );
      case "service_dropdown":
        return data.services_provided;
      default:
        return cellValue;
    }
  }, []);

  useEffect(() => {
    if (data) {
      setTableData(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages === 0 ? 1 : data.totalPages);
    }
  }, [data]);

  const rowsPerPage = 10;

  const pages = data.totalPages;

  const items = React.useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return table_data.slice(start, end);
  }, [currentPage, table_data]);
  return (
    <Table
      aria-label="Example table with custom cells"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        loadingContent={
          isLoading ? <Spinner color="secondary" label="Loading..." /> : <></>
        }
        isLoading={isLoading}
        emptyContent={"No data to display.."}
        items={items}
      >
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
