/*
window.onload = function() {
    var worker = new Worker("worker.js");
    
    worker.postMessage("ping");
    
    worker.onmessage = function(event) {
        var message = "Worker says " + event.data;
        document.getElementById("output").innerHTML = message;
    };
}*/

window.onload = function() {
    var numWorkers = 3;
    var workers = [];
    for (var i=0; i<numWorkers; i++) {
        var worker = new Worker("worker.js");
        worker.onmessage = function(event) {
            alert(event.target + " says " + event.data);
        };
        
        workers.push(worker);
    }
    for (var i=0; i<numWorkers; i++) {
        workers[i].postMessage("ping");
    }
}