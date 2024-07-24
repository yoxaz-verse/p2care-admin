"use client";
import generateData from "@/content/tableData";
import Title from "@/components/titles";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Select,
  SelectItem,
  TimeInput,
  TimeInputValue,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Page from "@/components/Page/PageAll";
import { Doctor } from "@/core/apiRoutes";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Time } from "@internationalized/date";



const header = [
  {
    name: "Dashboard",
    link: "/dashboard"
  },
  {
    name: "Doctors",
    link: "/dashboard/doctors"
  },
  {
    name: "Doctor Detail",
    link: window.location.href
  }
]

export default function GetDocDetials() {
  const data = generateData({ tableName: "Doctors" })[1];
  const router = useRouter();
  const { id } = useParams();
  console.log(data);
  const timings = ["8:00AM-9:00AM", "9:00AM-10:00AM"];
  const appointmentColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Appointment Time", uid: "appointment", type: "appointmentTime"
    },
    {
      name: "Actions", uid: "actions", type: "actions"
    }
  ]
  const enquiryColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Status", uid: "status", type: "enquirystatus"
    },
    {
      name: "Actions", uid: "actions", type: "actions"
    }
  ]
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [showDropDown, setshowDropdown] = useState<boolean>(false);
  const [type, setype] = useState<any>('');
  const [valuetime, setValueTime] = useState<TimeInputValue>();
  const [sechudling, setSechduling] = useState<any>([
    {
      name: "Morning",
      timings: ["9:00AM"]
    },
    {
      name: "Afternoon",
      timings: ["12:00AM"]
    },
    {
      name: "Evening",
      timings: ["6:00PM"]
    },
  ]);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const handleUpdate = (type: any) => {
    const updated = sechudling.map((s: any) => {
      if (s.name === type) {
        return {
          ...s,
          timings: [...s.timings, `${valuetime?.hour} : ${valuetime?.minute === 0 ? "00" : valuetime?.minute} AM`]
        };
      }
      return s;
    })
    setSechduling(updated);
    setype('');
  }
  return (
    <>
      <div className="flex flex-col w-full gap-4 p-[1rem]">
        <Breadcrumbs color="secondary">
          {header.map((h: any) => {
            return <BreadcrumbItem onClick={() => router.push(h.link)}>{h.name}</BreadcrumbItem>
          })}
        </Breadcrumbs>
        <div className="flex flex-row justify-between w-full gap-4">
          <Title title={data.docName} />
          <div className="flex flex-row gap-4 justify-between">
            <Button color="danger" radius="full" onPress={onOpen}>Delete</Button>
            <Button color="primary" radius="full" onClick={() => setisEdit(true)}>Edit</Button>
          </div>
        </div>
        <Card className="flex flex-col justify-ceneter items-center">
          <CardHeader className="text-[15px] md:text-[30px] font-bold">
            Basic Details
          </CardHeader>
          <CardBody className="flex flex-col  gap-4 items-center  h-full">
            <Image
              src={data.docImage}
              alt="docImage"
              width={100}
              className="rounded-full"
              height={100}
            />
            <Input
              label="Doctor Name"
              isReadOnly={isEdit}
              value={data.docName}
              placeholder="Docotor Name"
            />
            <Input
              label="Doctor Email"
              value={data.email}
              isReadOnly={isEdit}
              placeholder="Docotor Email"
            />
            <Input
              label="Doctor Phone"
              value={data.phoneno}
              readOnly
              placeholder="Docotor Phone"
            />
            {isEdit &&
              <Button variant="ghost" color="secondary" radius="full" className="w-full md:w-1/2">
                Submit
              </Button>
            }
          </CardBody>
        </Card>
        <Card className="flex flex-col justify-ceneter items-center">
          <CardHeader className="text-[15px] md:text-[30px] font-bold">
            Scheduling
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {sechudling.map((s: any) => {
              return (
                <>
                  <div className="flex flex-row items-center w-1/4 justify-around">
                    <h1 className="font-bold">{s.name}</h1>
                    {s.timings.map((t: any) => {
                      return (
                        <div className="flex flex-row justify-start w-20">
                          <Chip color="secondary" radius="full" variant="solid">{t} </Chip>
                        </div>
                      )
                    })}
                    <FaEdit onClick={() => setype(s)} />
                    {s.name === type.name && (
                      <div className="flex items-center w-1/4">
                        <TimeInput value={valuetime} onChange={(e) => setValueTime(e)} defaultValue={type.timings[type.timings.length]} maxValue={new Time(12)} />
                        <Button color="secondary" onClick={() => handleUpdate(type.name)}>Update</Button>
                      </div>
                    )}
                  </div>
                </>
              )
            })}
            {isEdit &&
              <Button variant="ghost" color="secondary" radius="full" className="w-full md:w-1/2">
                Submit
              </Button>
            }
          </CardBody>
        </Card>
        <Card className="flex flex-col justify-ceneter items-center">
          <CardHeader className="text-[15px] md:text-[30px] font-bold">
            Pricings
          </CardHeader>
          <CardBody className="flex flex-col gap-4 items-center">
            <Input label="Pricing" value={"Rs 700"} />
            {isEdit &&
              <Button variant="ghost" color="secondary" radius="full" className="w-full md:w-1/2">
                Submit
              </Button>
            }
          </CardBody>
        </Card>
        <Page api={Doctor.enquiry} apiKey="enquiryByHospital" columns={enquiryColumns} title={`${data.docName} Enquiry`} />
        <Page api={Doctor.appointments} apiKey="appointments" columns={appointmentColumns} title={`${data.docName} Appointment`} />
      </div >
      <DeleteModal onOpenChange={onOpenChange} isOpen={isOpen} title="Doctor" api={Doctor.docotor} data={id} queryKey={["doctor"]} />
    </>
  );
}
