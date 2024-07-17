import { CountCardProps } from "@/components/Cards/Count-Card"
import { FaBuilding } from "react-icons/fa";
import { PiHospitalThin } from "react-icons/pi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";

export interface SideBarLinkProps {
  name: string,
  link: string
}

export const SideBarLink = [
  {
    name: "Dashboard",
    link: "/dashboard"
  },
  {
    name: "Hospitals",
    link: "/dashboard/hospital"
  },
  {
    name: "Departments",
    link: "/dashboard/department"
  },
  {
    name: "Services",
    link: "/dashboard/services"
  },
  {
    name: "Doctors",
    link: "/dashboard/doctors"
  },
  {
    name: "Leads",
    link: "/dashboard/leads"
  },
  {
    name: "Users",
    link: "/dashboard/users"
  },
  {
    name: "Offers",
    link: "/dashboard/offers"
  },
  {
    name: "General",
    link: "/dashboard/general"
  },
  {
    name: "Content",
    link: "/dashboard/content"
  }
]

export const languange = [
  { key: "hindi", label: "Hindi" },
  { key: "english", label: "English" },
  { key: "german", label: "German" },
];

export const months = [
  { key: "january", label: "January" },
  { key: "february", label: "February" },
  { key: "march", label: "March" },
  { key: "april", label: "April" },
  { key: "may", label: "May" },
  { key: "june", label: "June" },
  { key: "july", label: "July" },
  { key: "august", label: "August" },
  { key: "september", label: "September" },
  { key: "october", label: "October" },
  { key: "november", label: "November" },
  { key: "december", label: "December" }
];
export const CountCardsList: CountCardProps[] = [
  {
    title: "Hospitals",
    count: 40689,
    icon: (
      <>
        <PiHospitalThin fill="#3F8EFC" size={50} />
      </>
    )
  },
  {
    title: "Departments",
    count: 40689,
    icon: (
      <>
        <FaHeartbeat
          size={40} fill="#3F8EFC" />
      </>
    )
  },
  {
    title: "Services",
    count: 40689,
    icon: (
      <>
        <FaHandHoldingHeart
          fill="#3F8EFC"
          size={40} />
      </>
    )
  },
  {
    title: "Users",
    count: 40689,
    icon: (
      <>
        <ImUsers
          fill="#3F8EFC"
          size={40} />
      </>
    )
  },
  {
    title: "Doctors",
    count: 40689,
    icon: (
      <>
        <FaUserDoctor
          fill="#3F8EFC"
          size={40} />
      </>
    )
  }
]

