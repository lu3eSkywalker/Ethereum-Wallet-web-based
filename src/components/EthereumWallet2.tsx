import React, { ChangeEvent, useEffect, useState } from 'react';
import { mnemonicToSeed } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';
import CryptoJS from 'crypto-js';
import FetchEthBal from './FetchEthBal';
import SendingEth from './SendingEth';

const EthereumWallet2 = ({encryptedpassphrase}: any) => {
    const [mnemonic, setMnemonic] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');
    const [ethAddress, setEthAddress] = useState<string>('');
    const [showSendForm, setShowSendForm] = useState<boolean>(true);
    const [showNftBar, setShowNftBar] = useState<boolean>(false);

    const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);
    const [showDifferetAccount, setShowDifferentAccount] = useState<boolean>(false);

    const [ethereumAccountSelected, setEthereumAccountSelected] = useState(null);

    const [account, setAccount] = useState<number>(0);

    const [activebutton, setActiveButton] = useState(null);


    useEffect(() => {
        const encryptedMnemonic = localStorage.getItem('encryptedMnemonic');

        if (encryptedMnemonic) { 
            const bytes = CryptoJS.AES.decrypt(encryptedMnemonic, encryptedpassphrase.passphrase);
            const decryptedMnemonic = bytes.toString(CryptoJS.enc.Utf8);
            setMnemonic(decryptedMnemonic); // Set the mnemonic here
            // console.log("Decrypted Mnemonic:", decryptedMnemonic);
        } else {
            // console.log("No encrypted mnemonic found in localStorage.");
        }
    }, [encryptedpassphrase.passphrase]);

    useEffect(() => {
        if (mnemonic) {
            generateWallet(); // Call generateWallet when mnemonic is set
        }
    }, [mnemonic]);


    const generateWallet = async (): Promise<void> => {
        try {
            const seed = await mnemonicToSeed(mnemonic);
            // const derivationPath = `m/44'/60'/0'/0/0`;
            const derivationPath = `m/44'/60'/${account}'/0/0`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);

            // console.log(privateKey);
            setPrivateKey(privateKey);
            setEthAddress(wallet.address); // Set the Ethereum address
        } catch (error) {
            console.error("Error generating wallet:", error);
        }
    };

    // const generateMultipleWallet = async(index: any): Promise<void> => {
    //     try {
    //         const seed = await mnemonicToSeed(mnemonic);
    //         // const derivationPath = `m/44'/60'/${index}'/0/0`;
    //         const derivationPath = `m/44'/60'/${index}'/0/0`;
    //         const hdNode = HDNodeWallet.fromSeed(seed);
    //         const child = hdNode.derivePath(derivationPath);
    //         const privateKey = child.privateKey;
    //         const wallet = new Wallet(privateKey);
    //         console.log("This is the fucking private Key", privateKey);
    //     }
    //     catch (error) {
    //         console.error("Error generating wallet:", error);
    //     }
    // }

    const handleClick = (button: any) => {
        setActiveButton(button);
    }

    const handleAccountClick = (button: any) => {
        setEthereumAccountSelected(button);
    }

    useEffect(() => {
        handleAccountClick(0);
    }, [])

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">

                {/* User Info */}
                <div className="flex items-center space-x-4">
                    <div className="bg-purple-500 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center">S</div>
                    <div>
                        <h2 className="text-xl font-semibold">Welcome back!</h2>
                        <p className="text-sm text-gray-500">Ethereum Account Assets</p>
                    </div>
                </div>

                {/* Balance */}
                <div className="text-center space-y-2">
                    <h3 className="text-4xl font-bold">
                        {ethAddress && <FetchEthBal ethAddress={ethAddress} />}
                        <span className="text-xl text-gray-500">ETH</span>
                    </h3>
                    <p className="text-sm text-gray-500">Your Wallet Address {ethAddress}</p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-4 gap-2">
                    <button className={` ${activebutton === 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} text-gray-700 py-2 rounded-lg`}
                            onClick={() => {
                                setShowSendForm(true)
                                setShowNftBar(false)
                                setShowPrivateKey(false)
                                setShowDifferentAccount(false)
                                handleClick(1)
                            } }
                    >
                        Send
                    </button>

                    <button className={`${activebutton === 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} text-gray-700 py-2 rounded-lg`}
                            onClick={() => {
                                setShowPrivateKey(true)
                                setShowNftBar(false)
                                setShowSendForm(false)
                                setShowDifferentAccount(false)
                                handleClick(3)
                            }}
                    >Private Key</button>

                    <button className={`${activebutton === 4 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} text-gray-700 py-2 rounded-lg`}
                            onClick={() => {
                                setShowDifferentAccount(true)
                                setShowSendForm(false)
                                setShowNftBar(false)
                                setShowPrivateKey(false)
                                handleClick(4)
                            }}
                    >Accounts</button>


                    <button className={`${activebutton === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} text-gray-700 py-2 rounded-lg`}
                    onClick={() => {
                        setShowNftBar(true)
                        setShowSendForm(false)
                        setShowPrivateKey(false)
                        setShowDifferentAccount(false)
                        handleClick(2)
                    }}
                    >NFTs</button>
                </div>

                {showPrivateKey && (
                    <div>
                        <div className='border-b border-gray-200'>
                        </div>

                                <div className='text-center py-6'>
                                    <div className="bg-gray-100 border rounded-lg p-4 max-w-full overflow-x-auto inline-block">
                                        <code className="break-all">{privateKey}</code>
                                    </div>
                                </div>
                    </div>
                )}


                {showDifferetAccount && (
                    <div>
                        <div className='border-b border-gray-200'>
                        </div>
                        <div className='text-center py-6'>

                                    {/* <div className="bg-gray-100 border rounded-lg p-4 max-w-full overflow-x-auto block mb-4"> */}
                                    <div className={`${ethereumAccountSelected === 0 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} border rounded-lg p-4 max-w-full overflow-x-auto block mb-4`}>
                                        <button onClick={() => {
                                            setAccount(0);
                                            generateWallet();
                                            handleAccountClick(0);
                                        }} className="break-all">Wallet 1</button>
                                    </div>

                                    <div className={`${ethereumAccountSelected === 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} border rounded-lg p-4 max-w-full overflow-x-auto block mb-4`}>
                                        <button onClick={() => {
                                            console.log('Ethereum Wallet 1');
                                            setAccount(1);
                                            generateWallet();
                                            handleAccountClick(1);
                                        }} className="break-all">Wallet 2</button>
                                    </div>

                                    <div className={`${ethereumAccountSelected === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} border rounded-lg p-4 max-w-full overflow-x-auto block`}>
                                        <button onClick={() => {
                                            setAccount(2);
                                            generateWallet();
                                            handleAccountClick(2);
                                        }} className="break-all">Wallet 3</button>
                                    </div>

                                    </div>

                                </div>
                )}


                {showSendForm && <SendingEth/>}

                {
                    showNftBar && 
                    <div>               
                    <div className="border-b border-gray-200">
                    <ul className="flex text-sm font-medium text-gray-500 space-x-4">
                        <li className="border-b-2 border-blue-600 pb-2">Tokens</li>
                        <li className="pb-2">NFTs</li>
                        <li className="pb-2">Activity</li>
                    </ul>
                    </div>
        
                    <div className="text-center py-6">
                        <p className="text-gray-500">You don't have any assets yet!</p>
                        <p className="text-gray-500">Start by buying or depositing funds:</p>
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4">+ Add Funds</button>
                    </div></div>
                }

            </div>
        </div>
    );
};

export default EthereumWallet2;