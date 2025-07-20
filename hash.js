const bcrpt = require('bcrypt');


async function run(){
    const salt = await bcrpt.genSalt(10)
   const hashed = await bcrpt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
}

run();