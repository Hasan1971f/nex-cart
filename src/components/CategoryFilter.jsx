import { FiFilter } from "react-icons/fi";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <FiFilter className="text-primary" size={18} />

        <h2 className="font-bold">Categories</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={`btn btn-sm rounded-full ${
            selectedCategory === "all"
              ? "btn-primary"
              : "btn-ghost border border-base-300"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`btn btn-sm rounded-full capitalize ${
              selectedCategory === category
                ? "btn-primary"
                : "btn-ghost border border-base-300"
            }`}
          >
            {category.replace("-", " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;