"use client";
import { AllProducts, Products } from "@/components/allProducts";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { useAppStore } from "@/zustand/store";
import { useEffect, useState } from "react";

export default function Favorites() {
  const userInfo = useAppStore((state) => state.userInfo);
  const tokenInfo = useAppStore((state) => state.tokenInfo);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      const response = await fetch(
        `/ecommerce/addToWishlist?email=${userInfo.emailAddress}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.accessToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    };
    getFavorites();
  }, [userInfo.emailAddress, tokenInfo.accessToken]);

  return (
    <div>
      <AppHeader />
      <h1>Your Wishlist</h1>
      <AllProducts products={favorites} />
    </div>
  );
}
