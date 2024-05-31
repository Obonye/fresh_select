import React from "react";
import Link from "next/link";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Badge,
} from "@nextui-org/react";
import MyAvatar from "./avatar";

export default function SideNav() {
  return (
    <div className="min-h-screen min-w-[300px] p-4 bg-default flex flex-col fixed">
      <div>
        <MyAvatar></MyAvatar>
      </div>
      <div className="grow">Menu</div>
      <div>Settings</div>
    </div>
  );
}
