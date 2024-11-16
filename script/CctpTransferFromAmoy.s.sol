// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;
import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {USDC_AMOY, TOKEN_MESSANGER_AMOY, SEPOLIA_DOMAIN} from "./helpers/Constants.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ITokenMessenger} from "src/cctp/interfaces/ITokenMessenger.sol";
contract CctpTransferFromAmoy is Script {
    function setUp() public {}
    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        uint256 amountToTransfer = 1 * 10 ** 6;
        address account = vm.addr(privateKey);
        console.log("account", account);
        vm.startBroadcast(privateKey);
        // IERC20(USDC_AMOY).approve(TOKEN_MESSANGER_AMOY, amountToTransfer);
        // ITokenMessenger(TOKEN_MESSANGER_AMOY).depositForBurn(
        //     amountToTransfer,
        //     SEPOLIA_DOMAIN,
        //     bytes32(uint256(uint160(account))),
        //     USDC_AMOY
        // );
        console.log(IERC20(USDC_AMOY).balanceOf(account));
        vm.stopBroadcast();
    }
}