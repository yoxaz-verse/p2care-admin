"use server";

import { postData } from "@/core/apiHandler";
import { AdminRoutes } from "@/core/apiRoutes";

export async function adminLoginAction(formData: any) {
  console.log("formData", formData);

  const response = postData(AdminRoutes.adminLogin, formData, {});
  console.log("response", response);
  return response;
}
