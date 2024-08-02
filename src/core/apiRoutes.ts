export const GenderRoutes = {
  gender: "/gender",
};
export const DesignationRoutes = {
  desgination: "/designation",
};
export const LocationRoutes = {
  city: "/city",
  district: "/district",
  districtAll: "/district/all"
}
export const offerRoute = "/offer";

export const Doctor = {
  docotor: "/doctor",
  quick: "/doctor/quick",
  procedure: "/procedure",
  appointments: "/appointment",
  enquiry: "/enquiry",
  department: "/department"
}
export const HospitalRoutes = {
  hospital: "/hospital",
  image: "/hospital/image",
  quick: "/hospital/quick",
  description: "/hospital/description",
  enquiry: '/enquiry',
  department: '/hospital-department',
  appointment: '/appointment'
}
export const patientRoutes = {
  patient: "/patient"
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
