// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPetRenderer {
    function renderHead(uint256 seed) external view returns (string memory) ;
    function renderBody(uint256 seed) external view  returns (string memory) ;
    function renderEars(uint256 seed) external view  returns (string memory) ;
    function renderLegs(uint256 seed) external  view returns (string memory);
    function renderOthers(uint256 seed) external view  returns (string memory) ;

}