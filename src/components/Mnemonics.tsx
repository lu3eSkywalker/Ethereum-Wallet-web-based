import React, { useState } from 'react';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';
import { Buffer } from 'buffer';
import CryptoJS from 'crypto-js';
import EthereumWallet from './EthereumWallet';


// Polyfill Buffer globally
if (!window.Buffer) {
    window.Buffer = Buffer;
  }

const Mnemonics = () => {

    const [mnemonic, setMnemonic] = useState<string>("");

  function generateMnemonics(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
    const seed = mnemonicToSeedSync(mnemonic);

    console.log("Mnemonic:", mnemonic);
    console.log("Seed (hex):", seed.toString('hex'));

    const passkey = "Hello There";

    const encryptedMnemonic = CryptoJS.AES.encrypt(mnemonic, passkey).toString();
    localStorage.setItem('encryptedMnemonic', encryptedMnemonic);
  }

  return (
    <>
      <h2>Generate Mnemonics</h2>
      <button onClick={generateMnemonics}>Generate</button>

      <div>
        <p>{mnemonic}</p>
      </div>

      {mnemonic && <EthereumWallet mnemonic={mnemonic} />}
    </>
  );
};

export default Mnemonics;