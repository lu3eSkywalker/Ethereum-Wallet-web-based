import React from 'react'
import CryptoJS from 'crypto-js';

const Wallet = () => {

    const password = '12345678';
    const privateKey = '80751e31a9e83e390255d63b0c8191680f1ace1f52962e4137f53ba790c04dd9'

    // Encrypt
    const encryptedKey = CryptoJS.AES.encrypt(privateKey, password).toString();
    localStorage.setItem('encryptedKey', encryptedKey);

    //Decrypt
    const decrypted = localStorage.getItem('encryptedKey');
    const bytes = CryptoJS.AES.decrypt(encryptedKey, password);
    const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);

  return (
    <div>
        <button
        onClick={() => console.log("Encrypted Key: ", encryptedKey)}
        >Encrypt the Key</button>

        <button
        onClick={() => console.log('Decrypted Key: ', decryptedKey)}
        >
            Decrypt the Key
        </button>
    </div>
  )
}

export default Wallet