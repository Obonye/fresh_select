"use client";
import React, { useState } from "react";
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
import BellIcon from "../icons/BellIcon";

export default function MyNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  return (
    <Navbar
      className="w-full bg-transparent"
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>Logo</NavbarBrand>
      <NavbarContent justify="center" className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Inventory
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Orders
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Billing
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Badge color="danger" content={3} shape="circle">
          <Button isIconOnly variant="faded">
            <BellIcon />
          </Button>
        </Badge>
        <MyAvatar></MyAvatar>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
