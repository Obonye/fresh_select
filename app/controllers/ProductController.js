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

  async addTagsToProduct(productId, tagString) {
    try {
      // Split the tagString into an array of tags
      const tags = tagString.split(',').map(tag => tag.trim());
  
      console.log('Processing tags:', tags);
  
      // Loop through each tag and add it to the product
      for (const tagName of tags) {
        console.log(`Processing tag: ${tagName}`);
  
        // Check if the tag already exists in the tags table
        const { data: existingTags, error: tagError } = await supabase
          .from("tags")
          .select("*")
          .ilike("name", tagName);
  
        if (tagError) {
          console.error("Error checking for existing tag:", tagError.message);
          continue;
        }
  
        let tagId;
  
        if (existingTags.length > 0) {
          // Tag already exists, use the existing tag's ID
          tagId = existingTags[0].id;
          console.log(`Tag '${tagName}' already exists, using ID: ${tagId}`);
        } else {
          // Tag doesn't exist, insert a new one
          const { data: newTag, error: newTagError } = await supabase
            .from("tags")
            .upsert({ name: tagName })
            .select("id")
            .single();
  
          if (newTagError) {
            console.error("Error creating new tag:", newTagError.message);
            continue;
          }
  
          tagId = newTag.id;
          console.log(`Created new tag '${tagName}' with ID: ${tagId}`);
        }
  
        // Associate the tag with the product in the producttags table
        const { error: productTagError } = await supabase.from("producttags").upsert({
          product_id: productId,
          tag_id: tagId,
        });
  
        if (productTagError) {
          console.error("Error adding tag to product:", productTagError.message);
        } else {
          console.log(`Tag '${tagName}' added to product successfully`);
        }
      }
    } catch (error) {
      console.error("Error adding tags to product:", error.message);
    }
  }
}
export default ProductController;
