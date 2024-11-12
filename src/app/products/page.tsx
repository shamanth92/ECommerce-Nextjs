import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { AllProducts } from "@/components/allProducts";

export default async function Products() {
  const products = await getProducts();

  return (
    <div>
      <AppHeader />
      <AllProducts products={products} />
    </div>
  );
}

const getProducts = async () => {
  const res = await fetch("http://localhost:3000/ecommerce/products");

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
