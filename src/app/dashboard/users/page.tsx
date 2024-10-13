"use client";
import Title, { SubTitle } from "@/components/titles";
import Page from "@/components/Page/PageAll";
import { AdminRoutes, Doctor, patientRoutes } from "@/core/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/core/apiHandler";
import { Card, Tab, Tabs } from "@nextui-org/react";

const Users = () => {
  const userColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    { name: "Phone", uid: "phone", type: "text" },
    { name: "Actions", uid: "actions", type: "actions" },
  ];
  const adminColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    { name: "Password", uid: "password", type: "password" },
    { name: "Actions", uid: "actions", type: "actions" },
  ];

  const enquiryColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phone", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Status",
      uid: "status",
      type: "enquirystatus",
    },
    {
      name: "Actions",
      uid: "actions",
      type: "actions",
    },
  ];

  const { data: status, isLoading } = useQuery({
    queryKey: ["getstatus"],
    queryFn: () => {
      return getData("/enquiry-status", {});
    },
  });

  const appointmentColumns = [
    { name: "Doctor Name", uid: "doctorName", type: "text" },
    { name: "Patient Name", uid: "patientName", type: "text" },
    {
      name: "Appointment Time",
      uid: "doctorSlot",
      type: "doctorSlot",
    },
  ];
  return (
    <div className="w-full flex flex-col">
      <Title title="Users" />
      <Page
        api={AdminRoutes.admin}
        apiKey={"admin"}
        columns={adminColumns}
        title="Admin"
      />
      <Page
        needAddModal={false}
        api={patientRoutes.patient}
        apiKey={"users"}
        columns={userColumns}
        title="Patient"
      />
      <SubTitle title="All Users Appointment" />
      <Page
        needAddModal={false}
        api={Doctor.appointments}
        apiKey="appointments"
        columns={appointmentColumns}
        title="Appointment"
      />
      <SubTitle title="All Users Enquiries" />
      <Tabs color="secondary" aria-label="Options">
        {status?.data.data.map((a: any, index: any) => {
          return (
            <Tab key={index} name={a.name} title={a.name}>
              <Card shadow="none">
                <Page
                  api={`/enquiry/all/leads/?type=66c0532b907dd1ab8cacd6ae&status=${a._id}`}
                  apiKey={`get-${a.name}-others`}
                  columns={enquiryColumns}
                  title={a.name}
                  needAddModal={false}
                />
              </Card>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Users;
