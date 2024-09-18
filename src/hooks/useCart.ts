import { useEffect, useMemo, useState } from "react";
import { db } from "../db/data";
import { IProduct } from "../interfaces/IProduct";

export const useCart = () => {
  //Para evaluar el estado inicial del carrito
  const initalStateCart = (): IProduct[] => {
    const localStorageCart = localStorage.getItem("cartInstrumentsLa");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  //Para contener la información que traemos de "Base de Datos"
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    setData(db);
  }, []);

  //Para contener elementos del carrito
  const [cart, setCart] = useState<IProduct[]>(initalStateCart);

  //Elementos constantes
  const MAX_ITEMS: number = 5;
  const MIN_ITEMS: number = 1;

  //*Para el LocalStorage
  //Siempre que cambie de estado el carrito se dispara esta función.
  useEffect(() => {
    //Le mando como parámetro el state que tiene los valores
    localStorage.setItem("cartInstrumentsLa", JSON.stringify(cart));
  }, [cart]);

  //Acción expresa para ir capturando y enviando al carrito
  function addToCart(item: IProduct) {
    //Uso findIndex para poder capturar el index para operar mejor
    const findExist = cart.findIndex((element) => element.id === item.id);

    if (findExist >= 0) {
      //Si ya existe ...

      const updateCart = [...cart]; //Creo una copia del carrito
      updateCart[findExist].quantity!++; //Me ubico en la posición del carrito encontrada y aumento la cantidad
      setCart(updateCart);
    } else {
      //Si no existía

      item.quantity = 1;
      setCart((preventCart) => [...preventCart, item]);
    }
  }

  //Acción expresa para eliminar elementos del carrito
  function removeFromCart(id: number) {
    setCart((preventCart) => preventCart.filter((f) => f.id !== id));
  }

  //Incrementar cantidad a llevar
  function increaseQuantity(id: number) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity! < MAX_ITEMS) {
        //Limitamos a 5
        return {
          ...item,
          quantity: item.quantity! + 1,
        };
      }
      return item;
    });

    setCart(updateCart);
  }

  //Decrementar cantidad a llevar
  function decrementQuantity(id: number) {
    const updateCart = cart.map((item) => {
      if (item.id === id) {
        if (item.quantity !== MIN_ITEMS) {
          return {
            ...item,
            quantity: item.quantity! - 1,
          };
        }
      }
      return item;
    });

    setCart(updateCart);
  }

  //Limpiar el carrito
  function clearCart() {
    setCart([]);
  }

  //?Podemos memorizar si queremos mejorar el performance, en este ejemplo no es que sea tan necesario pero:
  //Cada vez que agreguemos o quitemos elementos a cart ejecutemos este código
  const isEmpty = useMemo( () => cart.length === 0, [cart]);
  //Cada vez que agreguemos o quitemos elementos a cart ejecutemos este código
  const cartTotal = useMemo( () => cart.reduce( (total, item) => total + Number(item.price * item.quantity!), 0 ), [cart]);


  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decrementQuantity,
    clearCart,
    isEmpty,
    cartTotal
  };
};
