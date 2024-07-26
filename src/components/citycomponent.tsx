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
  let list = useAsyncList<any>({
    async load({ filterText }) {
      let res = await getData(
        `${LocationRoutes.districtAll}/?search=${filterText}`,
        {}
      );
      let json = await res.data.data;

      return {
        items: json,
      };
    },
  });
  return (
    <>
      <Autocomplete
        className="max-w-xs"
        inputValue={list.filterText}
        isLoading={list.isLoading}
        items={list.items}
        label="Select a character"
        placeholder="Type to search..."
        variant="bordered"
        onInputChange={list.setFilterText}
      >
        {(item) => (
          <AutocompleteItem key={item.name} className="capitalize">
            {item.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Page
        apiKey="cities"
        title="City"
        searchBy={["name"]}
        dropDownData={DropDownData}
        api={LocationRoutes.city}
        columns={countrycolumns}
      />
    </>
  );
}
