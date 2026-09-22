import { FiDollarSign, FiSliders } from "react-icons/fi";

const PriceFilter = ({
  minPrice,
  maxPrice,
  selectedPrice,
  onPriceChange,
}) => {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiSliders className="text-primary" size={18} />

          <h2 className="font-bold">Price Range</h2>
        </div>

        <span className="text-sm font-bold text-primary">
          ${selectedPrice}
        </span>
      </div>

      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={selectedPrice}
        onChange={(event) => onPriceChange(Number(event.target.value))}
        className="range range-primary range-sm"
      />

      <div className="mt-3 flex items-center justify-between text-xs text-base-content/50">
        <span className="flex items-center gap-1">
          <FiDollarSign size={13} />
          {minPrice}
        </span>

        <span className="flex items-center gap-1">
          <FiDollarSign size={13} />
          {maxPrice}
        </span>
      </div>
    </div>
  );
};

export default PriceFilter;