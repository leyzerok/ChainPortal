// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts-ccip/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
contract CcipClient is OwnerIsCreator, CCIPReceiver {
    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance.
    // Event emitted when a message is sent to another chain.
    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        string text, // The text being sent.
        address feeToken, // the token address used to pay CCIP fees.
        uint256 fees // The fees paid for sending the CCIP message.
    );
    // Event emitted when a message is received from another chain.
        event MessageReceived(
            bytes32 indexed messageId, // The unique ID of the message.
            uint64 indexed sourceChainSelector, // The chain selector of the source chain.
            address sender, // The address of the sender from the source chain.
            string text // The text that was received.
        );

    IRouterClient private router;
        LinkTokenInterface private link;
        bytes32 private s_lastReceivedMessageId; // Store the last received messageId.
        string private s_lastReceivedText; // Store the last received text.
    /// @notice Constructor initializes the contract with the router address.
    /// @param _router The address of the router contract.
    /// @param _link The address of the link contract.
    constructor(address _router, address _link) CCIPReceiver(_router) {
            router = IRouterClient(_router);
            link = LinkTokenInterface(_link);
    }
    /// @notice Sends data to receiver on the destination chain.
    /// @dev Assumes your contract has sufficient LINK.
    /// @param destinationChainSelector The identifier (aka selector) for the destination blockchain.
    /// @param receiver The address of the recipient on the destination blockchain.
    /// @param text The string text to be sent.
    /// @return messageId The ID of the message that was sent.
    function sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        string calldata text
    ) external onlyOwner returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded receiver address
            data: abi.encode(text), // ABI-encoded string
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit and allowing out-of-order execution.
                // Best Practice: For simplicity, the values are hardcoded. It is advisable to use a more dynamic approach
                // where you set the extra arguments off-chain. This allows adaptation depending on the lanes, messages,
                // and ensures compatibility with future CCIP upgrades. Read more about it here: https://docs.chain.link/ccip/best-practices#using-extraargs
                Client.EVMExtraArgsV2({
                    gasLimit: 200_000, // Gas limit for the callback on the destination chain
                    allowOutOfOrderExecution: false // Allows the message to be executed out of order relative to other messages from the same sender
                })
            ),
            // Set the feeToken  address, indicating LINK will be used for fees
            feeToken: address(link)
        });
        // Get the fee required to send the message
       uint256 fees = router.getFee(destinationChainSelector, evm2AnyMessage);
        );
        if (fees > link.balanceOf(address(this)))
            revert NotEnoughBalance(link.balanceOf(address(this)), fees);
        // approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
        link.approve(address(router), fees);
        // Send the message through the router and store the returned message ID
        messageId = router.ccipSend(destinationChainSelector, evm2AnyMessage);
        // Emit an event with message details
        emit MessageSent(
            messageId,
            destinationChainSelector,
            receiver,
            text,
            address(link),
            fees
        );
        // Return the message ID
        return messageId;
    }

    /// handle a received message
        function _ccipReceive(
            Client.Any2EVMMessage memory any2EvmMessage
        ) internal override {
            s_lastReceivedMessageId = any2EvmMessage.messageId; // fetch the messageId
            s_lastReceivedText = abi.decode(any2EvmMessage.data, (string)); // abi-decoding of the sent text
            emit MessageReceived(
                any2EvmMessage.messageId,
                any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
                abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
                abi.decode(any2EvmMessage.data, (string))
            );
        }

        /// @notice Fetches the details of the last received message.
        /// @return messageId The ID of the last received message.
        /// @return text The last received text.
        function getLastReceivedMessageDetails()
            external
            view
            returns (bytes32 messageId, string memory text)
        {
            return (s_lastReceivedMessageId, s_lastReceivedText);
        }
}