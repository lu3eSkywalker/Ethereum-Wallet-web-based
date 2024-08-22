import React, { useEffect, useState } from 'react'

const FetchEthBal = ({ethAddress}: any) => {
    const [balance, setBalance] = useState<number>();

    useEffect(() => {
        if (ethAddress) {
          sendjsonRPC();
        }
      }, [ethAddress]);


    const sendjsonRPC = async () => {

        const formData = {
            "jsonRPC": "2.0",
            "id": 1,
            "method": "eth_getBalance",
            "params": [ethAddress, "latest"]
        }

    const APIKEY = import.meta.env.VITE_API_KEY;

        console.log(formData)
        try {
            const savedUserResponse = await fetch(
                `${APIKEY}`, { 

                    method: "POST",
                    body: JSON.stringify(formData)
                });

            const response = await savedUserResponse.json();
            // console.log(response.result)

            convertHexadecimal(response.result);
        }
        catch (error) {
            console.log('Error: ', error);
          }
    }

    const convertHexadecimal = async(weiEther: string) => {

        const remove0x = weiEther.substring(2,);

        const weiToEth = parseInt(remove0x, 16) / Math.pow(10, 18);
        console.log(weiToEth)

        setBalance(weiToEth);
    }

  return (
    <div>
        {balance}
    </div>
  )
}

export default FetchEthBal;