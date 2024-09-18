import Footer from "./components/Footer"
import Header from "./components/Header"
import Product from "./components/Product"
import { useCart } from "./hooks/useCart";
import { IProduct } from './interfaces/IProduct';

function App() {

  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decrementQuantity,
    clearCart,
    isEmpty, // Los vamos a pasar desde acá para no generar dos instancias, acá y en Header, eso generaría conflicto.
    cartTotal // Los vamos a pasar desde acá para no generar dos instancias, acá y en Header, eso generaría conflicto.
  } = useCart();


  return (
    <>
      <Header
        cart = {cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decrementQuantity={decrementQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">

            {

              data.map( (p: IProduct) => (
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
