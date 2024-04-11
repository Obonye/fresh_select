"use client";

import React, { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import AddItemModal from "./AddItemModal";
import ArrowUpLeft from "@/app/icons/ArrowUpLeft";

export default function Shortcuts() {
  return (
    <>
      <h1 className="text-xl">Shortcuts</h1>
      <ButtonGroup className="justify-start mt-0 pt-0">
        <AddItemModal />
        <Button endContent={<ArrowUpLeft />}>All Orders</Button>
        <Button endContent={<ArrowUpLeft />}>Billing</Button>
      </ButtonGroup>
    </>
  );
}
