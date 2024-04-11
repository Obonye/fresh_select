"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client instance

const MyComponent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const supabase = createClient();
  // Fetch categories from Supabase on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from("categories").select("*");
        if (error) {
          throw error;
        }
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  // Log selected category data to console
  const handleCategorySelect = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );
    console.log("Selected Category:", selectedCategory);
    setSelectedCategory(selectedCategory);
  };

  return (
    <div>
      <select onChange={handleCategorySelect}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {selectedCategory && (
        <div>
          <h2>Selected Category: {selectedCategory.name}</h2>
          <p>Description: {selectedCategory.description}</p>
          {/* Add more properties as needed */}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
