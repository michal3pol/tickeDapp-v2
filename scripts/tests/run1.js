
// SCRIPT FOR RUNNING ON TESTNETS

const main = async () => {

    // const [owner] = await ethers.getSigners();
  
      const nftContractFactory = await hre.ethers.getContractFactory('EventFactory');
      const nftContract = await nftContractFactory.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")

      let eventInfo = await nftContract.getEventsByTypes(0);
      console.log("event info " + eventInfo);
      console.log("Subcontract address cls" + eventInfo[0].eventAddress);
  
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