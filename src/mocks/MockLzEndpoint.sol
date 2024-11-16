// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

contract MockLzEndpoint {
    mapping(address => address) public delegates;
    function setDelegate(address _delegate) external {
        delegates[msg.sender] = _delegate;
    }
}
