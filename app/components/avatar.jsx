"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import ProfileController from "../controllers/ProfileController";
import ProfileIcon from "../icons/ProfileIcon";
import SettingsIcon from "../icons/SettingsIcon";
import LogoutIcon from "../icons/LogoutIcon";
export default function MyAvatar() {
  const supabase = createClient();
  const router = useRouter();
  const [userData, setUserData] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState();
  const [profileUrl, setUrl] = React.useState();

  const [vendorID, setVendorID] = React.useState();




  useEffect(() => {
    const controller = new ProfileController();
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user.id);
      setUserData(user);
    }
    const getProfilePicture = async () => {
      try {
        const vendor = await controller.fetchProfile().then((data) => {
          if (data) {
            console.log(data.data[0].profile_picture);
            var profilePicName = data.data[0].profile_picture;
            var vendorID = data.data[0].vendor_id;
            setVendorID(vendorID);
            setProfilePicture(profilePicName);
  
            console.log(`${profilePicName} and ${vendorID}`);
  
            // Call fetchPicture here
            controller.fetchPicture(vendorID, profilePicName).then((data) => {
              setUrl(data);
            });
          }
        });
      } catch (e) {
        console.log("error fetching profile service", e);
      }
    };

    getUser();
    getProfilePicture();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    // Check if a user's logged in
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.auth.signOut();
      toast.success('Signed Out')
      router.replace('/')
    } else {
      console.log("there is no session");
    }
  };

  
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
        showFallback
          isBordered
          as="button"
          className="transition-transform"
          src={profileUrl}
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="profile" className="h-14 gap-2" startContent={<ProfileIcon/>}>
          <p className="font-semibold"  onClick={()=>router.push(`/dashboard/profile/${userData?.id}`)}>{userData?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" className="h-14 gap-2" startContent={<SettingsIcon/>}>Settings</DropdownItem>
        
        <DropdownItem startContent={<LogoutIcon/>}  className="h-14 gap-2" onClick={handleSignOut}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
