const path = require('path');
const fs = require('fs');

fs.writeFile(
    'kek.txt',
    `${new Date().getTime()}\n${path.join(__dirname, 'kek.txt')}`,
    err => {
        if (err) throw new Error(err);
    }
);