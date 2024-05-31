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
} from "@nextui-org/react";
import ProductController from "@/app/controllers/ProductController";
import HeartIcon from "@/app/icons/icons/HeartIcon";
import EyeIcon from "@/app/icons/EyeIcon";

import { useRouter } from "next/navigation";
export default function ItemDetail({ params }) {
  const [productInfo, setProductInfo] = useState();
  const [itemName, setItemName] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [likes, setLikes] = useState();
  const [views, setViews] = useState();
  const [category, setCategory] = useState();
  const [productImage, setProductImage] = useState();
  const router =useRouter();

  useEffect(() => {
    const controller = new ProductController();
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

  return (
    <div className="h-full w-full">
      <Card className="w-full sm:w-3/4 md:w-96 mx-auto">
        <CardBody className="">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={"kiwi"}
            className="w-full object-cover h-[140px]"
            src={productImage}
          />
        </CardBody>
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
          <Input label="Item Name" labelPlacement="outside" value={itemName} onChange={(e)=>setItemName(e.target.value)}/>
          <Input
            label="Description"
            labelPlacement="outside"
            value={description}
          />
          <Input label="Price" labelPlacement="outside" value={price} onChange={(e)=>setPrice(e.target.value)}  />
          <Input label="Quantity" labelPlacement="outside" value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
          <Input label="Category" labelPlacement="outside" value={category} onChange={(e)=>setCategory(e.target.value)} />
          <div className="flex justify-end w-full gap-2">
            <Button onClick={()=>router.back()}>Cancel</Button>
            <Button className="hover:bg-orange-500">Save</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
