"use client";
import { useAppStore } from "@/zustand/store";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface ProductsProps {
  products: [Products];
}

export interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export const AllProducts: React.FC<ProductsProps> = ({ products }) => {
  const productSelect = useAppStore((state) => state.productSelect);
  const updateProductSelect = useAppStore((state) => state.updateProductSelect);
  const router = useRouter();

  const allProducts = products.map((p: Products) => (
    <Grid item xs={3} key={p.id}>
      <Card
        sx={{ height: "400px", cursor: "pointer" }}
        elevation={productSelect?.id === p.id ? 10 : 2}
        onMouseEnter={() => updateProductSelect({ id: p.id })}
        onMouseLeave={() => updateProductSelect({})}
      >
        <CardActionArea onClick={() => router.push(`/products/${p.id}`)}>
          <Container
            sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
          >
            <Box
              component="img"
              height="280px"
              width="50%"
              alt="The house from the offer."
              src={p.image}
            />
          </Container>
          <Divider />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>{p.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ));

  console.log(products);

  return (
    <Box>
      {products && products.length > 0 && (
        <Box sx={{ padding: "20px" }}>
          <Grid container spacing={12}>
            {allProducts}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
