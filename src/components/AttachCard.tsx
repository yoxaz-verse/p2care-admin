"use client";

import { deleteData, deleteDataBody, getData, postData } from "@/core/apiHandler";
import { Button, Card, CardBody, Image, Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Subtitle, { SubTitle } from "./titles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryAdmin } from "@/app/providers";
import { toast } from "sonner";
import { Doctor, HospitalRoutes, offers, serviceRoutes } from "@/core/apiRoutes";
import ServiceName from "@/app/dashboard/services/[id]/page";

interface AttachCardProps {
  DropDown: any,
  id: any,
  api: string,
  title: string,
  getapi: string
}

export default function AttachCard({ DropDown, id, api, getapi, title }: AttachCardProps) {
  const [data, setData] = useState<any>({});
  const [array, setArray] = useState<any[]>([]);
  const [add, setAdd] = useState<boolean>(false);


  const { data: getAttachData, isLoading: isFetchingAttachData, isFetched } = useQuery({
    queryKey: [`get-${title}`, id],
    queryFn: () => getData(`${getapi}/${id}`, {}),
    enabled: !!id
  });

  const removeAttachData = useMutation({
    mutationKey: ["removeAttachData"],
    mutationFn: (id: any) => {
      alert(id);
      return deleteData(`${api}/${id}`, {});
    },
    onSuccess: () => {
      toast.success("Removed data", { position: "top-right", className: "bg-green-300" });
      queryAdmin.invalidateQueries({ queryKey: [`get-${title}`, id] });
    },
    onError: (error: any) => {
      console.log(id, error);

      toast.error("Error removing data", { position: "top-right", className: "bg-red-300" });
    }
  });


  const removeAttach = useMutation({
    mutationKey: ["removeAttach", id],
    mutationFn: (data: any) => {
      return deleteDataBody(api, {}, data);
    },
    onSuccess: () => {
      toast.success("Removed data", { position: "top-right", className: "bg-green-300" });
      queryAdmin.invalidateQueries({ queryKey: [`get-${title}`, id] });
    },
    onError: (error: any) => {
      console.log(id, error);

      toast.error("Error removing data", { position: "top-right", className: "bg-red-300" });
    }
  });
  const attachData = useMutation({
    mutationKey: ["add-data"],
    mutationFn: (data: any) => postData(api, data, {}),
    onSuccess: () => {
      toast.success("Attached data", { position: "top-right", className: "bg-green-300" });
      queryAdmin.invalidateQueries({ queryKey: [`get-${title}`, id] });
    },
    onError: () => {
      toast.error("Failed to attach data", { position: "top-right", className: "bg-red-300" });
    }
  });

  useEffect(() => {
    console.log(getAttachData?.data);
    if (isFetched) {
      const valuesArray = getAttachData?.data?.data || [];
      setArray(valuesArray);
      console.log(valuesArray);
      // setArray(getAttachData?.data?.data || []);
    }
    setData(DropDown);
  }, [DropDown, getAttachData, isFetched]);

  const push = (data: any[]) => {
    if (data.length === 0) return;
    if (api === HospitalRoutes.adddoctor) {
      const item = {
        price: data[0].price,
        hospital: id,
        doctor: data[0]._id,
        department: data[0].department._id
      };
      const { price, doctor, department } = item;

      if (!price || !doctor || !department) {
        return toast.error("Doctor data needs to be updated as price or department for the hospital", {
          position: "top-right",
          className: "bg-red-300"
        });
      }
      attachData.mutate(item);
    }
    if (api === offers.hospital) {
      const item = {
        hospitalId: data[0]._id,
        offerId: id
      }
      attachData.mutate(item);
    }
    if (api === offers.doctor) {
      const item = {
        doctorId: data[0]._id,
        offerId: id
      }
      attachData.mutate(item);
    }
    if (api === offers.department) {
      const item = {
        departmentId: data[0]._id,
        offerId: id
      }
      attachData.mutate(item);
    }
    if (api === HospitalRoutes.department) {
      console.log(data);
      const item = {
        hospital: id,
        department: data[0]._id
      };

      attachData.mutate(item);
    }
    if (api === serviceRoutes.addDepartment) {
      const item = {
        departmentId: data[0]._id,
        serviceId: id
      }
      attachData.mutate(item);
    }
    if (api === serviceRoutes.addDoctor) {
      const item = {
        doctorId: data[0]._id,
        serviceId: id
      }
      attachData.mutate(item);
    }
    if (api === serviceRoutes.addHospital) {
      const item = {
        hospitalId: data[0]._id,
        serviceId: id
      }
      attachData.mutate(item);
    }
  };

  const remove = (index: any) => {
    if (api == serviceRoutes.addDoctor) {

      const item = {
        doctorId: index,
        serviceId: id
      }
      api = `${serviceRoutes.addDoctor}/test`
      removeAttach.mutate(item);
      return;
    }
    if (api == serviceRoutes.addHospital) {
      const item = {
        hospitalId: index,
        serviceId: id
      }
      api = `${serviceRoutes.addHospital}/test`
      removeAttach.mutate(item);
      return;
    }
    if (api == serviceRoutes.addDepartment) {
      const item = {
        departmentId: index,
        serviceId: id
      }
      api = `${serviceRoutes.addDepartment}/test`
      removeAttach.mutate(item);
      return;
    }
    if (api === offers.hospital) {
      const item = {
        hospitalId: index,
        offerId: id
      }
      removeAttach.mutate(item);
      return;
    }
    if (api === offers.doctor) {
      const item = {
        doctorId: index,
        offerId: id
      }
      removeAttach.mutate(item);
      return;
    }
    if (api === offers.department) {
      const item = {
        departmentId: index,
        offerId: id
      }
      removeAttach.mutate(item);
      return;
    }
    else {
      console.log(index);
      removeAttachData.mutate(index);
    }
  };



  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row w-full justify-between p-[1rem] items-center gap-4">
          <SubTitle title={title} />
          <Button color="secondary" onClick={() => setAdd(prev => !prev)}>Edit</Button>
        </div>
        {add && (
          <Autocomplete
            className="max-w-xl"
            isLoading={data?.isLoading}
            items={data?.items}
            label={title}
            onSelectionChange={(e) => {
              const dataItem = data?.items?.filter((d: any) => d._id === e);
              if (dataItem.length > 0) {
                push(dataItem);
              }
            }}
            variant="bordered"
          >
            {data?.items?.map((item: any) => (
              <AutocompleteItem value={item._id} key={item._id} className="capitalize">
                <div className="flex flex-row justify-around items-center w-full">
                  <Image src={item.image} radius="full" width={100} height={100} />
                  <h3 className="text-md font-bold">{item.name}</h3>
                </div>
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {isFetchingAttachData ? <Spinner /> : (
          array.map((d: any, index: number) => (
            <Card shadow="sm" key={index} className="w-full lg:w-1/2 h-full">
              <CardBody className="flex flex-row items-center justify-around">
                <Image src={d?.image?.path || d?.department?.image?.path} width={300} height={300} radius="full" />
                <h3 className="text-md lg:text-xl font-bold">{d?.name || d?.department?.name}</h3>
                <RxCross2 size={30} className="cursor-pointer" onClick={() => remove(d._id)} />
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
