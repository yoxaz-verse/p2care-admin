interface TableData {
  [key: string]: [value: string]
}

export const DetailsData: any[] = [
  {
    name: "Product A",
    image: [{ src: "https://example.com/images/productA.jpg" }],
    Location: "New York",
    date: "2024-07-18",
    piece: 1,
    amount: 100,
    status: "Delivered"
  },
  {
    name: "Product B",
    image: [{ src: "https://example.com/images/productB.jpg" }],
    Location: "Los Angeles",
    date: "2024-07-17",
    piece: 2,
    amount: 150,
    status: "Pending"
  },
]

export const HospitalData: any[] = [
  {
    name: "Hospital A",
    image: [{ src: "https://example.com/images/productA.jpg" }],
    Location: "Mumbai",
    NoofDocs: 10,
    NoofSepciality: 10,
    amount: 200,
    actions: ["View", "Delete"]
  },
  {
    name: "Hospital B",
    image: [{ src: "https://example.com/images/productA.jpg" }],
    Location: "Mumbai",
    amount: 200,
    NoofDocs: 10,
    NoofSepciality: 10,
    actions: ["View", "Delete"]
  },
]
export interface Types {
  type: string,
  key: string,
  value: string
}
export const HospitalType: Types[] = [
  {
    type: "text",
    key: "name",
    value: "Hospital Name"
  },
  {
    type: "image",
    key: "image",
    value: "Hospital Image"
  },
  {
    type: "text",
    key: "Location",
    value: "Location"
  },
  {
    type: "text",
    key: "NoofDocs",
    value: "Number of Doctors"
  },
  {
    type: "text",
    key: "NoofSepciality",
    value: "Number of Speicailities"
  }
]


export const generateLeadsType = (tableType: string) => {
  switch (tableType) {
    case "Doctors":
      return [
        {
          type: "text",
          key: "name",
          value: "Doctor Name"
        },
        {
          type: "text",
          key: "docName",
          value: "Doctor Name"
        },
        {
          type: "text",
          key: "Email",
          value: "Email"
        },
        {
          type: "text",
          key: "Date",
          value: "Date"
        },
        {
          type: "LeadsDropdown",
          key: "status",
          value: "Status"
        }
      ];
    case "Departments":
      return [
        {
          type: "text",
          key: "name",
          value: "Department Name"
        },
        {
          type: "text",
          key: "manager",
          value: "Department Manager"
        },
        {
          type: "text",
          key: "location",
          value: "Location"
        }
      ];
    case "Services":
      return [
        {
          type: "text",
          key: "name",
          value: "Service Name"
        },
        {
          type: "text",
          key: "description",
          value: "Service Description"
        },
        {
          type: "text",
          key: "category",
          value: "Service Category"
        }
        // Add more fields as needed
      ];
    case "Hospitals":
      return [
        {
          type: "text",
          key: "name",
          value: "Hospital Name"
        },
        {
          type: "image",
          key: "image",
          value: "Hospital Image"
        },
        {
          type: "text",
          key: "location",
          value: "Location"
        },
        {
          type: "text",
          key: "noOfDoctors",
          value: "Number of Doctors"
        },
        {
          type: "text",
          key: "noOfSpecialties",
          value: "Number of Specialties"
        }
      ];
    default:
      return [];
  }
};
export default function generateData({ tableName }: { tableName: string }): any[] {
  switch (tableName) {
    case "Consulation": return [
      {
        name: "John Doe",
        image: [{ src: "https://example.com/images/doctor1.jpg" }],
        docName: "Dr. Smith",
        docimage: [{ src: "https://example.com/images/docsmith.jpg" }],
        email: "john.doe@example.com",
        date: "2024-07-19",
        time: "7:00PM-8:00PM",
        status: "Status 1",
        action: "View"
      },
      {
        name: "Jane Smith",
        image: [{ src: "https://example.com/images/doctor2.jpg" }],
        docName: "Dr. Brown",
        docimage: [{ src: "https://example.com/images/drbrown.jpg" }],
        email: "jane.smith@example.com",
        date: "2024-07-18",
        time: "7:00PM-8:00PM",
        status: "Status 1",
        action: "View"
      },

    ];
    case "Doctors": return [
      {
        name: "John Doe",
        image: [{ src: "https://example.com/images/doctor1.jpg" }],
        docName: "Dr. Smith",
        docimage: [{ src: "https://example.com/images/docsmith.jpg" }],
        email: "john.doe@example.com",
        date: "2024-07-19",
        status: "Status 1",
        action: "View"
      },
      {
        name: "Jane Smith",
        image: [{ src: "https://example.com/images/doctor2.jpg" }],
        docName: "Dr. Brown",
        docimage: [{ src: "https://example.com/images/drbrown.jpg" }],
        email: "jane.smith@example.com",
        date: "2024-07-18",
        status: "Status 1",
        action: "View"
      },
    ]
    case "Hospitals": return [
      {
        name: "Hospital A",
        image: [{ src: "https://example.com/images/hospital1.jpg" }],
        hosname: "Hospital A",
        hosimage: [{ src: "https://example.com/images/hosA.jpg" }],
        email: "hospitalA@example.com",
        date: "2024-07-19",
        status: "Active",
        action: "View"
      },
      {
        name: "Hospital B",
        image: [{ src: "https://example.com/images/hospital2.jpg" }],
        hosname: "Hospital B",
        hosimage: [{ src: "https://example.com/images/hosB.jpg" }],
        email: "hospitalB@example.com",
        date: "2024-07-18",
        status: "Inactive",
        action: "View"
      },
    ];
    case "Services":
      return [
        {
          name: "John Doe",
          image: [{ src: "https://example.com/images/hospital1.jpg" }],
          serviceName: "Hospital A",
          email: "hospitalA@example.com",
          date: "2024-07-19",
          status: "Active",
          action: "View"
        },
        {
          name: "John Doe",
          image: [{ src: "https://example.com/images/hospital2.jpg" }],
          serviceName: "Hospital A",
          hosImage: [{ src: "https://example.com/images/hosB.jpg" }],
          email: "hospitalB@example.com",
          date: "2024-07-18",
          status: "Inactive",
          action: "View"
        },
      ];
    case "Departments": return [
      {
        name: "John Doe",
        image: [{ src: "https://example.com/images/department1.jpg" }],
        departmentName: "Department A",
        departmentImage: [{ src: "https://example.com/images/depA.jpg" }],
        email: "departmentA@example.com",
        date: "2024-07-19",
        status: "Active",
        action: "View"
      },
      {
        name: "Department B",
        image: [{ src: "https://example.com/images/department2.jpg" }],
        departmentName: "Department B",
        departmentImage: [{ src: "https://example.com/images/depB.jpg" }],
        email: "departmentB@example.com",
        date: "2024-07-18",
        status: "Inactive",
        action: "View"
      },
    ];
    case "Doctors by Hospitals":
      return [
        {
          name: "John Doe",
          image: [{ src: "https://example.com/images/doctor1.jpg" }],
          hosName: "Hospital A",
          hosimage: [{ src: "https://example.com/images/hosA.jpg" }],
          docName: "Dr. Smith",
          docimage: [{ src: "https://example.com/images/hosA.jpg" }],
          email: "john.doe@example.com",
          date: "2024-07-19",
          status: "Active",
          action: "View"
        },
        {
          name: "Jane Smith",
          image: [{ src: "https://example.com/images/doctor2.jpg" }],
          hosName: "Hospital B",
          hosimage: [{ src: "https://example.com/images/hosB.jpg" }],
          docimage: [{ src: "https://example.com/images/hosA.jpg" }],
          docName: "Dr. Brown",
          email: "jane.smith@example.com",
          date: "2024-07-18",
          status: "Inactive",
          action: "View"
        },
      ];
    default:
      return [];
  }
}
