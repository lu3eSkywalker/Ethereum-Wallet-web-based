import React, { ChangeEvent, useState } from 'react'
import Mnemonics from './Mnemonics';

interface FormPassphrase {
    passphrase: string;
  }  

const MakeAPassphrase = () => {
    const [encryptedpassphrase, setEncryptedPassphrase] = useState<FormPassphrase>({
        passphrase: '',
      });
    
      const [showenterPassphrase, setShowEnterPassphrase] = useState<boolean>(true);
    
      const changeHandlerPassphrase = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setEncryptedPassphrase({ passphrase: value });
      };

  return showenterPassphrase ? (
    <div>
    <div className="min-h-screen bg-blue-50 flex items-center justify-center ">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <p className="font-bold text-3xl ">Set Passphrase</p>
        <input
          type="password"
          placeholder=" Passphrase"
          name="passphrase"
          value={encryptedpassphrase.passphrase}
          onChange={changeHandlerPassphrase}
          className="border border-gray-300 rounded h-9 w-full placeholder:px-2 mb-2"
        />
        <button
          onClick={() => setShowEnterPassphrase(false)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
    </div>
  ) : (
    <Mnemonics passkey={encryptedpassphrase.passphrase} />
  )
}

export default MakeAPassphrase