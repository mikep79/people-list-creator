$(document).ready(onReady)

function onReady() {
    messageTest();
}

function messageTest() {            // test message - get response
    $.ajax({
        type: 'GET',
        url: '/saying',
        success: function(res) {
            console.log('response from server: ', res);
        }
    })
}