const inputSearchButton = () => {
  const searchText = document.getElementById("search-field").value;
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then(res => res.json())
    // .then(data => showSearchResult(data.data))
    // .then(data => console.log(data));
    .then((data) => {
      if (data.data.length <= 0) {
        // alert('nothing found')
        document.getElementById("found-nothing").style.display = "block"; 
        // Swal.fire("Any fool can use a computer");
        const parent = document.getElementById("search-results");
        parent.innerHTML = "";
        const parentPhone = document.getElementById("phone-details");
        parentPhone.innerHTML = "";
        document.getElementById("found").innerText = "";
      }
      else {
        showSearchResult(data.data)
        document.getElementById("found-nothing").style.display = "none";
      }
    });
}

const showSearchResult = (phones) => {
  const parent = document.getElementById("search-results");
  parent.innerHTML = "";
  const parentPhone = document.getElementById("phone-details");
  parentPhone.innerHTML = "";
  // console.log(phones);
  
  const showTwenty = phones.slice(0, 20);
  document.getElementById("found").innerText = phones.length;
  // console.log(phones.length);
  showTwenty.forEach(phone => {
    console.log(phone.length);
    
    const div = document.createElement("div")
    div.classList.add("col-lg-4")
    div.classList.add("col-12")
    div.innerHTML = `
    <div class="card p-4 m-2" style="width: 18rem;">
      <img src="${phone.image}" class="card-img-top img-fluid h-50" alt="Phone Image">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <h6 class="card-title">${phone.brand}</h6>
       
      <a href="#" onClick="phoneDet('${phone.slug}')" class="btn btn-outline-primary">See Details</a>
    </div>
    </div>
    `;
    parent.appendChild(div)
  });
}
// phone details😀😀
const phoneDet = id => {
  const phoneUrl = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(phoneUrl)
  .then(res => res.json())
  .then(data => phoneDetails(data.data))
  // .then(data => console.log(data.data))
  console.log(phoneUrl);
}

const phoneDetails = details => {
  const parentPhone = document.getElementById("phone-details");
  // console.log(details.mainFeatures.sensors[0]);
  parentPhone.innerHTML = "";
  parentPhone.innerHTML = `
   <div class="card p-4">
    <img class="img-fluid w-50 mx-auto m-2" src="${details.image}" alt="">
    <h4>${details.name}</h4>
    <p>${details?.releaseDate || "Comming soon"}</p>
    <h5>Main features:</h5>
    <p>Storage: ${details?.mainFeatures?.storage || "No data found"}</p>
    <p>Display Size: ${
      details?.mainFeatures?.displaySize || "No data found"
    }</p>
    <p>ChipSet: ${details?.mainFeatures?.chipSet || "No data found"}</p>
    <p>Memory: ${details?.mainFeatures?.memory || "No data found"}</p>
    <p>Sensors: ${
      Object.values(details?.mainFeatures?.sensors) || "No data found"
    }.</p>
    
    <h5>Basic features:</h5>
    <p>Wlan: ${details?.others?.WLAN || "No data found"}</p>
    <p>Bluetooth: ${details?.others?.Bluetooth || "No data found"}</p>
    <p>GPS: ${details?.others?.GPS || "No data found"}</p>
    <p>NFC: ${details?.others?.NFC || "No data found"}</p>
    <p>Radio: ${details?.others?.Radio || "No data found"}</p>
    <p>USB: ${details?.others?.USB || "No data found"}</p>
  </div>
  `;
}
