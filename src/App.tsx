import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Product from "./components/Product"
import { IProduct } from "./interfaces/IProduct";
import { db } from "./db/data";

function App() {

  //Para contener la información que traemos de "Base de Datos"
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    setData(db);
  }, [])

  //Para contener elementos del carrito
  const [cart, setCart] = useState<IProduct[]>([]);

  //Elementos constantes
  const MAX_ITEMS: number = 5;
  const MIN_ITEMS: number = 1;

  //Acción expresa para ir capturando y enviando al carrito
  function addToCart(item: IProduct){

    //Uso findIndex para poder capturar el index para operar mejor
    const findExist = cart.findIndex(element => element.id === item.id);

    if(findExist >= 0){ //Si ya existe ...

      const updateCart = [...cart]; //Creo una copia del carrito
      updateCart[findExist].quantity!++; //Me ubico en la posición del carrito encontrada y aumento la cantidad
      setCart(updateCart);


    }else{ //Si no existía

      item.quantity = 1;
      setCart(preventCart => [...preventCart, item]);

    }

  }

  //Acción expresa para eliminar elementos del carrito
  function removeFromCart(id: number){
    setCart(preventCart => preventCart.filter( (f) => f.id !== id ));
  }

  //Incrementar cantidad a llevar
  function increaseQuantity(id: number){
    const updateCart = cart.map( item => {
      if(item.id === id && item.quantity! < MAX_ITEMS) { //Limitamos a 5
        return {
          ... item,
          quantity: item.quantity! + 1
        }
      }
      return item;
    })

    setCart(updateCart);
  }

  //Decrementar cantidad a llevar
  function decrementQuantity(id: number){
    const updateCart = cart.map( item => {
      if(item.id === id) {
        if( item.quantity !== MIN_ITEMS ){
          return {
            ... item,
            quantity: item.quantity! - 1
          }
        }
      }
      return item;
    })

    setCart(updateCart);
  }

  

  return (
    <>
      <Header
        cart = {cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decrementQuantity={decrementQuantity}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">

            {

              data.map( p => (
                <Product 
                  key={ p.id } 
                  myProd={p}
                  cart={cart}
                  addToCart={addToCart}
                />
              ))

            }
              
          </div>

      </main>

      <Footer />
      
    </>
  )
}

export default App
