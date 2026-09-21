import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchProducts = (url) => {
    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
        setLoading(false);
      });
  };

  const fetchCategories = () => {
    fetch("https://dummyjson.com/products/category-list")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Failed to load categories:", error);
      });
  };

  useEffect(() => {
    fetchProducts("https://dummyjson.com/products");
    fetchCategories();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setSelectedCategory("all");

    if (value.trim() === "") {
      fetchProducts("https://dummyjson.com/products");
      return;
    }

    fetchProducts(
      `https://dummyjson.com/products/search?q=${value.trim()}`
    );
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    fetchProducts("https://dummyjson.com/products");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");

    if (category === "all") {
      fetchProducts("https://dummyjson.com/products");
      return;
    }

    fetchProducts(
      `https://dummyjson.com/products/category/${category}`
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black sm:text-4xl">All Products</h1>

        <p className="mt-2 text-base-content/60">
          Explore our latest products and discover something you love.
        </p>
      </div>

      <div className="mb-8 max-w-2xl">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
      </div>

      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">No products found</h2>

          <p className="mt-2 text-base-content/60">
            Try searching or selecting another category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Products;