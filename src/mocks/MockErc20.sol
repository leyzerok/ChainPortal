// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockErc20 is ERC20 {
    constructor() ERC20("MockToken", "MT") {
        _mint(msg.sender, 1_000_000_000 * 10 ** 18);
    }
}
