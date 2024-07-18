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
                <Button onClick={() => router.push("/auth/register")}>
                  Sign Up
                </Button>
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
          <Button
            className="bg-gradient-to-br from-gray-800 to-orange-500 w-[200px]"
            onClick={() => router.push("/auth/register")}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="min-h-screen py-10 px-4">
        <h1 className="text-3xl md:text-4xl text-center mb-10">
          What we offer
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <Card
            className="h-[300px] md:col-span-2 bg-transparent"
            isFooterBlurred
          >
            <Image
              isZoomed
              removeWrapper
              alt="Delivery service"
              className="z-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <h2 className="text-lg md:text-xl text-white/90">Delivery</h2>
                  <p className="text-sm text-white/80">
                    Managed hassle-free deliveries to your customers
                  </p>
                </div>
              </div>
              <Button radius="full" size="sm">
                Get App
              </Button>
            </CardFooter>
          </Card>

          <Card className="h-[300px]" isFooterBlurred>
            <Image
              isZoomed
              removeWrapper
              alt="Inventory management"
              className="z-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1616401776146-ae3453da7105?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-col">
                <h2 className="text-lg md:text-xl text-white/90">Inventory</h2>
                <p className="text-sm text-white/80">
                  Efficient inventory management system
                </p>
              </div>
              <Button radius="full" size="sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card className="h-[300px]" isFooterBlurred>
            <Image
              isZoomed
              removeWrapper
              alt="Photography service"
              className="z-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-col">
                <h2 className="text-lg md:text-xl text-white/90">
                  Photography
                </h2>
                <p className="text-sm text-white/80">
                  Professional photography to make your products stand out
                </p>
              </div>
            </CardFooter>
          </Card>

          <Card className="h-[300px] md:col-span-2" isFooterBlurred>
            <Image
              isZoomed
              removeWrapper
              alt="Customer support"
              className="z-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?q=80&w=1767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                  <h2 className="text-lg md:text-xl text-white/90">
                    Customer Support
                  </h2>
                  <p className="text-sm text-white/80">
                    24/7 dedicated support for your business needs
                  </p>
                </div>
              </div>
              <Button radius="full" size="sm">
                Contact Us
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="px-4">
        <h1 className="text-3xl md:text-4xl text-center mb-10">Pricing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-6">
          <Card className="">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-2xl">Free Trial</p>
                <p className="text-small text-default-500">
                  Get started with a 14 day free trial
                </p>
              </div>
            </CardHeader>

            <CardBody>
              <p></p>
            </CardBody>

            <CardFooter>
              <Button
                type="submit"
                className="w-[100%] bg-orange-500"
                size="md"
                radius="sm"
                variant="solid"
                onClick={""}
              >
                Get started
              </Button>
            </CardFooter>
          </Card>
          <Card className="">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-2xl">Growth</p>
                <p className="text-small text-default-500">
                  Perfect for new farmers trying to boost their sales
                </p>
              </div>
            </CardHeader>

            <CardBody className="flex flex-col">
              <p className="text-3xl font-bold">P250/m</p>
              <h3 className="text-xl">What you get:</h3>
              <ul className="text-default-500">
                <li>5 deliveries on us</li>
                <li>5 monthly professional photos</li>
                <li>Monthly data insights to help you grow your business</li>
              </ul>
            </CardBody>

            <CardFooter>
              <Button
                type="submit"
                className="w-[100%] bg-orange-500"
                size="md"
                radius="sm"
                variant="solid"
                onClick={""}
              >
                Get started
              </Button>
            </CardFooter>
          </Card>
          <Card className="">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-2xl">Custom</p>
                <p className="text-small text-default-500">
                  Perfect for established farmers that need custom solutions
                </p>
              </div>
            </CardHeader>

            <CardBody className="flex flex-col">
              <h3 className="text-xl">What you get:</h3>
              <ul className="text-default-500">
                <li>Priority Delivery</li>
                <li>Any amount of monthly professional photos</li>
                <li>Designated Support Officer</li>
              </ul>
            </CardBody>

            <CardFooter>
              <Button
                type="submit"
                className="w-[100%] bg-default-500 hover:bg-orange-500"
                size="md"
                radius="sm"
                variant="solid"
                onClick={""}
              >
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
