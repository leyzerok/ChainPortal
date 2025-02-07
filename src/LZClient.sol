// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;
import {OApp, Origin, MessagingFee} from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import {MultiMessageHandler} from "./MultiMessageHandler.sol";
abstract contract LZClient is OApp, MultiMessageHandler {
    // TODO delete
    event DataReceived(bytes data);
    constructor(address _endpoint, address _owner) OApp(_endpoint, _owner) {}

    function send(
        uint32 _dstEid,
        bytes memory _message,
        bytes calldata _options
    ) external payable {
        // Encodes the message before invoking _lzSend.
        // Replace with whatever data you want to send!
        bytes memory _payload = abi.encode(_message);
        _lzSend(
            _dstEid,
            _payload,
            _options,
            // Fee in native gas and ZRO token.
            MessagingFee(msg.value, 0),
            // Refund address in case of failed source message.
            payable(msg.sender)
        );
    }

    /**
     * @dev Called when data is received from the protocol. It overrides the equivalent function in the parent contract.
     * Protocol messages are defined as packets, comprised of the following parameters.
     * @param _origin A struct containing information about where the packet came from.
     * @param _guid A global unique identifier for tracking the packet.
     * @param payload Encoded message.
     */
    function _lzReceive(
        Origin calldata _origin,
        bytes32 _guid,
        bytes calldata payload,
        address, // Executor address as specified by the OApp.
        bytes calldata // Any extra data or options to trigger on receipt.
    ) internal override {
        // Decode the payload to get the message
        // In this case, type is string, but depends on your encoding!
        bytes memory data = abi.decode(payload, (bytes));
        _handleMessages(data);
        emit DataReceived(data);
    }
}