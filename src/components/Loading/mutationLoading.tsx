import { Spinner } from "@nextui-org/react";
import React from "react";

function MutationLoading() {
  return (
    <div className="z-30 absolute w-screen h-screen flex justify-center items-center">
      <Spinner size="lg" title="Updating..." color="secondary" />
    </div>
  );
}

export default MutationLoading;
