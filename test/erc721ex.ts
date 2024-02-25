
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
// AvatarToken deployed to: 0x3E661784267F128e5f706De17Fac1Fc1c9d56f30
// ERC404FactoryProxyAdmin deployed to: 0x6732128F9cc0c4344b2d4DC6285BCd516b7E59E6
// CircleQueue deployed to: 0x15Ff10fCc8A1a50bFbE07847A22664801eA79E0f
// ERC404FactoryProxy deployed to: 0xAe9Ed85dE2670e3112590a2BB17b7283ddF44d9c
// 0x0000000000000000000000000000000000000000
// ERC721FactoryProxyAdmin deployed to: 0xD1760AA0FCD9e64bA4ea43399Ad789CFd63C7809
// BAYCExToken deployed to: 0x75b0B516B47A27b1819D21B26203Abf314d42CCE
// CircleQueueERC721Ex deployed to: 0x906B067e392e2c5f9E4f101f36C0b8CdA4885EBf
// CryptoPets deployed to: 0xD94A92749C0bb33c4e4bA7980c6dAD0e3eFfb720
// ERC721FactoryProxy deployed to: 0xDf951d2061b12922BFbF22cb17B17f3b39183570
export const erc721Test = async function () {

    const CircleQueue = await ethers.getContractFactory("CircleQueue");
    const circleQueue = await CircleQueue.attach("0x48e73EC8a9bc3C86b00E5b8377d6d59dd54F5164");

    console.log("Queue Size", await circleQueue.size())
    console.log("Queue Empty", await circleQueue.isEmpty())
    return;
    const ExampleToken = await ethers.getContractFactory("BAYCExToken");
    const exampleToken = await ExampleToken.attach("0xDf951d2061b12922BFbF22cb17B17f3b39183570");
 
    console.log("name", await exampleToken.owner())
    console.log("owner", await exampleToken.name())
    console.log("total ", await exampleToken.totalSupply())
    console.log(await exampleToken.balanceOfNFT("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
 
    console.log("\n");


    // console.log(await exampleToken.paused());
    // console.log(await exampleToken.unpause());
    // console.log(await exampleToken.paused());
    const CryptoPets = await ethers.getContractFactory("CryptoPets");

    const cryptoPets = await CryptoPets.attach("0xD94A92749C0bb33c4e4bA7980c6dAD0e3eFfb720");
   // //  console.log(await cryptoPets.claimInitialPet("Stars"))
    // console.log(await cryptoPets.createPet("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "Stars1", 0));
    // console.log(await cryptoPets.createPet("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "Stars2", 0));
    // console.log(await cryptoPets.createPet("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "Stars3", 0));
    // console.log(await cryptoPets.createPet("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "Stars4", 0));
    
    // function createPet(
    //     address to,
    //     string memory name,
    //     PetType petType
    // ) public onlyOwner returns (uint256) {
    //     return mint(to, name, petType);
    // }

    console.log(await cryptoPets.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
    //console.log(await cryptoPets.tokenOfOwnerByIndex("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 0));
    //await exampleToken.transfer("0x3195f2bF24B8cf96b446591C124e82455787bBC6", BigNumber.from("20000000"))

    console.log(await exampleToken.erc721Address());
    // console.log(await cryptoPets.approve("0xDf951d2061b12922BFbF22cb17B17f3b39183570", 0))
    // console.log(await exampleToken.mint(0))
    // console.log(await cryptoPets.approve("0xDf951d2061b12922BFbF22cb17B17f3b39183570", 1))
    // console.log(await exampleToken.mint(1))
    // // //console.log(await exampleToken.burn(0));
   console.log(await exampleToken.transfer("0x3195f2bF24B8cf96b446591C124e82455787bBC6",BigNumber.from("90000000")))

    // //generate random ethereum addresses
    // let addresses = ['0xA6B68F4216C44E9A604176F01297F4FFFC595EAC',
    //     '0xEA0616AF18E0CF0895C5E90FA1F2B9AE246A7530',
    //     '0x34E20DCA8D32AFBE60517102025EE0C5A0C6EF32',
    //     '0x98B25675B1B70A37AC24CA0FEF91CFAC82C4053F',
    //     '0x9195BBB3C696429EB702A0DE4195D2D858EB2495',
    //     '0x2782ECC10193EF336475C2EC96E24AD49E920AA2',
    //     '0xEF787A9DD119272BADB4F2F04213FFC9E88659D3',
    //     '0x1FB335B37E357E887CD9B1E764EB7FE1B54F952E',
    //     '0xE4DC40870F7177E1F1C29D9EE16B67BB01968E8B',
    //     '0x513CB3CFE19197B84BCBB9A9A757D313D79D44C9',
    //     // "0x3195f2bF24B8cf96b446591C124e82455787bBC6"
    // ];

    // let addresses2 = ['0x73EB7509827C13AABF8294D9AB6337676E5CB1ED',
    //     '0x499B17B3578BEEF4D8BFB6A3038C3C0A0AB115EA',
    //     '0xFF1E7FC7D2C2B16678B03F0DFE2FD1DB2B5E71E5',
    //     '0xDEDFAB86DB32FC15ED0D1205A3E82CF84BE626B9',
    //     '0x06D190ED7B2E6A0F9D3B9FA77210DD53CBCE9846',
    //     '0xA9CBC98F27106AF9171BCA7D85732753ADFD810E',
    //     '0xEDF37CD94F2AA93A5C48D2BE910EE6E4B4190433',
    //     '0x6A868F76C887BD0435133FEE0ADC2F0F49C41BF4',
    //     '0xBD3F684FD242413C1236EA89D4A63A44C21C32E7',
    //     '0xE0051B2D7A72C68E2F3CBF20F464E2B9BAE9E624'];
    // //await exampleToken.transfer('0x513CB3CFE19197B84BCBB9A9A757D313D79D44C9', BigNumber.from("100000000"))
    // //await exampleToken.transfer('0x3195f2bF24B8cf96b446591C124e82455787bBC6', BigNumber.from("100000000"))
    // // await exampleToken.transfer('0xBD3F684FD242413C1236EA89D4A63A44C21C32E7', BigNumber.from("10000000"))
    // // for (let i = 0; i < addresses.length; i++) {
    // //    await exampleToken.transfer(addresses[i], BigNumber.from("10000000"))
    // // }
    // //  for (let i = 0; i < addresses2.length; i++) {
    // //    await exampleToken.transfer(addresses2[i], BigNumber.from("10000000"))
    // // }
    

    // // for (let i = 0; i < 20; i++) {
    // //   console.log(await exampleToken.mint({ value: BigNumber.from("10100000000000000") }))
    // //   //console.log(await exampleToken.mint())
    // // }

    // //console.log(await exampleToken.setTokenURI("https://bafybeicnx7q75tpj4uocomgktjjhlz3s752ouzpltpqklfaeoepjlfxydi.ipfs.nftstorage.link/"))
    // //await exampleToken.mint()

    console.log(await exampleToken.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
    console.log(await exampleToken.balanceOfNFT("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))


    console.log(await exampleToken.balanceOf("0x3195f2bF24B8cf96b446591C124e82455787bBC6"))
    console.log(await exampleToken.balanceOfNFT("0x3195f2bF24B8cf96b446591C124e82455787bBC6"))


    console.log(await exampleToken.balanceOf("0xDf951d2061b12922BFbF22cb17B17f3b39183570"))
    console.log(await exampleToken.balanceOfNFT("0xDf951d2061b12922BFbF22cb17B17f3b39183570"))

    console.log(await cryptoPets.balanceOf("0xDf951d2061b12922BFbF22cb17B17f3b39183570"))

    console.log(await cryptoPets.balanceOf("0x3195f2bF24B8cf96b446591C124e82455787bBC6"))
    console.log(await cryptoPets.ownerOf(0));
    console.log(await cryptoPets.ownerOf(1));
    console.log(await cryptoPets.ownerOf(2));
    console.log(await cryptoPets.ownerOf(3));
    console.log(await cryptoPets.ownerOf(4));
    console.log(await cryptoPets.ownerOf(5));
    console.log(await cryptoPets.ownerOf(6));
    console.log(await cryptoPets.ownerOf(7));

    // for (let i = 0; i < addresses.length; i++) {
    //     console.log(addresses[i], await exampleToken.balanceOf(addresses[i]))
    //     console.log(addresses[i], await exampleToken.balanceOfNFT(addresses[i]))
    // }
    // for (let i = 0; i < addresses2.length; i++) {
    //     console.log(addresses2[i], await exampleToken.balanceOf(addresses2[i]))
    //     console.log(addresses2[i], await exampleToken.balanceOfNFT(addresses2[i]))
    // }
    // console.log(await exampleToken.totalSupply())

    // console.log(await cryptoPets.generateSVG(4));

};