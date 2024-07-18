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
    key: "NoodSepciality",
    value: "Number of Speicailities"
  }
]

