import { ethers } from "ethers";
import erc721 from "../constants/erc721.json";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useMintNft = (tokenId) => {
  console.log("looking for me? :", tokenId);
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const estimatedGas = ethers.parseUnits("0.01", 18);

    console.log(signer, readWriteProvider);

    const contract = new ethers.Contract(
      import.meta.env.VITE_contract_address,
      erc721,
      signer
    );

    try {
      console.log("trying 1", tokenId);
      const mint = await contract.safeMint(signer.address, tokenId, {
        value: estimatedGas,
      });
      console.log("trying 2");

      const receipt = await mint.wait();
      console.log("trying 3");

      if (receipt.status) {
        return console.log("mint Successfully");
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }, [tokenId, chainId, walletProvider]);
};
export default useMintNft;
