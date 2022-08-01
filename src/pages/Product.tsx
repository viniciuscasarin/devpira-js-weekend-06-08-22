import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";

import { toCurrency } from "../utils/currency";
import AmountInput from "../components/AmountInput";
import { useCart } from "../hooks/cart";
import { getProductById } from "../services/products";
import { ProductType } from "../types/product";

function Product() {
  const [amount, setAmount] = useState(1);
  const [product, setProduct] = useState<ProductType | null>(null);
  const { addProductToCart } = useCart();
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const product = await getProductById(Number(id));
        setProduct(product);
      } catch {}
    };

    fetch();
  }, [id]);

  if (!product) return null;

  return (
    <>
      <Grid container spacing={2} flexDirection="column" flex={1}>
        <Grid item>
          <img
            width={160}
            height={160}
            src={product.thumb}
            alt=""
            style={{ borderRadius: 8, objectFit: "cover" }}
          />
        </Grid>
        <Grid item flex={1}>
          <Typography variant="body1">
            <b>{product.name}</b>
          </Typography>
          <Typography variant="body2">Serve 1 pessoa</Typography>
          <Typography variant="body2" color="#717171">
            200g de carne bovina, queijo cheddar, cebola caramelizada e cebola
            crispy com muito bacon.
          </Typography>
          <Typography color="#50a773">
            <b>{toCurrency(product.price)}</b>
          </Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item flexBasis={140}>
              <AmountInput
                amount={amount}
                handleIncrease={() => setAmount(amount + 1)}
                handleDecrease={() => amount > 1 && setAmount(amount - 1)}
              />
            </Grid>
            <Grid item flexGrow={1}>
              <Button
                variant="contained"
                sx={{ height: "100%" }}
                fullWidth
                onClick={() => {
                  addProductToCart({
                    ...product,
                    amount,
                  });
                  navigate("/pedido");
                }}
              >
                Adicionar por {toCurrency(amount * product.price)}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Product;
