pragma solidity 0.8.27;
import {Test} from "forge-std/Test.sol";
import "forge-std/console.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {LZ_AMOY_ENDPOINT, ROUTER_AMOY, LINK_AMOY, BASE_SEPOLIA_SELECTOR, OP_SEPOLIA_SELECTOR, USDC_AMOY} from "../script/helpers/Constants.sol";
import {MockCcipRouter} from "../src/cctp/mocks/MockCcipRouter.sol";
import {MockErc20} from "../src/mocks/MockErc20.sol";
import {MockLzEndpoint} from "../src/mocks/MockLzEndpoint.sol";
import {MultichainWallet} from "../src/MultichainWallet.sol";

contract ContractBTest is Test {
    MultichainWallet multiWallet;
    MockLzEndpoint lzEndpoint;
    MockCcipRouter ccipRouter;
    IERC20 link;
    MockErc20 token1;
    address defSender = address(24);
    uint256 amountToMint = 1e20;
    function setUp() public {
        // lzEndpoint = new MockLzEndpoint();
        // ccipRouter = new MockCcipRouter();
        link = IERC20(LINK_AMOY);
        deal(LINK_AMOY, defSender, amountToMint, true);
        vm.prank(defSender);
        multiWallet = new MultichainWallet(
            LZ_AMOY_ENDPOINT,
            defSender,
            ROUTER_AMOY,
            LINK_AMOY
        );
        vm.prank(defSender);
        multiWallet.allowlistDestinationChain(BASE_SEPOLIA_SELECTOR, true);
    }

    function test_MustSetCorrectWallet() public {
        assertEq(multiWallet.owner(), defSender);
    }

    function test_LinkBalanceMustBeGreaterThan0() public {
        console.log("link.balanceOf(defSender)", link.balanceOf(defSender));
        assertGt(link.balanceOf(defSender), 0);
        assertEq(link.balanceOf(defSender), amountToMint);
    }

    function test_MustGetFeeInLink() public {
        uint256 fee = multiWallet.getFee(
            true,
            OP_SEPOLIA_SELECTOR,
            defSender,
            USDC_AMOY,
            1e6
        );
        console.log("Link fee", fee);
        assertGt(fee, 0);
    }
}
