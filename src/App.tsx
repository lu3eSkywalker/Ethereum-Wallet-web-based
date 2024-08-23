import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Wallet from './components/Wallet';
import Mnemonics from './components/Mnemonics';
import SendingEth from './components/SendingEth';
import FetchEthBal from './components/FetchEthBal';
import Home from './components/Home';
import EthereumWallet2 from './components/EthereumWallet2';
import Design from './components/Tailwind/Design';
import EnterMnemonics from './components/EnterMnemonics';
import EnterPassPhrase from './components/EnterPassPhrase';
import MakeAPassphrase from './components/MakeAPassphrase';
import Accordian from './components/Tailwind/Accordian';

const App = () => {
  const [encryptedMnemonicExists, setEncryptedMnemonicExists] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const encryptedMnemonic = localStorage.getItem('encryptedMnemonic');
    
    if (location.pathname === '/' || location.pathname === '/localstorage:5173') {
      if (encryptedMnemonic) {
        setEncryptedMnemonicExists(true);
        navigate('/enterpassphrase');
      } else {
        navigate('/home');
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/mnemonics' element={<Mnemonics />} />
        <Route path='/sendingeth' element={<SendingEth />} />
        <Route path='/fetchethbal' element={<FetchEthBal />} />
        <Route path='/ethwallet2' element={<EthereumWallet2 />} />
        <Route path='/design' element={<Design />} />
        <Route path='/entermnemonics' element={<EnterMnemonics />} />
        <Route path='/enterpassphrase' element={<EnterPassPhrase />} />
        <Route path='/setpassphrase' element={<MakeAPassphrase />} />

        <Route path='/accordion' element={<Accordian />} />
      </Routes>
    </div>
  );
};

export default App;
