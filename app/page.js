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
      const { data, error } = await supabase.auth.getUser();
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
          <NavbarBrand>
            <Image alt="App logo" src="/app_icon.svg" width={55} height={55} />
            <h1>Fresh Select</h1>
          </NavbarBrand>
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
                <Button onClick={()=>router.push("/auth/register")}>Sign Up</Button>
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
          <h1 className="text-4xl md:text-7xl">Food On Demand</h1>
          <small className="text-2xl md:text-3xl">
            <span className="text-orange-500">Anywhere, Anytime</span>
          </small>
          <p className="w-[375px] text-center text-sm md:text-lg text-gray-500">
            Discover a world of farm-fresh ingredients, delivered in a flash,
            with our user-friendly platform, transparent pricing, and reliable
            community-focused service.
          </p>
        </div>
        <div className="grid place-content-center">
          <Button className="bg-gradient-to-br from-gray-800 to-orange-500 w-[200px]" onClick={() => router.push("/auth/register")}>Get Started</Button>
        </div>
      </div>
      <div className="h-screen ">
          <h1 className="text-3xl text-center mt-4">What we offer</h1>
          <div className="grid grid-cols-3 p-6 gap-3 m-5 ">
            <Card className=" h-[300px] col-span-2 bg-transparent"isFooterBlurred>
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                
                  <div className="flex flex-col">
                    <h1 className="text-xl text-white/70">Delivery</h1>
                    <small className="text-white/60">
                      Managed hassle free deliveries to your customers
                    </small>
                  </div>
                </div>
                <Button radius="full" size="sm">
                  Get App
                </Button>
              </CardFooter>
            </Card>
            <Card className=" h-[300px] col-span-1 " isFooterBlurred>
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                
                  <div className="flex flex-col">
                    <h1 className="text-xl text-white/70">Delivery</h1>
                    <small className="text-white/60">
                      Managed hassle free deliveries to your customers
                    </small>
                  </div>
                </div>
                <Button radius="full" size="sm">
                  Get App
                </Button>
              </CardFooter>
            </Card>
            <Card className=" h-[300px] col-span-1 " isFooterBlurred>
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1669122521296-b7317123ac7a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
                              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                
                  <div className="flex flex-col">
                    <h1 className="text-xl text-white/70">Delivery</h1>
                    <small className="text-white/60">
                      Managed hassle free deliveries to your customers
                    </small>
                  </div>
                </div>
                <Button radius="full" size="sm">
                  Get App
                </Button>
              </CardFooter>
            </Card>
            <Card className=" h-[300px] col-span-2 " isFooterBlurred>

              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1621459555843-9a77f1d03fae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                
                  <div className="flex flex-col">
                    <h1 className="text-xl text-white/70">Delivery</h1>
                    <small className="text-white/60">
                      Managed hassle free deliveries to your customers
                    </small>
                  </div>
                </div>
                <Button radius="full" size="sm">
                  Get App
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
    </>
  );
}
