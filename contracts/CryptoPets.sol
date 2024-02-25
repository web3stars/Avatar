// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./IPetRenderer.sol";
import {Base64} from "base64-sol/base64.sol";

contract CryptoPets is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    mapping(address => bool) private initialPetClaimed;
    uint256 private _nextTokenId;
    enum PetType {
        Cat,
        Chicken,
        Cow,
        Dog,
        Pig
    }

    string[] colors = [
        "red",
        "blue",
        "green",
        "yellow",
        "purple",
        "orange",
        "cyan",
        "magenta"
    ];

    struct Pet {
        uint256 id;
        string name;
        uint256 level;
        uint256 strength;
        uint256 agility;
        uint256 stamina;
        uint256 birthTimestamp;
        PetType petType;
        uint256 seed;
    }
    mapping(PetType => IPetRenderer) public petRenderers;

    // 其他 CryptoPets 代码...

    function setPetRenderer(
        PetType petType,
        IPetRenderer renderer
    ) external onlyOwner {
        petRenderers[petType] = renderer;
    }

    mapping(uint256 => Pet) public pets;

    constructor() ERC721("CryptoPets", "CPET") {}

    function createPet(
        address to,
        string memory name,
        PetType petType
    ) public onlyOwner returns (uint256) {
        return mint(to, name, petType);
    }

    function getPet(uint256 tokenId) public view returns (Pet memory) {
        return pets[tokenId];
    }

    // 获取用户的宠物列表
    function getUserPets(address user) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(user);
        uint256[] memory tokens = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokens[i] = tokenOfOwnerByIndex(user, i);
        }

        return tokens;
    }

    // 检查用户是否已领取初始宠物
    function hasClaimedInitialPet(address user) public view returns (bool) {
        return initialPetClaimed[user];
    }

    function claimInitialPet(string memory name) public {
        // 检查用户是否已经领取过初始宠物
        require(
            !initialPetClaimed[msg.sender],
            "You have already claimed your initial pet."
        );

        // 为用户创建一个初始宠物并分配给用户
        mint(msg.sender, name, PetType(_getRandomValue(1, 5)));

        // 将用户标记为已领取初始宠物
        initialPetClaimed[msg.sender] = true;
    }

    function mint(
        address to,
        string memory name,
        PetType _petType
    ) internal returns (uint256) {
        // 生成具有基本属性的宠物
        uint256 newPetId = _tokenIdCounter.current();
        string memory newName = name;
        uint256 newLevel = 1;
        uint256 newStrength = _getRandomValue(10, 20);
        uint256 newAgility = _getRandomValue(10, 20);
        uint256 newStamina = _getRandomValue(10, 20);
        uint256 seed = _getRandomValue(1, 20);
        // 创建新宠物并将其添加到数组中
        pets[newPetId] = (
            Pet(
                newPetId,
                newName,
                newLevel,
                newStrength,
                newAgility,
                newStamina,
                block.timestamp,
                _petType,
                seed
            )
        );

        // 将宠物分配给用户地址
        _safeMint(to, newPetId);

        // 自增 tokenId
        _tokenIdCounter.increment();
        _nextTokenId++;
    }

    function _getRandomValue(
        uint256 min,
        uint256 max
    ) private view returns (uint256) {
        return
            (uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) %
                (max - min + 1)) + min;
    }

    function generateSVG(uint256 tokenId) public view returns (string memory) {
        // 检查 tokenId 是否有效
        require(_exists(tokenId), "Token ID does not exist");

        // 获取宠物属性（此处假设已经有一个函数来获取宠物属性）
        Pet memory pet = getPet(tokenId);
        // 开始生成 SVG 代码
        string
            memory svg = '<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">';

        PetType ptype = pet.petType;

        // 添加宠物的各个部分
        svg = string(
            abi.encodePacked(svg, petRenderers[ptype].renderBody(pet.seed))
        );
        svg = string(
            abi.encodePacked(svg, petRenderers[ptype].renderHead(pet.seed))
        );
        svg = string(
            abi.encodePacked(svg, petRenderers[ptype].renderEars(pet.seed))
        );
        svg = string(
            abi.encodePacked(svg, petRenderers[ptype].renderLegs(pet.seed))
        );
        svg = string(
            abi.encodePacked(svg, petRenderers[ptype].renderOthers(pet.seed))
        );

        // 结束 SVG 代码
        svg = string(abi.encodePacked(svg, "</svg>"));

        return Base64.encode(bytes(svg));
    }
}
