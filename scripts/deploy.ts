// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// import { ethers } from "hardhat";

// async function main() {
//   // Hardhat always runs the compile task when running scripts with its command
//   // line interface.
//   //
//   // If this script is run directly using `node` you may want to call compile
//   // manually to make sure everything is compiled
//   // await hre.run('compile');

//   // We get the contract to deploy
//   const Greeter = await ethers.getContractFactory("Greeter");
//   const greeter = await Greeter.deploy("Hello, Hardhat!");

//   await greeter.deployed();

//   console.log("Greeter deployed to:", greeter.address);
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// AvatarToken deployed to: 0x7E3ED65B5045758ae7c1Ab0937a7111E570D6B96
// ERC404FactoryProxyAdmin deployed to: 0x1cE63c8eC5fACf68CbB3db0FdbcFaBeCa8bDaA5D
// CircleQueue deployed to: 0x2a044F8bABDC0Ba90A05b479E3eDD7bb29f15013
//ERC404FactoryProxy deployed to: 0x94c738180d4B042C6b18Bbb64E241A270e790564

import { ethers } from "hardhat";
import { Interface } from "ethers/lib/utils";
import { abi as AvatarTokenABI } from '../artifacts/contracts/AvatarToken.sol/AvatarToken.json';
import { abi as BAYCExTokenABI } from '../artifacts/contracts/BAYCExToken.sol/BAYCExToken.json';
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
async function main() {
  const AvatarToken = await ethers.getContractFactory("AvatarToken");
  const avatarToken = await AvatarToken.deploy();
  await avatarToken.deployed();

  console.log("AvatarToken deployed to:", avatarToken.address);

  //await exampleToken.setTokenURI("https://bafybeidu6fwgdl2j7qdshia2ndanozlidfhxzcfm4zxqlczuaqdmmi6sna.ipfs.nftstorage.link/metadata/")

  //await exampleToken.mint()

  const ERC404FactoryProxyAdmin = await ethers.getContractFactory("ERC404FactoryProxyAdmin");
  const erc404FactoryProxyAdmin = await ERC404FactoryProxyAdmin.deploy();
  await erc404FactoryProxyAdmin.deployed();

  console.log("ERC404FactoryProxyAdmin deployed to:", erc404FactoryProxyAdmin.address);
  const CircleQueue = await ethers.getContractFactory("CircleQueue");
  const circleQueue = await CircleQueue.deploy();
  await circleQueue.deployed();

  await circleQueue.initialize();

  console.log("CircleQueue deployed to:", circleQueue.address);
  //get UnixTimeStamp
  //mint start time is 2024-03-03 20:00:00 UTC+8
  let mintTime = 1709467200;
  //mint time is 14 days
  let time = mintTime + 14*86400;

  let data = new Interface(AvatarTokenABI).encodeFunctionData('initialize', ["CodeMonkes Avatar", "Avatar", 18,0, 8, 10000, circleQueue.address, time]);
  console.log(data);
  const ERC404FactoryProxy = await ethers.getContractFactory("ERC404FactoryProxy");
  const erc404FactoryProxy = await ERC404FactoryProxy.deploy(avatarToken.address, erc404FactoryProxyAdmin.address, data);

  await erc404FactoryProxy.deployed();
  console.log("ERC404FactoryProxy deployed to:", erc404FactoryProxy.address);
  await circleQueue.setAllowedCaller(erc404FactoryProxy.address,true);
  console.log(await avatarToken.owner())
  return;

  const ERC721FactoryProxyAdmin = await ethers.getContractFactory("ERC404FactoryProxyAdmin");
  const erc721FactoryProxyAdmin = await ERC721FactoryProxyAdmin.deploy();
  await erc721FactoryProxyAdmin.deployed();
  console.log("ERC721FactoryProxyAdmin deployed to:", erc721FactoryProxyAdmin.address);



  const BAYCExToken = await ethers.getContractFactory("BAYCExToken");
  const baycexToken = await BAYCExToken.deploy();
  await baycexToken.deployed();

  console.log("BAYCExToken deployed to:", baycexToken.address); 


  const CircleQueueERC721Ex = await ethers.getContractFactory("CircleQueue");
  const circleQueueERC721ex = await CircleQueueERC721Ex.deploy();
  await circleQueueERC721ex.deployed();

  console.log("CircleQueueERC721Ex deployed to:", circleQueueERC721ex.address);
  await circleQueueERC721ex.initialize();

  const CryptoPetsFactory = await ethers.getContractFactory("CryptoPets");
  const cryptoPets = await CryptoPetsFactory.deploy();//cryptoPetToken.address);
  await cryptoPets.deployed();
  console.log("CryptoPets deployed to:", cryptoPets.address);

  let erc721exdata = new Interface(BAYCExTokenABI).encodeFunctionData('initialize', ["BAYCExToken", "BAYCEx", 18, 8, 10000, circleQueueERC721ex.address, cryptoPets.address]);
  const ERC721FactoryProxy = await ethers.getContractFactory("ERC404FactoryProxy");
  const erc721FactoryProxy = await ERC721FactoryProxy.deploy(baycexToken.address, erc721FactoryProxyAdmin.address, erc721exdata);

  await erc721FactoryProxy.deployed();
  console.log("ERC721FactoryProxy deployed to:", erc721FactoryProxy.address);
  await circleQueue.setAllowedCaller(erc721FactoryProxy.address,true);

  //await exampleToken.setTokenURI("https://bafybeidu6fwgdl2j7qdshia2ndanozlidfhxzcfm4zxqlczuaqdmmi6sna.ipfs.nftstorage.link/metadata/")
  //"https://bafybeidu6fwgdl2j7qdshia2ndanozlidfhxzcfm4zxqlczuaqdmmi6sna.ipfs.nftstorage.link/metadata/"

  //await exampleToken.transfer("0x5FbDB2315678afecb367f032d93F642f64180aa3", 1)
 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
