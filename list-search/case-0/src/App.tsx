import type {PersistedData, Product, Sort} from "./types";

import {useEffect, useMemo, useState} from "react";

import api from "./api";
import {getFromLocalStorage, saveToLocalStorage, sortProducts} from "./utils";

const data: PersistedData = getFromLocalStorage();

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>(data.query);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<Sort>(data.order as Sort);

  const getProducts = async (query?: string) => {
    setIsLoading(true);
    let res = await api.search(query);

    setProducts(res);
    setIsLoading(false);
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as Sort);
  };

  useEffect(() => {
    getProducts(query);
  }, [query]);

  useMemo(() => sortProducts(sortBy, products), [sortBy, products]);
  useMemo(() => {
    saveToLocalStorage({order: sortBy, query: query});
  }, [sortBy, query]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input
        defaultValue={query}
        name="text"
        placeholder="tv"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      />
      <select className="selectLabel" defaultValue={sortBy} name="select" onChange={onChangeSelect}>
        <option disabled value="default">
          Ordenar
        </option>
        <option value="alphabetical">Alfabéticamente</option>
        <option value="price">Precio</option>
      </select>
      <ul>
        {!isLoading ? (
          products.map((product) => (
            <li key={product.id} className={`${product.price <= 100 ? "sale" : ""}`}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>
                $ {product.price.toLocaleString("en-AR", {style: "currency", currency: "ARS"})}
              </span>
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
