"use client";
import Page from "@/components/Page/PageAll";
import { getData } from "@/core/apiHandler";
import { offerRoute, serviceRoutes } from "@/core/apiRoutes";
import { useAsyncList } from "@react-stately/data";

const Offers = () => {
  const ServiceDropdownData = useAsyncList<any>({
    async load() {
      let res = await getData(serviceRoutes.service, {});
      let json = await res.data.data.data;

      return {
        items: json,
      };
    },
  });
  const offerColumns = [
    { name: "Percentage", uid: "percentage", type: "text" },
    { name: "Title", uid: "title", type: "text" },
    { name: "Actions", uid: "action", type: "action" },
    {
      name: "Service",
      uid: "serviceId",
      type: "ServiceDropdown",
    },
  ];
  return (
    <Page
      columns={offerColumns}
      api={offerRoute}
      dropDownData={{
         "ServiceDropdown":ServiceDropdownData,
      }}
      title="Offers"
      apiKey="offers"
    />
  );
};

export default Offers;
