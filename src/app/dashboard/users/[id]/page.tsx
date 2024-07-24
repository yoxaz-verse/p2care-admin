"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { useRouter } from "next/navigation";

const breadCrumps = [
  {
    name: "Dashboard",
    link: "/dashboard"
  },
  {
    name: "User",
    link: "/dashboard/users"
  },
  {
    name: "User Details",
    link: window.location.href
  }
]


export default function() {
  const router = useRouter();
  return (
    <>
      <Breadcrumbs color="secondary">
        {breadCrumps.map((b: any) => {
          return <BreadcrumbItem onClick={() => router.push(b.name)}>{b.name}</BreadcrumbItem>
        })}
      </Breadcrumbs>
    </>
  )
}
