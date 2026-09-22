import { FiFilter } from "react-icons/fi";

const SortFilter = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex items-center gap-3">
      <FiFilter className="text-primary" size={18} />

      <select
        value={sortOption}
        onChange={(event) => onSortChange(event.target.value)}
        className="select select-bordered w-full max-w-xs rounded-xl"
      >
        <option value="default">Sort by</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Rating: High to Low</option>
        <option value="name">Name: A to Z</option>
      </select>
    </div>
  );
};

export default SortFilter;