"use client"

import React, {useState} from "react";
import {Button, ButtonGroup} from "@nextui-org/react";
import AddItemModal from "./AddItemModal";

export default function Shortcuts() {

  return (
    <ButtonGroup className="justify-start">
    
      <AddItemModal />
      <Button>All Orders</Button>
      <Button>Billing</Button>
    </ButtonGroup>
  );
}
