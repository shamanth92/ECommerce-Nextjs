import { Product } from "@/components/product";
import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { Products } from "@/components/allProducts";

interface Params {
  id: string;
}

export default async function SingleProduct({ params }: { params: Params }) {
  const productDetails: Products = await getProductDetails(params.id);

  return (
    <div>
      <AppHeader />
      <Product productDetails={productDetails} />
    </div>
  );
}

const getProductDetails = async (id: string) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
