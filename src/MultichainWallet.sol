// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;
import {CcipClient} from "./CcipClient.sol";
import {LZClient} from "./LZClient.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MultichainWallet is CcipClient, LZClient /*, Ownable, */ {
    using SafeERC20 for IERC20;

    // to prevert rentrun
    bool public isRunning;
    modifier onlyOwnerOrThis() {
        if (msg.sender != owner() && msg.sender != address(this)) {
            revert InvalidSender();
        }
        _;
    }
    constructor(
        address _endpoint,
        address _owner,
        address _router,
        address _link
    ) LZClient(_endpoint, _owner) CcipClient(_router, _link) Ownable(_owner) {}

    function withdrawFunds(
        address[] calldata _tokens,
        address[] calldata _recipients,
        uint256[] calldata _values
    ) external onlyOwnerOrThis {
        if (
            _tokens.length != _recipients.length ||
            _tokens.length != _values.length
        ) revert LenghMistmatch();
        for (uint256 i; i < _tokens.length; ++i) {
            if (_tokens[i] == address(0)) {
                _transferEthTo(payable(_recipients[i]), _values[i]);
            } else {
                IERC20(_tokens[i]).safeTransfer(_recipients[i], _values[i]);
            }
        }
    }

    function _handleMessages(bytes memory _messages) internal virtual override {
        _runMulticall(_decodeMessages(_messages));
    }

    function _decodeMessages(
        bytes memory _messages
    ) internal pure override returns (Call[] memory) {
        return abi.decode(_messages, (Call[]));
    }

    function _runMulticall(Call[] memory calls) internal override {
        // Prevents reentrancy
        if (isRunning) revert AlreadyRunning();
        isRunning = true;

        for (uint256 i = 0; i < calls.length; i++) {
            Call memory call = calls[i];

            if (call.callType == CallType.FullTokenBalance) {
                (address token, uint256 amountParameterPosition) = abi.decode(
                    call.payload,
                    (address, uint256)
                );
                uint256 amount = IERC20(token).balanceOf(address(this));
                _setCallDataParameter(
                    call.callData,
                    amountParameterPosition,
                    amount
                );
            } else if (call.callType == CallType.FullNativeBalance) {
                call.value = address(this).balance;
            } else if (call.callType == CallType.CollectTokenBalance) {
                address token = abi.decode(call.payload, (address));
                IERC20(token).safeTransferFrom(
                    msg.sender,
                    address(this),
                    IERC20(token).balanceOf(msg.sender)
                );
                continue;
            }

            (bool success, bytes memory data) = call.target.call{
                value: call.value
            }(call.callData);
            if (!success) revert CallFailed(i, data);
        }

        isRunning = false;
    }

    function _encodeMessages(
        Call[] memory _calls
    ) internal pure override returns (bytes memory) {
        return abi.encode(_calls);
    }
}
