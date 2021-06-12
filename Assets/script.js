var searchFormEl = document.querySelector('#search-form');
var showInputEl = document.querySelector('#artist-search');
var returnContainerEl = document.querySelector('#show-container');
var searchButton = document.querySelector('#search-button');


var formSubmit = function (event) {
    event.preventDefault();
    console.log('Success');
    var showName = showInputEl.value;
    if (showName) {
        showSearch(showName);
        returnContainerEl.textContent = '';
        showInputEl.value = '';
    } 
}

var showSearch = function (input) {
    var getApi = 'http://api.tvmaze.com/singlesearch/shows?q=' + encodeURI(input) + '';
    fetch(getApi)
        .then (function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    getShowData(data);
                });
            } else {
                returnContainerEl.textContent = 'No Results Found.';
            }
        })
}

var getShowData = function (data) {
    console.log(data);
    fetch('http://api.tvmaze.com/shows/' + data.id + '?/seasons/cast')
        .then (function (response) {
            if (response.ok) {
                response.json().then(function (detailsData) {
                    console.log(detailsData);
                    renderData(detailsData);
                });
            } else {
                // returnContainerEl.textContent = 'No Results Found.';
            }
        })
    returnContainerEl.textContent = data.name + " " + data.premiered + " " + data.rating.average + " " + data.summary
}

var renderData = function (data) {
}

searchFormEl.addEventListener('submit', formSubmit);

// Handle User Search
// Search API for Single Show Data
// Render Show Data (Draw stuff into the page "results container")
// Fetch Season Data For Show
// Render Season Data (Draw stuff into the page)
// Use Show to Get Fetch API Data for Related Shows
// Render Related Shows