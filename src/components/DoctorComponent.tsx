import { Doctor } from "@/core/apiRoutes";
import Page from "./Page/PageAll";

interface DoctorComponentProps {
  DepartmentData: any;
  DesignationData: any;
  GenderData: any;
}

export default function DoctorComponent({ DepartmentData, DesignationData, GenderData }: DoctorComponentProps) {
  const DropDownData = {
    "department": DepartmentData,
    "designation": DesignationData,
    "gender": GenderData
  }
  const docColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phone", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Department", uid: "department", type: "departmentDropdown"
    },
    { name: "Designation", uid: "designation", type: "desginationDropDown" },
    {
      name: "Gender", uid: "gender", type: "genderDropdown"
    },
    { name: "Actions", uid: "action", type: "action" }
  ]

  return (
    <Page api={Doctor.docotor} apiKey="doctor" dropDownData={DropDownData} columns={docColumns} title="Doctor" />
  )
}
