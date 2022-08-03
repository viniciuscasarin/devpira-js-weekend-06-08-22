import { useState, useRef, useEffect } from "react";
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
  const [displayThumb, setDisplayThumb] = useState("");
  const thumbRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) setDisplayThumb(thumb);
    });
    const observed = thumbRef.current;
    if (observed) observer.observe(observed);

    return () => {
      if (observed) observer.unobserve(observed);
    };
  }, [thumbRef, thumb]);

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
                src={displayThumb}
                alt=""
                style={{ borderRadius: 8, objectFit: "cover" }}
                ref={thumbRef}
              />
            </Grid>
          </Grid>
        </CardActionArea>
      </MaterialCard>
    </Link>
  );
}

export default Card;
