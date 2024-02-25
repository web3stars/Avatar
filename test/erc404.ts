
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
// AvatarToken deployed to: 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
// ERC404FactoryProxyAdmin deployed to: 0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6
// CircleQueue deployed to: 0x8A791620dd6260079BF849Dc5567aDC3F2FdC318
// ERC404FactoryProxy deployed to: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
// AvatarToken deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// ERC404FactoryProxyAdmin deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// CircleQueue deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
// ERC404FactoryProxy deployed to: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
export const erc404Test = async function () {
    const ExampleToken = await ethers.getContractFactory("AvatarToken");
    const exampleToken = await ExampleToken.attach("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");
    console.log(await exampleToken.tokenURI(0));
    console.log(await exampleToken.owner())
    console.log(await exampleToken.name())
    console.log(await exampleToken.balanceOfNFT("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
    console.log("getPrice", await exampleToken.getPrice(1))
    console.log("\n");
    console.log(await exampleToken.setDataURI('https://bafkreic44meqhl7xuxi4t3q2gofbdcxfbzb3xizzhwn2mh3n256zlqtstu.ipfs.nftstorage.link'));
    console.log(await exampleToken.setLockTime(1708473600));

    //console.log(await exampleToken.setDataURI('https://bafybeic4of7matwwemjrki4etixgoo5qz2mdwjc2hm32xil4alzeeafuzy.ipfs.nftstorage.link'))
    console.log(await exampleToken.paused());
    console.log(await exampleToken.unpause());
    console.log(await exampleToken.paused());
  
    //await exampleToken.transfer("0x3195f2bF24B8cf96b446591C124e82455787bBC6", BigNumber.from("80000000"))
  
    //generate random ethereum addresses
    let addresses = ['0xA6B68F4216C44E9A604176F01297F4FFFC595EAC',
      '0xEA0616AF18E0CF0895C5E90FA1F2B9AE246A7530',
      '0x34E20DCA8D32AFBE60517102025EE0C5A0C6EF32',
      '0x98B25675B1B70A37AC24CA0FEF91CFAC82C4053F',
      '0x9195BBB3C696429EB702A0DE4195D2D858EB2495',
      '0x2782ECC10193EF336475C2EC96E24AD49E920AA2',
      '0xEF787A9DD119272BADB4F2F04213FFC9E88659D3',
      '0x1FB335B37E357E887CD9B1E764EB7FE1B54F952E',
      '0xE4DC40870F7177E1F1C29D9EE16B67BB01968E8B',
      '0x513CB3CFE19197B84BCBB9A9A757D313D79D44C9',
      // "0x3195f2bF24B8cf96b446591C124e82455787bBC6"
    ];
  
    let addresses2 = ['0x73EB7509827C13AABF8294D9AB6337676E5CB1ED',
      '0x499B17B3578BEEF4D8BFB6A3038C3C0A0AB115EA',
      '0xFF1E7FC7D2C2B16678B03F0DFE2FD1DB2B5E71E5',
      '0xDEDFAB86DB32FC15ED0D1205A3E82CF84BE626B9',
      '0x06D190ED7B2E6A0F9D3B9FA77210DD53CBCE9846',
      '0xA9CBC98F27106AF9171BCA7D85732753ADFD810E',
      '0xEDF37CD94F2AA93A5C48D2BE910EE6E4B4190433',
      '0x6A868F76C887BD0435133FEE0ADC2F0F49C41BF4',
      '0xBD3F684FD242413C1236EA89D4A63A44C21C32E7',
      '0xE0051B2D7A72C68E2F3CBF20F464E2B9BAE9E624'];
    //await exampleToken.transfer('0x513CB3CFE19197B84BCBB9A9A757D313D79D44C9', BigNumber.from("100000000"))
    //await exampleToken.transfer('0x3195f2bF24B8cf96b446591C124e82455787bBC6', BigNumber.from("100000000"))
    // await exampleToken.transfer('0xBD3F684FD242413C1236EA89D4A63A44C21C32E7', BigNumber.from("10000000"))
    // for (let i = 0; i < addresses.length; i++) {
    //    await exampleToken.transfer(addresses[i], BigNumber.from("10000000"))
    // }
    //  for (let i = 0; i < addresses2.length; i++) {
    //    await exampleToken.transfer(addresses2[i], BigNumber.from("10000000"))
    // }
    const CircleQueue = await ethers.getContractFactory("CircleQueue");
    const circleQueue = await CircleQueue.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
  
    console.log("Queue Size", await circleQueue.size())
    console.log("Queue Empty", await circleQueue.isEmpty())
  
    // for (let i = 0; i < 20; i++) {
    //   console.log(await exampleToken.mint({ value: BigNumber.from("10100000000000000") }))
    //   //console.log(await exampleToken.mint())
    // }
  
    //console.log(await exampleToken.setTokenURI("https://bafybeicnx7q75tpj4uocomgktjjhlz3s752ouzpltpqklfaeoepjlfxydi.ipfs.nftstorage.link/"))
    //await exampleToken.mint()
  
    console.log(await exampleToken.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
    console.log(await exampleToken.balanceOfNFT("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
  
  
    console.log(await exampleToken.balanceOf("0x3195f2bF24B8cf96b446591C124e82455787bBC6"))
    console.log(await exampleToken.balanceOfNFT("0x3195f2bF24B8cf96b446591C124e82455787bBC6"))
  
  
    console.log(await exampleToken.balanceOf("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"))
    console.log(await exampleToken.balanceOfNFT("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"))
  
  
    for (let i = 0; i < addresses.length; i++) {
      console.log(addresses[i], await exampleToken.balanceOf(addresses[i]))
      console.log(addresses[i], await exampleToken.balanceOfNFT(addresses[i]))
    }
    for (let i = 0; i < addresses2.length; i++) {
      console.log(addresses2[i], await exampleToken.balanceOf(addresses2[i]))
      console.log(addresses2[i], await exampleToken.balanceOfNFT(addresses2[i]))
    }
    // console.log(await exampleToken.totalSupply())
  
    // console.log(await cryptoPets.generateSVG(4));
  
  };