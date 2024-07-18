"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Input,
  Button,
  Grid,
} from "@nextui-org/react";
import ProductController from "@/app/controllers/ProductController";
import HeartIcon from "@/app/icons/icons/HeartIcon";
import EyeIcon from "@/app/icons/EyeIcon";
import { createClient } from "@/utils/supabase/client";

import { useRouter } from "next/navigation";
import ProductsTable from "../components/ProductsTable";

export default function ItemDetail({ params }) {
  const supabase = createClient();
  const [productInfo, setProductInfo] = useState();
  const [itemName, setItemName] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [likes, setLikes] = useState();
  const [views, setViews] = useState();
  const [category, setCategory] = useState();
  const [productImage, setProductImage] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
    setIsEditing(true);
  };

  useEffect(() => {
    const controller = new ProductController();
    controller.fetchOrderSummary(params.id).then((data) => {
      console.log("order summary: ", data);
    });
    const { error } = controller.getSingleProduct(params.id).then((data) => {
      if (data) {
        console.log(data);
        setProductInfo(data);
        setItemName(data[0].item_name);
        setQuantity(data[0].quantity);
        setPrice(data[0].new_price);
        setDescription(data[0].description);
        setCategory(data[0].classification);
        setLikes(data[0].likes);
        setViews(data[0].views);

        setProductImage(data[0].product_image);
      } else {
        console.log(error);
      }
    });
  }, [params.id]);

  const handleSaveChanges = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          item_name: itemName,
          description: description,
          classification: category,
          quantity: quantity,
          new_price: price,
        })
        .eq("id", params.id);
      if (error) {
        console.log("Failed to update product");
      } else {
        setIsEditing(false);
      }
    } catch (e) {
      console.error("Error updating profile:", e);
    }
  };

  return (
    <div className="h-full w-full p-6">
      <Card className="w-full lg:w-full mx-auto lg:h-1/2">
        <CardBody className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={itemName}
              className="w-full h-full object-cover lg:h-[500px] md:h-[500px] sm:h-[200px]"
              src={productImage}
            />
          </div>
          <div className="md:ml-4 flex flex-col justify-between w-full md:w-1/2">
            <div className="flex justify-end px-6 gap-4">
              <div className="flex items-center gap-2 rounded-lg py-1 px-4">
                <HeartIcon />
                <h1 className="text-lg">{likes}</h1>
              </div>
              <div className="flex items-center gap-2 rounded-lg py-1 px-4">
                <EyeIcon />
                <h1 className="text-lg">{views}</h1>
              </div>
            </div>
            <CardFooter className="flex flex-col gap-4 w-full">
              <Input
                label="Item Name"
                labelPlacement="outside"
                value={itemName}
                onChange={handleInputChange(setItemName)}
              />
              <Input
                label="Description"
                labelPlacement="outside"
                value={description}
              />
              <Input
                label="Price"
                labelPlacement="outside"
                value={price}
                onChange={handleInputChange(setPrice)}
              />
              <Input
                label="Quantity"
                labelPlacement="outside"
                value={quantity}
                onChange={handleInputChange(setQuantity)}
              />
              <Input
                label="Category"
                labelPlacement="outside"
                value={category}
                onChange={handleInputChange(setCategory)}
              />
              <div className="flex justify-end w-full gap-2">
                <Button onClick={() => router.back()}>Cancel</Button>
                <Button
                  isDisabled={!isEditing}
                  className="hover:bg-orange-500"
                  onClick={handleSaveChanges}
                >
                  Save
                </Button>
              </div>
            </CardFooter>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
