import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Wallet from './components/Wallet';
import Mnemonics from './components/Mnemonics';


const App = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Routes>
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/mnemonics' element={<Mnemonics />} />
      </Routes>
    </div>
  )
}

export default App