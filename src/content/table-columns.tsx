import { Statuses } from "@/utilis/content";
import { Avatar, Chip, Button, Select, SelectItem } from "@nextui-org/react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";


interface Columns {
  key: string;
  label: string;
  logic: (item: any) => any;
}


interface TotalColums {
  [key: string]: Columns[];
}
interface generateTabColumnsProps {
  onView: (type: any) => any;
  tableName: string,
  type?: string,
  setData: (item: any) => any;
}
export const generateTabColumns = ({ onView, type, tableName, setData }: generateTabColumnsProps): any[] => {
  if (tableName === "Designation") {
    return [
      {
        key: "Name",
        label: "Name",
        logic: (item: any) => (
          <h3 className="text-tableContent">
            {item.name}
          </h3>
        ),
      },
      {
        key: "Created At",
        label: "Created At",
        logic: (item: any) => (
          <h3 className="text-tableContent">
            {new Date(item.createdAt).toLocaleString()}
          </h3>
        ),
      },
      {
        key: "Actions",
        label: "Actions",
        logic: (item: any) => {
          return (
            <div className="flex flex-row gap-4">
              <Button
                isIconOnly
                onPress={() => {
                  onView("View");
                  console.log(item);
                  setData(item);
                }}
                className="bg-inherit"
                radius="full"
              >
                <FaEye />
              </Button>
              <Button
                isIconOnly
                onPress={() => {
                  onView("Update");
                  console.log(item);
                  setData(item);
                }}
                className="bg-inherit"
                radius="full"
              >
                <FaEdit />
              </Button>
              <Button
                isIconOnly
                onPress={() => {
                  setData(item._id);
                  onView("Delete");
                  console.log(item);
                }}
                className="bg-inherit bg-red-500"
                radius="full"
              >
                <FaTrash className="fill-white" />
              </Button>
            </div>
          );
        },
      }
    ]
  }

  if (tableName === "Gender") {
    return [
      {
        key: "Name",
        label: "Name",
        logic: (item: any) => (
          <h3 className="text-tableContent">
            {item.name}
          </h3>
        ),
      },
      {
        key: "Created At",
        label: "Created At",
        logic: (item: any) => (
          <h3 className="text-tableContent">
            {new Date(item.createdAt).toLocaleString()}
          </h3>
        ),
      },
      {
        key: "Actions",
        label: "Actions",
        logic: (item: any) => {
          return (
            <div className="flex flex-row gap-4">
              <Button
                isIconOnly
                onPress={() => {
                  onView("View");
                  console.log(item);
                  setData(item);
                }}
                className="bg-inherit"
                radius="full"
              >
                <FaEye />
              </Button>
              <Button
                isIconOnly
                onPress={() => {
                  onView("Update");
                  console.log(item);
                  setData(item);
                }}
                className="bg-inherit"
                radius="full"
              >
                <FaEdit />
              </Button>
              <Button
                isIconOnly
                onPress={() => {
                  setData(item._id);
                  onView("Delete");
                  console.log(item);
                }}
                className="bg-inherit bg-red-500"
                radius="full"
              >
                <FaTrash className="fill-white" />
              </Button>
            </div>
          );
        },
      }
    ]
  }
  if (tableName === "Consulation") {
    return [
      {
        key: "Name",
        label: "Name",
        logic: (item: any) => (
          <div className="flex flex-row items-center text-tableContent gap-2">
            <Avatar src={item.image[0].src} />
            <h3>{item.name}</h3>
          </div>
        ),
      },
      {
        key: "Doctor Name",
        label: "Doctor Name",
        logic: (item: any) => (
          <div className="flex flex-row items-center text-tableContent gap-2">
            <Avatar src={item.docimage[0].src} />
            <h3>{item.docName}</h3>
          </div>
        ),
      },
      {
        key: "Email",
        label: "Email",
        logic: (item: any) => <h3 className="text-tableContent">{item.email}</h3>,
      },
      {
        key: "Time",
        label: "Time",
        logic: (item: any) => (
          <h3 className="flex flex-row items-center text-tableContent gap-2"> {item.time}</h3>
        ),
      },
      {
        key: "Date",
        label: "Date",
        logic: (item: any) => <h3 className="text-tableContent">{item.date}</h3>,
      },
      {
        key: "Status",
        label: "Status",
        logic: (item: any) => (
          <Select
            placeholder="Update the Status"
            description="Update the status from here"
            defaultSelectedKeys={[item.status]}
            className="max-w-xs"
          >
            {Statuses.map((status: any) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>
        ),
      },
      {
        key: "Actions",
        label: "Actions",
        logic: (item: any) =>
          item.action === "View" ? (
            <Button
              isIconOnly
              onPress={() => {
                onView("View");
                console.log(item);
                setData(item);
              }}
              className="bg-inherit"
              radius="full"
            >
              <FaEye />
            </Button>
          ) : null,
      },
    ];
  }
  if ((type === "Status 1" && tableName === "Doctors by Hospitals") || (type === "Status 2" && tableName === "Doctors by Hospitals") || type === "Status 3" && tableName === "Doctors by Hospitals") {
    return [
      {
        key: "Name",
        label: "Name",
        logic: (item: any) => (
          <div className="flex flex-row items-center text-tableContent gap-2">
            <Avatar src={item.image[0].src} />
            <h3>{item.name}</h3>
          </div>
        ),
      },
      {
        key: "Hospital Name",
        label: "Hospital Name",
        logic: (item: any) => (
          <div className="flex flex-row items-center text-tableContent gap-2">
            <Avatar src={item.hosimage[0].src} />
            <h3>{item.hosName}</h3>
          </div>
        ),
      },
      {
        key: "Doctor Name",
        label: "Doctor Name",
        logic: (item: any) => (
          <div className="flex flex-row items-center text-tableContent gap-2">
            <Avatar src={item.docimage[0].src} />
            <h3>{item.docName}</h3>
          </div>
        ),
      },
      {
        key: "Email",
        label: "Email",
        logic: (item: any) => <h3 className="text-tableContent">{item.email}</h3>,
      },
      {
        key: "Date",
        label: "Date",
        logic: (item: any) => <h3 className="text-tableContent">{item.date}</h3>,
      },
      {
        key: "Status",
        label: "Status",
        logic: (item: any) => (
          <Select
            placeholder="Update the Status"
            description="Update the status from here"
            defaultSelectedKeys={[item.status]}
            className="max-w-xs"
          >
            {Statuses.map((status: any) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>
        ),
      },
      {
        key: "Actions",
        label: "Actions",
        logic: (item: any) =>
          item.action === "View" ? (
            <Button
              isIconOnly
              onPress={() => {
                onView("View");
                setData(item);
              }}
              className="bg-inherit shadow-xl"
              radius="full"
            >
              <FaEye />
            </Button>
          ) : null,
      },
    ];
  }
  if (tableName === "Departments") {
    if (type === "Status 1" || type === "Status 2" || type === "Status 3") {
      return [
        {
          key: "Name",
          label: "Name",
          logic: (item: any) => {
            return (
              <div className="flex flex-row items-center text-tableContent gap-2">
                <Avatar src={item.image[0].src} />
                <h3>{item.name}</h3>
              </div>
            );
          },
        },
        {
          key: "Department Name",
          label: "Department Name",
          logic: (item: any) => {
            return (
              <div className="flex flex-row items-center text-tableContent gap-2">
                <h3>{item.departmentName}</h3>
              </div>
            );
          },
        },
        {
          key: "Email",
          label: "Email",
          logic: (item: any) => {
            return <h3 className="text-tableContent">{item.email}</h3>;
          },
        },
        {
          key: "Date",
          label: "Date",
          logic: (item: any) => {
            return <h3 className="text-tableContent">{item.date}</h3>;
          },
        },
        {
          key: "Status",
          label: "Status",
          logic: (item: any) => {
            return (
              <Select
                placeholder="Update the Status"
                description="Update the status from here"
                defaultSelectedKeys={[item.status]}
                className="max-w-xs"
              >
                {Statuses.map((animal: any) => (
                  <SelectItem key={animal} value={animal}>
                    {animal}
                  </SelectItem>
                ))}
              </Select>
            );
          },
        },
        {
          key: "Actions",
          label: "Actions",
          logic: (item: any) => {
            if (item.action === "View") {
              return (
                <Button
                  isIconOnly
                  onPress={() => {
                    onView("View");
                    setData(item);
                  }}
                  className="bg-inherit shadow-xl"
                  radius="full"
                >
                  <FaEye />
                </Button>
              );
            }
            return null;
          },
        },
      ];
    }
  }

  if (tableName === "Services") {
    if (type === "Status 1" || type === "Status 2" || type === "Status 3") {
      return [
        {
          key: "Name",
          label: "Name",
          logic: (item: any) => {
            return (
              <div className="flex flex-row items-center text-tableContent gap-2">
                <Avatar src={item.image[0].src} />
                <h3>{item.name}</h3>
              </div>
            );
          },
        },
        {
          key: "Service Name",
          label: "Service Name",
          logic: (item: any) => {
            return (
              <h3 className="flex flex-row items-center text-tableContent gap-2">
                {item.serviceName}
              </h3>
            );
          },
        },
        {
          key: "Email",
          label: "Email",
          logic: (item: any) => {
            return <h3 className="text-tableContent">{item.email}</h3>;
          },
        },
        {
          key: "Date",
          label: "Date",
          logic: (item: any) => {
            return <h3 className="text-tableContent">{item.date}</h3>;
          },
        },
        {
          key: "Status",
          label: "Status",
          logic: (item: any) => {
            return (
              <Select
                placeholder="Update the Status"
                description="Update the status from here"
                defaultSelectedKeys={[item.status]}
                className="max-w-xs"
              >
                {Statuses.map((animal: any) => (
                  <SelectItem key={animal} value={animal}>
                    {animal}
                  </SelectItem>
                ))}
              </Select>
            );
          },
        },
        {
          key: "Actions",
          label: "Actions",
          logic: (item: any) => {
            if (item.action === "View") {
              return (
                <Button
                  isIconOnly
                  onPress={() => {
                    onView("View");
                    setData(item);
                  }}
                  className="bg-inherit shadow-xl"
                  radius="full"
                >
                  <FaEye />
                </Button>
              );
            }
            return null;
          },
        },
      ];
    }
  }

  if (tableName === "Hospitals") {
    if (type === "Status 1" || type === "Status 2" || type === "Status 3") {
      return [
        {
          key: "Name",
          label: "Name",
          logic: (item: any) => {
            return (
              <div className="flex flex-row items-center text-tableContent gap-2">
                <Avatar src={item.image[0].src} />
                <h3>{item.name}</h3>
              </div>
            );
          },
        },
        {
          key: "Hospital Name",
          label: "Hospital Name",
          logic: (item: any) => {
            return (
              <div className="flex flex-row items-center text-tableContent gap-2">
                <Avatar src={item.hosimage[0].src} />
                <h3>{item.hosName}</h3>
              </div>
            );
          },
        },
        {
          key: "Email",
          label: "Email",
          logic: (item: any) => {
            return <h3 className="text-tableContent">{item.email}</h3>;
          },
        },
        {
          key: "Date",
          label: "Date",
          logic: (item: any) => {
            return <h3 className="text-tableContent">{item.date}</h3>;
          },
        },
        {
          key: "Status",
          label: "Status",
          logic: (item: any) => {
            return (
              <Select
                placeholder="Update the Status"
                description="Update the status from here"
                defaultSelectedKeys={[item.status]}
                className="max-w-xs"
              >
                {Statuses.map((animal: any) => (
                  <SelectItem key={animal} value={animal}>
                    {animal}
                  </SelectItem>
                ))}
              </Select>
            );
          },
        },
        {
          key: "Actions",
          label: "Actions",
          logic: (item: any) => {
            if (item.action === "View") {
              return (
                <Button
                  isIconOnly
                  onPress={() => {
                    onView("View");
                    setData(item);
                  }}
                  className="bg-inherit shadow-xl"
                  radius="full"
                >
                  <FaEye />
                </Button>
              );
            }
            return null;
          },
        },
      ];
    }
  }

  if (tableName === "Doctors") {
    if (type === "Status 1" || type === "Status 2" || type === "Status 3") {
      return [
        {
          key: "Name",
          label: "Name",
          logic: (item: any) => {
            console.log(item);
            return (
              <div className="flex flex-row items-center text-tableContent gap-2">
                <Avatar src={item.image[0].src} />
                <h3>{item.name}</h3>
              </div>
            );
          },
        },
        {
          key: "Doctor Name",
          label: "Doctor Name",
          logic: (item: any) => {
            return (
              <div className="flex flex-row items-center text-tableContent gap-2">
                <Avatar src={item.docimage[0].src} />
                <h3>{item.docName}</h3>
              </div>
            );
          },
        },
        {
          key: "Email",
          label: "Email",
          logic: (item: any) => {
            return <h3 className="text-tableContent">{item.email}</h3>;
          },
        },
        {
          key: "Date",
          label: "Date",
          logic: (item: any) => {
            return <h3 className="text-tableContent">{item.date}</h3>;
          },
        },
        {
          key: "Status",
          label: "Status",
          logic: (item: any) => {
            return (
              <Select
                placeholder="Update the Status"
                description="Update the status from here"
                defaultSelectedKeys={[item.status]}
                className="max-w-xs"
              >
                {Statuses.map((animal: any) => (
                  <SelectItem key={animal} value={animal}>
                    {animal}
                  </SelectItem>
                ))}
              </Select>
            );
          },
        },
        {
          key: "Actions",
          label: "Actions",
          logic: (item: any) => {
            if (item.action === "View") {
              return (
                <Button
                  isIconOnly
                  onPress={() => {
                    onView("View");
                    setData(item);
                  }}
                  className="bg-inherit shadow-xl"
                  radius="full"
                >
                  <FaEye />
                </Button>
              );
            }
            return null;
          },
        },
      ];
    }
  }

  return [];
};

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

