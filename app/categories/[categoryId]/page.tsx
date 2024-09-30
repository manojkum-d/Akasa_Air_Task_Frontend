"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/header";
import Image from "next/image";

const placeholderImage = "/api/placeholder/200/200";

interface Item {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
    description: string;
  };
  price: number;
  stockQuantity: number;
  description: string;
  images: string[];
  isAvailable: boolean;
}

export default function CategoryPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const [items, setItems] = useState<Item[]>([]);
  const decodedCategoryName = decodeURIComponent(params.categoryName);

  useEffect(() => {
    axios
      .get(`https://akasa-air-task.onrender.com/api/items`)
      .then((response) => {
        const filteredItems = response.data.items.filter(
          (item: Item) => item.category.name === decodedCategoryName
        );
        setItems(filteredItems);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, [decodedCategoryName]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="p-4 lg:p-8">
        <h2 className="text-3xl font-bold mb-6">
          Items in {decodedCategoryName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
              >
                <div className="absolute inset-0 bg-green-500 opacity-75 transition-opacity group-hover:opacity-90"></div>
                <Image
                  src={item.images[0] || placeholderImage}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <h3 className="text-2xl font-bold text-white z-10">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-lg text-white z-10">${item.price}</p>
                    <p className="text-sm text-white z-10">
                      Stock: {item.stockQuantity}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">
              No items found in this category.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
