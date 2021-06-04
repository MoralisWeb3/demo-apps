//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LandRegistry is ERC721, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");

    Counters.Counter private _tokenIdTracker;

    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE`, `TRANSFER_ROLE` to
     * the account that deploys the contract
     */
    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) public ERC721(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(TRANSFER_ROLE, _msgSender());
        _setBaseURI(baseURI);
    }

    /**
     * @dev Creates a new token for `to`. Its token ID will be automatically
     * assigned (and available on the emitted {IERC721-Transfer} event). 
     * Sets the token URI to `uri` which should be the IPFS hash of the
     * following JSON metadata document
     * {
     *   name: String, physical address
     *   description: String, property description
     *   image: String, IPFS path to PDF of property title
     * }
     *
     * See {ERC721-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(string memory uri, address to) public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");

        // We cannot just use balanceOf to create the new tokenId because tokens
        // can be burned (destroyed), so we need a separate counter.
        uint256 tokenId = _tokenIdTracker.current();
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenIdTracker.increment();
    }

    /**
     * @dev Return true if `user` is allowed to manage `tokenId`
     */
    function _isApprovedOrTransferRole(address user, uint256 tokenId)
        internal
        view
        virtual
        returns (bool)
    {
        require(
            _exists(tokenId),
            "ERC721: operator query for nonexistent token"
        );
        address owner = ERC721.ownerOf(tokenId);
        return (hasRole(MINTER_ROLE, user) ||
            getApproved(tokenId) == user ||
            ERC721.isApprovedForAll(owner, user));
    }

    /**
     * @dev See {IERC721-approve}.
     * approve if caller has TRANSFER role or approved for all
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(
            hasRole(MINTER_ROLE, _msgSender()) ||
                ERC721.isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller does not have TRANSFER role nor approved for all"
        );
        // _approve(to, tokenId); // whis is this private?! boo-urns!
        // the TRANSFER role will not be able to approve the owner then
        ERC721.approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-transferFrom}.
     * Caller must have TRANSFER role or be approved
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(
            _isApprovedOrTransferRole(_msgSender(), tokenId),
            "ERC721: transfer caller does not have TRANSFER role or is approved"
        );

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     * Caller must have TRANSFER role or be approved
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(
            _isApprovedOrTransferRole(_msgSender(), tokenId),
            "ERC721: transfer caller does not have TRANSFER role or is approved"
        );
        _safeTransfer(from, to, tokenId, _data);
    }
}
