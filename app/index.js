/*
var Keypair = require("stellar-base").Keypair,
newAccount = Keypair.random(),
friendBot = 'https://friendbot.stellar.org/?addr=',
pubKey = newAccount.publicKey(),
secKey = newAccount.secret();

//console.log("CURL created!", curl);
console.log("New key pair created!");
console.log("  Account ID: " + pubKey);
console.log("  Secret: " + secKey);
*/
var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var fileInput = document.querySelector('#getKeys');
var heveKyes = document.querySelector('#haveKeys');

fileInput.addEventListener('click', create_keyPair, false);
haveKeys.addEventListener('click', get_keyPair, false);

// Funsionality for saving key information in file using Blob.
/*
(function () {
    var textFile = '',
        makeTextFile = function (text) {
            var data = new Blob([text], {type: 'text/plain'});
    
            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== '') {
                window.URL.revokeObjectURL(textFile);
            }
    
            textFile = window.URL.createObjectURL(data);
    
            return textFile;
        };
    
    
    var fileInput = document.querySelector('#getKeys'),
        textbox = document.getElementById('textbox');
    
    fileInput.addEventListener('click', function () {
        var link = document.getElementById('downloadlink');
        link.href = makeTextFile(textbox.value);
        link.style.display = 'block';
    }, false);
})();
*/

function testInput(){
    let fileInput = document.querySelector('#selectSoteLocation').Files;
}


function create_keyPair(){
    if (!$.jStorage.get('myKeys')){
        let _myserAccount = StellarSdk.Keypair.random(),
            _userName = document.querySelector('#userName').value,
            _createDate = new Date();

        console.dir(document.querySelector('#userName'));

        _myKeys = {
            userName: _userName,
            secret: _myserAccount.secret('#userName').value,
            public: _myserAccount.publicKey(),
            ballance: '',
            create_data: _createDate,
            accountInfo: _myserAccount
        };
        
        $.jStorage.set('myKeys', _myKeys);
    } 
    
    console.log(" Store Info: ",  $.jStorage.get('myKeys'));
}

function get_keyPair(){
    if ($.jStorage.get('myKeys')){
        var _uerInfo = $.jStorage.get('myKeys'),
            _userNameDom = document.createElement('h2'),
            _userPubKeyDom = document.createElement('p'),
            _userDateDom = document.createElement('p');
           
            _userNameDom.textContent = 'Welcome '+ _uerInfo.userName;
            _userPubKeyDom.textContent = 'Your public key is: '+ _uerInfo.public;
            _userDateDom.textContent = 'Your information was created on: '+ _uerInfo.create_data;

    } else {
        alert('Your user information is not yet set.');
    }

    document.querySelector('#welcomeWrapper').appendChild(_userNameDom);
    document.querySelector('#welcomeWrapper').appendChild(_userPubKeyDom);
    document.querySelector('#welcomeWrapper').appendChild(_userDateDom);

}

server.transactions()
    .forLedger(1400)
    .call().then(function(r){ console.log(r); });

    server.payments()
    .limit(10)
    .call()
    .then(function(response){
        // will follow the transactions link returned by Horizon
        response.records[0].transaction().then(function(txs){
            console.log(txs);
        });
    });
/*
    server.payments()
  .cursor('now')
  .stream({
    onmessage: function (message) {
      console.log(message);
    }
  })
  */

console.log(" Stellar SDK: ", StellarSdk);
console.log(" Server: ", server);