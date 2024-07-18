import { Avatar, Chip, Button } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";


interface Columns {
  key: string;
  label: string;
  logic: (item: any) => any;
}


interface TotalColums {
  [key: string]: Columns[];
}


export const tablecolums: TotalColums = {
  "Deals": [
    {
      key: "Product Name",
      label: "Product Name",
      logic: (item: any) => {
        return (
          <div className="flex flex-row items-center text-tableContent gap-2">
            <Avatar src={item.image[0].src} />
            <h3>{item.name}</h3>
          </div>
        );
      }
    },
    {
      key: "Location",
      label: "Location",
      logic: (item: any) => {
        return (
          <h3 className="text-tableContent">{item.Location}</h3>
        );
      }
    },
    {
      key: "Date",
      label: "Date",
      logic: (item: any) => {
        return (
          <h3 className="text-tableContent">{item.date}</h3>
        );
      }
    },
    {
      key: "Piece",
      label: "Piece",
      logic: (item: any) => {
        return (
          <h3 className="text-tableContent">{item.piece}</h3>
        );
      }
    },
    {
      key: "Amount",
      label: "Amount",
      logic: (item: any) => {
        return (
          <h3 className="text-tableContent">₹{item.amount}</h3>
        );
      }
    },
    {
      key: "Status",
      label: "Status",
      logic: (item: any) => {
        return (
          <Chip radius="full" className="text-white" color={item.status === "Delivered" ? "success" : "warning"}>
            {item.status === "Delivered" ? "Delivered" : "Pending"}
          </Chip>
        );
      }
    }
  ],
};

export function DoctorsData({ handleOpenView, handleDelete }: { handleOpenView: () => any, handleDelete: () => any }) {
  return [
    {
      key: "Hospital Name",
      label: "Hospital Name",
      logic: (item: any) => {
        return (
          <div className="flex flex-row items-center text-tableContent gap-2">
            <Avatar src={item.image[0].src} />
            <h3>{item.name}</h3>
          </div>
        );
      }
    },
    {
      key: "Location",
      label: "Location",
      logic: (item: any) => {
        return (
          <h3 className="text-tableContent">{item.Location}</h3>
        );
      }
    },
    {
      key: "Amount",
      label: "Amount",
      logic: (item: any) => {
        return (
          <h3 className="text-tableContent">₹{item.amount}</h3>
        );
      }
    },
    {
      key: "No of doctors",
      label: "No of Doctors",
      logic: (item: any) => {
        console.log(item);
        return (
          <h3 className="text-tableContent">{item.NoofDocs}</h3>
        )
      }
    },
    {
      key: "No of Speciality",
      label: "No of Speciality",
      logic: (item: any) => {
        console.log(item);
        return (
          <h3 className="text-tableContent">{item.NoofSepciality}</h3>
        )
      }
    },
    {
      key: "Actions",
      label: "Actions",
      logic: (item: any) => {
        <div className="flex flex-row">
          {item.actions[0] === "View" && (
            <Button onPress={handleOpenView} radius="full">
              <FaEye /> View
            </Button>
          )}
          {item.actions[1] === "Delete" && (
            <Button onPress={handleDelete} radius="full">
              <FaEye /> Delete
            </Button>
          )}
        </div>
      }
    }
  ]
}
