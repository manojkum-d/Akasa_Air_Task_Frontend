"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Header from "../../components/header"; // Adjust the import path as needed
import Image from "next/image";
import Link from "next/link";

const placeholderImage = "/api/placeholder/200/200";

interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("https://akasa-air-task.onrender.com/api/categories")
      .then((response) => setCategories(response.data.categories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="p-4 lg:p-8">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                href={`/categories/${encodeURIComponent(category.name)}`}
                key={category._id}
              >
                <div className="relative overflow-hidden rounded-lg group cursor-pointer">
                  <div className="absolute inset-0 bg-green-500 opacity-75 transition-opacity group-hover:opacity-90"></div>
                  <Image
                    src={category.image || placeholderImage}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <h3 className="text-2xl font-bold text-white z-10">
                      {category.name}
                    </h3>
                    <ChevronRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-white">Loading categories...</p>
          )}
        </div>
      </main>
    </div>
  );
}
