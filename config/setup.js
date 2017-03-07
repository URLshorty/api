const fs = require('fs')

fs.createReadStream('./config/.sample-env')
  .pipe(fs.createWriteStream('./.env'))
