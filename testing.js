const bcryptjs = require ('bcryptjs');

let hash = bcryptjs.hashSync('abs123',10);

console.log(bcryptjs.compareSync('abs123',hash));