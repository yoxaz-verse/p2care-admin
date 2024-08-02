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
  Select,
  SelectItem,
  TimeInput,
  DatePicker,
} from "@nextui-org/react";
// import { getData } from "@/backend/Services/firestore";
import Image from "next/image";
import { EyeIcon } from "../icons/eyeIcon";
import { EditIcon } from "../icons/editIcon";
import { DeleteIcon } from "../icons/deleteIcon";
import { useRouter } from "next/navigation";
import { TbEyeDiscount } from "react-icons/tb";
import { ImBin } from "react-icons/im";
import { FaPencilAlt, FaUser } from "react-icons/fa";
import { Time } from "@internationalized/date";
import { FaUserDoctor } from "react-icons/fa6";
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
import { motion } from "framer-motion";
interface CustomTableProps {
  title: string;
  data: any;
  columns: any;
  // generateRandomId: () => void;
  onOpenEdit: (data: any) => any;
  onOpenDelete: (data: any) => any;
  onOpenView: (data: any) => any;
  setPage: (page: number) => void;
  limit: number;
}
export default function CustomTable({
  data,
  columns,
  onOpenEdit,
  onOpenView,
  onOpenDelete,
  setPage,
  limit,
}: CustomTableProps) {
  const status = ["Pending", "Completed", "In way"];
  const navigate = useRouter();
  const renderCell = React.useCallback((data: any, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof any];
    console.log(cellValue);
    console.log(columnKey);
    console.log(data);


    switch (columnKey) {
      case "meta Title":
        return <h3>{data?.metaTitle}</h3>;
      case "meta Description":
        return <h3>{data?.metaDescription}</h3>;
      case "gender":
        return <h3>{data?.gender?.name}</h3>
      case "designation":
        return <h3>{data?.designation?.name}</h3>
      case "department":
        return <h3>{data?.department?.name}</h3>
      case "district":
        return <h3>{data?.district?.name}</h3>
      case "city":
        return <h3>{data?.city?.name}</h3>
      case "name":
        return <h3>{data?.name}</h3>;
      case "complete_date":
        return <h3>{data?.completion_date}</h3>;
      case "project_link":
        return (
          <Link href={data.project_link} target="_blank" underline={"hover"}>
            {data.project_link}
          </Link>
        );
      case "password":
        return null;
      case "heading":
        return <h3>{data?.heading}</h3>;
      case "youtubeLink":
        return (
          <Link href={data?.youtubeLink} target="_blank" underline={"hover"}>
            {data.youtubeLink}
          </Link>
        );
      case "appointmentTime":
        return (
          <div className="flex flex-row justify-around bg-white gap-4 items-center ">
            <TimeInput
              label="Meeting time"
              className="bg-white"
              defaultValue={new Time(9)}
            />
            <DatePicker className="bg-white" />
            <Button color="secondary" className="p-4">
              Reschedule
            </Button>
          </div>
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
      case "enquiryStatus":
        return (
          <Select
            isRequired
            label="Status"
            placeholder="Update Status"
            defaultSelectedKeys={["Pending"]}
            className="max-w-full"
          >
            {status.map((s: any) => (
              <SelectItem key={s}>{s}</SelectItem>
            ))}
          </Select>
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
                  onOpenView(data);
                }}
              >
                {" "}
                <EyeIcon />
              </Button>
              <Button
                isIconOnly
                onClick={() => {
                  onOpenDelete(data);
                }}
              >
                {" "}
                <DeleteIcon />
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
                <DeleteIcon className="fill-red-400" />
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
                <EyeIcon />
                <TbEyeDiscount />
              </Button>
            </div>
          </>
        );
      case "actions5":
        return (
          <>
            <div className="flex items-center self-end w-fit">
              <Button
                isIconOnly
                className="bg-inherit"
                onClick={() => {
                  onOpenView({ data: data, type: "department" });
                }}
              >
                {" "}
                <FaUserDoctor />
              </Button>
              <Button
                isIconOnly
                className="bg-inherit"
                onClick={() => {
                  onOpenEdit(data);
                }}
              >
                {" "}
                <EditIcon />
                {/* <FaPencilAlt /> */}
              </Button>
              <Button
                isIconOnly
                className="bg-white"
                onClick={() => {
                  onOpenDelete(data);
                }}
              >
                {" "}
                {/* <ImBin className="fill-white" /> */}
                <DeleteIcon className="fill-red-400" />
              </Button>
            </div>
          </>
        );
      case "actions5":
        return (
          <>
            <div className="flex items-center self-end w-fit">
              <Button
                isIconOnly
                className="bg-inherit"
                onClick={() => {
                  onOpenView({ data: data, type: "doctor" });
                }}
              >
                {" "}
                <FaUserDoctor />
              </Button>
              <Button
                isIconOnly
                className="bg-inherit"
                onClick={() => {
                  onOpenEdit(data);
                }}
              >
                {" "}
                <EditIcon />
                {/* <FaPencilAlt /> */}
              </Button>
              <Button
                isIconOnly
                className="bg-white"
                onClick={() => {
                  onOpenDelete(data);
                }}
              >
                {" "}
                {/* <ImBin className="fill-white" /> */}
                <DeleteIcon className="fill-red-400" />
              </Button>
            </div>
          </>
        );

      case "actions4":
        return (
          <>
            <div className="flex items-center self-end w-fit">
              <Button
                isIconOnly
                className="bg-inherit"
                onClick={() => {
                  onOpenView({ data: data, type: "doctor" });
                }}
              >
                {" "}
                <FaUserDoctor />
              </Button>
              <Button
                isIconOnly
                className="bg-inherit"
                onClick={() => {
                  onOpenView({ data: data, type: "user" });
                }}
              >
                {" "}
                <FaUser />
              </Button>
              <Button
                isIconOnly
                className="bg-inherit"
                onClick={() => {
                  onOpenEdit(data);
                }}
              >
                {" "}
                <EditIcon />
                {/* <FaPencilAlt /> */}
              </Button>
              <Button
                isIconOnly
                className="bg-white"
                onClick={() => {
                  onOpenDelete(data);
                }}
              >
                {" "}
                {/* <ImBin className="fill-white" /> */}
                <DeleteIcon className="fill-red-400" />
              </Button>
            </div>
          </>
        );

      case "actions":
        return (
          <>
            <div className="flex items-center self-end w-fit">
              <Button
                isIconOnly
                className="bg-inherit"
                onClick={() => {
                  onOpenView(data);
                }}
              >
                {" "}
                <EyeIcon />
              </Button>
              <Button
                isIconOnly
                className="bg-inherit"
                onClick={() => {
                  onOpenEdit(data);
                }}
              >
                {" "}
                <EditIcon />
                {/* <FaPencilAlt /> */}
              </Button>
              <Button
                isIconOnly
                className="bg-white"
                onClick={() => {
                  onOpenDelete(data);
                }}
              >
                {" "}
                {/* <ImBin className="fill-white" /> */}
                <DeleteIcon className="fill-red-400" />
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

  const pages = data?.totalPages || 1;
  return (

    <Table
      classNames={{
        table: "min-h-[200px]",
      }}
      aria-label="Table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={data?.currentPage ?? 1}
            total={pages}
            onChange={(page) => {
              setPage(page);
            }}
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
      <TableBody emptyContent={<div>No data is there</div>} className="max-h-[2000px]" items={data?.data || data}>
        {(item: any) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell className="self-center">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
