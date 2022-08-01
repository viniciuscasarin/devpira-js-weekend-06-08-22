import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

function CartEmpty() {
  return (
    <Grid
      container
      textAlign="center"
      spacing={2}
      py={4}
      flexDirection="column"
    >
      <Grid item>
        <RemoveShoppingCartIcon fontSize="large" sx={{ color: "#8a8a8a" }} />
      </Grid>
      <Grid item>
        <Typography variant="body1">
          Adicione comidinhas ao seu pedido
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CartEmpty;
