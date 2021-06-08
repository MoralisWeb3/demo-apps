import { useCallback, useEffect, useState } from "react";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import abi from "./abi.json";

const Property = Moralis.Object.extend("Property");
export const REGISTRY_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

export const useRegistryContract = () => {
  const { isAuthenticated, isInitialized, enableWeb3, web3 } = useMoralis();
  const [registryContract, setRegistryContract] = useState();

  useEffect(() => {
    if (isInitialized && isAuthenticated && web3) {
      const setContract = () => {
        const contract = new web3.eth.Contract(abi, REGISTRY_ADDRESS);
        setRegistryContract(contract);
      };
      if (!web3.currentProvider) {
        enableWeb3().then(setContract);
      } else {
        setContract();
      }
    }
  }, [isInitialized, isAuthenticated, enableWeb3, web3]);

  const saveNftMetaData = useCallback(
    async ({
      titleFile,
      physAddress,
      // salePrice,
    }) => {
      const nftFile = new Moralis.File("nftFile.pdf", titleFile);
      await nftFile.saveIPFS();
      await nftFile.save();

      const nftFilePath = nftFile.ipfs();

      const metadata = {
        name: physAddress,
        description: "Land Registry Property",
        image: nftFilePath,
      };

      const ipfsFile = new Moralis.File("metadata.json", {
        base64: btoa(JSON.stringify(metadata)),
      });
      await ipfsFile.saveIPFS();
      console.log("saved to IPFS:", ipfsFile);

      return { ipfsFile, metadata };
    },
    []
  );

  const mintNft = useCallback(
    async (ifpsHash, toAddress) => {
      const result = await registryContract.methods
        .mint(ifpsHash, toAddress)
        .send({ from: window.ethereum.selectedAddress });
      return result;
    },
    [registryContract]
  );

  const savePropertyToDb = useCallback((attributes, data) => {
    const { name, image } = data.metadata;
    const { ownerEthAddress, salePrice } = attributes;

    const property = new Property();
    property.set("ipfs_hash", data.ipfsFile.ipfs());
    property.set("physical_address", name);
    property.set("title", image);
    property.set("sale_price", +salePrice);
    property.set("owner_eth_address", ownerEthAddress);

    return property.save();
  }, []);

  const newProperty = useCallback(
    async (attributes) => {
      const data = await saveNftMetaData(attributes);
      console.log("newProperty:: ipfs path", data.ipfsFile.ipfs());

      await mintNft(data.ipfsFile.hash(), attributes.ownerEthAddress);
      const newProperty = await savePropertyToDb(attributes, data);
      return newProperty;
    },
    [mintNft, saveNftMetaData, savePropertyToDb]
  );

  const transfer = async () => {};

  return { registryContract, newProperty, transfer };
};
