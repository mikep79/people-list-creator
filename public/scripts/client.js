$(document).ready(onReady)

var testObj = 'rick';

function onReady() {
    $('#addPersonButton').on('click', requestPeopleArray);
    addTest();
}

function requestPeopleArray(event) {            // test message - get request to server
    //event.preventDefault();                  // prevents automatic page refresh
    $.ajax({
        type: 'GET',
        url: '/people',                     // go to this route
        success: function(res) {
            console.log('response from server: ' + res);         // log the response
            $('#testArea').append('<br>' + res);                // append to #testArea
        }
    });
}

function addTest(event){                            // post request TEST
    //event.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/addPerson',
        data: {                         // post req wraps my data into data obj.
            name: testObj
        },                             // must send data in OBJ form.
        success: function(res) {
            console.log('retrieved file from server: ' + res);
        }
    });
}