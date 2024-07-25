import { AppHeader } from "@/ui-components/AppHeader/AppHeader";
import { Box, Typography } from "@mui/material";

export default async function Products() {
  const products = await getProducts();

  const allProducts = products.map((p: any) => (
    <Typography key={p}>{p.title}</Typography>
  ));
  console.log(products.length);

  return (
    <div>
      <AppHeader />
      {products && products.length > 0 && <Box>{allProducts}</Box>}
    </div>
  );
}

const getProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
