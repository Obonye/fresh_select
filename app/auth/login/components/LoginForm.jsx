"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";

export default function LoginForm() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router =useRouter()
  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if(error){
      console.log(error)
    }
    else{
      toast.success('sign in successful')
      router.replace('/dashboard');
    }
    
    
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 sm:max-w-md md:max-w-lg lg:max-w-xl">
      <Card className="mx-auto md:w-[400px] max-w-sm p-8 flex-col items-start lg:max-w-3xl">
        <CardHeader className="flex flex-col items-start gap-2">
          <h1 className="font-bold text-2xl">Login</h1>
          <small className="text-default-500 fon">
            Enter your email and password to login
          </small>
        </CardHeader>
        <CardBody className="grid gap-4">
          <form action="" className="grid grid-cols gap-6">
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="email" className="text-sm font-bold">
                Email
              </label>
              <Input
                radius="sm"
                isRequired
                type="email"
                name="email"
                placeholder="junior@nextui.org"
                className="max-w-auto p-0 mx-0"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center justify-between w-[100%] gap-4">
                <label htmlFor="password" className="text-sm font-bold">
                  Password
                </label>
                <Link href={""} className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                radius="sm"
                isRequired
                type="password"
                name="password"
                className="max-w-auto"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </form>
        </CardBody>
        <CardFooter className="flex flex-col items-center">
          <Button
            type="submit"
            className="w-[100%] bg-orange-500"
            size="md"
            radius="sm"
            variant="solid"
            onClick={signIn}
          >
            Login
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}