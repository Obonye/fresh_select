"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { CircularProgress } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import AuthController from "../../controller";
export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState(33.333);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [myUser, setUser] = useState();
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [toastMessage, setMessage] = useState("");
  const controller = new AuthController();
  const supabase = createClient();
  const completeSignUp = async (userID) => {
    await supabase
      .from("profiles")
      .update({ sign_up_complete: true })
      .eq("id", userID);
  };

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);
    setUser(user);

    if (user) {
      await supabase
        .from("profiles")
        .update({
          user_type: "vendor",
        })
        .eq("id", user.id);
    }
  }
  const handleRegister = async () => {
    if (step === 1) {
      if (password !== confirmPassword) {
        return;
      }
      try {
        await supabase.auth.signUp({
          email,
          password,
        });
        await getUser();
  
        setStep(2);
        setValue(value + 33.333);
      } catch (error) {
        console.error("Registration error:", error);
      }
    } else if (step === 2) {
      if (!companyName || !location || !type) {
        return;
      }
      try {
        const insertDetails = await supabase.from("vendors").insert({
          
          vendor_name: companyName,
          location: location,
          vendor_type: type,
          description: description,
        });
        if (insertDetails.error) {
          console.error("error inserting details", insertDetails.error);
          return;
        }
  
        setStep(3);
        setValue(value + 33.333);
      } catch (err) {
        console.error("Error:", err);
      }
    } else if (step === 3) {
      if (!profilePicture || !heroImage) {
        return;
      }
  
      try {
        // Upload profile picture
        const profilePicturePath = `${myUser.id}/${profilePicture.name}`;
        const { data, error } = await supabase.storage
          .from("profile_images")
          .upload(profilePicturePath, profilePicture);
  
        if (error) {
          console.error("Profile picture upload error:", error);
          return;
        }
  
        // Upload hero image
        const heroImagePath = `${myUser.id}/${heroImage.name}`;
        const { data: heroImageData, error: heroImageError } =
          await supabase.storage
            .from("hero_images")
            .upload(heroImagePath, heroImage);
  
        if (heroImageError) {
          console.error("Hero image upload error:", heroImageError);
          return;
        }
  
        // Update Vendors table with image URLs
        await supabase
          .from("vendors")
          .update({
            profile_picture_url: profilePicture.name,
            hero_url: heroImage.name,
          })
          .eq("id", myUser.id);
  
        // Update vendor based on logged-in user ID
        await completeSignUp(myUser.id);
  
        // Reset the form or navigate to a success page
        
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCompanyName("");
        setDescription("");
        setType("");
        setLocation("");
        setProfilePicture(null);
        setHeroImage(null);
        setMessage("Registration completed successfully!");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setValue(value - 33.333);
    }
  };
  return (
    <Card className="mx-auto md:w-[400px] max-w-sm p-8 flex-col items-start lg:max-w-3xl ">
      <CardHeader className="flex flex-col items-start gap-2">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold text-2xl">Sign Up</h1>
          <CircularProgress
            aria-label="Loading..."
            size="md"
            value={value}
            color="warning"
            showValueLabel={true}
          />
        </div>
        <small className="text-default-500 fon">Complete each step</small>
      </CardHeader>
      {step == 1 && (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="junior@nextui.org"
                className="max-w-auto p-0 mx-0"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center justify-between w-[100%] gap-4">
                <label htmlFor="password" className="text-sm font-bold">
                  Password
                </label>
              </div>
              <Input
                radius="sm"
                isRequired
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="max-w-auto"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center justify-between w-[100%] gap-4">
                <label htmlFor="confirmPassword" className="text-sm font-bold">
                  Confirm Password
                </label>
              </div>
              <Input
                radius="sm"
                isRequired
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="max-w-auto"
              />
            </div>
          </form>
        </CardBody>
      )}
      {step == 2 && (
        <CardBody className="grid gap-4">
          <form action="" className="grid grid-cols gap-6">
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="companyName" className="text-sm font-bold">
                Company Name
              </label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                radius="sm"
                isRequired
                type="text"
                name="companyName"
                placeholder="eg Checkers"
                className="max-w-auto p-0 mx-0"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="companyName" className="text-sm font-bold">
                Description
              </label>
              <Textarea
                label="Description"
                name="description"
                placeholder="Enter your description"
                className="max-w-xs"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center justify-between w-[100%] gap-4">
                <label htmlFor="type" className="text-sm font-bold">
                  Type
                </label>
              </div>
              <Input
                value={type}
                onChange={(e) => setType(e.target.value)}
                radius="sm"
                isRequired
                type="text"
                name="type"
                placeholder="eg Butchery, Supermarket"
                className="max-w-auto"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center justify-between w-[100%] gap-4">
                <label htmlFor="location" className="text-sm font-bold">
                  Location
                </label>
              </div>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                radius="sm"
                isRequired
                type="text"
                name="location"
                placeholder="eg Phakalane"
                className="max-w-auto"
              />
            </div>
          </form>
        </CardBody>
      )}
      {step == 3 && (
        <CardBody className="grid gap-4">
          <form action="" className="grid grid-cols gap-6">
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="companyName" className="text-sm font-bold">
                Profile Picture
              </label>
              <Input
                radius="sm"
                isRequired
                type="file"
                name="profilePicture"
                accept="image/*"
                className="max-w-auto p-0 mx-0"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center justify-between w-[100%] gap-4">
                <label htmlFor="heroImage" className="text-sm font-bold">
                  Background
                </label>
              </div>
              <Input
                radius="sm"
                isRequired
                type="file"
                name="heroImage"
                accept="image/*"
                className="max-w-auto"
                onChange={(e) => setHeroImage(e.target.files[0])}
              />
            </div>
          </form>
        </CardBody>
      )}

      <CardFooter className="grid grid-cols-2 gap-4">
        <Button
          color="default"
          variant="ghost"
          size="md"
          radius="sm"
          onClick={goBack}
          disabled={step < 1}
        >
          Back
        </Button>

        <Button
          type="submit"
          className="w-[100%] bg-orange-500"
          size="md"
          radius="sm"
          variant="solid"
          onClick={handleRegister}
        >
          {step === 3 ? "Complete" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
