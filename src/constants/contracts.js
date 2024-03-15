import { ethers } from "ethers";
import erc721 from "./erc721.json";

export const getProposalsContract = (providerOrSigner) =>
  new ethers.Contract(
    import.meta.env.VITE_ballot_contract_address,
    erc721,
    providerOrSigner
  );
