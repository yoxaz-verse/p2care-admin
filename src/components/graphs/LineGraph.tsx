"use client";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";


export default function LineGraph(data: any) {
  const [loading, setLoading] = useState(true);
  console.log(data.data);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <h3 className="text-center">Loading...</h3>
      ) : (
        <AreaChart width={1300} height={278} data={data.data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis dataKey="amt" />
          <CartesianGrid strokeDasharray="4 5" />
          <Area type="monotone" dataKey="amt" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      )}
    </>
  );
}
