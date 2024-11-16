// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

abstract contract MultiMessageHandler {
    function _handleMessages(bytes memory _messages) internal virtual {}
}
