"use client";
import generateData from "@/content/tableData";
import Title from "@/components/titles";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GetDocDetials() {
  const data = generateData({ tableName: "Doctors" })[1];
  console.log(data);
  const timings = ["8:00AM-9:00AM", "9:00AM-10:00AM"];
  return (
    <>
      <div className="flex flex-col w-full gap-4 p-[1rem]">
        <Title title="Doctor Details" />
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
              value={data.docName}
              placeholder="Docotor Name"
            />
            <Input
              label="Doctor Email"
              value={data.email}
              placeholder="Docotor Email"
            />
            <Button color="primary" radius="full" className="w-full md:w-1/2">
              Submit
            </Button>
          </CardBody>
        </Card>
        <Card className="flex flex-col justify-ceneter items-center">
          <CardHeader className="text-[15px] md:text-[30px] font-bold">
            Scheduling
          </CardHeader>
          <CardBody className="flex flex-col gap-4 items-center gap-4">
            <Select
              label="Select Timings"
              defaultSelectedKeys={["8:00AM-9:00AM"]}
            >
              {timings.map((t: any, index: any) => {
                return (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                );
              })}
            </Select>
            <Button color="primary" radius="full" className="w-full md:w-1/2">
              Submit
            </Button>
          </CardBody>
        </Card>
        <Card className="flex flex-col justify-ceneter items-center">
          <CardHeader className="text-[15px] md:text-[30px] font-bold">
            Pricings
          </CardHeader>
          <CardBody className="flex flex-col gap-4 items-center">
            <Input label="Pricing" value={"Rs 700"} />
            <Button color="primary" radius="full" className="w-full md:w-1/2">
              Submit
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
