"use client";
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
import { useParams, usePathname, useRouter } from "next/navigation";
import Page from "@/components/Page/PageAll";
import {
  DesignationRoutes,
  Doctor,
  GenderRoutes,
  LocationRoutes,
} from "@/core/apiRoutes";
import DeleteModal from "@/components/Modals/DeleteModal";
import { useState, useEffect, Fragment, use } from "react";
import { FaEdit } from "react-icons/fa";
import { Time } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteData,
  getData,
  patchData,
  postData,
  postMultipart,
} from "@/core/apiHandler";
import { useAsyncList } from "@react-stately/data";
import { toast } from "sonner";
import { queryAdmin } from "@/app/providers";

export default function GetDocDetials() {
  const path = usePathname();

  const header = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Doctors",
      link: "/dashboard/doctors",
    },
    {
      name: "Doctor Detail",
      link: path,
    },
  ];
  const data = generateData({ tableName: "Doctors" })[1];
  const router = useRouter();
  const { id } = useParams();
  const deletSlot = useMutation({
    mutationKey: ["deletSlot"],
    mutationFn: (id) => {
      return deleteData(`/doctor-slot/${id}`, {});
    },
    onSuccess: (id: any) => {
      toast.success("Slot removed", {
        position: "top-right",
        className: "bg-green-300",
      });

      queryAdmin.invalidateQueries({ queryKey: ["get-doctorSlot", id] });
    },
  });
  const {
    data: getDocDetails,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: ["doctorDetails", id],
    queryFn: () => {
      return getData(`${Doctor.docotor}/${id}`, {});
    },
  });
  interface IDoctor {
    achievements: string[];
    address: string;
    city: string;
    code: string;
    department: string;
    description: string;
    designation: string;
    district: string;
    dob: Date;
    email: string;
    experience: string;
    gender: string;
    hospital?: string;
    image?: string;
    isActive: boolean;
    isHospital: boolean;
    isIndividual: boolean;
    isMain: boolean;
    locationUrl: string;
    memberships: string[];
    metaTitle: string;
    name: string;
    phone: number;
    price: string;
    procedure?: string;
    publications: string[];
    qualifications: string[];
    isPublished: boolean;
    availableDays: string[];
    visitingTime: {
      from: string;
      to: string;
    }[];
  }
  const [formData, setformData] = useState<Partial<IDoctor>>({
    address: "",
    department: "",
    locationUrl: "",
    price: "0",
    experience: "0",
  });
  const [achivements, setAchivements] = useState<any>([]);
  const [qualifications, setQualifications] = useState<any>([]);
  const [memeberships, setMemeberShips] = useState<any>([]);
  const [publishcations, setPublications] = useState<any>([]);
  const [avilDaysEdit, setavailEdit] = useState<boolean>(false);
  const [pubVal, setpubVal] = useState<any>("");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [achivementVal, setachivementVal] = useState<any>("");
  const [qualificationVal, setqualificationVal] = useState<any>("");
  const [memeberVal, setmemeberVal] = useState<any>("");
  const push = (
    value: any,
    setValue: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    setValue((prev: any[]) => [...prev, value]);
  };
  const [department, setDepartment] = useState<any>("");
  const [designation, setDesignation] = useState<any>("");
  const [gender, setGender] = useState<any>();
  const appointmentColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
    { name: "Email", uid: "email", type: "text" },
    {
      name: "Appointment Time",
      uid: "appointment",
      type: "appointmentTime",
    },
    {
      name: "Actions",
      uid: "actions",
      type: "actions",
    },
  ];
  const enquiryColumns = [
    { name: "Name", uid: "name", type: "text" },
    { name: "Phone", uid: "phoneno", type: "text" },
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
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [type, setype] = useState<any>("");
  const [avialableDays, setavailableDays] = useState<any>(new Set());
  const [valuetime, setValueTime] = useState<TimeInputValue>();
  const [sechudling, setSechduling] = useState<any>([
    {
      name: "Morning",
      timings: [],
      data: {},
    },
    {
      name: "Afternoon",
      timings: [],
      data: {},
    },
    {
      name: "Evening",
      timings: [],
      data: {},
    },
  ]);

  const createSlot = useMutation({
    mutationKey: ["doctorSlot"],
    mutationFn: (data: any) => {
      return postData(`/doctor-slot/`, data, {});
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.success("Added Slot", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: ["get-doctorSlot", id] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error("Error in adding Slot", {
        position: "top-right",
        className: "bg-red-300",
      });
    },
  });
  const { data: getSlot, isLoading: isLoadingslot } = useQuery({
    queryKey: ["get-doctorSlot", id],
    queryFn: () => {
      return getData("/doctor-slot", { id });
    },
  });
  useEffect(() => {
    if (!isLoadingslot) {
      const slot = getSlot?.data?.data?.data;
      console.log(getSlot?.data.data.data);
      // slot.map((s: any) => {
      //   const date = new Date(s.slotTime);

      //   const hours = date.getHours();
      //   const minutes = date.getMinutes();
      //   const period = hours >= 12 ? "PM" : "AM";
      //   const formattedHours = hours % 12 || 12;
      //   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      //   const item = {
      //     name: s.session,
      //     timings: `${formattedHours}:${formattedMinutes} ${period}`,
      //     data: s,
      //   };

      //   setSechduling((prevScheduling: any) => {
      //     return prevScheduling.map((schedule: any) => {
      //       if (schedule.name.toLowerCase() === item.name) {
      //         return {
      //           ...schedule,
      //           timings: [item.timings],
      //           data: item.data,
      //         };
      //       }
      //       return schedule;
      //     });
      //   });
      // });

      let morning = slot.filter((s: any) => s.session === "morning");
      let afternoon = slot.filter((s: any) => s.session === "afternoon");
      let evening = slot.filter((s: any) => s.session === "evening");

      setSechduling((prevScheduling: any) => {
        return prevScheduling.map((schedule: any) => {
          if (schedule.name.toLowerCase() === "morning") {
            console.log(morning);
            console.log(schedule);

            return {
              ...schedule,
              timings: morning.map((m: any) => {
                const date = new Date(m.slotTime);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const period = hours >= 12 ? "PM" : "AM";
                const formattedHours = hours % 12 || 12;
                const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
                return {
                  time: `${formattedHours}:${formattedMinutes} ${period}`,
                  data: m,
                };
              }),
            };
          }
          if (schedule.name.toLowerCase() === "afternoon") {
            return {
              ...schedule,
              timings: afternoon.map((m: any) => {
                const date = new Date(m.slotTime);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const period = hours >= 12 ? "PM" : "AM";
                const formattedHours = hours % 12 || 12;
                const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
                return {
                  time: `${formattedHours}:${formattedMinutes} ${period}`,
                  data: m,
                };
              }),
            };
          }
          if (schedule.name.toLowerCase() === "evening") {
            return {
              ...schedule,
              timings: evening.map((m: any) => {
                const date = new Date(m.slotTime);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const period = hours >= 12 ? "PM" : "AM";
                const formattedHours = hours % 12 || 12;
                const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
                return {
                  time: `${formattedHours}:${formattedMinutes} ${period}`,
                  data: m,
                };
              }),
            };
          }
          return schedule;
        });
      });
    }
  }, [isLoadingslot, getSlot]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const handleUpdate = (type: any) => {
    if (valuetime?.hour || valuetime?.minute) {
      const date = new Date();
      date.setHours(valuetime.hour);
      date.setMinutes(valuetime.minute);
      alert(date);
      const item = {
        session: type.toLowerCase(),
        slotTime: date,
        doctorId: id,
      };
      console.log(item);
      createSlot.mutate(item);
    }
    setype("");
  };
  interface VisitngTime {
    from: string;
    to: string;
  }
  const [visitingTime, setVistingTime] = useState<VisitngTime[]>([]);
  const [valTime, setValTime] = useState<VisitngTime>({
    from: "",
    to: "",
  });
  const deleteVisiting = (index: number) => {
    setVistingTime((prev) => prev.filter((_, i) => i !== index));
  };
  const [editVisit, seteditVisit] = useState<boolean>(false);
  const pushVisting = (from: string, to: string) => {
    const time: VisitngTime = {
      from: from,
      to: to,
    };
    setVistingTime((prev) => [...prev, time]);
    seteditVisit(false);
    setValTime({
      from: "",
      to: "",
    });
  };

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
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: ["doctorDetails", id] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.success(error.response.data, {
        position: "top-right",
        className: "bg-green-500",
      });
    },
  });
  const list = useAsyncList<any>({
    async load() {
      let res = await getData(DesignationRoutes.desgination, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const genderList = useAsyncList<any>({
    async load() {
      let res = await getData(GenderRoutes.gender, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const list1 = useAsyncList<any>({
    async load() {
      let res = await getData(Doctor.department, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  useEffect(() => {
    if (isFetched) {
      setPublications(getDocDetails?.data?.data?.publications);
      setQualifications(getDocDetails?.data?.data?.qualifications);
      setAchivements(getDocDetails?.data.data?.achievements);
      setMemeberShips(getDocDetails?.data?.data?.memberships);
      setDepartment(getDocDetails?.data?.data?.department?._id);
      setGender(getDocDetails?.data?.data?.gender?._id);
      console.log(getDocDetails?.data.data.department._id);
      setavailableDays(new Set(getDocDetails?.data?.data?.availableDays));
      console.log(getDocDetails?.data?.data);

      setVistingTime(getDocDetails?.data?.data?.visitingTime);
      // setformData((prev) => ({
      //   ...prev,
      //   price: getDocDetails?.data?.data?.price,
      //   department: getDocDetails?.data.data.department._id,
      //   locationUrl: getDocDetails?.data?.data?.locationUrl,
      //   address: getDocDetails?.data.data?.address,
      //   experience: getDocDetails?.data.data.experience,
      // }));
      setDesignation(getDocDetails?.data?.data.designation?._id);
    }
  }, [isFetched]);
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
  const district = useAsyncList<any>({
    async load() {
      let res = await getData(LocationRoutes.district, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const removeValue = (
    value: any,
    setValue: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    setValue((prev: any[]) => prev.filter((item) => item !== value));
  };
  const editMutaion = useMutation({
    mutationFn: (data: any) => {
      return patchData(`/doctor/${id}/description`, formData, {});
    },
    onSuccess: (data: any) => {
      toast.success("Doctor Data Updated", {
        position: "top-right",
        className: "bg-green-300",
      });
      queryAdmin.invalidateQueries({ queryKey: ["doctorDetails", id] });
      setisEdit(false);
    },
    onError: (error: any) => {
      toast.error("Doctor Data Updated failed", {
        position: "top-right",
        className: "bg-red-300",
      });
      setisEdit(false);
    },
  });
  const handleChangeUpdate = (e: any) => {
    e.preventDefault();
    if (
      getDocDetails?.data?.data?.data?.publications?.length > 0 ||
      publishcations.length > 0
    ) {
      setformData((prev: any) => ({
        ...prev,
        publications: publishcations,
      }));
    }
    if (
      getDocDetails?.data?.data?.data?.qualifications?.length > 0 ||
      qualifications.length > 0
    ) {
      setformData((prev: any) => ({
        ...prev,
        qualifications: qualifications,
      }));
    }
    if (
      getDocDetails?.data?.data?.data?.achievements?.length > 0 ||
      achivements.length > 0
    ) {
      setformData((prev: any) => ({
        ...prev,
        achievements: achivements,
      }));
    }

    if (
      getDocDetails?.data?.data?.data?.memberships?.length > 0 ||
      memeberships.length > 0
    ) {
      setformData((prev: any) => ({
        ...prev,
        memberships: memeberships,
      }));
    }
    if (avialableDays.size > 0) {
      setformData((prev: any) => ({
        ...prev,
        availableDays: [...avialableDays],
      }));
    }
    console.log("Department", department);
    setformData((prev: any) => ({
      ...prev,
      department: department,
    }));
    if (visitingTime.length > 0) {
      console.log("Visiting Time", visitingTime);

      setformData((prev: any) => ({
        ...prev,
        visitingTime: visitingTime,
      }));
    }
    console.log("Form Data", formData);

    editMutaion.mutate(formData);
  };
  const removeTime = (data: any) => {
    deletSlot.mutate(data._id);
  };
  const getMaxValue = (type: string) => {
    switch (type) {
      case "morning":
        return new Time(12, 0);
      case "afternoon":
        return new Time(16, 0);
      case "evening":
        return new Time(21, 0);
      default:
        return new Time(24, 0);
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner title="Loading Doctor Details" />
      ) : (
        <div className="flex flex-col w-full gap-4 p-[1rem]">
          <Breadcrumbs color="secondary">
            {header.map((h: any, index: any) => {
              return (
                <BreadcrumbItem key={index} onClick={() => router.push(h.link)}>
                  {h.name}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumbs>
          <div className="flex flex-row justify-between w-full gap-4">
            <Title title={getDocDetails?.data.data?.name} />
            <div className="flex flex-row gap-4 justify-between">
              <Button color="danger" radius="full" onPress={onOpen}>
                Delete
              </Button>
              <Button
                color="primary"
                radius="full"
                onClick={() => setisEdit(true)}
              >
                Edit
              </Button>
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
                    src={
                      getDocDetails?.data.data?.image
                        ? getDocDetails?.data.data?.image.path
                        : data.docImage
                    }
                    alt="docImage"
                    className="w-80 h-80 rounded-full"
                  />
                  <input
                    id="docImageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e: any) => {
                      handleChange(e);
                    }}
                  />
                </label>
              </div>
              <Input
                label="Doctor Name"
                isReadOnly={isEdit}
                value={getDocDetails?.data.data?.name}
                placeholder="Docotor Name"
              />
              <Input
                label="Doctor Email"
                value={getDocDetails?.data.data?.email}
                isReadOnly={isEdit}
                placeholder="Docotor Email"
              />
              <Autocomplete
                label="Select an Department"
                selectedKey={formData.department}
                isLoading={list1.isLoading}
                items={list1.items}
                onSelectionChange={(e) => {
                  if (e !== undefined) {
                    setformData((prev: any) => ({
                      ...prev,
                      department: e,
                    }));
                    console.log("Selected value:", e);
                  }
                }}
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
                  value={getDocDetails?.data.data?.phone}
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
              <Input
                label="Experince"
                className="w-1/4"
                value={String(formData?.experience)}
                endContent={<h3 className="font-bold">Years</h3>}
                onValueChange={(e) =>
                  setformData((prev: any) => ({
                    ...prev,
                    experience: e,
                  }))
                }
              />
              {/*
              <DatePicker
                label="Date of Birth"
                minValue={today(getLocalTimeZone()).subtract({
                  years: 49
                })}
                maxValue={today(getLocalTimeZone()).subtract({
                  years: 18
                })}
                //     onChange={(e) => handleChange(e, "DOB")}
                defaultValue={
                  formData.DOB
                    ? new CalendarDate(
                      Number(formData.DOB.split('T')[0].split('-')[0]),
                      Number(formData.DOB.split('T')[0].split('-')[1]),
                      Number(formData.DOB.split('T')[0].split('-')[2])
                    )
                    : today(getLocalTimeZone()).subtract({
                      years: 18
                    })
                }
                showMonthAndYearPickers={true}
              />
              */}
              <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
                <div className="flex flex-col gap-4 w-full">
                  <h3 className="text-xl font-bold">Publications</h3>
                  <div className="flex flex-row gap-4 w-full">
                    {publishcations?.map((fruit: any, index: any) => (
                      <Chip
                        color="primary"
                        key={index}
                        onClose={() => removeValue(fruit, setPublications)}
                        variant="flat"
                      >
                        {fruit}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex flex-row gap-2 w-full">
                    <Input
                      className="w-1/2"
                      value={pubVal}
                      onValueChange={(e) => setpubVal(e)}
                      placeholder="Add Publishcation"
                    />
                    <Button
                      onClick={() => {
                        push(pubVal, setPublications);
                        setpubVal("");
                      }}
                      color="primary"
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <h3 className="text-xl font-bold">Memeberships</h3>
                  <div className="flex flex-row gap-4 w-full">
                    {memeberships?.map((fruit: any, index: any) => (
                      <Chip
                        color="primary"
                        key={index}
                        onClose={() => removeValue(fruit, setMemeberShips)}
                        variant="flat"
                      >
                        {fruit}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex flex-row gap-2 w-full">
                    <Input
                      className="w-1/2"
                      value={memeberVal}
                      onValueChange={(e) => setmemeberVal(e)}
                      placeholder="Add Memeberships"
                    />
                    <Button
                      onClick={() => {
                        push(memeberVal, setMemeberShips);
                        setmemeberVal("");
                      }}
                      color="primary"
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <h3 className="text-xl font-bold">Qualifications</h3>
                  <div className="flex flex-row gap-4 w-full">
                    {qualifications?.map((fruit: any, index: any) => (
                      <Chip
                        color="primary"
                        key={index}
                        onClose={() => removeValue(fruit, setQualifications)}
                        variant="flat"
                      >
                        {fruit}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex flex-row gap-2 w-full">
                    <Input
                      className="w-1/2"
                      value={qualificationVal}
                      onValueChange={(e) => setqualificationVal(e)}
                      placeholder="Add Qualifications"
                    />
                    <Button
                      onClick={() => {
                        push(qualificationVal, setQualifications);
                        setqualificationVal("");
                      }}
                      color="primary"
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <h3 className="text-xl font-bold">Achivements</h3>
                  <div className="flex flex-row gap-4 w-full">
                    {achivements?.map((fruit: any, index: any) => (
                      <Chip
                        color="primary"
                        key={index}
                        onClose={() => removeValue(fruit, setAchivements)}
                        variant="flat"
                      >
                        {fruit}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex flex-row gap-2 w-full">
                    <Input
                      className="w-1/2"
                      value={achivementVal}
                      onValueChange={(e) => setachivementVal(e)}
                      placeholder="Add Achivements"
                    />
                    <Button
                      onClick={() => {
                        push(achivementVal, setAchivements);
                        setachivementVal("");
                      }}
                      color="primary"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="flex flex-col justify-ceneter items-center">
            <CardHeader className="text-[15px] md:text-[30px] font-bold">
              Scheduling
            </CardHeader>
            <CardBody className="flex flex-col w-full gap-4">
              <div className="flex flex-row items-center gap-3">
                <h3 className="font-bold text-lg">Visitng Time</h3>
                <Button
                  className="w-[20px]"
                  color="primary"
                  onClick={() => seteditVisit(true)}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-1/2">
                  <div className="flex flex-row w-1/2 gap-3">
                    {visitingTime.map((v: VisitngTime, index: number) => (
                      <Fragment key={index}>
                        <Chip
                          color="primary"
                          variant="flat"
                          className="w-20 h-10 border border-blue-300 text-md"
                          onClose={() => deleteVisiting(index)}
                        >
                          {v.from} - {v.to}
                        </Chip>
                      </Fragment>
                    ))}
                  </div>
                  {editVisit && (
                    <div className="flex flex-col md:flex-row w-full gap-4">
                      <Input
                        label="From"
                        type="time"
                        onValueChange={(e) =>
                          setValTime((prev: any) => ({
                            ...prev,
                            from: e,
                          }))
                        }
                        value={valTime.from}
                      />
                      <Input
                        label="To"
                        type="time"
                        onValueChange={(e) => {
                          setValTime((prev: any) => ({
                            ...prev,
                            to: e,
                          }));
                        }}
                        value={valTime.to}
                      />

                      <Button
                        color="primary"
                        onClick={() => pushVisting(valTime.from, valTime.to)}
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-row items-center gap-4 w-1/4">
                  <h3 className="text-xl font-bold">Available Days</h3>
                  <Button
                    color="primary"
                    radius="lg"
                    onClick={() => setavailEdit(true)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="flex flex-row gap-4">
                  {Array.from(avialableDays).map((day: any, index: any) => (
                    <Chip
                      key={index}
                      color="primary"
                      variant="flat"
                      onClose={() => {
                        setavailableDays((prevDays: any) => {
                          const newDays = new Set(prevDays);
                          newDays.delete(day);
                          return newDays;
                        });
                      }}
                    >
                      {day}
                    </Chip>
                  ))}
                </div>
                {avilDaysEdit && (
                  <Select
                    size="sm"
                    label="Select an Available Day"
                    onChange={(e: any) => {
                      const selectedDay = e.target.value;
                      if (selectedDay) {
                        setavailableDays((prevDays: any) =>
                          new Set(prevDays).add(selectedDay)
                        );
                        setavailEdit(false);
                      }
                    }}
                    className="max-w-sm"
                  >
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </div>

              <h3 className="font-bold text-lg">Slots</h3>
              {sechudling?.map((s: any, index: any) => {
                return (
                  <>
                    <div
                      key={index}
                      className="flex flex-row items-center w-full md:w-1/2 justify-around"
                    >
                      <h1 className="font-bold">{s.name}</h1>
                      {s?.timings.map((t: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row justify-start w-20"
                          >
                            <Chip
                              color="secondary"
                              onClose={() => removeTime(t.data)}
                              radius="full"
                              variant="solid"
                            >
                              {t.time}{" "}
                            </Chip>
                          </div>
                        );
                      })}
                      <FaEdit
                        className="cursor-pointer"
                        onClick={() => setype(s)}
                      />
                      {s?.name === type.name && (
                        <div className="flex items-center w-1/4">
                          <TimeInput
                            value={valuetime}
                            onChange={(e) => setValueTime(e)}
                            // defaultValue={type.timings[type.timings.length - 1]}
                            maxValue={getMaxValue(type.name.toLowerCase())}
                          />
                          <Button
                            color="secondary"
                            onClick={() => handleUpdate(type.name)}
                          >
                            Update
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
            </CardBody>
          </Card>
          <Card className="flex flex-col justify-ceneter items-center">
            <CardHeader className="text-[15px] md:text-[30px] font-bold">
              Address
            </CardHeader>
            <CardBody className="flex flex-col gap-4 items-center">
              <Input
                label="Location URL"
                value={formData.locationUrl}
                onValueChange={(e) =>
                  setformData((prev) => ({
                    ...prev,
                    locationUrl: e,
                  }))
                }
              />
              <div className="flex flex-row gap-4 w-full">
                <Input
                  label="Address"
                  value={formData.address}
                  onValueChange={(e) =>
                    setformData((prev) => ({
                      ...prev,
                      address: e,
                    }))
                  }
                />
                <Autocomplete
                  label="Select an District"
                  selectedKey={formData.district}
                  isLoading={district.isLoading}
                  items={district.items}
                  onSelectionChange={(e) =>
                    setformData((prev: any) => ({
                      ...prev,
                      district: e,
                    }))
                  }
                  className="max-w-full"
                >
                  {district.items.map((d: any) => (
                    <AutocompleteItem key={d._id} value={d._id}>
                      {d.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
            </CardBody>
          </Card>

          <Card className="flex flex-col justify-ceneter items-center">
            <CardHeader className="text-[15px] md:text-[30px] font-bold">
              Pricings
            </CardHeader>
            <CardBody className="flex flex-col gap-4 items-center">
              <Input
                label="Pricing"
                value={String(formData.price)}
                endContent={<h3 className="font-bold">Rs</h3>}
                className="w-1/2"
                onValueChange={(e) =>
                  setformData((prev: any) => ({
                    ...prev,
                    price: e,
                  }))
                }
              />
            </CardBody>
          </Card>
          {isEdit && (
            <Button
              variant="ghost"
              color="secondary"
              onClick={(e) => handleChangeUpdate(e)}
              radius="full"
              className="w-full"
            >
              Submit
            </Button>
          )}
          <Page
            needAddModal={false}
            api={Doctor.enquiry}
            apiKey="enquiryByHospital"
            columns={enquiryColumns}
            title={`${getDocDetails?.data.data?.name} Enquiry`}
          />
          <Page
            needAddModal={false}
            api={Doctor.appointments}
            apiKey="appointments"
            columns={appointmentColumns}
            title={`${getDocDetails?.data.data?.name} Appointment`}
          />
        </div>
      )}
      <DeleteModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        title="Doctor"
        api={Doctor.docotor}
        data={id}
        queryKey={["doctor"]}
      />
    </>
  );
}
