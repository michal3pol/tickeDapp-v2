
// SCRIPT FOR RUNNING ON TESTNETS

const main = async () => {

    const [owner] = await ethers.getSigners();
  
      const nftContractFactory = await hre.ethers.getContractFactory('EventFactory');
      const nftContract = await nftContractFactory.attach("0xF951645DbDf8051676999F44c26233c7edA7EEC1")

      // let eventInfo = await nftContract.getEventsByTypes(0);
      // console.log("event info " + eventInfo);
      // console.log("Subcontract address cls" + eventInfo[0].eventAddress);

      console.log(owner.address)
      let contracts = await nftContract.getOrganizerEvents(owner.address);
    console.log("HERE EVENTS")
    console.log(contracts);
    console.log("HERE EVENTS")
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