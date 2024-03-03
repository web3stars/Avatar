
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
// No need to generate any newer typings.
// AvatarToken deployed to: 0xc0F115A19107322cFBf1cDBC7ea011C19EbDB4F8
// ERC404FactoryProxyAdmin deployed to: 0xc96304e3c037f81dA488ed9dEa1D8F2a48278a75
// CircleQueue deployed to: 0x34B40BA116d5Dec75548a9e9A8f15411461E8c70
// 0x5ffc30c200000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000271000000000000000000000000034b40ba116d5dec75548a9e9a8f15411461e8c700000000000000000000000000000000000000000000000000000000065f6db400000000000000000000000000000000000000000000000000000000000000011436f64654d6f6e6b65732041766174617200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064176617461720000000000000000000000000000000000000000000000000000
// ERC404FactoryProxy deployed to: 0x07882Ae1ecB7429a84f1D53048d35c4bB2056877
// 0x0000000000000000000000000000000000000000

export const erc404Test = async function () {
    const ExampleToken = await ethers.getContractFactory("AvatarToken");
    const exampleToken = await ExampleToken.attach("0x07882Ae1ecB7429a84f1D53048d35c4bB2056877");
    console.log(await exampleToken.tokenURI(0));
    console.log(await exampleToken.owner())
    console.log(await exampleToken.name())
    console.log(await exampleToken.balanceOfNFT("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
    console.log("getPrice", await exampleToken.MINT_PRICE())
    console.log("\n");

    // console.log(await exampleToken.setDataURI('https://bafkreic44meqhl7xuxi4t3q2gofbdcxfbzb3xizzhwn2mh3n256zlqtstu.ipfs.nftstorage.link'));

    // console.log(await exampleToken.setLockTime(1708473600));
    //console.log(await exampleToken.setTokenURI('https://bafybeib4wdqvvul3ldqfhhwyb5pnxujjdskhx2lp46cr2vzka6zuavi22m.ipfs.nftstorage.link/'));
    //console.log(await exampleToken.setTokenURI(''));
    //console.log(await exampleToken.setTokenURI(''));
    //console.log(await exampleToken.setLockTime(1708473600));
    //Production version
    //https://bafybeide3cudc5id7c76hbndw2xrfcm5aikobgp75cdgqeink7zcn3wooa.ipfs.nftstorage.link/
    //https://bafybeib4wdqvvul3ldqfhhwyb5pnxujjdskhx2lp46cr2vzka6zuavi22m.ipfs.nftstorage.link/1.json
    //console.log(await exampleToken.setDataURI('https://bafybeic4of7matwwemjrki4etixgoo5qz2mdwjc2hm32xil4alzeeafuzy.ipfs.nftstorage.link'))
    console.log(await exampleToken.paused());
  //  console.log(await  exampleToken.clearLock());
  //   console.log(await exampleToken.unpause());
  //   console.log(await exampleToken.paused());
    
    //console.log(await exampleToken.transfer("0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec", BigNumber.from("80000000")))
  
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
      // "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec"
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
    //await exampleToken.transfer('0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec', BigNumber.from("100000000"))
    // await exampleToken.transfer('0xBD3F684FD242413C1236EA89D4A63A44C21C32E7', BigNumber.from("10000000"))
    // for (let i = 0; i < addresses.length; i++) {
    //    await exampleToken.transfer(addresses[i], BigNumber.from("10000000"))
    // }
    //  for (let i = 0; i < addresses2.length; i++) {
    //    await exampleToken.transfer(addresses2[i], BigNumber.from("10000000"))
    // }
    const CircleQueue = await ethers.getContractFactory("CircleQueue");
    const circleQueue = await CircleQueue.attach("0x34B40BA116d5Dec75548a9e9A8f15411461E8c70");
  
    console.log("Queue Size", await circleQueue.size()) 
    console.log("Queue Empty", await circleQueue.isEmpty())
    //console.log(await circleQueue.setAllowedCaller("0x07882Ae1ecB7429a84f1D53048d35c4bB2056877",true));
    //console.log(await avatarToken.owner())
    // for (let i = 0; i < 20; i++) {
    //   console.log(await exampleToken.mint({ value: BigNumber.from("10100000000000000") }))
    //   //console.log(await exampleToken.mint())
    // }
  
    //console.log(await exampleToken.setTokenURI("https://bafybeicnx7q75tpj4uocomgktjjhlz3s752ouzpltpqklfaeoepjlfxydi.ipfs.nftstorage.link/"))
    //await exampleToken.mint()
  
    console.log(await exampleToken.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
    console.log(await exampleToken.balanceOfNFT("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
  
  
    console.log(await exampleToken.balanceOf("0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec"))
    console.log(await exampleToken.balanceOfNFT("0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec"))
  
  
    console.log(await exampleToken.balanceOf("0x07882Ae1ecB7429a84f1D53048d35c4bB2056877"))
    console.log(await exampleToken.balanceOfNFT("0x07882Ae1ecB7429a84f1D53048d35c4bB2056877"))
  
    console.log(await exampleToken.lockTime());
    //console.log(await exampleToken.transfer("0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec", BigNumber.from("92000000000000000000000000")))
   // console.log(await exampleToken.mint({ value: BigNumber.from("20480000000000000") }))
   //console.log(await exampleToken.mintBatch(5,{ value: BigNumber.from("102400000000000000") }));
    //console.log(await exampleToken.airdropToOwner(400));
    
    // for (let i = 0; i < addresses.length; i++) {
    //   console.log(addresses[i], await exampleToken.balanceOf(addresses[i]))
    //   console.log(addresses[i], await exampleToken.balanceOfNFT(addresses[i]))
    // }
    // for (let i = 0; i < addresses2.length; i++) {
    //   console.log(addresses2[i], await exampleToken.balanceOf(addresses2[i]))
    //   console.log(addresses2[i], await exampleToken.balanceOfNFT(addresses2[i]))
    // }
    // console.log(await exampleToken.totalSupply())
  
    // console.log(await cryptoPets.generateSVG(4));
  
  };
