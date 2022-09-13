const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  // phonesContainer.textContent = '';
  // display 10 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-hidden");
  }

  // display no phones found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  // display all phones
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");

    // Error 2
    //Problem: Media is trying to accessing undefined url.
    //Fix: The phone cards had wrong property value.
    //Wrong piece of code
    // <img src="${phone.image}" class="card-img-top" alt="...">

    // Error 3
    //Problem: Only one item was showing on UI. because the template was feeding to wrong place
    //Fix: Feed the template to template container Then append the template container in the whole item container
    phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                
            </div>
        </div>
        `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop spinner or loader
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// Error 1
//Problem: The ID was wrong, so event was listening to null
//document.getElementById('#btn-search').addEventListener('click', function(){
//Fix: Fixed the id.

// handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  // start loader
  processSearch(10);
});

// search input field enter key handler
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "enter") {
      processSearch(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  // Error 4
  //Problem: Logical Error in Showing Loading Spin
  //if (!isLoading) {
  //Fix: Showing Spinner if isLoading is true
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// not the best way to load show All
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  // Error 5
  // Problem: The URL was wrong & doesn't contains https://
  // const url = `www.openapi.programming-hero.com/api/phone/${id}`;

  //Fix: Copied the right url from API documentation
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  console.log(phone.mainFeatures.sensors[0]);
  phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate}</p>
        <p>Storage: ${phone.mainFeatures}</p>
        <p>Others: ${
          phone.others ? phone.others.Bluetooth : "No Bluetooth Information"
        }</p>
        <p>Sensor: ${
          phone.mainFeatures.sensors
            ? phone.mainFeatures.sensors[0]
            : "no sensor"
        }</p>
    `;
};

// Error 4
// Fix: Setting the Spinner before loading data
toggleSpinner(true);

loadPhones("apple");
