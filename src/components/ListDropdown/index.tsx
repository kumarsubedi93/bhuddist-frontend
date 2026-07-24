'use client'
import React, { ChangeEvent, useState } from "react";

interface Props {
  items: any[];
  onItemChange?: (val: any) => void;
  label: string;
  selectedValue?: string 
}

const ListDropdown = ({ items, onItemChange, label, selectedValue='' }: Props) => {
  const [selectedItem, setSelectedItem] = useState(selectedValue);

  const handleItemChange = (event:ChangeEvent<HTMLSelectElement>) => {
    const item = event.target.value;
    setSelectedItem(item);
    onItemChange?.(item);
  };

  return (
    <div className="flex items-center gap-4 justify-center p-2">
      {/* <label htmlFor="list-select" className="mb-2 text-gray-700 font-medium">
        {label}:
      </label> */}
      <select
        id="list-select"
        value={selectedItem}
        onChange={handleItemChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 px-4"
      >
        <option value="">Select {label}</option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListDropdown;
