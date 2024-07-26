import { Doctor } from "@/core/apiRoutes";
import Page from "./Page/PageAll";

interface DoctorComponentProps {
  DepartmentData: any;
  DesignationData: any;
}

export default function DoctorComponent({ DepartmentData, DesignationData }: DoctorComponentProps) {
  const DropDownData = {
    "department": DepartmentData,
    "designation": DesignationData
  }
  const docColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Department", uid: "department", type: "departmentDropdown"
    },
    { name: "Designation", uid: "Designation", type: "desginationDropDown" },
    { name: "Actions", uid: "actions", type: "actions" }
  ]

  return (
    <Page api={Doctor.docotor} apiKey="doctor" dropDownData={DropDownData} columns={docColumns} title="Doctor" />
  )
}
