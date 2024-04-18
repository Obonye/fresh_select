"use client"
import {useRouter} from "next/navigation"
import React,{useEffect,useState} from 'react'
import {Avatar} from "@nextui-org/react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem,Button} from "@nextui-org/react";
import { createClient } from '@/utils/supabase/client';
import ProfileController from '../controllers/ProfileController';
import ProfileIcon from '../icons/ProfileIcon';
import SettingsIcon from '../icons/SettingsIcon';
import LogoutIcon from '../icons/LogoutIcon';
export default function MyAvatar() {
  const supabase=createClient()
  const router=useRouter()
  const [userData, setUserData] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState();
  const [profileUrl, setUrl] = React.useState();


  const [vendorID, setVendorID] = React.useState();
  const controller=new ProfileController()
  



  const getProfilePicture = async () => {
    try {
      const vendor = await controller.fetchProfile().then((data) => {
        if (data) {
          console.log(data.data[0].profile_picture)
          var profilePicName = data.data[0].profile_picture;
          var vendorID = data.data[0].vendor_id;
          setVendorID(vendorID);
          setProfilePicture(profilePicName);
  
          console.log(`${profilePicName} and ${vendorID}`);
  
          // Call fetchPicture here
          controller.fetchPicture(vendorID, profilePicName).then(data=>{
            
            setUrl(data)
          });
        }
      });
    
    } catch (e) {
      console.log("error fetching profile service", e);
    }
  };
  

  
  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
  
      console.log(user.id);
      setUserData(user);
    }
  
    getUser();
    getProfilePicture();
  }, []);


  const handleSignOut=async()=>{
    

    // Check if a user's logged in
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (user) {
      await supabase.auth.signOut()
      console.log("signed out")
    }
    else{
      console.log("there is no session")
    }
    
  }
  return (
    <Dropdown>
      <DropdownTrigger>
      <Avatar src={profileUrl} size="md" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" endContent={<ProfileIcon/>} onClick={()=>{
           router.push(`/dashboard/profile/${userData?.id}`);
        }}>{userData?.email}</DropdownItem>
        <DropdownItem key="edit" endContent={<SettingsIcon/>}>Settings </DropdownItem>
        <DropdownItem onClick={handleSignOut} endContent={<LogoutIcon/>}>Log out</DropdownItem>
      
      </DropdownMenu>
    </Dropdown>
  
  )
}
