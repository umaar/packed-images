var exec = require('child_process').exec;

var rect = process.argv[2] || "50,50,600,400";

/* How often should we capture the screen */
var delay = 100;

/* Folder for saving images */
var folder = "example";
var command = "screencapture -R"+ rect + " " + folder + "/screen_{{timestamp}}.png";


var helpfulMessage = "This script will run 'screencapture' using the rect: '" + rect + "' every " + delay + "ms.";
helpfulMessage += "\nFiles will be stored in '" + folder + "'.";
helpfulMessage += "\nCall this script like: 'node run-me.js x,y,width,height'"
helpfulMessage += "\nExit with Control + C";

console.log("\n" + helpfulMessage + "\n");

function startCaptureInterval() {
	setInterval(function() {
		var timestamp = Math.round(+new Date());
		exec(command.replace("{{timestamp}}", timestamp), function() {});
	}, delay);
}

startCaptureInterval();
