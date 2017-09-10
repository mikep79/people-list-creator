$(document).ready(onReady)

var slidePosition = 0;              // var for index of people info array

function onReady() {
    $('#addPersonButton').on('click', addPerson);               // event listeners
    $('#addPersonButton').on('click', requestPeopleArray);
    $('#previous').on('click', showPrevious);
    $('#next').on('click', showNext);
    requestPeopleArray();
    $('#removePersonButton').on('click', removePerson);
    $('#removePersonButton').on('click', requestPeopleArray);
}

function requestPeopleArray() {             // obtain people array from server
    $.ajax({
        type: 'GET',
        url: '/people',                     // go to this route
        success: function(res) {
            appendInfo(res);
        }
    });
}

function appendInfo(peopleArray) {              // append people to DOM
    $('#container').empty();                    // clear container
    $('#nameInput').val('');                    // clear input values
    $('#factInput').val('');
    for (var i=0; i<peopleArray.length; i++) {              // (re)append all info to dom
        $('#container').append('<p class="people">' + peopleArray[i].name + ' - ' + peopleArray[i].fact + '</p>');
    }
    slidePosition = peopleArray.length;
    showAdded();        
}

function showAdded() {                              // show added person
    var peopleArray = document.getElementsByClassName('people');
    for (var i=0; i<peopleArray.length; i++) {              // hide all people
        peopleArray[i].style.display = 'none';
    }
    if (slidePosition > 0 ){                                // show current person
        peopleArray[slidePosition-1].style.display = 'block';
    };
    $('#index').text(slidePosition);                    // update index displays
    $('#total').text(peopleArray.length);
}

function showPrevious(event) {
    event.preventDefault();
    var peopleArray = document.getElementsByClassName('people');
    if (peopleArray.length > 0) {                   // check if at least 1 person
        slidePosition--;
        if (slidePosition === 0) {                     // select prev person to show
            slidePosition = peopleArray.length;
        }
        showAdded();                                  // call showAdded to reveal person
    }
}

function showNext(event){
    event.preventDefault();
    var peopleArray = document.getElementsByClassName('people');
    if (peopleArray.length > 0){                    // check if at least 1 person
        slidePosition++;
        if (slidePosition > peopleArray.length){        // select next person to show
            slidePosition = 1;
        }
        showAdded();                                // call showAdded to reveal person
    }
}

function addPerson(event) {                         
    event.preventDefault();                         // prevent page refresh
    slidePosition++;
    var personName = $('#nameInput').val();         // grabbing values of inputs
    var personFact = $('#factInput').val();
    if (personName === '' || personFact === ''){        // check if all user info entered
        alert('Please enter information for both name and fact.');
        return;
    }
    var personObj = {                                 // storing info into person Obj
        name: personName,
        fact: personFact
    };
    console.log('Person sent to server: ', personObj);    
    $.ajax({
        type: 'POST',
        url: '/addPerson',
        data: personObj                                       //must send data as obj
    });
}

function removePerson(event) {           // remove person function
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/remove',
        data: {
            remove: slidePosition           // remove currently selected person
        }
    });
}