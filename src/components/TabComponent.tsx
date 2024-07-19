import { Tab, TabsProps } from "@nextui-org/react";
import { ReactNode } from "react";

interface TabsPropsNew {
  name: string,
  children: ReactNode
}


export default function TabComponent({ name, children }: TabsPropsNew) {
  return (
    <Tab name={name} value={name}>
      {children}
    </Tab>
  )
}
