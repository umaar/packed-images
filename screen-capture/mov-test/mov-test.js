
 // include the module
    var walker = require('node-walker');
    var execSync = require('exec-sync');

    var fileNameTemplate = 'screen_{{timestamp}}.png';
    var timestamp = +new Date();
    var increment = 30;

    // start walking over all files in a given folder
    walker( __dirname,

        function (errorObject, fileName, fnNext) {

            // an error occurred
            if (errorObject) throw errorObject;

            // a filename has been provided
            if (fileName !== null) {

                // do something with that filename
                fileName = fileName.replace(__dirname + '/', '');
                if ( fileName.match('screen') ) {
                	var newFilename = fileNameTemplate.replace('{{timestamp}}', timestamp+= increment)
                	var command = 'mv ' + fileName + ' ' + newFilename;
                	execSync(command);
                }
            }

            // all files have been read, fileName is null
            if (fileName === null) {

                // continue with some other task
                return;
            }

            // call next(); when you want to proceed
            if (fnNext) fnNext();
        }
    );