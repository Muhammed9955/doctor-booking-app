import React from "react";

export default function Dropdown({
  icon,
  label,
  options,
  name,
  filters,
  setFilters,
}) {
  //   const { filters, setFilters } = useHomeHook();
  return (
    <div className="flex items-center">
      {icon}
      <label htmlFor="specialty-filter" className="mr-2 text-gray-600">
        {label}:
      </label>
      <select
        id="specialty-filter"
        className="border rounded py-1 px-2"
        value={filters?.[`${name}`]}
        onChange={(e) =>
          setFilters({ ...filters, [`${name}`]: e.target.value })
        }
      >
        {options?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
