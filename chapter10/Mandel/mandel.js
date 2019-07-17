var numberOfWorkers = 8;
var workers = [];

var nextRow = 0;
var generation = 0;

window.onload = init;

function init() {
    setupGraphics();
    
    canvas.onclick = function(event) {
        handleClick(event.clientX, event.clientY);
    };
    
    for (var i = 0; i < numberOfWorkers; i++) {
        var worker = new Worker("worker.js");
        
        worker.onmessage = function(event) {
            processWork(event.target, event.data);
        }
        
        worker.idle = true;
        
        workers.push(worker);
    }
    
    startWorkers();
}

function startWorkers() {
    generation++;
    nextRow = 0;
    
    for (var i = 0; i< workers.length; i++) {
        var worker = workers[i];
        
        if (worker.idle) {
            var task = createTask(nextRow);
            
            worker.idle = false;
            worker.postMessage(task);
            
            nextRow++;
        }
    }
}

function processWork(worker, workerResults) {
    drawRow(workerResults);
    reassignWorker(worker);
}

function reassignWorker(worker) {
    var row = nextRow++;
    
    if (row >= canvas.height) {
        worker.idle = true;
    } else {
        var task = createTask(row);
        worker.idle = false;
        worker.postMessage(task);
    }
}

function handleClick(x, y) {
    var width = r_max - r_min;
    var height = i_min - i_max;
    var click_r = r_min + width * x / canvas.width;
    var click_i = i_max + height * y / canvas.height;
    
    var zoom = 8;
    
    r_min = click_r - width/zoom;
    r_max = click_r + width/zoom;
    i_max = click_i - height/zoom;
    i_min = click_i + height/zoom;
    
    startWorkers();
}