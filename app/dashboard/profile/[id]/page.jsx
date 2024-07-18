"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ProfileController from "@/app/controllers/ProfileController";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Avatar,
  Input,
  Divider,
  Textarea,
  Button,
} from "@nextui-org/react";
import EditIcon from "@/app/icons/EditIcon";

export default function ProfilePage({ params }) {
  const supabase = createClient();
  const [vendorName, setVendorName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [vendorType, setVendorType] = useState("");
  const [editing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  const controller = new ProfileController();

  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
    setIsEditing(true);
  };

  useEffect(() => {
    const fetchProfileID = async () => {
      try {
        const { data, error } = await supabase
          .from("vendors")
          .select("*")
          .eq("id", params.id);

        if (data) {
          console.log(data);
          setVendorName(data[0].vendor_name);
          setLocation(data[0].location);
          setDescription(data[0].description);
          setVendorType(data[0].vendor_type);
          controller
            .fetchPicture(params.id, data[0].profile_picture_url)
            .then((data) => {
              console.log(data);
              setProfilePicture(data);
            });
        }
      } catch (e) {
        console.log("Error, ", e);
      }
    };

    fetchProfileID();
  }, [controller, params.id, params.profile_picture_url, supabase]);

  const handleSaveChanges = async () => {
    try {
      const { error } = await supabase
        .from("vendors")
        .update({
          vendor_name: vendorName,
          location: location,
          description: description,
          vendor_type: vendorType,
        })
        .eq("id", params.id);
      if (error) {
        console.log("Failed to update profile");
      } else {
        setIsEditing(false);
      }
    } catch (e) {
      console.error("Error updating profile:", e);
    }
  };

  return (
    <div>
      <div className="grid place-content-start justify-center h-[100%] mt-10">
        <Card className="w-[375px] px-4">
          <CardHeader className="flex flex-col items-start gap-4">
            <div className="flex justify-between w-[100%]">
              <h1 className="text-2xl text-center pb-4">Profile Details</h1>
            </div>
            <div className="flex items-center gap-2">
              <Avatar src={profilePicture} className="w-20 h-20 text-large" />
              <div className="flex flex-col gap-1">
                <Input
                  size="lg"
                  label="Name"
                  labelPlacement="outside"
                  className="text-2xl bg-transparent w-[100%]"
                  value={vendorName}
                  onChange={handleInputChange(setVendorName)}
                ></Input>
              </div>
            </div>
          </CardHeader>
          <Divider></Divider>
          <CardBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Type"
                labelPlacement="outside"
                value={vendorType}
                onChange={handleInputChange(setVendorType)}
              ></Input>
              <Textarea
                label="Description"
                labelPlacement="outside"
                value={description}
                onChange={handleInputChange(setDescription)}
              ></Textarea>
              <Input
                label="Location"
                labelPlacement="outside"
                value={location}
                onChange={handleInputChange(setLocation)}
              ></Input>
            </div>
          </CardBody>
          <CardFooter className="flex justify-end">
            <Button
              isDisabled={!editing}
              className="bg-orange-500 disabled:bg-gray-600"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}