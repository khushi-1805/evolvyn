// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

/**
 * @title Filmrare
 * @notice Secure NFT rental management contract with two-step access control and pausable features.
 */
contract Filmrare {
    address public owner;
    address public pendingOwner;
    address public operator;
    address public pendingOperator;
    bool public paused;
    uint256 private tokenIdCounter;
    uint256 private constant MAX_RENTAL_PERIOD = 365 days;
    bool private locked;

    struct NftDetail {
        uint256 monthlyPrice;
        uint256 yearlyPrice;
        uint256 price;
    }
    struct UserInfo {
        address user;
        uint256 expires;
    }

    mapping(uint256 => NftDetail) private nftDetail;
    mapping(uint256 => UserInfo) private nftRenteeDetail;
    mapping(uint256 => address) private tokenOwners;
    mapping(uint256 => string) private tokenURIs;

    event OwnershipProposed(address indexed newOwner);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);
    event OperatorProposed(address indexed newOperator);
    event OperatorUpdated(address indexed oldOperator, address indexed newOperator);
    event Paused(address indexed account);
    event Unpaused(address indexed account);
    event NFTMinted(uint256 indexed tokenId, address indexed to, string uri);
    event RentUpdate(uint256 indexed tokenId, address indexed user, uint256 expires);
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event PricesUpdated(uint256 indexed tokenId, uint256 monthlyPrice, uint256 yearlyPrice, uint256 price);
    event TokenURIUpdated(uint256 indexed tokenId, string uri);

    modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }
    modifier onlyOperator() { require(msg.sender == operator || msg.sender == owner, "Not operator"); _; }
    modifier whenNotPaused() { require(!paused, "Paused"); _; }
    modifier whenPaused() { require(paused, "Not paused"); _; }
    modifier nonReentrant() { require(!locked, "Reentry"); locked = true; _; locked = false; }

    /**
     * @dev Sets the initial owner and operator.
     */
    constructor() {
        owner = msg.sender;
        operator = msg.sender;
        tokenIdCounter = 1;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    /** @dev OWNER FUNCTIONS **/

    /**
     * @dev Proposes a new owner. The new owner must call acceptOwnership.
     * @param newOwner The address of the proposed new owner.
     */
    function proposeOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        pendingOwner = newOwner;
        emit OwnershipProposed(newOwner);
    }

    /**
     * @dev Called by the pending owner to accept ownership.
     */
    function acceptOwnership() external {
        require(msg.sender == pendingOwner, "Not pending owner");
        emit OwnershipTransferred(owner, pendingOwner);
        owner = pendingOwner;
        pendingOwner = address(0);
    }

    /**
     * @dev Proposes a new operator. The new operator must call acceptOperator.
     * @param newOperator The address of the proposed new operator.
     */
    function proposeOperator(address newOperator) external onlyOwner {
        require(newOperator != address(0), "Zero address");
        pendingOperator = newOperator;
        emit OperatorProposed(newOperator);
    }

    /**
     * @dev Called by the pending operator to accept the operator role.
     */
    function acceptOperator() external {
        require(msg.sender == pendingOperator, "Not pending operator");
        emit OperatorUpdated(operator, pendingOperator);
        operator = pendingOperator;
        pendingOperator = address(0);
    }

    /**
     * @dev Pauses the contract.
     */
    function pause() external onlyOwner whenNotPaused {
        paused = true;
        emit Paused(msg.sender);
    }

    /**
     * @dev Unpauses the contract.
     */
    function unpause() external onlyOwner whenPaused {
        paused = false;
        emit Unpaused(msg.sender);
    }

    /** @dev MINTING **/

    /**
     * @dev Mints multiple NFTs in a batch. Gas-optimized to write to storage only once.
     * @param uris Array of token URIs.
     * @param monthlyPrices Array of monthly prices.
     * @param yearlyPrices Array of yearly prices.
     * @param prices Array of direct purchase prices.
     */
    function batchMint(
        string[] calldata uris,
        uint256[] calldata monthlyPrices,
        uint256[] calldata yearlyPrices,
        uint256[] calldata prices
    ) external onlyOperator whenNotPaused nonReentrant {
        uint256 len = uris.length;
        require(len > 0, "Empty");
        require(len == monthlyPrices.length && len == yearlyPrices.length && len == prices.length, "Array mismatch");
        
        uint256 _tokenIdCounter = tokenIdCounter; // Read from storage ONCE
        for (uint256 i = 0; i < len; i++) {
            require(bytes(uris[i]).length > 0, "Empty URI");
            uint256 id = _tokenIdCounter;
            
            tokenOwners[id] = owner;
            tokenURIs[id] = uris[i];
            nftDetail[id] = NftDetail(monthlyPrices[i], yearlyPrices[i], prices[i]);

            emit NFTMinted(id, owner, uris[i]);
            emit Transfer(address(0), owner, id);
            emit PricesUpdated(id, monthlyPrices[i], yearlyPrices[i], prices[i]);
            
            _tokenIdCounter++; // Increment local variable
        }
        tokenIdCounter = _tokenIdCounter; // Write to storage ONCE
    }

    /** @dev RENTAL **/

    /**
     * @dev Rents an NFT to a user for a specified duration.
     * @param tokenId The ID of the token to rent.
     * @param user The address of the rentee.
     * @param expires The timestamp when the rental expires.
     */
    function rentNFT(uint256 tokenId, address user, uint256 expires)
        external onlyOperator whenNotPaused nonReentrant
    {
        require(user != address(0), "Zero address");
        require(tokenOwners[tokenId] != address(0), "No token");
        require(expires > block.timestamp && expires <= block.timestamp + MAX_RENTAL_PERIOD, "Invalid period");
        require(nftRenteeDetail[tokenId].expires <= block.timestamp, "Already rented");
        nftRenteeDetail[tokenId] = UserInfo(user, expires);
        emit RentUpdate(tokenId, user, expires);
    }

    /** @dev UPDATES **/

    /**
     * @dev Updates the prices for an NFT.
     * @param tokenId The ID of the token.
     * @param monthly The new monthly price.
     * @param yearly The new yearly price.
     * @param price The new direct purchase price.
     */
    function updateNFTPrices(uint256 tokenId, uint256 monthly, uint256 yearly, uint256 price)
        external onlyOperator whenNotPaused
    {
        require(tokenOwners[tokenId] != address(0), "No token");
        nftDetail[tokenId] = NftDetail(monthly, yearly, price);
        emit PricesUpdated(tokenId, monthly, yearly, price);
    }

    /**
     * @dev Sets the token URI for an NFT. Only callable by admin or token owner.
     * @param tokenId The ID of the token.
     * @param uri The new URI for the token.
     */
    function setTokenURI(uint256 tokenId, string calldata uri) external whenNotPaused {
        require(tokenOwners[tokenId] != address(0), "No token");
        require(bytes(uri).length > 0, "Empty URI");
        require(
            msg.sender == owner || msg.sender == operator ||
            msg.sender == tokenOwners[tokenId],
            "Unauthorized"
        );
        tokenURIs[tokenId] = uri;
        emit TokenURIUpdated(tokenId, uri);
    }

    /**
     * @dev Securely transfers an NFT.
     * @param from The current owner of the token.
     * @param to The new owner.
     * @param tokenId The ID of the token to transfer.
     */
    function secureTransferFrom(address from, address to, uint256 tokenId)
        external whenNotPaused nonReentrant
    {
        require(to != address(0), "Zero address");
        require(to != from, "Same address");
        require(tokenOwners[tokenId] == from, "Not owner");
        require(
            msg.sender == from || msg.sender == owner || msg.sender == operator,
            "Unauthorized"
        );
        require(nftRenteeDetail[tokenId].expires <= block.timestamp, "Rented");
        tokenOwners[tokenId] = to;
        delete nftRenteeDetail[tokenId];
        emit Transfer(from, to, tokenId);
    }

    /** @dev VIEW **/

    /**
     * @dev Gets the owner of a specific token.
     * @param tokenId The ID of the token.
     * @return The address of the token owner.
     */
    function ownerOf(uint256 tokenId) external view returns (address) {
        require(tokenOwners[tokenId] != address(0), "No token");
        return tokenOwners[tokenId];
    }

    /**
     * @dev Gets the URI of a specific token.
     * @param tokenId The ID of the token.
     * @return The URI string.
     */
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(tokenOwners[tokenId] != address(0), "No token");
        return tokenURIs[tokenId];
    }

    /**
     * @dev Checks if a token is currently rented.
     * @param tokenId The ID of the token.
     * @return True if the token is rented, false otherwise.
     */
    function isRented(uint256 tokenId) external view returns (bool) {
        return nftRenteeDetail[tokenId].expires > block.timestamp;
    }

    /**
     * @dev Gets the next available token ID to be minted.
     * @return The next token ID.
     */
    function getNextTokenId() external view returns (uint256) {
        return tokenIdCounter;
    }
}