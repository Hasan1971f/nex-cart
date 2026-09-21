import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black sm:text-4xl">All Products</h1>

        <p className="mt-2 text-base-content/60">
          Explore our latest products and discover something you love.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-base-300 bg-base-100 p-4"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-52 w-full rounded-xl object-cover"
            />

            <h2 className="mt-4 line-clamp-1 text-lg font-bold">
              {product.title}
            </h2>

            <p className="mt-2 font-semibold text-primary">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;