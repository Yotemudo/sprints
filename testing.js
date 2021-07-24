const bcryptjs = require ('bcryptjs');

let hash = console.log(bcryptjs.hashSync('abs123',10));
console.log(hash);
console.log(bcryptjs.compareSync(hash,'abs123'));
