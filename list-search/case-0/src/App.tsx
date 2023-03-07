import type {Product} from "./types";

import {useEffect, useState} from "react";

import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async (query?: string) => {
    setIsLoading(true);
    let res = await api.search(query);

    setProducts(res);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts(query);
  }, [query]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {!isLoading ? (
          products.map((product) => (
            <li key={product.id} className={`${product.price <= 100 ? "sale" : ""}`}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))
        ) : (
          <div className="isLoading">Cargando...</div>
        )}
      </ul>
    </main>
  );
}

export default App;
