"use client";
import { users } from "@/components/data";
import CustomTable from "@/components/New Table";

async function getData() {
  const res = "Yo";
  // The return value is not serialized
  // You can return Date, Map, Set, etc.

  return res;
}

export default function Page() {
  // const data = await getData();

  return (
    <main className="w-full">
      <CustomTable
        title="Test"
        id={1}
        isLoading={false}
        data={users}
        columns={[
          { name: "ID", uid: "id" },
          { name: "NAME", uid: "name" },
          { name: "ROLE", uid: "role" },
          { name: "STATUS", uid: "status" },
          { name: "ACTIONS", uid: "actions" },
        ]}
        onOpenEdit={() => {}}
        onOpenView={() => {}}
        onOpenDelete={() => {}}

        //       title,
        // isLoading,
        // data,
        // columns,
        // onOpenEdit,
        // onOpenView,
        // onOpenDelete,
        // id,
      />
    </main>
  );
}
