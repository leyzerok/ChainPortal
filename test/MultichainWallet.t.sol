pragma solidity 0.8.27;
import {Test} from "forge-std/Test.sol";
import "forge-std/console.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

// OApp imports
// import {IOAppOptionsType3, EnforcedOptionParam} from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OAppOptionsType3.sol";
// import {OptionsBuilder} from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OptionsBuilder.sol";

// OFT imports
// import {IOFT, SendParam, OFTReceipt} from "@layerzerolabs/oft-evm/contracts/interfaces/IOFT.sol";
// import {MessagingFee, MessagingReceipt} from "@layerzerolabs/oft-evm/contracts/OFTCore.sol";
// import {OFTMsgCodec} from "@layerzerolabs/oft-evm/contracts/libs/OFTMsgCodec.sol";
// import {OFTComposeMsgCodec} from "@layerzerolabs/oft-evm/contracts/libs/OFTComposeMsgCodec.sol";

// DevTools imports
import {TestHelperOz5} from "@layerzerolabs/test-devtools-evm-foundry/contracts/TestHelperOz5.sol";

// Mock import
import {MockCcipRouter} from "../src/cctp/mocks/MockCcipRouter.sol";
import {MockErc20} from "../src/mocks/MockErc20.sol";
import {MultichainWallet} from "../src/MultichainWallet.sol";

contract ContractBTest is TestHelperOz5 {
    // using OptionsBuilder for bytes;

    // Declaration of mock endpoint IDs.
    uint16 aEid = 1;
    uint16 bEid = 2;

    // Declaration of mock contracts.
    MultichainWallet aMyOApp; // OApp A
    MultichainWallet bMyOApp; // OApp B

    address defSedner = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;
    function setUp() public {
        super.setUp();
        setUpEndpoints(2, LibraryType.UltraLightNode);
        // Initializes 2 MyOApps; one on chain A, one on chain B.
        address[] memory sender = setupOApps(type(MyOApp).creationCode, 1, 2);
        aMyOApp = MultichainWallet(payable(sender[0], defSedner));
        bMyOApp = MultichainWallet(payable(sender[1], defSedner));
    }

    function test_MustSetCorrectWallet() public {
        assertEq(multiWallet.owner(), defSedner);
    }

    function test_SendMustBeOwner() public {}

    function testFail_SenderIsntOwner() public {}
}
