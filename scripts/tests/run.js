
// SCRIPT FOR RUNNING ON TESTNETS

const main = async () => {

    const [owner] = await ethers.getSigners();

    const nftContractFactory = await hre.ethers.getContractFactory('EventFactory');

    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);
    
    const unixTime = 1718985600; // Fri Jun 21 2024 18:00:00 GMT+0200 (czas środkowoeuropejski letni)

    //let txn = await nftContract.createEvent("Initial concert from run!", "First concert of aaa in aaa!", 1669495020, st );
    //await txn.wait();
    let image = "https://bafkreiajmvoddrzqjupncsvhyyqdphmz3nrztglogtotimizqm7jhsmqza.ipfs.nftstorage.link/"

    sectorsName = ["A1", "B1"];
    sectorsNoPlace = [12, 15];
    sectorsNumerable = [0, 1];
    sectorsPrice = [500, 111];

    let txn = await nftContract.createEvent(1, "ipfsLINK.blabla", sectorsName, sectorsNoPlace, sectorsNumerable, sectorsPrice);
    await txn.wait();
    
    let eventInfo = await nftContract.getEventsByType(1);
    console.log("event info " + eventInfo);
    console.log("Subcontract address cls" + eventInfo[0].eventAddress);

    let contracts = await nftContract.getOrganizerEvents(owner.address);

    // deployed nft smartcontract
    const subcontractFactory = await hre.ethers.getContractFactory('Event');

    const subcontract = await subcontractFactory.attach(eventInfo[0].eventAddress);
    let uri0 = await subcontract.uri(0);
    console.log(uri0)

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