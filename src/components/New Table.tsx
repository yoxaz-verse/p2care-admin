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
  Input,
  ModalBody,
  ModalFooter,
  useDisclosure,
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
import { getData, patchData } from "@/core/apiHandler";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryAdmin } from "@/app/providers";
interface CustomTableProps {
  title: string;
  data: any;
  columns: any;
  // generateRandomId: () => void;
  onOpenEdit: (data: any) => any;
  getApi?: any;
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
  getApi,
  setPage,
  limit,
}: CustomTableProps) {
  const { data: status, isLoading } = useQuery({
    queryKey: ["getstatus"],
    queryFn: () => {
      return getData("/enquiry-status", {});
    },
  });
  const appStatus = useMutation({
    mutationKey: ["appointmentUpdate"],
    mutationFn: (data: any) => {
      return patchData(`/appointment/${data.id}`, data.item, {});
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.success("Updated the status", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: [getApi, data.id, ""] });
    },
    onError: (error: any) => {
      toast.success("Updating the status failed", {
        position: "top-right",
        className: "bg-red-300",
      });
    },
  });

  const enuiryStatus = useMutation({
    mutationKey: ["enquiryUpdate"],
    mutationFn: (data: any) => {
      return patchData(`/enquiry/${data.id}`, data.item, {});
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.success("Updated the status", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: [getApi] });
    },
    onError: (error: any) => {
      toast.success("Updating the status failed", {
        position: "top-right",
        className: "bg-red-300",
      });
    },
  });

  const handleUpdateApp = (st: any, data: any) => {
    const item = {
      enquiryStatus: st,
    };
    const id = data._id;
    appStatus.mutate({ item, id });
  };
  const handleUpdate = (st: any, data: any) => {
    const item = {
      enquiryStatus: st,
    };
    const id = data._id;
    enuiryStatus.mutate({ item, id });
  };
  const renderCell = React.useCallback((data: any, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof any];
    console.log(cellValue);
    console.log(columnKey);
    switch (columnKey) {
      case "meta Title":
        return <h3>{data?.metaTitle}</h3>;
      case "meta Description":
        return <h3>{data?.metaDescription}</h3>;
      case "gender":
        return <h3>{data?.gender?.name}</h3>;
      case "designation":
        return <h3>{data?.designation?.name}</h3>;
      case "department":
        return <h3>{data?.department?.name}</h3>;
      case "district":
        return <h3>{data?.district?.name}</h3>;
      case "city":
        return <h3>{data?.city?.name}</h3>;
      case "name":
        return <h3>{data?.name}</h3>;
      case "complete_date":
        return <h3>{data?.completion_date}</h3>;
      case "enquiryType":
        return <h3>{data?.enquiryType?.name}</h3>;
      case "project_link":
        return (
          <Link href={data.project_link} target="_blank" underline={"hover"}>
            {data.project_link}
          </Link>
        );
      case "enquiryStatus":
        return (
          <>
            <Select
              placeholder="Update the Status"
              description="Update the status from here"
              onChange={(e: any) => handleUpdate(e.target.value, data)}
              defaultSelectedKeys={[data?.enquiryStatus?._id]}
              className="max-w-xs"
            >
              {status?.data?.data?.map((status: any) => (
                <SelectItem key={status?._id} value={status?._id}>
                  {status?.name}
                </SelectItem>
              ))}
            </Select>
          </>
        );
      case "appstatus":
        return (
          <>
            <Select
              placeholder="Update the Status"
              description="Update the status from here"
              selectedKeys={[data?.enquiryStatus?._id]}
              onChange={(e: any) => handleUpdateApp(e.target.value, data)}
              className="max-w-xs"
            >
              {status?.data?.data?.map((status: any) => (
                <SelectItem key={status?._id} value={status?._id}>
                  {status?.name}
                </SelectItem>
              ))}
            </Select>
          </>
        );

      case "status":
        return (
          <>
            <Select
              placeholder="Update the Status"
              description="Update the status from here"
              selectedKeys={[data?.enquiryStatus?._id]}
              onChange={(e: any) => handleUpdate(e.target.value, data)}
              className="max-w-xs"
            >
              {status?.data?.data?.map((status: any) => (
                <SelectItem key={status?._id} value={status?._id}>
                  {status?.name}
                </SelectItem>
              ))}
            </Select>
          </>
        );
      case "patientName":
        return data.patient?.name;
      case "doctorName":
        return data.doctor?.name;
      case "password":
        return null;
      case "heading":
        return <h3>{data?.heading}</h3>;
      case "doctorSlot":
        console.log(data.doctorSlot.slotTime);
        const date = new Date(data?.doctorSlot?.slotTime);
        const localeTimeString = date.toLocaleTimeString();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return (
          <>
            <div className="flex flex-row justify-around bg-white gap-4 items-center ">
              <TimeInput
                label="Doctor Appointment"
                isReadOnly={true}
                color="primary"
                defaultValue={new Time(Number(hours), Number(minutes))}
              />
              <Button
                color="secondary"
                onPress={() => {
                  onOpenEdit(data);
                }}
              >
                Reschedule
              </Button>
            </div>
          </>
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
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {data.team}
            </p>
          </div>
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
        console.log(data.doctor._id);
        return (
          <>
            <div className="flex items-center self-end w-fit">
              <Button isIconOnly className="bg-inherit" onClick={() => {}}>
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
      case "fullName":
        return data?.fullName;
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
      <TableBody
        emptyContent={<div>No data is there</div>}
        className="max-h-[2000px]"
        items={data?.data || data}
      >
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
