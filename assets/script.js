// Declare global variables.

var searchFormEl = document.querySelector('#search-form');
var showInputEl = document.querySelector('#show-search');
var returnContainerEl = document.querySelector('#show-container');
var relatedContainerEl = document.querySelector('#related-container');
var searchButton = document.querySelector('#search-button');

// Definre the 'formSubmit' function, which takes the search data in the html and inputs it into the API requests
var formSubmit = function (event) {
    event.preventDefault();

    console.log('Success');

    var showName = showInputEl.value;


    if (showName) {
        showSearch(showName);

        getRelatedData(showName);



        returnContainerEl.textContent = '';
        relatedContainerEl.textContent = '';
        showInputEl.value = '';
    } 

}

// Retrieving show information from tvmaze based on the input of the search field in the html.
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

// Selecting specific show data to render to html.
var getShowData = function (data) {
    
    fetch('http://api.tvmaze.com/shows/' + data.id + '')
        .then (function (response) {
            if (response.ok) {
                response.json().then(function (detailsData) {
                    console.log(detailsData);
                    
                });
            } else {
                returnContainerEl.textContent = 'No Results Found.';
            }
        })

    returnContainerEl.textContent = data.name + ' ' + data.premiered + ' ' + data.rating.average + ' ' + data.summary

    
}

// Takes search input and also applies it to the second API request to pull similar show data.
var getRelatedData = function (data) {

    var getApi = 'https://cors-anywhere.herokuapp.com/http://tastedive.com/api/similar?q=' + encodeURI(showInputEl.value) + '';

    fetch(getApi)
        .then (function (response) {
            if (response.ok) {
                response.json().then(function (detailsData) {
                    console.log(detailsData);
                    
                    if(detailsData && detailsData.Similar && detailsData.Similar.Results){
                        var simstring = '';
                        for (var i=0; i < 5; i++) {
                            console.log(detailsData.Similar.Results[i].Name)
                            simstring += detailsData.Similar.Results[i].Name
                    }
                        relatedContainerEl.textContent = simstring;
            }
        }); 
                
            } else {
                returnContainerEl.textContent = 'No Results Found.';
            }
        })

        
}



// Runs the 'formSubmit' function when the search field is submitted.
searchFormEl.addEventListener('submit', formSubmit);















