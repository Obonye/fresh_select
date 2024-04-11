import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

const CategorySelect = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from("categories").select("*");
        if (error) {
          setError(error.message);
        } else {
          setCategories(data);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Autocomplete
        isRequired
        label={"Categories"}
        labelPlacement="outside"
        name="categories"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      >
        {filteredCategories.map((category) => (
          <AutocompleteItem
            key={category.id}
            value={category}
            onClick={() => handleCategorySelect(category)}
          >
            {category.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export default CategorySelect;
