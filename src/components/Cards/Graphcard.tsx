"use client";
import { months } from "@/utilis/content";
import { Select, SelectItem } from "@nextui-org/react";
import LineGraph from "../graphs/LineGraph";
import { useCallback, useState } from "react";





const data = [
  {
    "name": 5000,
    "uv": 500,
    "amt": 0
  },
  {
    "name": 10000,
    "uv": 10000,
    "amt": 200
  },
  {
    "name": 15000,
    "uv": 15000,
    "amt": 2290
  },
  {
    "name": 20000,
    "uv": 2780,
    "pv": 300,
    "amt": 2000
  },
]
const data1 = [
  {
    "name": 5000,
    "uv": 500,
    "amt": 0
  },
  {
    "name": 10000,
    "uv": 10000,
    "amt": 200
  },
  {
    "name": 15000,
    "uv": 15000,
    "amt": 2290
  },
  {
    "name": "20k",
    "uv": 2780,
    "pv": 300,
    "amt": 2000
  },
  {
    "name": "30k",
    "uv": 1890,
    "pv": 400,
    "amt": 2181
  },
  {
    "name": "35k",
    "uv": 2000,
    "amt": .2
  },
  {
    "name": "40k",
    "uv": 0,
    "amt": .1
  }
];

export default function GraphCard() {
  const [month, setName] = useState('jaunary');
  const sendData = useCallback(() => {
    console.log(month);
    const result = month == "january" ? data : data1;
    return result;
  }, [month, data, data1]);
  return (
    <>
      <div className="flex flex-col bg-white rounded-xl">
        <div className="flex flex-row p-5 justify-between">
          <h3 className="text-[24px] font-semibold">Sales Details</h3>
          <Select
            defaultSelectedKeys={["january"]}
            onChange={(e: any) => setName(e.target.value)}
            className="max-w-xs"
          >
            {months.map((animal: any) => (
              <SelectItem key={animal.key} value={animal.key}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <LineGraph data={sendData()} />
      </div >
    </>
  )
}
