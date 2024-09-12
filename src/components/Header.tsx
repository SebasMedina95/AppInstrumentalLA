import { useMemo } from "react";
import { IProduct } from "../interfaces/IProduct";
// import ShoppingCart from "./ShoppingCart";

interface ProductProps {
  cart: IProduct[];
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
}

const Header: React.FC<ProductProps> = ({
  cart, 
  removeFromCart, 
  increaseQuantity, 
  decrementQuantity
}) => {

  //Ir sumando los valores. El reduce es especial para estos casos
  //const cartTotal = () => cart.reduce( (total, item) => total + Number(item.price * item.quantity!), 0 );

  //?Podemos memorizar si queremos mejorar el performance, en este ejemplo no es que sea tan necesario pero:
  //Cada vez que agreguemos o quitemos elementos a cart ejecutemos este código
  const isEmpty = useMemo( () => cart.length === 0, [cart]);
  //Cada vez que agreguemos o quitemos elementos a cart ejecutemos este código
  const cartTotal = useMemo( () => cart.reduce( (total, item) => total + Number(item.price * item.quantity!), 0 ), [cart]);

  return (
    <>

      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
                <a href="index.html">
                    <img className="img-fluid" src="./public/img/logo2.png" alt="imagen logo" />
                </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              
              {/* Lo bloqueamos por ahora mientras miramos como haríamos la acción de quitar del carrito,
              pensando en no tener tampoco demasiadas props */}
              {/* <ShoppingCart
                cart = {cart}
              /> */}

              <div className="carrito">
                <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

                <div id="carrito" className="bg-white p-3">
                    
                    {/* Acá nos sirve sin memorizar el cart.length == 0 */}
                    {isEmpty ? (
                        <p className="text-center">El carrito esta vacio</p>
                    ) : (

                      <>
                        <table className="w-100 table">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                              {
                                cart.map( pc => (

                                  <tr key={ pc.id }>
                                      <td>
                                          <img className="img-fluid" src={`./public/img/${pc.image}.jpg`} alt="imagen producto" />
                                      </td>
                                      <td>{pc.name}</td>
                                      <td className="fw-bold">
                                              ${pc.price}
                                      </td>
                                      <td className="flex align-items-start gap-4">
                                          <button
                                              type="button"
                                              className="btn btn-dark"
                                              onClick={() => decrementQuantity(pc.id)}
                                          >
                                              -
                                          </button>
                                              { pc.quantity }
                                          <button
                                              type="button"
                                              className="btn btn-dark"
                                              onClick={() => increaseQuantity(pc.id)}
                                          >
                                              +
                                          </button>
                                      </td>
                                      <td>
                                          <button
                                              className="btn btn-danger"
                                              type="button"
                                              onClick={() => removeFromCart(pc.id)}
                                          >
                                              X
                                          </button>
                                      </td>
                                  </tr>

                                ))
                              }

                            </tbody>
                        </table>

                        {/* Al usar el useMemo, ya no necesitamos cartTotal() con los parentesis, los quitamos porque estamos memorizando */}
                        <p className="text-end">Total pagar: <span className="fw-bold">${ cartTotal }</span></p>
                        <button className="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>

                      </>

                    )}

                </div>

              </div>

            </nav>

          </div>
            
        </div>

      </header>
      
    </>
  )

}

export default Header

