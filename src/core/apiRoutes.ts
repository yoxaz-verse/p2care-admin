export const GenderRoutes = {
  gender: "/gender",
};
export const DesignationRoutes = {
  desgination: "/designation",
};
export const LocationRoutes = {
  city: "/city",
  district: "/district"
}
export const Doctor = {
  docotor: "/doctor",
  appointments: "/appointment",
  enquiry: "/enquiry",
  department: "/department"
}
const admin = "/admin";
export const AdminRoutes = {
  admin: "/admin",
  adminLogin: `${admin}/login`,
  adminLogout: `${admin}/logout`,
  adminForgotPassword: `${admin}/forgot-password`,
  adminResetPassword: `${admin}/reset-password`,
  adminChangePassword: `${admin}/change-password`,
  adminProfile: `${admin}/profile`,
  adminUpdateProfile: `${admin}/update-profile`,
  adminUpdatePassword: `${admin}/update-password`,
  adminList: `${admin}/list`,
  adminCreate: `${admin}/create`,
  adminUpdate: `${admin}/update`,
  adminDelete: `${admin}/delete`,
};
