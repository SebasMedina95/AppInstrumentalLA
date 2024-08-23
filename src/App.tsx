import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Product from "./components/Product"
import { IProduct } from "./interfaces/IProduct";
import { db } from "./db/data";

function App() {

  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    setData(db);
  }, [])



  return (
    <>
      <Header />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">

            {

              data.map( p => (
                <Product key={ p.id } myProd={p} />
              ))

            }
              
          </div>

      </main>

      <Footer />
      
    </>
  )
}

export default App
