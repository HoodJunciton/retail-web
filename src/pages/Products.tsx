import { Box, Typography, Button } from "@mui/material";
import ProductList from "../components/products/ProductList";

export default function Products() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Products
        </Typography>
        <Button variant="contained" color="primary" startIcon={<span>➕</span>}>
          Add Product
        </Button>
      </Box>

      <ProductList />
    </Box>
  );
}
