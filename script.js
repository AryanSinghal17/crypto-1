const table = document.getElementById("crypto-table");

const btn1 = document.getElementById("sort-button-Cap");
const btn2 = document.getElementById("sort-button-percent");

const search = document.getElementById("search");

const BASE_URL = "https://api.coingecko.com";
let coins = [];

const API =
  "/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

function promiseApi() {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${API}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((data) => {
        reject("too many request");
      });
  });
}

let p1 = promiseApi();

p1.then((data) => {
  coins = data;
  renderTable(coins);
});

function renderTable(data) {
  try {
    let tabledata = "";

    data.forEach((coin) => {
      tabledata += `
      <tr>
        <td><img src="${coin.image}" width="50" height="50"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol}</td>
        <td>${coin.current_price}</td>
        <td>${coin.market_cap}</td>
      </tr>
    `;
    });
    table.innerHTML = tabledata;
  } catch (error) {
    console.log("too many request");
  }
}

btn1.addEventListener("click", () => {
  coins.sort((a, b) => {
    return b.market_cap - a.market_cap;
  });

  renderTable(coins);
});

btn2.addEventListener("click", () => {
  coins.sort((a, b) => {
    return b.price_change_percentage_24h - a.price_change_percentage_24h;
  });

  renderTable(coins);
});

search.addEventListener("input", (event) => {
  let value = event.target.value.toLowerCase();

  let newArr = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(value);
  });

  renderTable(newArr);
});