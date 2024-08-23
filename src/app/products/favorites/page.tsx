"use client";
import { AllProducts } from "@/components/allProducts";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { useAppStore } from "@/zustand/store";

export default function Favorites() {
  const favorites = useAppStore((state) => state.favorites);
  console.log(favorites);
  return (
    <div>
      <AppHeader />
      <h1>Your Wishlist</h1>
      <AllProducts products={favorites} />
    </div>
  );
}
