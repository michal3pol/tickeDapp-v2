
// SCRIPT FOR RUNNING ON TESTNETS

const main = async () => {

    const [owner] = await ethers.getSigners();

    const nftContractFactory = await hre.ethers.getContractFactory('EventFactory');

    // Real deploy on blockchain 
    /*
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    const txn = await nftContract.deployTransaction.wait();
    const receipt = await hre.ethers.provider.getTransactionReceipt(txn.transactionHash);
    const gasUsed = receipt.gasUsed;
    const gasPricePaid = receipt.effectiveGasPrice;
    const transactionFee = gasUsed.mul(gasPricePaid);
    console.log("Real transaction fee: " + transactionFee.toString());
    console.log(receipt)
    */

    // Estimation without deploy (returns always max gas units, not all have to be used)
    const estimatedGas = await nftContractFactory.signer.estimateGas(nftContractFactory.getDeployTransaction());
    console.log("Estimated Gas Units: ", estimatedGas.toString());
  };

  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();