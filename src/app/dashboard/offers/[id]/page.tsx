'use client';

import DataCard from "@/components/Cards/DataCard";
import { offerRoute } from "@/core/apiRoutes";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function OffersPage() {
  const path = usePathname();
  const router = useRouter();
  const { id } = useParams();

  const breadCrumps = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Offer",
      link: "/dashboard/offers"
    },
    {
      name: "Offer Details",
      link: path
    }
  ]
  const cols = [
    { name: "Percentage", uid: "percentage", type: "text" },
    { name: "Title", uid: "title", type: "text" },
  ]
  return (
    <div className="flex flex-col w-full gap-4 p-[1rem]">
      <Breadcrumbs color="secondary" className="text-xl font-bold">
        {breadCrumps.map((b: any, index: any) => {
          return <BreadcrumbItem key={index} onClick={() => router.push(b.link)}>{b.name}</BreadcrumbItem>
        })}
      </Breadcrumbs>
      <DataCard columns={cols} title={"Banner Details"} id={id} getapikey="getbanner" getapi={offerRoute} editapi={offerRoute} editApikey="editbanner" />
    </div>
  )
}
