//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721Ex} from "./ERC721Ex.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

interface IERC721 {
    function transferFrom(address from, address to, uint256 tokenId) external;

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function balanceOf(address owner) external view returns (uint256 balance);
}

contract BAYCExToken is ERC721Ex {
    mapping(address => bool) public swapRouters;

    //set router
    function setSwapRouter(address _router) external onlyOwner {
        require(_router != address(0), "Invalid router address");
        swapRouters[_router] = true;
    }

    function mint(uint256 _tokenId) public {
        IERC721 erc721 = IERC721(erc721Address);
        address tokenOwner = erc721.ownerOf(_tokenId);
        require(tokenOwner == msg.sender, "Not the token owner");

        // 转移ERC721到本合约
        erc721.transferFrom(msg.sender, address(this), _tokenId);

        // 给用户发行ERC20代币
        uint256 unit = _getUnit();
        balanceOf[msg.sender] += unit;
        totalSupply += unit;

        // 记录ERC721的抵押
        _ownerOf[_tokenId] = msg.sender;
        _owned[msg.sender].push(_tokenId);
        _ownedIndex[_tokenId] = _owned[msg.sender].length - 1;
    }

    function burn(uint256 _tokenId) public {
        _burn(_tokenId, msg.sender, _getUnit());
    }

    function _burnToken(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: burn from the zero address");

        uint256 accountBalance = balanceOf[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        require(
            totalSupply >= amount,
            "ERC20: burn amount exceeds total supply"
        );
        unchecked {
            balanceOf[account] = accountBalance - amount;
            totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);
    }

    function _burn(uint256 _tokenId, address _to, uint256 _amount) internal {
        require(_to != address(0), "Cannot withdraw to the zero address");

        // 获取ERC721合约实例
        IERC721 erc721 = IERC721(erc721Address);

        // 确保合约是该ERC721资产的当前持有者
        require(
            erc721.ownerOf(_tokenId) == address(this),
            string(
                abi.encodePacked(
                    "Contract does not hold the tokenId:",
                    Strings.toString(_tokenId)
                )
            )
        );

        require(
            balanceOf[msg.sender] >= _amount,
            string(
                abi.encodePacked(
                    "Insufficient ERC20 balance to withdraw ERC721:",
                    Strings.toString(balanceOf[msg.sender]),
                    "<",
                    Strings.toString(_amount)
                )
            )
        );

        // 转移ERC721资产到指定地址
        erc721.transferFrom(address(this), _to, _tokenId);

        // 销毁相应数量的ERC20代币
        _burnToken(msg.sender, _amount);

        // 更新ERC721的拥有权记录
        delete _ownerOf[_tokenId];

        // 更新_owned和_ownedIndex映射
        uint256 lastIndex = _owned[msg.sender].length - 1;
        uint256 tokenIndex = _ownedIndex[_tokenId];
        if (tokenIndex != lastIndex) {
            uint256 lastTokenId = _owned[msg.sender][lastIndex];
            _owned[msg.sender][tokenIndex] = lastTokenId;
            _ownedIndex[lastTokenId] = tokenIndex;
        }
        _owned[msg.sender].pop();
        delete _ownedIndex[_tokenId];
    }

    function _move(uint256 _tokenId, address _to, uint256 _amount) internal {
        require(_to != address(0), "Cannot withdraw to the zero address");

        // 获取ERC721合约实例
        IERC721 erc721 = IERC721(erc721Address);

        // 确保合约是该ERC721资产的当前持有者
        require(
            erc721.ownerOf(_tokenId) == address(this),
            string(
                abi.encodePacked(
                    "Contract does not hold the tokenId:",
                    Strings.toString(_tokenId)
                )
            )
        );

        require(
            balanceOf[msg.sender] >= _amount,
            string(
                abi.encodePacked(
                    "Insufficient ERC20 balance to move ERC721:",
                    Strings.toString(balanceOf[msg.sender]),
                    "<",
                    Strings.toString(_amount)
                )
            )
        );

        // 转移ERC721资产到指定地址
        erc721.transferFrom(address(this), _to, _tokenId);

        // 更新ERC721的拥有权记录
        delete _ownerOf[_tokenId];

        // 更新_owned和_ownedIndex映射
        uint256 lastIndex = _owned[msg.sender].length - 1;
        uint256 tokenIndex = _ownedIndex[_tokenId];
        if (tokenIndex != lastIndex) {
            uint256 lastTokenId = _owned[msg.sender][lastIndex];
            _owned[msg.sender][tokenIndex] = lastTokenId;
            _ownedIndex[lastTokenId] = tokenIndex;
        }
        _owned[msg.sender].pop();
        delete _ownedIndex[_tokenId];
    }

    function withdraw(uint256 _tokenId, address _to) internal {
        require(_to != address(0), "Cannot withdraw to the zero address");

        // 获取ERC721合约实例
        IERC721 erc721 = IERC721(erc721Address);

        // 确保合约是该ERC721资产的当前持有者
        require(
            erc721.ownerOf(_tokenId) == address(this),
            string(
                abi.encodePacked(
                    "Contract does not hold the tokenId:",
                    Strings.toString(_tokenId)
                )
            )
        );

        // 转移ERC721资产到指定地址
        erc721.transferFrom(address(this), _to, _tokenId);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");

        uint256 balanceBeforeSender = balanceOf[from];
        uint256 balanceBeforeReceiver = balanceOf[to];

        uint256 unit = _getUnit();
        uint256 left = 0;
        uint256 nft_to_transfer = ((balanceOf[to] + amount) / unit) -
            (balanceBeforeReceiver / unit);
        if (amount < unit) {
            nft_to_transfer = 0;
        }
        for (uint256 i = 0; i < nft_to_transfer; i++) {
            uint256 tokenId = _owned[from][_owned[from].length - 1];
            if (!swapRouters[to]) {
                _burn(tokenId, to, unit);
            }
            else if (swapRouters[from]) {
                withdraw(tokenId, to);
            }
            else if(swapRouters[to]){
                _burnToken(to, unit);
            }
        }

        left = amount - nft_to_transfer * unit;
        // If `from` has NFTs to deposit and `left` amount is not sufficient for a full NFT
        if (
            left > 0 &&
            left < unit &&
            _owned[from].length > 0 &&
            (balanceBeforeSender / unit != (balanceBeforeSender - left) / unit)
        ) {
            uint256 id = _owned[from][_owned[from].length - 1];
            _move(id, address(this), left);
            vault.enqueue(id, from, block.timestamp);
        }
        unchecked {
            balanceOf[to] += left;
            balanceOf[from] -= left;
        }
        if (
            balanceOf[to] / unit >= 1 &&
            vault.size() > 0 &&
            (balanceBeforeReceiver / unit !=
                (balanceBeforeReceiver + left) / unit)
        ) {
            // Remove the first NFT from the vault queue
            (uint256 id, address owner, uint256 time) = vault.dequeue();
            withdraw(id, to);
            _burnToken(to, unit);
        }

        return true;
    }
}
