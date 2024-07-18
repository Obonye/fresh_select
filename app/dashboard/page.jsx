"use client";

import React, { useEffect, useState } from "react";
import StatCard from "./components/StatsCard";
import OrderTable from "./components/OrderTable";
import { Divider } from "@nextui-org/react";
import Shortcuts from "./components/Shortcuts";
import MoneyIcon from "../icons/MoneyIcon";
import TruckIcon from "../icons/TruckIcon";
import PersonIcon from "./components/PersonIcon";
import MyComponent from "./components/SelectTest";
import OrderController from "../controllers/OrderController";
import RealTimeOrderTable from "./components/RealTimeOrders";

export default function Dashboard() {
  const [pendingOrders, setPendingOrders] = useState();
  useEffect(() => {
    const controller = new OrderController();
    controller.fetchPendingOrdersCount("pending").then((data) => {
      setPendingOrders(data);
    });
  });

  console.log(pendingOrders);
  return (
    <div className="h-screen w-full  flex  justify-center p-6 m-0">
      <div className="container flex flex-col gap-10  w-screen">
        <h1 className="font-bold text-3xl">Dashboard</h1>

        <Shortcuts></Shortcuts>

        <div className="lg:grid grid-cols-3 sm:flex  md:flex flex-col gap-4  ">
          <StatCard
            title="Pending Orders"
            month="June"
            percentage={15}
            statistic={pendingOrders}
            icon={<MoneyIcon />}
            navigateTo={"dashboard/orders"}
          />
          <StatCard
            title="Total Orders"
            month="April"
            percentage={15}
            statistic="130"
            icon={<TruckIcon />}
            navigateTo={""}
          />
          <StatCard
            title="New Customers"
            month="April"
            percentage={15}
            statistic="+123"
            icon={<PersonIcon />}
            navigateTo={""}
          />
        </div>
        <Divider></Divider>
        <RealTimeOrderTable></RealTimeOrderTable>
      </div>
    </div>
  );
}
