import React, { useState } from 'react';
import { mnemonicToSeed } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';

interface EthereumWalletProps {
    mnemonic: string;
}

const EthereumWallet: React.FC<EthereumWalletProps> = ({ mnemonic }) => {
    const [showPrivateKey, setShowPrivateKey] = useState<string>('');
    const [addresses, setAddresses] = useState<string[]>([]);
    const [privateKeys, setPrivateKeys] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const generateWallet = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        try {
            const seed = await mnemonicToSeed(mnemonic);
            const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);

            console.log(privateKey);
            setShowPrivateKey(privateKey);
            setAddresses((prevAddresses) => [...prevAddresses, wallet.address]);
            setPrivateKeys((prevPrivateKeys) => [...prevPrivateKeys, privateKey]);
        } catch (error) {
            console.error("Error generating wallet:", error);
        }
    };

    return (
        <div>
            <button
                onClick={(e) => {
                    generateWallet(e);
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                }}
            >
                Generate Wallet
            </button>

            <div>
                {privateKeys.map((p, index) => (
                    <div key={index}>
                        <p>Private Key: {p}</p>
                        <p>Ethereum Address: {addresses[index]}</p>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EthereumWallet;
