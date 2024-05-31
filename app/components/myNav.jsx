"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function MyNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Inventory", path: "/dashboard/inventory" },
    { label: "Orders", path: "/dashboard/orders" },
    { label: "Billing", path: "/dashboard/billing" },
  ];
  return (
    <Navbar
      className=" bg-transparent"
      maxWidth="2xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Image alt="App logo" src="/app_icon.svg" width={55} height={55} />
        <h1 className="invisible md:visible">Fresh Select</h1>
      </NavbarBrand>
      <NavbarContent justify="center" className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard/inventory">
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
        <NavbarMenuItem>
          <ThemeSwitcher />
        </NavbarMenuItem>
        <Badge color="danger" content={3} shape="circle">
          <Button isIconOnly variant="faded">
            <BellIcon />
          </Button>
        </Badge>
        <MyAvatar></MyAvatar>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map(({ label, path }, index) => (
          <NavbarMenuItem key={`${label}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={path}
              size="lg"
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
