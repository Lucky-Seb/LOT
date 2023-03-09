var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
window.addEventListener('load', onLoad);
function initWebSocket() {
    console.log('Trying to open a WebSocket connection...');
    console.log('hallo gateway', gateway)
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage; // <-- add this line
}
function onOpen(event) {
    console.log('Connection opened');

}
function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

// On recieved message. Recieves the data. 
function onMessage(event) {
    console.log("Recieved gas request");
    var gasCount = event.data;
    if (event.data == "-") {
        gasCount--;
    }
    else if (event.data == "+") {
        gasCount++;
    }
    console.log("Changing gas value on span id count to" + gasCount);
    document.getElementById('count').innerHTML = gasCount;
}
function onLoad(event) {
    initWebSocket();
    initButton();
}

// Event listener. 
function initButton() {
    // Add gas event listener
    document.getElementById('add_gas_button').addEventListener('click', addGas);

    // Remove gas event listener
    document.getElementById('remove_gas_button').addEventListener('click', removeGas);
}

// Sends if add gas is pressed. 
function addGas() {
    console.log("Sending gas.");
    websocket.send("+");
    console.log("Sent gas.");
}

// Sends if remove gas is pressed. 
function removeGas() {
    console.log("Removing gas.");
    websocket.send("-");
    console.log("Removed gas.");
}
