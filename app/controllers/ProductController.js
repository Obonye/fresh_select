import { createClient } from "@/utils/supabase/client";
import ProductModel from "../models/ProductModel";

let supabase = createClient();

class ProductController {
  getProducts = async () => {
    try {
      const { data: products } = await supabase.from("products").select("*");
      return products;
    } catch (e) {
      return "Error fetching product", e;
    }
  };

  createProduct = async (product) => {
    try {
      console.log("Creating product with data:", {
        item_name: product.itemName,
        description: product.description,
        quantity: product.quantity,
        original_price: product.originalPrice,
        new_price: product.newPrice,
        expiry_date: product.expiryDate,
        classification: product.classification,
        availability: product.availability,
        stock_threshold: product.stockThreshold,
      });

      const { data, error } = await supabase
        .from("products")
        .insert({
          item_name: product.itemName,
          description: product.description,
          quantity: product.quantity,
          original_price: product.originalPrice,
          new_price: product.newPrice,
          expiry_date: product.expiryDate,
          classification: product.classification,
          stock_threshold: product.stockThreshold,
        })
        .select();

      console.log(data);
      if (error) {
        console.error("Error creating product:", error);
        throw new Error(`Error creating product: ${error.message}`);
      }

      if (data) {
        console.log("Created product with ID:", data[0].id);
        return data[0].id;
      } else {
        console.error("Error creating product: No data returned");
        throw new Error("Error creating product: No data returned");
      }
    } catch (e) {
      console.log("Error in createProduct:", e);
      throw e;
    }
  };

  insertProductCategories = async (productID, categoryID) => {
    try {
      const { error } = await supabase.from("productcategories").insert({
        product_id: productID,
        category_id: categoryID,
      });

      if (error) {
        return data;
      } else {
        throw error;
      }
    } catch (e) {
      console.log("Error inserting category:", e);
      throw e;
    }
  };

  getCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        throw error;
      }
      return data;
    } catch (e) {
      console.log("Error fetching categories:", e);
      throw e;
    }
  };
}
export default ProductController;
