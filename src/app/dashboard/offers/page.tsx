"use client";
import Page from "@/components/Page/PageAll";
import { getData } from "@/core/apiHandler";
import { offerRoute, serviceRoutes } from "@/core/apiRoutes";
import { useAsyncList } from "@react-stately/data";

const Offers = () => {
  const offerColumns = [
    { name: "Title", uid: "title", type: "text" },
    { name: "Link", uid: "link", type: "text" },
    { name: "Actions", uid: "action", type: "action" },
  ];
  return (
    <Page
      columns={offerColumns}
      api={offerRoute}
      title="Offers"
      apiKey="offers"
    />
  );
};

export default Offers;
