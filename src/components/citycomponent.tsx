import { LocationRoutes } from "@/core/apiRoutes";
import Page from "./Page/PageAll";
import { useAsyncList } from "@react-stately/data";
import { getData } from "@/core/apiHandler";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

interface CityComponentProps {
  DistrictData: any;
}

const countrycolumns = [
  { name: "NAME", uid: "name", type: "text" },
  { name: "PINCODE", uid: "pincode", type: "number" },
  { name: "DISTRICT", uid: "district", type: "districtDropdown" },
  { name: "ACTIONS", uid: "actions", type: "action" },
];

export default function CityComponent({ DistrictData }: CityComponentProps) {
  const DropDownData = {
    district: DistrictData,
  };
  return (
    <>
      <Page
        apiKey="cities"
        title="City"
        // searchBy={["name"]}
        dropDownData={DropDownData}
        api={LocationRoutes.city}
        columns={countrycolumns}
      />
    </>
  );
}
