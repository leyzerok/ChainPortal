pragma solidity 0.8.27;
import {Test} from "forge-std/Test.sol";
import "forge-std/console.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import {MockCcipRouter} from "../src/cctp/mocks/MockCcipRouter.sol";
import {MockErc20} from "../src/mocks/MockErc20.sol";
import {MockLzEndpoint} from "../src/mocks/MockLzEndpoint.sol";
import {MultichainWallet} from "../src/MultichainWallet.sol";

contract ContractBTest is Test {
    MultichainWallet multiWallet;
    MockLzEndpoint lzEndpoint;
    MockCcipRouter ccipRouter;
    MockErc20 link;
    MockErc20 token1;
    address defSender = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;
    function setUp() public {
        lzEndpoint = new MockLzEndpoint();
        ccipRouter = new MockCcipRouter();
        multiWallet = new MultichainWallet(
            address(lzEndpoint),
            defSender,
            address(ccipRouter),
            address(link)
        );
    }

    function test_MustSetCorrectWallet() public {
        assertEq(multiWallet.owner(), defSender);
    }

    // function test_SendMustBeOwner() public {}

    // function testFail_SenderIsntOwner() public {}
}
