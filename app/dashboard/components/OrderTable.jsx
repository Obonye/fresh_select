"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import {
  Skeleton,
  Chip,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useAsyncList } from "@react-stately/data";
import FilterIcon from "@/app/icons/FilterIcon";
import VerticalDotsIcon from "@/app/icons/VerticalDotsIcon";
import SearchIcon from "@/app/icons/SearchIcon";
import AddItemModal from "./AddItemModal";
import { createClient } from "@/utils/supabase/client";
import OrderController from "@/app/controllers/OrderController";
import toast from "react-hot-toast";

const statusColorMap = {
  pending: "warning",
  completed: "success",
  cancelled: "danger",
};

export default function OrderTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const controller = useMemo(() => new OrderController(), []);
  const supabase = createClient();

  const router = useRouter();

  let list = useAsyncList({
    async load({ signal }) {
      try {
        const { data, error } = await supabase
          .from("product_orders")
          .select("*")
          .abortSignal(signal);

        if (error) {
          throw error;
        }

        if (data && data.length === 0) {
          setIsEmptyContent("There are currently no orders");
        }
        console.log(data);
        return {
          items: data,
        };
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
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

  const renderCell = useCallback(
    (order, columnKey) => {
      const cellValue = order[columnKey];

      switch (columnKey) {
        case "order_id":
          return cellValue;
        case "item_name":
          return order.item_name;
        case "status":
          return (
            <Chip color={statusColorMap[order.status]} size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        case "order_date":
          return cellValue;
        case "total_quantity":
          console.log(cellValue);
          return order.total_quantity;
        case "actions":
          return (
            <div className="relative flex orders-center justify-end gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                  >
                    View
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => controller.deleteOrder(order.id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [controller, router]
  );

  const filteredOrders = list.items.filter((order) =>
    order.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex orders-center">
        <h1 className="text-2xl font-semibold flex-1">Orders</h1>
        <div className="flex-3 grid grid-cols-2 gap-2">
          <Button
            variant="light"
            className="hover:bg-orange-500"
            startContent={<FilterIcon />}
          >
            Filter
          </Button>

          <Input
            isClearable
            className="w-full"
            placeholder="Search by item name..."
            startContent={<SearchIcon />}
            value={searchTerm}
            onClear={() => setSearchTerm("")}
            onValueChange={(value) => setSearchTerm(value)}
          />
        </div>
      </div>
      <div>
        <small className="text-gray-500">{`Total orders: ${list.items.length} `}</small>
      </div>
      <Table
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        color="default"
        selectionMode="multiple"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn allowsSorting key="order_id">
            ID
          </TableColumn>
          <TableColumn allowsSorting key="item_name">
            Item
          </TableColumn>
          <TableColumn allowsSorting key="order_date">
            Order Date
          </TableColumn>
          <TableColumn allowsSorting key="status">
            Status
          </TableColumn>
          <TableColumn allowsSorting key="total_quantity">
            Total
          </TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>

        <TableBody
          items={filteredOrders}
          emptyContent="There are currently no orders"
          isLoading={list.isLoading}
          loadingContent={<Spinner label="Loading" />}
        >
          {(order) => (
            <TableRow key={order.id}>
              {(columnKey) => (
                <TableCell>{renderCell(order, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
