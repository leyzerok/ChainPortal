// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;
import {CcipClient} from "./CcipClient.sol";
import {LZClient} from "./LZClient.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MultichainWallet is CcipClient, LZClient /*, Ownable, */ {
    using SafeERC20 for IERC20;
    error InvalidSender();
    event ShowMessage(bytes message);
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

    function _handleMessages(
        bytes memory _messages
    ) internal override(CcipClient, LZClient) {
        emit ShowMessage(_messages);
    }
}
