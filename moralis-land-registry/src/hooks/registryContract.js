import { useCallback, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import abi from "./abi.json";

const REGISTRY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const useRegistryContract = () => {
  const { Moralis, web3, isInitialized } = useMoralis();
  const [registryContract, setRegistryContract] = useState();

  useEffect(() => {
    if (isInitialized) {
      const contract = new web3.eth.Contract(abi, REGISTRY_ADDRESS);
      console.log('contract:', contract);
      setRegistryContract(contract);
    }
  }, [isInitialized, web3.eth.Contract]);

  const saveNftMetaData = useCallback(async ({
    titleFile,
    physAddress,
    // salePrice,
  }) => {
    const nftFile = new Moralis.File("nftFile.jpg", titleFile);
    await nftFile.saveIPFS();

    const nftFilePath = nftFile.ipfs();

    const metadata = {
      name: physAddress,
      description: "Land Registry Property",
      image: nftFilePath,
    };

    const nftFileMetadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });
    await nftFileMetadataFile.saveIPFS();
    console.log("saved to IPFS:", nftFileMetadataFile);

    return nftFileMetadataFile.hash();
  }, [Moralis]);

  const mintNft = useCallback(async (ifpsHash, toAddress) => {
    const result = await registryContract.methods.mint(ifpsHash, toAddress).send({from: window.ethereum.selectedAddress});
    return result;
  }, [registryContract]);

  const newProperty = useCallback( async (attributes) => {
    const metadataIpfsPath = await saveNftMetaData(attributes);
    console.log("newProperty:: ipfs path", metadataIpfsPath);
    return mintNft(metadataIpfsPath, attributes.ownerEthAddress);
  }, [mintNft, saveNftMetaData]);

  const transfer = async () => {};

  return { registryContract, newProperty, transfer };
};
