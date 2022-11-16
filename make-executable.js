const fs = require('fs');

const fileName = __dirname + '/build/index.js'

fs.readFile(fileName, (err, data) => {
    const executableString = "#!/usr/bin/env node \n";
    fs.writeFile(fileName, executableString + data, function (err) {
       if(!err)  {
        console.log("Executable is working fine now!");
       }
    });
});
