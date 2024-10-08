import { getData } from "@/core/apiHandler";
import { HospitalRoutes } from "@/core/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface QueryComponentProps<T> {
  api: string;
  queryKey: string[];
  children?: (data: T) => React.ReactNode;
  page: number;
  limit?: number;
  search?: string;
}

function QueryComponent<T>(props: QueryComponentProps<T>) {
  const { api, queryKey, children } = props;

  const data = useQuery({
    queryKey,
    queryFn: () =>
      getData(api, {
        page: props.page,
        limit: props.limit,
        search: props.search,
      }),
  });
  // If any of the mutations are loading, show a loading message

  if (data.isLoading) {
    return <div>Query Loading...</div>;
  }

  if (data.isError) {
    return <div>Query Failed...</div>;
  }

  // Pass the data to the children
  return <div>{children && children(data.data?.data?.data as T)}</div>;
}

export default QueryComponent;
