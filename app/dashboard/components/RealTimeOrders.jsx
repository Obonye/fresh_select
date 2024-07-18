"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  DateRangePicker,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import FilterIcon from "@/app/icons/FilterIcon";
import VerticalDotsIcon from "@/app/icons/VerticalDotsIcon";
import SearchIcon from "@/app/icons/SearchIcon";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

export default function RealTimeOrderTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);

  const supabase = createClient();
  const router = useRouter();
  const formatter = useDateFormatter({ dateStyle: "long" });

  const fetchOrderSummary = useCallback(async () => {
    try {
      console.log("Calling fetch order summary");
      const { data, error } = await supabase
        .from("order_summary")
        .select("*")
        .order("Order_Date", { ascending: false });

      if (error) {
        throw error;
      }

      setOrders(data || []);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Error fetching order summary:", error);
      toast.error("Failed to fetch orders");
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchOrderSummary();

    const subscription = supabase
      .channel("orders_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received in orders table:", payload);
          alert("You have new orders");
          fetchOrderSummary();
        }
      )
      .subscribe();

    return () => {
      console.log("removing subscription");
      supabase.removeChannel(subscription);
    };
  }, [supabase, fetchOrderSummary]);

  const renderCell = useCallback(
    (order, columnKey) => {
      const cellValue = order[columnKey];

      switch (columnKey) {
        case "Product":
          return cellValue;
        case "Order_Quantity":
          return cellValue;
        case "Price":
          return `P${cellValue.toFixed(2)}`;
        case "Order_Value":
          return `P${cellValue.toFixed(2)}`;
        case "Order_Date":
          return new Date(cellValue).toLocaleDateString();
        case "Status":
          return cellValue;
        case "actions":
          return (
            <div className="relative flex justify-end gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() =>
                      router.push(`/dashboard/orders/${order.product_id}`)
                    }
                  >
                    View
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [router]
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.Product.toLowerCase().includes(
        searchTerm.toLowerCase()
      );

      if (dateRange && dateRange.start && dateRange.end) {
        const orderDate = new Date(order["Order Date"]);
        const startDate = dateRange.start.toDate(getLocalTimeZone());
        const endDate = dateRange.end.toDate(getLocalTimeZone());
        return matchesSearch && orderDate >= startDate && orderDate <= endDate;
      }

      return matchesSearch;
    });
  }, [orders, searchTerm, dateRange]);

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const clearDateFilter = () => {
    setDateRange(null);
  };

  return (
    <div className="flex flex-col gap-3 pb-6">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold flex-1">Order Summary</h1>
        </div>
        <div className="flex-3 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <DateRangePicker
              label="Filter by date range"
              value={dateRange}
              onChange={handleDateRangeChange}
            />
            {dateRange && (
              <Button size="sm" onClick={clearDateFilter}>
                Clear
              </Button>
            )}
          </div>

          <Input
            isClearable
            className="w-full"
            placeholder="Search by product name..."
            startContent={<SearchIcon />}
            value={searchTerm}
            onClear={() => setSearchTerm("")}
            onValueChange={(value) => setSearchTerm(value)}
          />
        </div>
      </div>
      <div>
        <small className="text-default-500 text-sm">
          Total orders: {filteredOrders.length}{" "}
          {dateRange && dateRange.start && dateRange.end && (
            <>
              (Filtered:{" "}
              {formatter.formatRange(
                dateRange.start.toDate(getLocalTimeZone()),
                dateRange.end.toDate(getLocalTimeZone())
              )}
              )
            </>
          )}
        </small>
      </div>
      <Table
        aria-label="Order summary table"
        color="default"
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn key="Product">Product</TableColumn>
          <TableColumn key="Order_Quantity">Order Quantity</TableColumn>
          <TableColumn key="Price">Price</TableColumn>
          <TableColumn key="Order_Value">Order Value</TableColumn>
          <TableColumn key="Order_Date">Order Date</TableColumn>
          <TableColumn key="Status">Status</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>

        <TableBody
          items={filteredOrders}
          emptyContent="There are currently no orders"
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading" />}
        >
          {(order) => (
            <TableRow
              key={`${order["Order_Date"]}-${order.product_id}-${order.Status}`}
            >
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(order, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
