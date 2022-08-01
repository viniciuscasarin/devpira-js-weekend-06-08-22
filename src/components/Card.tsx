import MaterialCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { toCurrency } from "../utils/currency";

type Props = {
  name: string;
  price: number;
  thumb: string;
  href: string;
};

function Card({ name, price, thumb, href }: Props) {
  return (
    <Link to={href} style={{ textDecoration: "none" }}>
      <MaterialCard>
        <CardActionArea>
          <Grid container spacing={1} p={1}>
            <Grid item flex={1}>
              <Typography variant="body1">{name}</Typography>
              <Typography variant="body2">{toCurrency(price)}</Typography>
            </Grid>
            <Grid item>
              <img
                width={72}
                height={72}
                src={thumb}
                alt=""
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
            </Grid>
          </Grid>
        </CardActionArea>
      </MaterialCard>
    </Link>
  );
}

export default Card;
