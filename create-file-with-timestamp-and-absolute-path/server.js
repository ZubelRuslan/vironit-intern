const path = require('path');
const fs = require('fs');

fs.writeFile(
    'output.txt',
    `${new Date().getTime()}\n${path.join(__dirname, 'output.txt')}`,
    err => {
        if (err) throw new Error(err);
    }
);