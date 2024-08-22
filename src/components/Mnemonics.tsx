import React, { useState } from 'react';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';
import { Buffer } from 'buffer';
import CryptoJS from 'crypto-js';
import EthereumWallet from './EthereumWallet';
import EthereumWallet2 from './EthereumWallet2';
import EnterPassPhrase from './EnterPassPhrase';


// Polyfill Buffer globally
if (!window.Buffer) {
    window.Buffer = Buffer;
  }

const Mnemonics = ({passkey}: any) => {
    const [mnemonic, setMnemonic] = useState<string>("");

    const [generatePhrase, setGeneratePhrase] = useState<boolean>(false);
    const [showGenerateMnemonics, setShowGenerateMnemonics] = useState<boolean>(true);


    const [showmnemonicsPage, setShowMnemonicsPage] = useState<boolean>(true);

  function generateMnemonics() {

    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
    const seed = mnemonicToSeedSync(mnemonic);

    console.log("Mnemonic:", mnemonic);
    console.log("Seed (hex):", seed.toString('hex'));

    const encryptedMnemonic = CryptoJS.AES.encrypt(mnemonic, passkey).toString();
    localStorage.setItem('encryptedMnemonic', encryptedMnemonic);
  }

  return showmnemonicsPage ? (
<>
              <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
                <div className='flex flex-col items-center space-y-4 p-4'>
                {showGenerateMnemonics && (
                  <div>
                      <button
                        onClick={() => {
                          generateMnemonics();
                          setGeneratePhrase(true);
                          setShowGenerateMnemonics(false);
                        }}
                        
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                        Generate
                      </button>
                    </div>
                  )}


                      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
                        <div className="text-center">
                          <h2 className="text-2xl font-semibold">Your Mnemonic Phrase</h2>
                          <p className="text-sm text-gray-500">Please store this safely!</p>
                        </div>

                              {
                                generatePhrase && (
                                
                                <div className="grid grid-cols-3 gap-4">

                                    {mnemonic.split(' ').map((word, index) => (
                                      <div
                                        key={index}
                                        className="bg-gray-100 border border-gray-300 text-center p-4 rounded-lg text-lg font-semibold"
                                      >{word}
                                      </div> ))}
                                </div>
                                )}
                      </div>

                      {
                generatePhrase && 
                    <button onClick={() => {
                      setShowMnemonicsPage(false);
                    }}
                            className='bg-blue-600 text-white py-2 px-4 rounded-lg'
                    >Generate Wallet
                    </button>

                      }



                </div>
              </div>
</>

  ) : (
    <EnterPassPhrase />
  )
};

export default Mnemonics;