import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { AllProducts } from "@/components/allProducts";
import { useAppStore } from "@/zustand/store";

export default async function Products() {
  // const tokenInfo = useAppStore((state) => state.tokenInfo);
  const products = await getProducts();

  return (
    <div>
      <AppHeader />
      <AllProducts products={products} />
    </div>
  );
}

const getProducts = async () => {
  const res = await fetch("http://localhost:3000/ecommerce/products", {
    // headers: {
    //   Authorization: `Bearer ${tokenInfo.accessToken}`,
    // },
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
