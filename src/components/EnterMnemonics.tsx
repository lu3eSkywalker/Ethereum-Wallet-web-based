import React, { ChangeEvent, FormEvent, useState } from 'react';
import CryptoJS from 'crypto-js';
import { Navigate, useNavigate } from 'react-router-dom';
import EthereumWallet2 from './EthereumWallet2';
import EnterPassPhrase from './EnterPassPhrase';

interface FormData {
  [key: string]: string;
  word1: string;
  word2: string;
  word3: string;
  word4: string;
  word5: string;
  word6: string;
  word7: string;
  word8: string;
  word9: string;
  word10: string;
  word11: string;
  word12: string;
}

interface FormPassphrase {
  passphrase: string;
}

const EnterMnemonics = () => {
  const [formData, setFormData] = useState<FormData>({
    word1: '',
    word2: '',
    word3: '',
    word4: '',
    word5: '',
    word6: '',
    word7: '',
    word8: '',
    word9: '',
    word10: '',
    word11: '',
    word12: '',
  });

  const [showForm, setShowForm] = useState<boolean>(false);

  const [encryptedpassphrase, setEncryptedPassphrase] = useState<FormPassphrase>({
    passphrase: '',
  });

  const [showenterPassphrase, setShowEnterPassphrase] = useState<boolean>(true);

  const [sendToEnterPassPhrase, setSendToEnterPassPhrase] = useState<boolean>(false);

  const navigate = useNavigate();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const changeHandlerPassphrase = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEncryptedPassphrase({ passphrase: value });
  };

  function buttonHandlerMnemonic(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    const stringFormData = Object.values(formData).join(' ');
    console.log(stringFormData);

    // Encrypt mnemonic using CryptoJS.AES.encrypt
    const encryptedMnemonic = CryptoJS.AES.encrypt(stringFormData, encryptedpassphrase.passphrase).toString();
    localStorage.setItem('encryptedMnemonic', encryptedMnemonic);

    console.log('Encrypted Mnemonic:', encryptedMnemonic);

    setSendToEnterPassPhrase(true);
  }

  return !sendToEnterPassPhrase ? (
    <div>
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-4 p-4">
          {showenterPassphrase && (
            <div>
              <p className='font-bold text-3xl mx-4'>Set passphrase</p>
              <br></br>
              <input
                type="text"
                placeholder="Passphrase"
                name="passphrase"
                value={encryptedpassphrase.passphrase}
                onChange={changeHandlerPassphrase}
                className='border border-gray-300 rounded h-9 w-75 placeholder: px-2 mx-5 mb-2'
              />
              <button
                onClick={() => {
                  setShowEnterPassphrase(false);
                  setShowForm(true);
                }}

                className='bg-blue-600 text-white py-2 px-4 rounded-lg'
              >
                Submit
              </button>
            </div>
          )}
          
          {showForm && (
            <div>
              <p className="font-bold text-3xl flex justify-center my-9">Enter mnemonics</p>
              <div className="grid grid-cols-3 gap-4">
                {[...Array(12)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-center p-4 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    name={`word${index + 1}`}
                    value={formData[`word${index + 1}` as keyof FormData]}
                    onChange={changeHandler}
                    placeholder={`Word ${index + 1}`}
                  />
                ))}
              </div>


              <div className='flex justify-center my-9'>
              <button onClick={(e) => buttonHandlerMnemonic(e)}
                      className='bg-blue-600 text-white py-2 px-4 rounded-lg'
                >Submit Words</button>
                </div>


            </div>
          )}
        </div>
      </div>
    </div>
  ) : (<EnterPassPhrase />)
};

export default EnterMnemonics;
