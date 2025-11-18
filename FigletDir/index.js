const figlet = require('figlet');

let doSomething = async () => {
  let res =  await figlet.text("Subhamoy")
  console.log(res);
  
}

doSomething();