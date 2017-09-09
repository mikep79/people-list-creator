$(document).ready(onReady)

function onReady() {
    $('#addPersonButton').on('click', addPerson);
    $('#addPersonButton').on('click', requestPeopleArray);
    requestPeopleArray();
}

function requestPeopleArray() {
    $.ajax({
        type: 'GET',
        url: '/people',                     // go to this route
        success: function(res) {
            appendInfo(res);
        }
    });
}

function appendInfo(peopleArray) {
    $('#container').empty();                    // clear container
    $('#nameInput').val('');                    // clear input values
    $('#factInput').val('');
    for (var i=0; i<peopleArray.length; i++) {              // (re)append all info to dom
        $('#container').append('<br>' + peopleArray[i].name + ' - ' + peopleArray[i].fact);
    }
}

function addPerson(event) {
    event.preventDefault();                         // prevent page refresh
    var personName = $('#nameInput').val();         // grabbing values of inputs
    var personFact = $('#factInput').val();
    var personObj = {                                 // storing info into person Obj
        name: personName,
        fact: personFact
    };
    console.log('Person sent to server: ', personObj);    
    $.ajax({
        type: 'POST',
        url: '/addPerson',
        data: personObj,                                       //must send data as obj
        success: function(res){
            console.log('response from server: ', res);
        }
    })
    
}