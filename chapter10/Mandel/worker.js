importScripts("workerlib.js");

onmessage = funcion(task) {
    var workerResult = computeRow(task.data);
    
    postMessage(workerResult);
}