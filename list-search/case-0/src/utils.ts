import {PersistedData, Product, Sort} from "./types";

export const sortProducts = (sortBy: Sort, products: Product[]) => {
  if (sortBy === "alphabetical") {
    let res = products.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;

      return 0;
    });

    return res;
  }
  if (sortBy === "price") {
    let res = products.sort((a, b) => a.price - b.price);

    return res;
  }

  return products;
};

export const saveToLocalStorage = (data: PersistedData) => {
  localStorage.setItem("settings", JSON.stringify(data));
};

export const getFromLocalStorage = () => {
  let settings = JSON.parse(localStorage.getItem("settings")!)
    ? JSON.parse(localStorage.getItem("settings")!)
    : {sortBy: "default", query: ""};

  return settings;
};
