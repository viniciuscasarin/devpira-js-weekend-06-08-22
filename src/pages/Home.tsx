import { useState, useEffect } from "react";

import ProductList from "../components/ProductList";
import { getProducts } from "../services/products";
import { ProductType } from "../types/product";

function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetch();
  }, []);

  return <ProductList list={products} key={products[0]?.id} />;
}

export default Home;
