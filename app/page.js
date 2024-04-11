'use client'

import { Button } from "@nextui-org/react";
import React from "react";
import { useRouter } from 'next/navigation'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
export default function Home() {
  const router=useRouter()
  return (
    <>
      <Navbar maxWidth="xl" className="">
        <NavbarContent>
          <NavbarBrand>Logo</NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end" className="w-full">
          <NavbarItem>
            <Button onClick={()=>router.push('/auth/login')}>Login</Button>
          </NavbarItem>
          <NavbarItem>
            <Button>Sign Up</Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="h-screen grid place-content-center text-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl">Food On Demand</h1>
          <small className="text-3xl">
            <span className="text-orange-500">Anywhere, Anytime</span>
          </small>
          <p className="w-[400px] text-center text-lg">
            Discover a world of farm-fresh ingredients, delivered in a flash,
            with our user-friendly platform, transparent pricing, and reliable
            community-focused service.
          </p>
        </div>
        <div className="grid place-content-center">
          <Button className="bg-orange-500 w-[200px]">Get Started</Button>
        </div>
        <div>
          <small>Our partners</small>
        </div>
      </div>
    </>
  );
}
