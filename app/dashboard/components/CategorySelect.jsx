import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

const CategorySelect = ({ value, onChange,productID }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from("categories").select("*");
        if (error) {
          setError(error.message);
        } else {
          console.log("Fetched data:", data);
          setCategories(data);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Autocomplete
      name="categories"
      value={value}
      onChange={onChange}
      placeholder="Search categories..."
      onSearchChange={setSearchTerm}
    >
      {filteredCategories.map((category) => (
        <AutocompleteItem key={category.id} value={category.id}>
          {category.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default CategorySelect;
