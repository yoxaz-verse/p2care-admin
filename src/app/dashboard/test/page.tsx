"use client";
import CurdTable from "@/components/Api/curdTable";
import { GenderRoutes } from "@/core/apiRoutes";
export default function Page() {
  return (
    <main className="w-full p-5">
      <CurdTable
        api={GenderRoutes.gender}
        queryKey={["genders"]}
        title="Gender"
        columns={[
          // { name: "ID", uid: "_id" },
          { name: "NAME", uid: "name" },
          { name: "ACTIONS", uid: "actions" },
        ]}
        onOpenCreate={() => {}}
        onOpenDelete={() => {}}
        onOpenEdit={() => {}}
        onOpenView={() => {}}
      />
    </main>
  );
}
