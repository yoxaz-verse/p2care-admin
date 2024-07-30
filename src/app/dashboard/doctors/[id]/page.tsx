"use client";
import { useEffect } from "react";
import generateData from "@/content/tableData";
import Title from "@/components/titles";
import {
  Autocomplete,
  AutocompleteItem,
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
  Spinner,
  TimeInput,
  TimeInputValue,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import Page from "@/components/Page/PageAll";
import { DesignationRoutes, Doctor, GenderRoutes } from "@/core/apiRoutes";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Time } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getData, postData, postMultipart } from "@/core/apiHandler";
import { useAsyncList } from "@react-stately/data";
import { toast } from "sonner";
import { queryAdmin } from "@/app/providers";

export default function GetDocDetials() {
  const path = usePathname();

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
      link: path
    }
  ]
  const data = generateData({ tableName: "Doctors" })[1];
  const router = useRouter();
  const { id } = useParams();
  const { data: getDocDetails, isFetched, isLoading } = useQuery({
    queryKey: ["doctorDetails", id],
    queryFn: () => {
      return getData(Doctor.docotor, { id: id });
    }
  })
  const [achivements, setAchivements] = useState<any>([]);
  const [qualifications, setQualifications] = useState<any>([]);
  const [memeberships, setMemeberShips] = useState<any>([]);
  const [publishcations, setPublications] = useState<any>([]);

  const [pubVal, setpubVal] = useState<any>("");
  const [achivementVal, setachivementVal] = useState<any>("");
  const [qualificationVal, setqualificationVal] = useState<any>("");
  const [memeberVal, setmemeberVal] = useState<any>("");
  const push = (value: any, setValue: React.Dispatch<React.SetStateAction<any[]>>) => {
    setValue((prev: any[]) => [
      ...prev,
      value
    ]);
  };
  const [department, setDepartment] = useState<any>();
  const [designation, setDesignation] = useState<any>();
  const [gender, setGender] = useState<any>();
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
  const [file, setFile] = useState<File>();
  const [uploadImageUrl, setUploadImageUrl] = useState<string>();
  const addImage = useMutation({
    mutationKey: ["addImage"],
    mutationFn: (data: any) => {
      return postMultipart(`/doctor/${id}/upload-image`, {}, data);
    },
    onSuccess: (data: any) => {
      toast.success("Image is uploaded successfully", {
        position: "top-right",
        className: "bg-green-500"
      });
      queryAdmin.invalidateQueries({ queryKey: ["doctorDetails", id] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.success(error.response.data, {
        position: "top-right",
        className: "bg-green-500"
      })
    }
  })
  const list = useAsyncList<any>({
    async load() {
      let res = await getData(DesignationRoutes.desgination, {});
      let json = await res.data.data.data;

      return {
        items: json
      };
    },
  });
  const genderList = useAsyncList<any>({
    async load() {
      let res = await getData(GenderRoutes.gender, {});
      let json = await res.data.data.data;

      return {
        items: json
      };
    },
  });
  const list1 = useAsyncList<any>({
    async load() {
      let res = await getData(Doctor.department, {});
      let json = await res.data.data.data;

      return {
        items: json
      };
    },
  });
  useEffect(() => {
    setDepartment(getDocDetails?.data?.data?.data[0]?.department?._id);
    setGender(getDocDetails?.data?.data?.data[0]?.gender?._id);
    setDesignation(getDocDetails?.data?.data.data[0]?.designation?._id);
  }, [gender, department, isFetched]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      alert("No file uploaded");
      return;
    }
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("image", file);
    addImage.mutate(formData);
  };

  const removeValue = (value: any, setValue: React.Dispatch<React.SetStateAction<any[]>>) => {
    setValue((prev: any[]) => prev.filter(item => item !== value));
  };
  return (
    <>
      {isLoading ? <Spinner title="Loading Doctor Details" /> : (
        <div className="flex flex-col w-full gap-4 p-[1rem]">
          <Breadcrumbs color="secondary">
            {header.map((h: any) => {
              return <BreadcrumbItem onClick={() => router.push(h.link)}>{h.name}</BreadcrumbItem>
            })}
          </Breadcrumbs>
          <div className="flex flex-row justify-between w-full gap-4">
            <Title title={getDocDetails?.data.data?.data[0]?.name} />
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
              <div className="flex items-center justify-center">
                <label htmlFor="docImageInput" className="cursor-pointer">
                  <Avatar
                    src={getDocDetails?.data.data?.data[0]?.image ? getDocDetails?.data.data?.data[0]?.image : data.docImage}
                    alt="docImage"
                    className="w-80 h-80 rounded-full"
                  />
                  <input
                    id="docImageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e: any) => {
                      console.log(e.target.value);
                      handleChange(e);
                    }}
                  />
                </label>
              </div>
              <Input
                label="Doctor Name"
                isReadOnly={isEdit}
                value={getDocDetails?.data.data?.data[0]?.name}
                placeholder="Docotor Name"
              />
              <Input
                label="Doctor Email"
                value={getDocDetails?.data.data?.data[0]?.email}
                isReadOnly={isEdit}
                placeholder="Docotor Email"
              />
              <Autocomplete
                label="Select an Department"
                selectedKey={department}
                isLoading={list1.isLoading}
                items={list1.items}
                onSelectionChange={(e) => setDepartment(e)}
                className="max-w-full"
              >
                {list1.items.map((d: any) => (
                  <AutocompleteItem key={d._id} value={d._id}>
                    {d.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <div className="flex flex-row w-full">
                <Input
                  label="Doctor Phone"
                  value={getDocDetails?.data.data?.data[0]?.phone}
                  readOnly
                  placeholder="Docotor Phone"
                />
              </div>
              <Autocomplete
                label="Select an Designation"
                selectedKey={designation}
                isLoading={list.isLoading}
                items={list.items}
                onSelectionChange={(e) => setDesignation(e)}
                className="max-w-full"
              >
                {list.items.map((d: any) => (
                  <AutocompleteItem key={d._id} value={d._id}>
                    {d.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Autocomplete
                label="Select an Gender"
                selectedKey={gender}
                isLoading={genderList.isLoading}
                items={genderList.items}
                onSelectionChange={(e) => setGender(e)}
                className="max-w-full"
              >
                {genderList.items.map((d: any) => (
                  <AutocompleteItem key={d._id} value={d._id}>
                    {d.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-bold">Publications</h3>
                <div className="flex flex-row gap-4 w-full">
                  {publishcations.map((fruit: any, index: any) => (
                    <Chip color="primary" key={index} onClose={() => removeValue(fruit, setPublications)} variant="flat">
                      {fruit}
                    </Chip>
                  ))}
                </div>
                <div className="flex flex-row gap-2 w-full">
                  <Input className="w-1/2" value={pubVal} onValueChange={(e) => setpubVal(e)} placeholder="Add Publishcation" />
                  <Button onClick={() => {
                    push(pubVal, setPublications);
                    setpubVal("");
                  }} color="primary">Add</Button>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-bold">Memeberships</h3>
                <div className="flex flex-row gap-4 w-full">
                  {memeberships.map((fruit: any, index: any) => (
                    <Chip color="primary" key={index} onClose={() => removeValue(fruit, setMemeberShips)} variant="flat">
                      {fruit}
                    </Chip>
                  ))}
                </div>
                <div className="flex flex-row gap-2 w-full">
                  <Input className="w-1/2" value={memeberVal} onValueChange={(e) => setmemeberVal(e)} placeholder="Add Memeberships" />
                  <Button onClick={() => {
                    push(memeberVal, setMemeberShips);
                    setmemeberVal("");
                  }} color="primary">Add</Button>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-bold">Qualifications</h3>
                <div className="flex flex-row gap-4 w-full">
                  {qualifications.map((fruit: any, index: any) => (
                    <Chip color="primary" key={index} onClose={() => removeValue(fruit, setQualifications)} variant="flat">
                      {fruit}
                    </Chip>
                  ))}
                </div>
                <div className="flex flex-row gap-2 w-full">
                  <Input className="w-1/2" value={qualificationVal} onValueChange={(e) => setqualificationVal(e)} placeholder="Add Qualifications" />
                  <Button onClick={() => {
                    push(qualificationVal, setQualifications);
                    setqualificationVal("");
                  }} color="primary">Add</Button>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-bold">Achivements</h3>
                <div className="flex flex-row gap-4 w-full">
                  {achivements.map((fruit: any, index: any) => (
                    <Chip color="primary" key={index} onClose={() => removeValue(fruit, setAchivements)} variant="flat">
                      {fruit}
                    </Chip>
                  ))}
                </div>
                <div className="flex flex-row gap-2 w-full">
                  <Input className="w-1/2" value={achivementVal} onValueChange={(e) => setachivementVal(e)} placeholder="Add Achivements" />
                  <Button onClick={() => {
                    push(achivementVal, setAchivements);
                    setachivementVal("");
                  }} color="primary">Add</Button>
                </div>
              </div>



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
          <Page needAddModal={false} api={Doctor.enquiry} apiKey="enquiryByHospital" columns={enquiryColumns} title={`${data.docName} Enquiry`} />
          <Page needAddModal={false} api={Doctor.appointments} apiKey="appointments" columns={appointmentColumns} title={`${data.docName} Appointment`} />
        </div >
      )
      }
      <DeleteModal onOpenChange={onOpenChange} isOpen={isOpen} title="Doctor" api={Doctor.docotor} data={id} queryKey={["doctor"]} />

    </>
  );
}
