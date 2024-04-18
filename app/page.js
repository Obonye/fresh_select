"use client";

import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Card,
  CardFooter,
  Image,
  CardHeader,
  CardBody,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { createClient } from "@/utils/supabase/client";
export default function Home() {
  const router = useRouter();
  const supabase = createClient();
  const [session, setSession] = React.useState();
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      setSession(data);
      console.log(data);
    };
    fetchSession();
  }, [setSession, supabase.auth]);

  return (
    <>
      <Navbar maxWidth="full" className="">
        <NavbarContent>
          <NavbarBrand>Logo</NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end" className="w-full">
          {session ? (
            <NavbarItem>
              <Button onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem>
                <Button onClick={() => router.push("/auth/login")}>
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button>Sign Up</Button>
              </NavbarItem>
            </>
          )}

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
      </div>
      <div className="h-screen">
        <h1 className="text-3xl text-center">What we offer you</h1>
        <div className="grid grid-cols-3 p-6 gap-3 m-5 ">
          <Card className=" h-[300px] col-span-2">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <h1 className="text-xl">Delivery</h1>
              <small>Managed hassle free deliveries to your customers</small>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Card>
          <Card className=" h-[300px] col-span-1">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <h1 className="text-xl">Delivery</h1>
              <small>Managed hassle free deliveries to your customers</small>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1484371924254-a44002341ca9?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Card>

        </div>
      </div>
    </>
  );
}
