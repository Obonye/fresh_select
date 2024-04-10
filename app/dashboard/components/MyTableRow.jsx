import React from "react";
import { TableRow, TableCell } from "@nextui-org/react";
import EditIcon from "../../icons/EditIcon";

export default function MyTableRow() {
  return (
    
      <TableRow key="5">
        <TableCell>Zoey Lang</TableCell>
        <TableCell>Technical Lead</TableCell>
        <TableCell>Paused</TableCell>
        <TableCell><EditIcon/></TableCell>
      </TableRow>
    
  );
}
