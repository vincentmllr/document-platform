const { countReset } = require('console');
const fs = require('fs');
const solc = require('solc');


async function compileContract(){
const source = fs.readFileSync("/usr/src/app/smart_contracts/Counter.sol", 'utf8');

// Compile Contract
const tempFile = await JSON.parse(solc.compile(JSON.stringify(

    {
        language: 'Solidity',
        sources: {
           "Counter.sol": {
              content: source,
           },
        },
        settings: {
           outputSelection: {
              '*': {
                 '*': ['*'],
              },
           },
        },
     }

)));

return contractFile = tempFile.contracts["Counter.sol"]["Counter"];
}

module.exports = {
    compileContract
};