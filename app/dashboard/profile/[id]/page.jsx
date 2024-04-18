"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
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
  const [vendorName, setVendorName] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [vendorType, setVendorType] = useState();
  const [editing, setisEditing] = useState(true);

  const handleInputChange = (setState, value) => {
    setState(value);
    setisEditing(false);
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
        }
      } catch (e) {
        console.log("Error, ", e);
      }
    };
    fetchProfileID();
  },[params.id, supabase]);

  const handleSaveChanges = async () => {
    try {
      const {error } = await supabase
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
        setisEditing(false);
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
              <h1 className="text-4xl text-center pb-4">Profile</h1>
            </div>

            <div className="flex items-center gap-2">
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                className="w-20 h-20 text-large"
              />
              <div className="flex flex-col gap-1">
                <Input
                  size="lg"
                  className="text-2xl bg-transparent w-[100%]"
                  value={vendorName}
                  onChange={(e) =>
                    handleInputChange(setVendorName, e.target.value)
                  }
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
                onChange={(e) =>
                  handleInputChange(setVendorType, e.target.value)
                }
              ></Input>
              <Textarea
                label="Description"
                labelPlacement="outside"
                value={description}
                onChange={(e) =>
                  handleInputChange(setDescription, e.target.value)
                }
              ></Textarea>
              <Input
                label="Location"
                labelPlacement="outside"
                value={location}
                onChange={(e) => handleInputChange(setLocation, e.target.value)}
              ></Input>
            </div>
          </CardBody>
          <CardFooter className="flex justify-end">
            <Button
              isDisabled={editing}
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
