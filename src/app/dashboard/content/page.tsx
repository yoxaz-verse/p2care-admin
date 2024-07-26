"use client";
import Title from "@/components/titles";
import { postData, getData, patchData } from "@/core/apiHandler";
import { DesignationRoutes, GenderRoutes, LocationRoutes } from "@/core/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import Page from "@/components/Page/PageAll";
import CityComponent from "@/components/citycomponent";
import { useAsyncList } from "@react-stately/data";

const Content = () => {
  const gendercolumns = [
    { name: "NAME", uid: "name", type: "text" },
    { name: "ACTIONS", uid: "actions", type: "action" },
  ];
  const list = useAsyncList<any>({
    async load() {
      let res = await getData(LocationRoutes.district, {});
      let json = await res.data.data.data;

      return {
        items: json
      };
    },
  });

  return (
    <div className="flex flex-col w-full">
      <Title title="Content" />
      <Page apiKey="gender" title="Gender" api={GenderRoutes.gender} columns={gendercolumns} />
      <Page
        apiKey="designation"
        title="Designation"
        api={DesignationRoutes.desgination}
        columns={gendercolumns} />
      <Page
        apiKey="districts"
        title="District"
        api={LocationRoutes.district}
        columns={gendercolumns} />
      <CityComponent DistrictData={list} />
    </div>
  );
};

export default Content;
