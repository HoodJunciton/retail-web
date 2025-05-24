import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid, 
  Button, 
  Chip,
  CircularProgress,
  TextField,
  InputAdornment
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchProducts, Product } from '../../store/slices/productSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.products);
  const [searchTerm, setSearchTerm] = React.useState('');
  
  useEffect(() => {
    // In a real app, we would dispatch the fetchProducts action
    // For now, we'll just use the mock data that's already in the store
    // dispatch(fetchProducts());
  }, [dispatch]);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStockColor = (quantity: number) => {
    if (quantity > 100) return 'success';
    if (quantity > 50) return 'info';
    if (quantity > 20) return 'warning';
    return 'error';
  };
  
  if (loading === 'pending') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h2">
          Products ({filteredProducts.length})
        </Typography>
        
        <TextField 
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ width: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                🔍
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} component="div">
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.imageUrl || 'https://via.placeholder.com/150'}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={product.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                  <Chip 
                    label={`Stock: ${product.stockQuantity}`} 
                    size="small" 
                    color={getStockColor(product.stockQuantity)}
                  />
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" color="primary" fullWidth>
                  Edit Product
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="text.secondary">
            No products found
          </Typography>
        </Box>
      )}
    </Box>
  );
}
