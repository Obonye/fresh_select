"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
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
import { NotificationList } from "../components/notifications_list";
import { NotificationsController } from "../controllers/notifications_controller";
import { createClient } from "@/utils/supabase/client";

let supabase = createClient();
export default function MyNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Inventory", path: "/dashboard/inventory" },
    { label: "Orders", path: "/dashboard/orders" },
    { label: "Billing", path: "/dashboard/billing" },
  ];

  const fetchNotificationCount = async () => {
    try {
      const { data, error } = await supabase
        .from("order_notifications")
        .select("*")
        .eq("read", false);
      if (data) {
        setNotificationCount(data.length);
      }
    } catch (error) {
      console.error("Failed to fetch notification count:", error);
    }
  };

  useEffect(() => {
    fetchNotificationCount();

    // Set up an interval to fetch the count every 5 minutes
    const intervalId = setInterval(fetchNotificationCount, 5 * 60 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleNotificationOpen = () => {
    // Optionally reset the notification count when opened
    setNotificationCount(0);
    // You might want to call an API to mark notifications as read here
  };
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
          <Link color="foreground" href="/dashboard/orders">
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
        <Badge color="primary" content={notificationCount} shape="circle">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="faded">
                <BellIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>
                <NotificationList></NotificationList>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
