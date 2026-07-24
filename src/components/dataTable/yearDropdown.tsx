'use client'

import React from "react";
import ListDropdown from "../ListDropdown";
import { getYears } from "@/lib/helper";
import { useRouter, useSearchParams } from "next/navigation";


const YearDropdown = () => {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <ListDropdown
      items={getYears()}
      selectedValue={params.get('year') || new Date().getFullYear().toString()}
      label="year"
      onItemChange={(val) => {
        const params = new URLSearchParams(location.search);
        params.set("year", val);
        router.push(`${window.location.pathname}?${params.toString()}`);
      }}
    />
  );
};

export default YearDropdown;
