"use client";
import { getData } from "@/core/apiHandler";
import { Button, Card, CardBody, Image, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Title from "./titles";

interface AttachCardProps {
  api: string,
  title: string
}

export default function AttachCard({ api, title }: AttachCardProps) {
  const [data, setData] = useState<any>({});
  const [val, setVal] = useState<any>('');
  const [array, setarray] = useState<{ data: any[] }>({ data: [] });
  const [add, setAdd] = useState<boolean>(false);

  const list1 = useAsyncList<any>({
    async load() {
      try {
        let res = await getData(`${api}`, {});
        let json = await res.data.data.data;
        return {
          items: json
        };
      } catch (error) {
        console.error('Failed to load data:', error);
        return { items: [] };
      }
    },
  });

  useEffect(() => {
    setData(list1);
  }, [val, list1]);

  const push = (data: any[]) => {
    setarray(prevArray => {
      const existingIds = new Set(prevArray.data.map(item => item._id));
      const uniqueNewData = data.filter(item => !existingIds.has(item._id));
      return {
        ...prevArray,
        data: [...prevArray.data, ...uniqueNewData]
      };
    });
  }

  const remove = (index: number) => {
    if (Array.isArray(array.data)) {
      const updatedArray = array.data.filter((_, i) => i !== index);
      setarray(prevArray => ({
        ...prevArray,
        data: updatedArray
      }));
    }
  }

  return (
    <>
      {array.data.map((d: any, index: number) => (
        <Card shadow="sm" key={index} className="w-1/2 h-1/2">
          <CardBody className="flex flex-row items-center justify-around">
            <Image src={d.image} width={130} height={130} radius="full" />
            <h3 className="text-xl font-bold">{d.name}</h3>
            <RxCross2 size={30} className="cursor-pointer" onClick={() => remove(index)} />
          </CardBody>
        </Card>
      ))}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row w-full w-full items-center gap-4">
          <Title title={title} />
          <Button color="primary" onClick={() => setAdd(!add)}>Edit</Button>
        </div>
        {add && (
          <Autocomplete
            className="max-w-md"
            isLoading={data?.isLoading}
            items={data?.items}
            label={title}
            onSelectionChange={(e) => {
              console.log(e);
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
    </>
  );
}
