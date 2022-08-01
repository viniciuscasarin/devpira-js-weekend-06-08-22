import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function Payment() {
  return (
    <Grid item textAlign="center">
      <img width={156} height={156} src="/qrcode.png" alt="" />
      <Button variant="contained" fullWidth>
        Copiar PIX
      </Button>
    </Grid>
  );
}

export default Payment;
