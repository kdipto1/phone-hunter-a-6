const inputSearchButton = () => {
  const searchText = document.getElementById("search-field").value;
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then(res => res.json())
    // .then(data => showSearchResult(data.data))
    // .then(data => console.log(data));
    .then((data) => {
      if (data.data.length <= 0) {
        alert('nothing found')
        // Swal.fire("Any fool can use a computer");
        const parent = document.getElementById("search-results");
        parent.innerHTML = "";
        const parentPhone = document.getElementById("phone-details");
        parentPhone.innerHTML = "";
      }
      else {
        showSearchResult(data.data)
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
  showTwenty.forEach(phone => {
    // console.log(phone);
    const div = document.createElement("div")
    div.classList.add("col-md-4")
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${phone.image}" class="card-img-top img-fluid" alt="Phone Image">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <h5 class="card-title">${phone.brand}</h5>
       
      <a href="#" onClick="phoneDet('${phone.slug}')" class="btn btn-primary">Go somewhere</a>
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
    <img class="img-fluid w-25 m-2" src="${details.image}" alt="">
    <h4>${details.name}</h4>
    <p>${details?.releaseDate || "Comming soon"}</p>
    <h6>Main features:</h6>
    <p>Storage: ${details.mainFeatures.storage}</p>
    <p>Display Size: ${details.mainFeatures.displaySize}</p>
    <p>ChipSet: ${details.mainFeatures.chipSet}</p>
    <p>Memory: ${details.mainFeatures.memory}</p>
    <p>Sensors: ${Object.values(details.mainFeatures.sensors)}.</p>
    
    <h6>Basic features:</h6>
    <p>Wlan: ${details.others.WLAN}</p>
    <p>Bluetooth: ${details.others.Bluetooth}</p>
    <p>GPS: ${details.others.GPS}</p>
    <p>NFC: ${details.others.NFC}</p>
    <p>Radio: ${details.others.Radio}</p>
    <p>USB: ${details.others.USB}</p>
  </div>
  `;
}
