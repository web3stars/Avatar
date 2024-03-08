//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC404i} from "./ERC404i.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

interface IERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract AvatarToken is ERC404i {
    uint256 public constant MINT_PRICE = 0.02048 ether;
    //4000 for first minters/400 allocate to team
    uint256 public constant LEFT_COUNT = 6000;

    function setNameSymbol(
        string memory _name,
        string memory _symbol
    ) public onlyOwner {
        _setNameSymbol(_name, _symbol);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        if (bytes(baseTokenURI).length == 0) {
            return dataURI;
        }
        uint256 tokenId = id % maxCount;
        return
            string(
                abi.encodePacked(
                    baseTokenURI,
                    Strings.toString(tokenId),
                    ".json"
                )
            );
    }

    function mint() external payable nonReentrant whenNotPaused {
        uint256 unit = _getUnit();
        require(
            (totalSupply / unit) <= (maxCount - LEFT_COUNT),
            "No mint capacity left"
        );

        require(
            erc721BalanceOf(msg.sender) < 5,
            "Only less than or equal to 5  can be mint"
        );
        require(
            msg.value >= MINT_PRICE,
            "Insufficient funds sent for minting."
        );

        _mintERC20(msg.sender, unit);
 
        if (msg.value > MINT_PRICE) {
            payable(msg.sender).transfer(msg.value - MINT_PRICE);
        }
    }

    function mintBatch(
        uint256 numTokens
    ) external payable nonReentrant whenNotPaused {
        uint256 unit = _getUnit();

        require(
            msg.sender == owner() ||
                ((erc721BalanceOf(msg.sender) + numTokens) <= 5),
            "Only less than or equal to 5  can be mint"
        );

        require(
            totalSupply / unit + numTokens <= (maxCount - LEFT_COUNT),
            "exceeds maximum supply"
        );

        uint256 totalPrice = 0;
        for (uint256 i = 0; i < numTokens; i++) {
            totalPrice += MINT_PRICE;
        }
        require(
            msg.value >= totalPrice,
            "Insufficient funds sent for minting."
        );

        for (uint256 i = 0; i < numTokens; i++) {
            _mintERC20(msg.sender, unit);
        }
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }
    }

    function airdropBatch(address[] calldata recipients) external onlyOwner {
        uint256 unit = _getUnit();
        require(
            totalSupply / unit + recipients.length <= maxCount,
            "Exceeds maximum supply"
        );

        for (uint256 i = 0; i < recipients.length; i++) {
            _mintERC20(recipients[i], unit);
        } 
    }
    function airdropToOwner(uint256 numTokens) external onlyOwner {
        uint256 unit = _getUnit();
        require(
            totalSupply / unit + numTokens <= maxCount,
            "Exceeds maximum supply"
        );

        _mintERC20(owner(), numTokens * unit);
    }

    function withdraw(address token) external onlyOwner {
        if (token == address(0)) {
            uint256 balance = address(this).balance;
            payable(owner()).transfer(balance);
        } else {
            IERC20(token).transfer(
                owner(),
                IERC20(token).balanceOf(address(this))
            );
        }
    }

    function setERC721TransferExempt(
        address account_,
        bool value_
    ) external onlyOwner {
        _setERC721TransferExempt(account_, value_);
    }
}
