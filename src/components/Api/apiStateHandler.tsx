import React from "react";

interface IApiStateHandlerProps<T> {
  children: (data: T) => React.ReactNode;
  childrenData?: T[];
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

function ApiStateHandler<T>({
  children,
  childrenData,
  loadingComponent,
  errorComponent,
  emptyComponent,
  isLoading,
  isError,
  isSuccess,
}: IApiStateHandlerProps<T>) {
  if (isLoading) {
    return <>{loadingComponent ? loadingComponent : "<DefaultLoading />"}</>;
  }

  if (isError) {
    return <>{errorComponent ? errorComponent : "<DefaultError />"}</>;
  }

  if (isSuccess && childrenData?.length === 0) {
    return (
      <>
        {emptyComponent ? (
          emptyComponent
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-500">No Data Found</h1>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {isSuccess &&
        childrenData?.map((data: T, index: number) => (
          <div key={index}>{children(data)}</div>
        ))}
    </>
  );
}

export default ApiStateHandler;
