import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from "react";

import { ProductType } from "../types/product";

interface ProductCartType extends ProductType {
  amount: number;
}

interface CartContextData {
  products: ProductCartType[];
  addProductToCart: (data: ProductCartType) => void;
  removeProductFromCart: (id: ProductCartType["id"]) => void;
  increaseProductFromCart: (id: ProductCartType["id"]) => void;
  decreaseProductFromCart: (id: ProductCartType["id"]) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductCartType[]>([]);

  const addProductToCart = useCallback(
    async (data: ProductCartType) => {
      const productListWithThisProduct = [...products, data];
      setProducts(productListWithThisProduct);
    },
    [products, setProducts]
  );

  const removeProductFromCart = useCallback(
    async (id: ProductCartType["id"]) => {
      const productListWithoutThisProduct = products.filter(
        (product) => product.id !== id
      );
      setProducts(productListWithoutThisProduct);
    },
    [products, setProducts]
  );

  const increaseProductFromCart = useCallback(
    async (id: ProductCartType["id"]) => {
      const newArr = products.map((product) => {
        if (product.id === id) {
          return { ...product, amount: product.amount + 1 };
        }
        return product;
      });
      setProducts(newArr);
    },
    [products, setProducts]
  );

  const decreaseProductFromCart = useCallback(
    async (id: ProductCartType["id"]) => {
      const newArr = products.map((product) => {
        if (product.id === id && product.amount > 1) {
          return { ...product, amount: product.amount - 1 };
        }
        return product;
      });
      setProducts(newArr);
    },
    [products, setProducts]
  );

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        removeProductFromCart,
        increaseProductFromCart,
        decreaseProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
