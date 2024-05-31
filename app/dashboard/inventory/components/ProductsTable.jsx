"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonGroup } from "@nextui-org/button";
import FilterIcon from "@/app/icons/FilterIcon";
import ProductController from "@/app/controllers/ProductController";
import VerticalDotsIcon from "@/app/icons/VerticalDotsIcon";
import {
  Skeleton,
  Chip,
  Input,
  getKeyValue,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/table";
import AddItemModal from "../../components/AddItemModal";
import { useAsyncList } from "@react-stately/data";
import SearchIcon from "@/app/icons/SearchIcon";
import toast from "react-hot-toast";

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

const statusColorMap = {
  in_stock: "success",
  out_of_stock: "danger",
  discontinued: "warning",
};

export default function ProductsTable() {
  const [selectedColor, setSelectedColor] = React.useState("default");
  const [searchTerm, setSearchTerm] = useState("");

  const controller = useMemo(() => new ProductController(), []);

  const supabase = createClient();

  const [products, setProducts] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [emptyContent,setIsEmptyContent]=useState('')

  const router=useRouter()



  let list = useAsyncList({
    async load({ signal }) {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .abortSignal(signal);

        if (error) {
          throw error;
        }
        setIsLoading(false)
        if(data && data.length ===0){
          setIsEmptyContent('There are currently no items')
        }
        return {
          items: data,
        };
      } catch (error) {
        console.error("Error fetching products:", error);
        
        return { items: [] };
      }
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const first = a[sortDescriptor.column];
          const second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const renderCell = React.useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "item_name":
        return cellValue;
      case "availability":
        return (
          <Chip
            color={statusColorMap[product.availability]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "new_price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{`P${cellValue}`}</p>
          </div>
        );
      case "quantity":
        return cellValue;
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={()=>router.push(`/dashboard/inventory/${product.id}`)}>View</DropdownItem>
                
                <DropdownItem
                  onClick={() => {controller.deleteProduct(product.id,product.product_image)}}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, [controller, router]);

  const filteredItems = list.items.filter((product) =>
    product.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const data = await controller.getProducts();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, [controller]);

  return (
    <div className="flex flex-col gap-3 ">
      <div className="w-full flex items-center ">
        <h1 className="text-2xl font-semibold flex-1 ">Products</h1>
        <div className=" flex-3 grid grid-cols-3 gap-2">
          <Button
            variant="light"
            className="hover:bg-orange-500"
            startContent={<FilterIcon />}
          >
            Filter
          </Button>

          <AddItemModal variant={"light"} />
          <Input
            isClearable
            className="w-full "
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={searchTerm}
            onClear={() => setSearchTerm("")}
            onValueChange={(value) => setSearchTerm(value)}
          />
        </div>
      </div>
      <div>
        <small className="text-gray-500">{`Total items: ${list.items.length} `}</small>
      </div>
      <Table
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        color="default"
        selectionMode="multiple"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn allowsSorting key="item_name">
            Name
          </TableColumn>
          <TableColumn allowsSorting key="availability">
            Status
          </TableColumn>
          <TableColumn allowsSorting key="new_price">
            Price
          </TableColumn>
          <TableColumn allowsSorting key="quantity">
            Quantity
          </TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>

        <TableBody items={filteredItems} emptyContent={emptyContent} isLoading={isLoading} loadingContent={<Spinner label="Loading"/>}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
