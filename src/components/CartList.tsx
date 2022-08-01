import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { useCart } from "../hooks/cart";
import { toCurrency } from "../utils/currency";
import AmountInput from "../components/AmountInput";

type Props = {
  handleConfirm: () => void;
};

function CartList({ handleConfirm }: Props) {
  const {
    products,
    removeProductFromCart,
    increaseProductFromCart,
    decreaseProductFromCart,
  } = useCart();

  const total = products.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.amount,
    0
  );

  return (
    <>
      <Grid item>
        {products.map((product) => (
          <Fragment key={product.id}>
            <Grid container flex={1} py={1} alignItems="center">
              <Grid item>
                <img
                  width={48}
                  height={48}
                  src={product.thumb}
                  alt=""
                  style={{ borderRadius: 4, objectFit: "cover" }}
                />
              </Grid>
              <Grid item flex={1} px={1}>
                <Typography variant="body2">{product.name}</Typography>
                <Typography variant="body2">
                  {toCurrency(product.price * product.amount)}
                </Typography>
              </Grid>
              <Grid item flexBasis={132} textAlign="center">
                <AmountInput
                  amount={product.amount}
                  handleIncrease={() => {
                    increaseProductFromCart(product.id);
                  }}
                  handleDecrease={() => {
                    decreaseProductFromCart(product.id);
                  }}
                />
                <Button
                  onClick={() => removeProductFromCart(product.id)}
                  variant="text"
                >
                  Remover
                </Button>
              </Grid>
            </Grid>
            <Divider />
          </Fragment>
        ))}
      </Grid>
      <Grid item>
        <Box p={1} sx={{ backgroundColor: "#f5f5f5" }}>
          <Typography variant="body2">
            Total da compra: {toCurrency(total)}
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Button variant="contained" fullWidth onClick={handleConfirm}>
          Continuar
        </Button>
      </Grid>
    </>
  );
}

export default CartList;
