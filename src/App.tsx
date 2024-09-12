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

  return (
    <>
      <Header
        cart = {cart}
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
