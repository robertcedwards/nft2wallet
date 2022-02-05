import React from 'react';
import styles from '../styles/Home.module.css'
import { Moralis }  from "moralis";
import { NFT } from "../@types/types"

type Props = {};
type State = {
  shouldFetchTheNFT: boolean,
  nft: NFT | null,
  cachedImageURL: string | null
};

export class NFTVerificator extends React.Component<Props, State> {
  state: Readonly<State> = {
    shouldFetchTheNFT: true,
    nft: null,
    cachedImageURL: null
  }

  async loadTheNFTIfNeeded() {
    if (!this.state.shouldFetchTheNFT) {
      return
    }

    // TODO: Get the chain, NFT's address and wallet address from the hash/query params (I don't know yet how we'll do that)
    // FIXME: Verify that the hash/params were signed with the private key of the NFT owner
    const chain: "polygon" | "eth" = "polygon"
    const options = {
      chain: chain,
      address: "0x216f927a2f13CE1ab8ea00d6377dCd51Ce2E6f23",
      token_addresses: ["0x2953399124f0cbb46d2cbacd8a89cf0599974963"]

    }
    const results = await Moralis.Web3API.account.getNFTs(options)
    const nft = results.result?.[0] || null
    this.setState({
      shouldFetchTheNFT: false,
      nft: results.result?.[0] || null
    })

    // TODO: move the code fetching NFT images to a helper function
    if (nft?.token_uri) {
      fetch(nft.token_uri, {method: 'GET'})
      .then(response => {
        response.json().then(json => {
          if (json.image) {
            this.setState({
              ...this.state,
              cachedImageURL: json.image
            })
          }
        })
      })
      .then(data => console.log(data))
      .catch(error => console.log(error));
    }
  }

  render(): React.ReactNode {
    this.loadTheNFTIfNeeded()
    return (
      <div>
        {this.state.shouldFetchTheNFT ? 
          <p>fetching the NFT</p>
        :
          this.state.nft ? 
            <p>{this.state.nft?.name}</p>
          :
            <p> Couln't fetch the NFT </p>
        }
      </div>
    );
  }
}