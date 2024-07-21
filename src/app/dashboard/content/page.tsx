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
import { DesignationRoutes, GenderRoutes } from "@/core/apiRoutes";
import { generateTable } from "@/utilis/content";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

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

  return (
    <div className="flex flex-col w-full">
      <Title title="Content" />
      <div className="flex flex-row justify-between items-center w-full self-end p-[1rem]">
        <h3 className="text-[20px] p-[1rem] font-bold">Gender</h3>
        <AddModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title={"Gender"}
        >
          <form
            className="flex flex-col items-center gap-4 justify-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              value={gender}
              onValueChange={(e) => setGender(e)}
              type="text"
              placeholder="Write the gender you want to add"
            />
            <Button
              isLoading={loading}
              type="submit"
              className="w-full"
              color="primary"
            >
              Create
            </Button>
          </form>
        </AddModal>
      </div>
      {generateTable({
        columns: generateTabColumns({
          onView: (type: any) => handleView(type),
          setData: setData,
          tableName: "Gender",
        }),
        isSuccess: isSuccessGender,
        currentPage: page,
        onPageChange: (currentPage: any) => handlePageChange(currentPage),
        tableData: getGender?.data.data.gender,
        isLoading: isLoadingGender,
        totalItems: getGender?.data.data.totalCount,
        isError: isErrorGender,
      })}
      <UpdateModal
        isOpen={isOpenUpdate}
        onOpenChange={onOpenChangeUpdate}
        title="Gender"
      >
        <form
          onSubmit={(e) => handleUpdateSubmit(e)}
          className="flex flex-col items-center w-full gap-4 justify-around"
        >
          <Input
            value={data?.name}
            placeholder="Update the name"
            onValueChange={(e) =>
              setData((data: any) => ({
                ...data,
                name: e,
              }))
            }
          />
          <Button
            isLoading={loading}
            type="submit"
            color="primary"
            radius="full"
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </UpdateModal>
      <DeleteModal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        title="Gender"
        api={`${GenderRoutes.gender}/${data}`}
        queryKey={"get-gender"}
      />
      <ViewModal
        data={data}
        size="sm"
        isOpen={isOpenView}
        onOpenChange={onOpenChangeView}
        title="Gender"
        keys={generateLeadsType("Gender")}
      />
      <div className="flex flex-row justify-between items-center w-full self-end p-[1rem]">
        <h3 className="text-[20px] p-[1rem] font-bold">Designation</h3>
        <AddModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          title={"Designation"}
        >
          <form
            className="flex flex-col items-center gap-4 justify-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              value={gender}
              onValueChange={(e) => setGender(e)}
              type="text"
              placeholder="Write the designation you want to add"
            />
            <Button
              isLoading={loading}
              type="submit"
              className="w-full"
              color="primary"
            >
              Create
            </Button>
          </form>
        </AddModal>
      </div>
      {generateTable({
        columns: generateTabColumns({
          onView: (type: any) => handleView(type),
          setData: setData,
          tableName: "Designation",
        }),
        isSuccess: isSuccessDesignation,
        currentPage: page,
        onPageChange: (currentPage: any) => handlePageChange(currentPage),
        tableData: getGender?.data.data.gender,
        isLoading: isLoadingDesignation,
        totalItems: getGender?.data.data.totalCount,
        isError: isErrorDesignation,
      })}
      <UpdateModal
        isOpen={isOpenUpdate}
        onOpenChange={onOpenChangeUpdate}
        title="Gender"
      >
        <form
          onSubmit={(e) => handleUpdateSubmit(e)}
          className="flex flex-col items-center w-full gap-4 justify-around"
        >
          <Input
            value={data?.name}
            placeholder="Update the name"
            onValueChange={(e) =>
              setData((data: any) => ({
                ...data,
                name: e,
              }))
            }
          />
          <Button
            isLoading={loading}
            type="submit"
            color="primary"
            radius="full"
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </UpdateModal>
      <DeleteModal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        title="Gender"
        api={`${GenderRoutes.gender}/${data}`}
        queryKey={"get-gender"}
      />
      <ViewModal
        data={data}
        size="sm"
        isOpen={isOpenView}
        onOpenChange={onOpenChangeView}
        title="Gender"
        keys={generateLeadsType("Gender")}
      />
    </div>
  );
};

export default Content;
