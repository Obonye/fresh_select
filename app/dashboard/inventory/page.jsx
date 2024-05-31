"use client";

import React, { useEffect, useState } from "react";
import ProductController from "@/app/controllers/ProductController";
import ProductsTable from "./components/ProductsTable";

export default function Inventory() {
  return (
    <div className="p-6">
      <section>
        <h1 className="text-3xl font-bold"></h1>
        <h3></h3>
      </section>
      <section className="mt-5">
        <ProductsTable></ProductsTable>
      </section>
    </div>
  );
}
