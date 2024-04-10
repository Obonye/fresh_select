"use client"

import React from "react";
import FilterIcon from "../../icons/FilterIcon";
import {Button, ButtonGroup} from "@nextui-org/button";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio} from "@nextui-org/table";
import EditIcon from "@/app/icons/EditIcon";
import EyeIcon from "@/app/icons/EyeIcon";



const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

export default function OrderTable() {
  const [selectedColor, setSelectedColor] = React.useState("default");

  return (
    <div className="flex flex-col gap-3  ">
        <div className="w-full flex justify-between items-center ">
            <h1 className="text-2xl font-semibold">Recent Orders</h1>
            <div className="grid grid-cols-2 gap-2">
                <Button variant="light"  className="hover:bg-orange-500" startContent={<FilterIcon/>} >Filter</Button>
                <Button variant="light" className="hover:bg-orange-500">View All</Button>
            </div>
        
        
        </div>
      <Table 
        color="warning"
        selectionMode="multiple" 
        
        aria-label="Example static collection table"
      >
        
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Customer</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Actions</TableColumn>

        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
            <TableCell><Button variant="light" size="sm">Actions</Button></TableCell>

          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>Paused</TableCell>
            <TableCell><Button variant="light" size="sm">Actions</Button></TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>
            <TableCell><Button variant="light" size="sm">Actions</Button></TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>
            <TableCell> <Button variant="light" size="sm">Actions</Button></TableCell>
          </TableRow>
      
        </TableBody>
      </Table>

    </div>
  );
}
