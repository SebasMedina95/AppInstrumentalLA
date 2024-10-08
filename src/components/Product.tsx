import { IProduct } from "../interfaces/IProduct";
import React from 'react';

interface ProductProps {
    myProd: IProduct;
    cart: IProduct[];
    addToCart: (item: IProduct) => void; // Metodo descriptivo
}

const Product: React.FC<ProductProps> = ({myProd, addToCart}) => {

  return (
    <>

        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`./img/${myProd.image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{myProd.name}</h3>
                <p>{myProd.description}</p>
                <p className="fw-black text-primary fs-3">${myProd.price}</p>
                <button 
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={ () => addToCart(myProd) }
                >Agregar al Carrito</button>
            </div>
        </div>
      
    </>
  )

}

export default Product

