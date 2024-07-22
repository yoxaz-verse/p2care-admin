"use client";
import { generateTabColumns } from "@/content/table-columns";
import generateData, { generateLeadsType } from "@/content/tableData";
import { queryAdmin } from "@/app/providers";
import AddModal from "@/components/Modals/AddModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import UpdateModal from "@/components/Modals/UpdateModal";
import ViewModal from "@/components/Modals/ViewModal";
import Title from "@/components/titles";
import { postData, getData, patchData } from "@/core/apiHandler";
import { DesignationRoutes, GenderRoutes, LocationRoutes } from "@/core/apiRoutes";
import { generateTable } from "@/utilis/content";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";
import Page from "@/components/Page/PageAll";

const Content = () => {
  const [page, setPage] = useState<any>(1);
  const [data, setData] = useState<any>();
  const handleView = (type: any) => {
    if (type === "View") {
      onOpenView();
    } else if (type === "Delete") {
      onOpenDelete();
      console.log(data);
    } else if (type === "Update") {
      onOpenUpdate();
    }
  };
  const handlePageChange = (page: number) => {
    setPage(page + 1);
  };
  const [gender, setGender] = useState<any>("");
  const [designation, setDesignation] = useState<any>("");
  const {
    data: getDesignation,
    isLoading: isLoadingDesignation,
    isError: isErrorDesignation,
    isSuccess: isSuccessDesignation,
  } = useQuery({
    queryKey: ["get designation", page],
    queryFn: () => {
      return getData(GenderRoutes.gender, {});
    },
    refetchOnMount: true,
  });
  const createDesignation = useMutation({
    mutationKey: ["gender"],
    mutationFn: (data: any) => {
      return postData(DesignationRoutes.desgination, {}, data);
    },
    onSuccess: (data: any) => {
      console.log(data.data);
      if (data.data.name) {
        toast.success(data.data.message, {
          position: "top-right",
        });
        onClose();
      }
      setLoading(false);
      onClose();
      queryAdmin.invalidateQueries({ queryKey: ["get-gender"] });
    },
    onError: (data: any) => {
      console.log(data);
      setLoading(false);
      onClose();
    },
  });
  const [loadingDesignation, setLoadingDesignation] = useState(false);
  async function handleSubmitDesgination(e: any) {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: gender,
    };
    createDesignation.mutate(data);
  }

  const {
    data: getGender,
    isLoading: isLoadingGender,
    isError: isErrorGender,
    isSuccess: isSuccessGender,
  } = useQuery({
    queryKey: ["get-gender", page],
    queryFn: () => {
      return getData(GenderRoutes.gender, {});
    },
    refetchOnMount: true,
  });
  const createGender = useMutation({
    mutationKey: ["gender"],
    mutationFn: (data: any) => {
      return postData(GenderRoutes.gender, {}, data);
    },
    onSuccess: (data: any) => {
      console.log(data.data);
      if (data.data.name) {
        toast.success(data.data.message, {
          position: "top-right",
        });
        onClose();
      }
      setLoading(false);
      onClose();
      queryAdmin.invalidateQueries({ queryKey: ["get-gender"] });
    },
    onError: (data: any) => {
      console.log(data);
      setLoading(false);
      onClose();
    },
  });
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: gender,
    };
    createGender.mutate(data);
  }
  const updateGender = useMutation({
    mutationKey: ["genderUpdate", data?._id],
    mutationFn: (data: any) => {
      return patchData(GenderRoutes.gender, { id: data?._id }, data);
    },
    onSuccess: (item: any) => {
      console.log(item);
      setLoading(false);
      queryAdmin.invalidateQueries({ queryKey: ["get-gender"] });
    },
    onError: (error: any) => {
      console.log(error);
      setLoading(false);
      queryAdmin.invalidateQueries({ queryKey: ["get-gender"] });
    },
  });
  async function handleUpdateSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    if (data?.name.isEmpty()) {
      toast.error("Name cant be empty", {
        position: "top-right",
      });
      return;
    } else {
      updateGender.mutate(data);
    }
  }
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onOpenChange: onOpenChangeView,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onOpenChange: onOpenChangeUpdate,
    onClose: onCloseView,
  } = useDisclosure();

  const gendercolumns = [
    { name: "NAME", uid: "name", type: "text" },
    { name: "ACTIONS", uid: "actions", type: "action" },
  ];
  const countrycolumns = [
    { name: "NAME", uid: "name", type: "text" },
    { name: "PINCODE", uid: "pincode", type: "number" },
    { name: "DISTRICT", uid: "district", type: "districtDropdown" },
    { name: "ACTIONS", uid: "actions", type: "action" },
  ];
  return (
    <div className="flex flex-col w-full">
      <Title title="Content" />
      <Page apiKey="gender" title="Gender" api={GenderRoutes.gender} columns={gendercolumns} />
      <Page
        apiKey="designation"
        title="Designation"
        api={DesignationRoutes.desgination}
        columns={gendercolumns} />
      <Page
        apiKey="districts"
        title="District"
        api={LocationRoutes.district}
        columns={gendercolumns} />
      <Page
        apiKey="cities"
        title="City"
        api={LocationRoutes.city}
        columns={countrycolumns} />
    </div>
  );
};

export default Content;
