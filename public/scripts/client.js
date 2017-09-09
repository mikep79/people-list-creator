$(document).ready(onReady)

function onReady() {
    $('#addPersonButton').on('click', messageTest);
}

function messageTest(event) {            // test message - get request to server
    event.preventDefault()                  // prevents automatic page refresh
    $.ajax({
        type: 'GET',
        url: '/saying',                     // go to this route
        success: function(res) {
            console.log('response from server: ', res);         // log the response
            $('#testArea').append('<br>' + res);
        }
    });
}