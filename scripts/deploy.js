/* 
* This script deploy contract
*/

const main = async () => {

  const eventFactoryFactory = await hre.ethers.getContractFactory('EventFactory');
  const eventFactory = await eventFactoryFactory.deploy();
  await eventFactory.deployed();
  console.log("Contract Event Factory deployed to:", eventFactory.address);

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