import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ searchTerm, onSearch, onClear }) => {
  return (
    <div className="relative w-full">
      <FiSearch
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Search products..."
        className="input input-bordered w-full rounded-2xl pl-12 pr-12 focus:border-primary focus:outline-none"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={onClear}
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-1/2 -translate-y-1/2"
          aria-label="Clear search"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;