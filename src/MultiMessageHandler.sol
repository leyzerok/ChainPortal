// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

abstract contract MultiMessageHandler {
    error InvalidSender();
    error AlreadyRunning();
    error TransferFailed();
    error CallFailed(uint256 callPosition, bytes reason);
    event ShowMessage(bytes message);
    enum CallType {
        // Will simply run calldata
        Default,
        // Will update amount field in calldata with ERC20 token balance of the multicall contract.
        FullTokenBalance,
        // Will update amount field in calldata with native token balance of the multicall contract.
        FullNativeBalance,
        // Will run a safeTransferFrom to get full ERC20 token balance of the caller.
        CollectTokenBalance
    }

    /// @notice Calldata format expected by multicall.
    struct Call {
        // Call type, see CallType struct description.
        CallType callType;
        // Address that will be called.
        address target;
        // Native token amount that will be sent in call.
        uint256 value;
        // Calldata that will be send in call.
        bytes callData;
        // Extra data used by multicall depending on call type.
        // Default: unused (provide 0x)
        // FullTokenBalance: address of the ERC20 token to get balance of and zero indexed position
        // of the amount parameter to update in function call contained by calldata.
        // Expect format is: abi.encode(address token, uint256 amountParameterPosition)
        // Eg: for function swap(address tokenIn, uint amountIn, address tokenOut, uint amountOutMin,)
        // amountParameterPosition would be 1.
        // FullNativeBalance: unused (provide 0x)
        // CollectTokenBalance: address of the ERC20 token to collect.
        // Expect format is: abi.encode(address token)
        bytes payload;
    }
    function isValidSender(bytes32 _sender) public virtual returns (bool) {}
    function _handleMessages(bytes memory _messages) internal virtual {}
    function _decodeMessages(
        bytes memory _messages
    ) internal pure virtual returns (Call[] memory) {
        return abi.decode(_messages, (Call[]));
    }

    function _runMulticall(Call[] memory calls) internal virtual {}

    function _encodeMessages(
        Call[] memory _calls
    ) internal pure virtual returns (bytes memory) {}

    function _setCallDataParameter(
        bytes memory callData,
        uint256 parameterPosition,
        uint256 value
    ) internal pure virtual {
        assembly {
            // 36 bytes shift because 32 for prefix + 4 for selector
            mstore(add(callData, add(36, mul(parameterPosition, 32))), value)
        }
    }
}
