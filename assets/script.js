var inputEl = document.querySelector('#input');






var formSubmitHandler = function (event) {
    event.preventDefault();

    var inputName = inputEl.nodeValue.trim();

    if (inputName) {
        getInputSongs(inputName);

        
    }

}