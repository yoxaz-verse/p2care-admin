import { Card, CardBody, CardFooter } from "@nextui-org/react"


export interface CountCardProps {
  title: string,
  icon: React.ReactNode,
  count: number
}

export default function CountCard({ title, icon, count }: CountCardProps) {
  return (
    <>
      <div className="flex flex-row justify-around items-center gap-2 rounded-xl w-[218px] bg-white h-[121px] rounded-xl bg-white">
        <div className="flex flex-col rounded-xl  rounded-xl flex flex-row justify-between">
          <h3>{title}</h3>
          <h3 className="font-semibold text-[28px]">{count}</h3>
        </div>
        <div className="rounded-xl h-[60px] w-[60px] flex flex-col justify-center items-center bg-[#81D4FF]/[.21]">
          {icon}
        </div>
      </div>
    </>
  )
}
