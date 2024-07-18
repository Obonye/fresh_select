import React from "react";
import OrderTable from "../components/OrderTable";
import RealTimeOrderTable from "../components/RealTimeOrders";

export default function OrderPage() {
  return (
    <div className="p-6">
      <RealTimeOrderTable></RealTimeOrderTable>
    </div>
  );
}
