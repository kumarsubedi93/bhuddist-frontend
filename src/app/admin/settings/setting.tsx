"use client";

import Button from "@/components/button";
import { apiCall } from "@/lib/helper";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const frameTypes = [1, 2, 3, 4, 5];

interface Props {
  arts: {
    artId: number;
    price: number;
  }[];
}

const Settings = ({ arts }: Props) => {
  const [prices, setPrices] = useState(
    frameTypes.reduce((acc, frameType) => {
      acc[frameType] = "";
      return acc;
    }, {} as { [key: number]: string })
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialPrices = frameTypes.reduce((acc, frameType) => {
      const art = arts.find((art) => art.artId === frameType);
      acc[frameType] = art ? art.price.toString() : "";
      return acc;
    }, {} as { [key: number]: string });

    setPrices(initialPrices);
  }, [arts]);

  const handleChange = (frameType: number, value: string) => {
    setPrices({
      ...prices,
      [frameType]: value,
    });
  };

  console.log(prices, "prices", arts);
  const handleSave = async () => {
    setIsLoading(true);
    try {
      await Promise.all(
        frameTypes.map(async (frameType) => {
          const price = prices[frameType];
          if (price !== "") {
            await apiCall("/arts", "POST", {
              artId: frameType,
              price: price ? parseFloat(price) : 0,
            });
          }
        })
      );
      toast.success("Prices updated successfully");
    } catch (error) {
      console.error("Error updating prices:", error);
      toast.error("An error occurred while updating prices");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-6 flex flex-col gap-4 py-4">
      <h1 className="text-xl font-bold">Settings</h1>
      <p className="text-lg font-semibold leading-6">Art Price :</p>
      <div className="flex flex-col gap-4">
        {frameTypes.map((frameType) => (
          <div key={frameType} className="flex gap-8 items-center">
            <p className="text-base font-semibold">Form {frameType} :</p>
            <input
              type="number"
              className="bg-gray-50 border shadow-sm p-1 text-base"
              value={prices[frameType]}
              onChange={(e) => handleChange(frameType, e.target.value)}
            />
          </div>
        ))}
      </div>
      <Button
        className="bg-blue-500 text-white px-4 py-2 rounded w-fit"
        onClick={handleSave}
        loading={isLoading}
        loadingText="Saving..."
      >
        Save
      </Button>
    </div>
  );
};

export default Settings;
