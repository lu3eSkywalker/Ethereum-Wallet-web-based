import React, { ChangeEvent, useState } from 'react';
import EthereumWallet2 from './EthereumWallet2';
import CryptoJS from 'crypto-js';

interface FormPassphrase {
  passphrase: string;
}

const EnterPassPhrase = () => {
  const [encryptedpassphrase, setEncryptedPassphrase] = useState<FormPassphrase>({
    passphrase: '',
  });

  const [showenterPassphrase, setShowEnterPassphrase] = useState<boolean>(true);

  const changeHandlerPassphrase = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEncryptedPassphrase({ passphrase: value });
  };

  function decryptMnemonic() {
    const encryptedMnemonic = localStorage.getItem('encryptedMnemonic') || '';
    const bytes = CryptoJS.AES.decrypt(encryptedMnemonic, encryptedpassphrase.passphrase);
    const decryptedMnemonic = bytes.toString(CryptoJS.enc.Utf8);

    if(!decryptedMnemonic) {
        console.log('Wrong passphrase');
    } else {
        console.log("This is the decrypted mnemonic", decryptedMnemonic)
        setShowEnterPassphrase(false);
    }
  }

  return showenterPassphrase ? (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
        <div className="w-[700px] bg-white rounded-lg shadow-lg p-6 space-y-6">
        <p className="font-bold text-3xl ">Enter Passphrase to Unlock your wallet</p>
        <input
          type="text"
          placeholder=" Passphrase"
          name="passphrase"
          value={encryptedpassphrase.passphrase}
          onChange={changeHandlerPassphrase}
          className="border border-gray-300 rounded h-9 w-full placeholder:px-2 mb-2"
        />
        <button
        //   onClick={() => setShowEnterPassphrase(false)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={() => decryptMnemonic()}
        >
          Submit
        </button>

      </div>
    </div>
  ) : (
    <EthereumWallet2 encryptedpassphrase={encryptedpassphrase} />
  );
};

export default EnterPassPhrase;