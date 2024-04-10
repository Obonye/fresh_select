"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import CategorySelect from "./CategorySelect";
import ProductModel from "@/app/models/ProductModel";
import ProductController from "@/app/controllers/ProductController";
import { createClient } from "@/utils/supabase/client";

export default function AddItemModal() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [step, setStep] = useState(1);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [tags, setTags] = useState("");
  const [classification, setClassification] = useState("");
  const [availability, setAvailability] = useState("");
  const [stockThreshold, setStockThreshold] = useState(0);

  const controller = new ProductController();
  const supabase = createClient();
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const fetchCategoryID = async (category) => {
    console.log(category);
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("name", { category });

      if (error) {
        console.log("Error fetching id");
      } else {
        console.log("Category id ", data);
        return data;
      }
    } catch (e) {}
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          item_name: itemName,
          description: description,
          original_price: parseFloat(originalPrice),
          new_price: parseFloat(newPrice),
          quantity: parseInt(quantity),
          expiry_date: expiryDate,
          classification: classification,
        })
        .select();

      if (error) {
        console.log("Error creating product", error);
      } else {
        console.log("Ccategory is", category);
        let categoryID = fetchCategoryID(category);
        controller.insertProductCategories(data[0].id, categoryID);
        console.log("item created successfully:", data[0]);
      }
    } catch (e) {
      console.log("Error occured: ", e);
    }
  };

  return (
    <>
      <Button onPress={onOpen}>New Product</Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Add a new product
          </ModalHeader>
          <ModalBody>
            {step === 1 && (
              <>
                <div>
                  <label htmlFor="itemName">Item Name</label>
                  <Input
                    type="text"
                    name="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <Textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="categories">Category</label>
                  <CategorySelect
                    value={category}
                    onChange={(value) => setCategory(value)}
                  />
                </div>
                <div>
                  <label htmlFor="quantity">Quantity</label>
                  <Input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <label htmlFor="originalPrice">Original Price</label>
                  <Input
                    type="number"
                    name="originalPrice"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="newPrice">New Price</label>
                  <Input
                    type="number"
                    name="newPrice"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <Input
                    type="date"
                    name="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="tags">Tags</label>
                  <Input
                    type="text"
                    name="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div>
                  <label htmlFor="classification">Classification</label>
                  <Input
                    type="text"
                    name="classification"
                    value={classification}
                    onChange={(e) => setClassification(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="stockThreshold">Stock Threshold</label>
                  <Input
                    type="number"
                    name="stockThreshold"
                    value={stockThreshold}
                    onChange={(e) => setStockThreshold(e.target.value)}
                  />
                </div>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            {step > 1 && (
              <Button type="button" onPress={handlePrev}>
                Previous
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onPress={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" onPress={handleSubmit}>
                Save
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
