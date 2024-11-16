// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;
import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {LZ_AMOY_ENDPOINT, LZ_BASE_SEPOLIA_ENDPOINT, ROUTER_BASE_SEPOLIA, ROUTER_AMOY, LINK_AMOY, LINK_BASE_SEPOLIA} from "./helpers/Constants.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ITokenMessenger} from "src/cctp/interfaces/ITokenMessenger.sol";
import {MultichainWallet} from "src/MultichainWallet.sol";
contract CctpTransferFromAmoy is Script {
    function setUp() public {}
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        uint256 amountToTransfer = 1 * 10 ** 6;
        address account = vm.addr(privateKey);
        console.log("account", account);
        vm.startBroadcast(privateKey);
        MultichainWallet mw = new MultichainWallet(
            LZ_BASE_SEPOLIA_ENDPOINT,
            account,
            ROUTER_BASE_SEPOLIA,
            LINK_BASE_SEPOLIA
        );
        vm.stopBroadcast();
        console.log("MultichainWallet", address(mw));
    }
}
