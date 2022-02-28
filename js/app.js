const inputSearchButton = () => {
  const searchText = document.getElementById("search-field").value;
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showSearchResult(data.data))
    // .then(data => console.log(data));
}

const showSearchResult = (phones) => {
  const parent = document.getElementById("search-results");
  parent.innerHTML = "";
  // console.log(phones);
  const showTwenty = phones.slice(0, 20);
  showTwenty.forEach(phone => {
    console.log(phone);
    const div = document.createElement("div")
    div.innerHTML = `
    <img src="${phone.image}" alt="">
    <h2>Brand: ${phone.brand}</h2>
    <h3>Phone Name: ${phone.phone_name}</h3>
    `;
    parent.appendChild(div)
  });
}