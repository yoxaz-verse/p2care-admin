import CountCard, { CountCardProps } from "@/components/Cards/Count-Card";
import GraphCard from "@/components/Cards/Graphcard";
import { CountCardsList } from "@/utilis/content";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <h3 className="font-extrabold text-[44px]">Dashboard</h3>
        <div className="grid  grid-cols-3 md:grid-cols-4 gap-2 xl:grid-cols-5">
          {CountCardsList.map((c: CountCardProps, index: number) => (
            <CountCard key={index} count={c.count} title={c.title} icon={c.icon} />
          ))}
        </div>
        <GraphCard />
      </div>
    </>
  )
}
