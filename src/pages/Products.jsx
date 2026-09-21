import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = (searchValue = "") => {
    setLoading(true);

    const apiUrl = searchValue
      ? `https://dummyjson.com/products/search?q=${searchValue}`
      : "https://dummyjson.com/products";

    fetch(apiUrl)
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      fetchProducts();
      return;
    }

    fetchProducts(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchProducts();
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

      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">No products found</h2>

          <p className="mt-2 text-base-content/60">
            Try searching with a different product name.
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