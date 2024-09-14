'use client'
import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

type FilterChangeEvent = {
  type: 'jobRole' | 'location' | 'salary';
  value: string;
};

interface FilterProps {
  onFilterChange: (event: FilterChangeEvent) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [range, setRange] = React.useState<number>(10);

  const handleSalaryRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(Number(e.target.value));
    onFilterChange({ type: 'salary', value: e.target.value });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ type: 'jobRole', value: e.target.value });
  };

  const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ type: 'location', value: e.target.value });
  };

  return (
    <div className="absolute top-28 w-full h-20 justify-around text-gray-400 flex items-center shadow-md shadow-gray-200">
      {/* search input */}
      <div className="relative flex items-center">
        <label className="absolute left-4" htmlFor="searchInput">
          <CiSearch className="text-2xl" />
        </label>
        <input
          id="searchInput"
          type="text"
          className="pl-12 pr-6 py-4 border border-none rounded-md w-full"
          placeholder="Search By Job Title, Role"
          onChange={handleSearch}
        />
      </div>
      {/* dropdown input */}
      <div className="relative flex items-center">
        <label className="absolute left-4" htmlFor="workPreference">
          <CiLocationOn className="text-2xl" />
        </label>
        <select
          name="workPreference"
          id="workPreference"
          className="pl-12 pr-8 py-4 border border-none rounded-md w-full"
          onChange={handleDropdown}
        >
          <option value="" disabled selected>
            Preferred Location
          </option>
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      {/* salary range */}
      <div className="flex flex-col p-4">
        <div className="flex gap-8">
          <label className="">Salary Range</label>
          <p>{`₹0k - ₹${range}k`}</p>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={range}
          className="w-full mt-3"
          onChange={handleSalaryRange}
        />
      </div>
    </div>
  );
}

export default Filter;
