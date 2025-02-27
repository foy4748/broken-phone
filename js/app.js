const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();

  // Issue 1
  // Storing the Search query in Local Storage
  // So that the input field can be cleared.
  // And the Show All button still works
  localStorage.setItem("query", searchText);
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");

  // Error 9
  //Problem: Phone Container was appending new results at the end after searching.
  //phonesContainer.textContent = "";

  //Fix: Uncommented the line that empty the Phone Container
  phonesContainer.textContent = "";
  // display 10 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    // Error 8
    // Problem: Hard coded dataLimit as written
    //phones = phones.slice(0, 10);

    // Fix: used the dataLimit variable
    phones = phones.slice(0, dataLimit);
    showAll.classList.remove("d-none");
  } else {
    // Issue 3
    // Added d-none instead of d-hidden
    // Probably It was an error
    showAll.classList.add("d-none");
  }

  // display no phones found
  const noPhone = document.getElementById("no-found-message");
  const showAllBtn = document.getElementById("btn-show-all");

  // Issue 2
  //Hide the Show All button if no phone found after searching

  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
    showAllBtn.classList.add("d-none");
  } else {
    noPhone.classList.add("d-none");
    showAllBtn.classList.remove("d-none");
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

  // Issue 1
  // Parsing search query from local storage if
  // input field is empty
  const searchText = searchField.value
    ? searchField.value
    : localStorage.getItem("query");

  //Clearing the input field
  searchField.value = "";
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
    // Error 10
    // Problem: Pressing enter to search phone was not working
    //if (e.key === "enter") {

    // Fix: Set the comparsion of pressed key as lower case
    if (e.key.toLowerCase() === "enter") {
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
  // Issue 3
  // Hiding the show all button after clicking it
  this.classList.add("d-none");
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
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");

  //Error 6
  //Problem: Storage was showing [Object object] in modal
  //Fix: Accessed the property value storage
  //Wrong piece of code
  //<p>Storage: ${phone.mainFeatures}</p>

  phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate}</p>
        <p>Storage: ${phone.mainFeatures.storage}</p>
        <p>Others: ${
          phone.others ? phone.others.Bluetooth : "No Bluetooth Information"
        }</p"apple">
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

// Error 7
// Problem: dataLimit was not provided
//loadPhones("apple");

//Fix: passed dataLimit as argument
loadPhones("apple", 10);
