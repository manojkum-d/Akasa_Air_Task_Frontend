"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { Card, Skeleton } from "@nextui-org/react";

interface Product {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  price: number;
  stockQuantity: number;
  description: string;
  images: string[];
  isAvailable: boolean;
}

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    if (id) {
      axios
        .get<{ items: Product[] }>(
          `https://akasa-air-task.onrender.com/api/items`
        )
        .then((response) => {
          if (response.data.items.length > 0) {
            setProduct(response.data.items[0]);
          } else {
            console.error("Product not found");
          }
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

  if (!product) {
    return (
      <ThemeProvider attribute="class">
        <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Card className="bg-white dark:bg-black rounded-lg shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2">
                  <Skeleton
                    style={{ height: "400px", width: "100%" }}
                    className="rounded-lg"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <Skeleton style={{ height: "32px", width: "200px" }} />
                  <Skeleton
                    style={{ height: "48px", width: "100%" }}
                    className="mt-4"
                  />
                  <Skeleton
                    style={{ height: "24px", width: "80%" }}
                    className="mt-4"
                  />
                  <Skeleton
                    style={{ height: "40px", width: "50%" }}
                    className="mt-4"
                  />
                  <Skeleton
                    style={{ height: "40px", width: "40%" }}
                    className="mt-4"
                  />
                </div>
              </div>
            </Card>
          </main>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2">
                <div className="relative w-full h-[400px] mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={product.images[currentImage]}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex justify-between">
                    {product.images.map((img, index) => (
                      <div
                        key={index}
                        className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-lg cursor-pointer ${
                          index === currentImage
                            ? "border-2 border-green-500"
                            : ""
                        }`}
                        onClick={() => setCurrentImage(index)}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="text-green-600 mb-2 text-sm font-semibold">
                  {product.category.name}
                </h2>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 dark:text-grey-200 mb-4 text-sm lg:text-base">
                  {product.description}
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-2xl lg:text-3xl font-bold mr-4 text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-grey-200 mb-4">
                  Available: {product.stockQuantity} in stock
                </p>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded w-full sm:w-auto">
                    <Button
                      variant="ghost"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="px-4">{quantity}</span>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setQuantity(
                          Math.min(product.stockQuantity, quantity + 1)
                        )
                      }
                      disabled={quantity >= product.stockQuantity}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
                    disabled={
                      !product.isAvailable || product.stockQuantity === 0
                    }
                  >
                    <span>
                      {product.isAvailable ? "Add to Cart" : "Out of Stock"}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
