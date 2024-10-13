"use client";

import AttachCard from "@/components/AttachCard";
import DataCard from "@/components/Cards/DataCard";
import { getData } from "@/core/apiHandler";
import {
  Doctor,
  HospitalRoutes,
  offerImageRoute,
  offerRoute,
  offers,
  serviceRoutes,
} from "@/core/apiRoutes";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { off } from "process";

export default function OffersPage() {
  const path = usePathname();
  const router = useRouter();
  const { id } = useParams();
  const departmentList = useAsyncList<any>({
    async load() {
      let res = await getData(Doctor.department, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const serviceList = useAsyncList<any>({
    async load() {
      let res = await getData(serviceRoutes.service, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const doctorList = useAsyncList<any>({
    async load() {
      let res = await getData(Doctor.docotor, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const hoapitalList = useAsyncList<any>({
    async load() {
      let res = await getData(HospitalRoutes.hospital, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });

  const breadCrumps = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Offer",
      link: "/dashboard/offers",
    },
    {
      name: "Offer Details",
      link: path,
    },
  ];
  const cols = [
    { name: "Banner", uid: "image", type: "image" },
    { name: "Percentage", uid: "percentage", type: "text" },
    { name: "Title", uid: "title", type: "text" },
    { name: "Service", uid: "serviceId", type: "servicedropdown" },
  ];
  return (
    <div className="flex flex-col w-full gap-4 p-[1rem]">
      <Breadcrumbs color="secondary" className="text-xl font-bold">
        {breadCrumps.map((b: any, index: any) => {
          return (
            <BreadcrumbItem key={index} onClick={() => router.push(b.link)}>
              {b.name}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
      <DataCard
        columns={cols}
        title={"Banner Details"}
        id={id}
        postimageapikey={offerImageRoute}
        getapikey="getbanner"
        getapi={offerRoute}
        editapi={offerRoute}
        editApikey="editbanner"
      />
      {/* <AttachCard id={id} getapi={offers.hospital} api={offers.hospital}
        title="Add Hospital"
        DropDown={hoapitalList} />
      <AttachCard id={id} getapi={offers.doctor} api={offers.doctor}
        title="Add Doctor"
        DropDown={doctorList} />
      <AttachCard id={id} getapi={offers.department} api={offers.department}
        title="Add Department"
        DropDown={departmentList} /> */}
    </div>
  );
}
