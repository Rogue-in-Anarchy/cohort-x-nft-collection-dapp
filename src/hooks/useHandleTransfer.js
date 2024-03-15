import { ethers } from "ethers";
import erc721 from "../constants/erc721.json";
import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { isAddress } from "ethers";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useTransferNft = (address, edition) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    if (!isAddress(address)) return console.error("Invalid address");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = new ethers.Contract(
      import.meta.env.VITE_contract_address,
      erc721,
      signer
    );

    try {
      //   const estimatedGas = await contract.TransferNft.estimateGas(address);
      // console.log("estimatedGas: ", estimatedGas);

      // const feeData = await readWriteProvider.getFeeData();

      // console.log("feeData: ", feeData);

      // const gasFee = estimatedGas * feeData.gasPrice;

      // console.log("estimated: ", gasFee);

      console.log("I work :", signer.address, address, edition);

      const transaction = await contract.safeTransferFrom(
        signer.address,
        address,
        edition
      );
      console.log("I worked next");
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return console.log("TransferNft successful!");
      }

      console.log("TransferNft failed!");
    } catch (error) {
      console.error("error: ", error);
    }
  }, [address, edition, chainId, walletProvider]);
};

export default useTransferNft;
