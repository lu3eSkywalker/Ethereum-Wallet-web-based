import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ethers } from 'ethers';

interface FormData {
    ethAddress: string,
    eth: string,
    privateKey: string
}

const SendingEth = () => {
    const [formData, setFormData] = useState<FormData>({
        ethAddress: '',
        eth: '',
        privateKey: ''
    });

    const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    };

    function buttonHandler(event: FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log(formData);
    }

    async function sendEth(event: FormEvent<HTMLButtonElement>) {
        event.preventDefault();

        const api_key = import.meta.env.VITE_API_KEY

        const provider = new ethers.JsonRpcProvider(api_key);


        const wallet = new ethers.Wallet(formData.privateKey, provider);

        try {
            const tx = {
                to: formData.ethAddress,
                value: ethers.parseEther(formData.eth)
            }
            // Send the transaction
            const transactionResponse = await wallet.sendTransaction(tx);
            console.log("Transaction hash: ", transactionResponse.hash);

            // Wait for the transation to be mined
            const receipt = await transactionResponse.wait();
            console.log("Transaction mined:", receipt);
        }
        catch(error) {
            console.log("Error sending transaction: ", error);
        }
    }

  return (
    <div>

    <div className='border-b border-gray-200'></div>
            <div className='flex flex-col items-center space-y-4 p-4'>
        <p>
            
            <br></br>

            <label className='font-black'>Rec.'s Eth Add: </label> 
            <input 
                        type='text'
                        placeholder='Ethereum Address'
                        name='ethAddress'
                        onChange={changeHandler}
                        value={formData.ethAddress}
                        className='border border-gray-300 rounded h-9 w-75 placeholder: px-2 mb-2'
            />

            <br></br>

        <label className='font-black'>Enter Eth:  </label> 
            <input 
                        type='number'
                        placeholder='Ethereum'
                        name='eth'
                        onChange={changeHandler}
                        value={formData.eth}
                        className='border border-gray-300 rounded h-9 w-75 placeholder: px-2 mb-2'
            />

            <br></br>

            <label className='font-black'>Enter Private Key:   </label> 
            <input 
                        type='text'
                        placeholder='Private Key'
                        name='privateKey'
                        onChange={changeHandler}
                        value={formData.privateKey}
                        className='border border-gray-300 rounded h-9 w-75 placeholder: px-2 mb-2'
            />
        </p>

        <button 
        className='bg-blue-600 text-white py-2 px-3 rounded-lg'
        onClick={(e) => sendEth(e)}>
            Send Eth
        </button>
    </div>
    </div>

  )
}

export default SendingEth