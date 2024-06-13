const selectedFilters = Object.fromEntries(
    new URLSearchParams(window.location.search)
);
// Shared function from UI to URL
function replaceURLParams(a) {
    var url = new URL(window.location.href);
    const searchParams = new URLSearchParams();

    Object.entries(a).forEach(([key, value]) => {
        searchParams.append(key, value);
    });

    // Update URL with new parameters
    var newURL = url.origin + url.pathname + "?" + searchParams.toString();
    window.location.href = newURL;
}


// 1. Search function
// 1.1. UI to URL: Update the selectedFilters object and log the selected filters
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value;
    selectedFilters["searchText"] = searchInput;

    replaceURLParams(selectedFilters);
});

// 1.2. URL to UI: Keep typed keywords after search result page is shown
const searchInput = selectedFilters["searchText"]
if (searchInput !== undefined) {
    document.getElementById('searchInput').value = searchInput;
}


// 2. Filters
// 2.1 Normal filters
// 2.1.1 UI to URL
// Get all the <a> tags with the class dropdown-item inside the filters class
const filterLinks = document.querySelectorAll(".filters a.dropdown-item");
filterLinks.forEach((link) => {
    // Get the filter category from the parent element's ID
    const categoryElement = link.closest(".filter").id;
    const category = categoryElement.replace("Filter", "");

    // Get the filter value
    const value = link.textContent.trim();

    link.addEventListener("click", function (event) {
        event.preventDefault();

        selectedFilters[category] = value;
        replaceURLParams(selectedFilters);
    });

    // 2.1.2 URL to UI: apply grey color for selected filters
    const selectedValue = selectedFilters[category];
    if (value === selectedValue) {
        link.style.backgroundColor = "#C8C8C8";
    }
});

// 2.2 Price filters
// 2.2.1 UI to URL
const priceRangeApplyBtn = document.getElementById("priceRangeApplyBtn");
// Attach click event to the Price Range apply button
priceRangeApplyBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Get the minimum and maximum prices
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;

    // Update the selectedFilters object with the price range
    selectedFilters["minPrice"] = minPrice;
    selectedFilters["maxPrice"] = maxPrice;

    replaceURLParams(selectedFilters);
});

// 2.2.2 URL to UI
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
minPriceInput.value = selectedFilters.minPrice;
maxPriceInput.value = selectedFilters.maxPrice;


// 3. Inline search: using the Autocomplete library to initialize an autocomplete feature for the search box 
import Autocomplete from "https://cdn.jsdelivr.net/gh/lekoala/bootstrap5-autocomplete@master/autocomplete.js";
Autocomplete.init("input.autocomplete", {
    valueField: "id",
    labelField: "title",
    highlightTyped: true,
    onSelectItem: console.log,
    server: "/search-prompts",
    liveServer: true,
});


// 4. Apply socket
let socket = io();
socket.on('showBanner', (msg) => {
    document.getElementById('prompt').style.display = 'block';
})