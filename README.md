# NFT Forest

## Sponsor Tech Components and links to the codes
- Chainlink: Chainlink VRF is used to generate rebate after purchasing        [(Link)](https://github.com/RLNYC/nftforest/blob/submission/contracts/TreeNFTMarketplace.sol#L9)
- Polygon: Dapp is deployed to Polygon Testnet        [(Link)](https://mumbai.polygonscan.com/address/0x570e2379CaaF633e399e67f953891458C4bd8Bf2)
- IPFS: Use Pinata to store images and Off-chain data of tree on IPFS        [(Link)](https://github.com/RLNYC/nftforest/blob/submission/src/components/NFTTokenIds.jsx#L125)
- Moralis: Use Moralis login and SDK to interact with smart contract         [(Link)](https://github.com/RLNYC/nftforest/blob/submission/src/providers/MoralisDappProvider/MoralisDappProvider.js)
- Covalent: Obtain user wallet data           [(Link)](https://github.com/RLNYC/nftforest/blob/submission/src/components/ForestMap.jsx#L59)

# 🚀 Quick Start

📄 Clone or fork this repo:
```
💿 Install all dependencies:
```sh
cd ethereum-nft-marketplace-boilerplate
yarn install 
```
✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)) 
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

🔎 Locate the MoralisDappProvider in `src/providers/MoralisDappProvider/MoralisDappProvider.js` and paste the deployed marketplace smart contract address and ABI
```jsx
const [contractABI, setContractABI] = useState();
const [marketAddress, setMarketAddress] = useState();
```

🚴‍♂️ Run your App:
```sh
yarn start
```

