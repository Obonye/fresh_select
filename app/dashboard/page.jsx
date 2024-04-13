import React from "react";
import StatCard from "./components/StatsCard";
import OrderTable from "./components/OrderTable";
import { Divider } from "@nextui-org/react";
import Shortcuts from "./components/Shortcuts";
import MoneyIcon from "../icons/MoneyIcon";
import TruckIcon from "../icons/TruckIcon";
import PersonIcon from "./components/PersonIcon";
import MyComponent from "./components/SelectTest";

export default function Dashboard() {
  return (
    <div className="h-screen w-full flex  justify-center p-0 m-0">
      <div className="container flex flex-col gap-10  w-screen">
        <h1 className="font-bold text-3xl">Dashboard</h1>

        <Shortcuts></Shortcuts>

        <div className="lg:grid grid-cols-3 sm:flex  md:flex flex-col gap-4  ">
          <StatCard
            title="Total Sales"
            month="April"
            percentage={15}
            statistic="P 605.95"
            icon={<MoneyIcon />}
          />
          <StatCard
            title="Total Orders"
            month="April"
            percentage={15}
            statistic="130"
            icon={<TruckIcon />}
          />
          <StatCard
            title="New Customers"
            month="April"
            percentage={15}
            statistic="+123"
            icon={<PersonIcon />}
          />
        </div>
        <Divider></Divider>
        <OrderTable></OrderTable>
      </div>
    </div>
  );
}
