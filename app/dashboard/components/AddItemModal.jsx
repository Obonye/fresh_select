"use client";

import toast from "react-hot-toast";

import React, { useState, useEffect } from "react";
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
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useDisclosure } from "@nextui-org/react";
import ProductController from "@/app/controllers/ProductController";
import { createClient } from "@/utils/supabase/client";
import CategorySelect from "./CategorySelect";
import PlusCircle from "@/app/icons/PlusCircle";

export default function AddItemModal({ variant }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [step, setStep] = useState(1);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [tags, setTags] = useState("");
  const [classification, setClassification] = useState("");
  const [stockThreshold, setStockThreshold] = useState(0);
  const [user, setUser] = useState();
  const [productImage, setProductImage] = useState(null);
  const controller = new ProductController();
  const supabase = createClient();

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);
    setUser(user);
  }
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSelectCategory = (categoryData) => {
    setSelectedCategoryData(categoryData);
  };

  const handlePrev = () => {
    setStep(step - 1);
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
          product_image: productImage.name,
        })
        .select();
      await getUser();
      const productImagePath = `${data[0].id}/${productImage.name}`;
      const { d, e } = await supabase.storage
        .from("product_images")
        .upload(productImagePath, productImage).then;
      if (e) {
        console.error("Failed to upload the product image", e);
        return;
      }
      const imageUrl = await controller.fetchPicture(
        data[0].id,
        productImage.name
      );
      console.log(imageUrl);
      await supabase
        .from("products")
        .update({
          product_image: imageUrl,
        })
        .eq("id", data[0].id);
      // await supabase.from('products').update({
      //   product_image:productImage.name
      // }).eq("id",data[0].id)

      if (error) {
        console.log("Error creating product", error);
      } else {
        console.log("Selected Category ID:", selectedCategoryData);
        controller.insertProductCategories(data[0].id, selectedCategoryData.id);
        controller.addTagsToProduct(data[0].id, tags);
        console.log("Item created successfully:", data[0].id);
        toast.success('Item added successfully',{position:'top-center'})
        onClose()
         

        //reset values
        setItemName("");
        setDescription("");
        setSelectedCategoryData(null);
        setQuantity(0);
        setOriginalPrice(0);
        setNewPrice(0);
        setExpiryDate("");
        setTags("");
        setClassification("");
        setStockThreshold(0);
        setStep(1)
      }
    } catch (e) {
      console.log("Error occurred: ", e);
    }
  };

  return (
    <>
      <Button onPress={onOpen} variant={variant} endContent={<PlusCircle />}>
        New Product
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Add a new product
          </ModalHeader>
          <ModalBody>
            {step === 1 && (
              <>
                <div>
                <label htmlFor="productImage" className="text-sm ">
                Product Image
              </label>
                  <Input
                    type="file"
                    name="productImage"
                    accept="image/*"
                    className="max-w-auto p-0 mx-0 "
                    onChange={(e) => setProductImage(e.target.files[0])}
                  />
                  <Input
                    isRequired
                    label="Item Name"
                    labelPlacement="outside"
                    type="text"
                    name="itemName"
                    placeholder="eg Watermelon"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
                <div>
                  <Textarea
                    isRequired
                    label="Description"
                    labelPlacement="outside"
                    type="text"
                    name="description"
                    placeholder="Large size"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <CategorySelect onSelectCategory={handleSelectCategory} />
                </div>
                <div>
                  <Input
                    isRequired
                    label="Tags"
                    labelPlacement="outside"
                    placeholder="fruits,healthy,meat, etc..."
                    type="text"
                    name="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <Input
                    isRequired
                    label="Original Price"
                    labelPlacement="outside"
                    type="number"
                    name="originalPrice"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    isRequired
                    label="New Price"
                    labelPlacement="outside"
                    type="number"
                    name="newPrice"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    isRequired
                    label="Quantity"
                    labelPlacement="outside"
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    isRequired
                    label="Expiry Date"
                    labelPlacement="outside"
                    type="date"
                    name="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div>
                  <label htmlFor="classification">Classification</label>
                  <Input
                    isRequired
                    type="text"
                    name="classification"
                    value={classification}
                    onChange={(e) => setClassification(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="stockThreshold">Stock Threshold</label>
                  <Input
                    isRequired
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
