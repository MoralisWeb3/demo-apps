const { expect } = require("chai");

const name = "Africa Land Registry";
const symbol = "LAND";
const baseUri = "ipfs://";

describe("LandRegistry", function () {
  let ownerSigner, signer1, signer2;
  before(async () => {
    [ownerSigner, signer1, signer2] = await ethers.getSigners();
  });

  const deploy = async () => {
    const LandRegistry = await ethers.getContractFactory("LandRegistry");
    const landRegistry = await LandRegistry.deploy(name, symbol, baseUri);
    await landRegistry.deployed();
    return landRegistry;
  };

  it("Should deploy", async function () {
    const landRegistry = await deploy();

    expect(await landRegistry.name()).to.equal(name);
    expect(await landRegistry.symbol()).to.equal(symbol);
    expect(await landRegistry.baseURI()).to.equal(baseUri);
  });

  describe('mint', () => {
    it('should set the token uri', async()=>{
      const contract = await deploy();
      const uri = "1a2b3c4d5e6f1a2b3c4d5e6f";
      expTokenUri = baseUri + uri;
      
      await contract.mint(uri, signer1.getAddress());

      expect(await contract.tokenURI(0)).to.equal(expTokenUri);
    });
  });
  

  describe("Transfer role", () => {
    let contractUser1;
    const tokenId = 0;

    before(async () => {
      const contract = await deploy();
      const uri = "1a2b3c4d5e6f1a2b3c4d5e6f";
      await contract.mint(uri, signer1.getAddress());
      contractUser1 = contract.connect(signer1);
    });

    describe("When caller does NOT have Transfer role", () => {
      it("should NOT allow approval", async () => {
        await expect(
          contractUser1.approve(signer2.getAddress(), tokenId)
        ).to.be.revertedWith("does not have TRANSFER role");
      });

      it("should NOT allow tansferFrom", async () => {
        await expect(
          contractUser1.transferFrom(
            signer1.getAddress(),
            signer2.getAddress(),
            tokenId
          )
        ).to.be.revertedWith("does not have TRANSFER role");
      });

      it("should NOT allow safeTransferFrom", async () => {
        // console.log(contractUser1);
        await expect(
          contractUser1.safeTransferFrom(
            signer1.getAddress(),
            signer2.getAddress(),
            tokenId,
            ""
          )
        ).to.be.revertedWith("does not have TRANSFER role");
      });
    });    
  });
});
