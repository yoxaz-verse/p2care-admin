import { CountCardProps } from "@/components/Cards/Count-Card"
import { FaBuilding } from "react-icons/fa";
import { PiHospitalThin } from "react-icons/pi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import CommonTable from "@/components/CommonTable";

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
    link: "/dashboard/hospitals"
  },
  {
    name: "Departments",
    link: "/dashboard/departments"
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
export const TableHeadings: string[] = [
  "Departments",
  "Doctors",
  "Services",
  "Hospitals",
  "Doctors by Hospitals",
]
export const TabsNames: string[] = [
  "Status 1",
  "Status 2",
  "Status 3"
]
interface TableProps {
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
}


export const Statuses: string[] = [
  "Status 1",
  "Status 2",
  "Active",
  "Inactive"
]

interface generateTable extends TableProps {
  case: string
}

export const generateTable = ({ totalItems, currentPage, columns, tableData, isLoading, isError, isSuccess, onPageChange }: TableProps) => {
  return <CommonTable
    totalItems={totalItems}
    currentPage={currentPage}
    isSuccess={isSuccess}
    isError={isError}
    columns={columns}
    isLoading={isLoading}
    tableData={tableData}
    onPageChange={onPageChange} />
}

