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
export const offerImageRoute = "/offer/upload"
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
  adddoctor: "/hospital-doctor",
  getdoctor: "/hospital-doctor/hospital",
  image: "/hospital/image",
  address: '/hospital/address',
  quick: "/hospital/quick",
  description: "/hospital/description",
  enquiry: '/enquiry',
  images: "/hospital/images",
  department: '/hospital-department',
  appointment: '/appointment'
}
export const serviceRoutes = {
  service: "/service",
  addDoctor: "/service/doctor",
  addHospital: "/service/hospital",
  addDepartment: "/service/department",
  image: "/service/image"
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
