"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import FilterIcon from "@/app/icons/FilterIcon";
import ProductController from "@/app/controllers/ProductController";
import VerticalDotsIcon from "@/app/icons/VerticalDotsIcon";
import {
  Skeleton,
  Chip,
  Input,
  getKeyValue,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/table";
import AddItemModal from "../../components/AddItemModal";
import { useAsyncList } from "@react-stately/data";

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

const statusColorMap = {
  in_stock: "success",
  out_of_stock: "danger",
  vacation: "warning",
};

export default function ProductsTable() {
  const [selectedColor, setSelectedColor] = React.useState("default");

  const controller = useMemo(() => new ProductController(), []);
  const supabase = createClient();

  const [products, setProducts] = useState([]);

  let list = useAsyncList({
    async load({ signal }) {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .abortSignal(signal);

        if (error) {
          throw error;
        }

        return {
          items: data,
        };
      } catch (error) {
        console.error("Error fetching products:", error);
        return { items: [] };
      }
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const first = a[sortDescriptor.column];
          const second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const renderCell = React.useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "item_name":
        return cellValue;
      case "availability":
        return (
          <Chip
            color={statusColorMap[product.availability]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "new_price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue}</p>
          </div>
        );
      case "quantity":
        return cellValue;
      case "actions":
        return (
          <div className="relative flex  items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const data = await controller.getProducts();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, [controller]);

  return (
    <div className="flex flex-col gap-3 ">
      <div className="w-full flex items-center ">
        <h1 className="text-2xl font-semibold flex-1 ">Products</h1>
        <div className=" flex-3 grid grid-cols-3 gap-2">
          <Button
            variant="light"
            className="hover:bg-orange-500"
            startContent={<FilterIcon />}
          >
            Filter
          </Button>
          <Button variant="light" className="hover:bg-orange-500">
            View All
          </Button>
          <AddItemModal />
        </div>
      </div>
      <Table
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        color="default"
        selectionMode="multiple"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn allowsSorting key="item_name">
            Name
          </TableColumn>
          <TableColumn allowsSorting key="availability">
            Status
          </TableColumn>
          <TableColumn allowsSorting key="new_price">
            Price
          </TableColumn>
          <TableColumn allowsSorting key="quantity">
            Quantity
          </TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody items={list.items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
