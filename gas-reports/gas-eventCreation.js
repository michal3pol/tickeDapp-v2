// RUN COMMAND:
// powershell
// $env:contractAddress="0x3bCD41AC6acc6C7071da1f02a2e46a98a9e8E4E1"; npx hardhat run .\gas-reports\gas-eventCreation.js --network sepolia

const main = async () => {
    const [owner] = await ethers.getSigners();
    
    const nftContractFactory = await hre.ethers.getContractFactory('EventFactory');
    const nftContract = await nftContractFactory.attach(process.env.contractAddress);
    // const nftContract = await nftContractFactory.deploy();
    // await nftContract.deployed();

    // Small concert with 20 tickets
    const sectorsNameS = ["blasbdlbdlasdbsaldbsaldbasldyubsalduybasldyasbdlasd", "blasbdlbdlasdbsaldbsaldbasldyubsalduybasldyasbdlasd"];
    const sectorsNoPlaceS = [10, 10];
    const sectorsNumerableS = [0, 1];
    const sectorsPriceS = [1000000000000000, 1000000000000000];

    // Estimating gas for createEvent method using callStatic
    const estimatedGasS = await nftContract.estimateGas.createEvent(
        1, 
        "https://bafkreiajmvoddrzqjupncsvhyyqdphmz3nrztglogtotimizqm7jhsmqza.ipfs.nftstorage.link", 
        sectorsNameS, 
        sectorsNoPlaceS, 
        sectorsNumerableS, 
        sectorsPriceS
    );
    console.log("Estimated Gas Units for SMALL - 10 createEvent: ", estimatedGasS.toString());

    // Medium concert for 100 tickets
    const sectorsNameM = ["A1", "A2", "A3", "A4"];
    const sectorsNoPlaceM = [25, 25, 25, 25];
    const sectorsNumerableM = [0, 0, 1, 1];
    const sectorsPriceM = [1000000000000000, 1000000000000000, 1000000000000000, 1000000000000000];

    // Estimating gas for createEvent method using callStatic
    const estimatedGasM = await nftContract.estimateGas.createEvent(
        1, 
        "https://bafkreiajmvoddrzqjupncsvhyyqdphmz3nrztglogtotimizqm7jhsmqza.ipfs.nftstorage.link", 
        sectorsNameM, 
        sectorsNoPlaceM, 
        sectorsNumerableM, 
        sectorsPriceM
    );
    console.log("Estimated Gas Units for MEDIUM - 100 createEvent: ", estimatedGasM.toString());
    
    // Medium2 concert for 500 tickets
    const sectorsNameM2 = ["A1", "A2", "A3"];
    const sectorsNoPlaceM2 = [200, 200, 100];
    const sectorsNumerableM2 = [0, 0, 1];
    const sectorsPriceM2 = [1000000000000000, 1000000000000000, 1000000000000000];

    // Estimating gas for createEvent method using callStatic
    const estimatedGasM2 = await nftContract.estimateGas.createEvent(
        1, 
        "https://bafkreiajmvoddrzqjupncsvhyyqdphmz3nrztglogtotimizqm7jhsmqza.ipfs.nftstorage.link", 
        sectorsNameM2, 
        sectorsNoPlaceM2, 
        sectorsNumerableM2, 
        sectorsPriceM2
    );
    console.log("Estimated Gas Units for MEDIUM - 500 createEvent: ", estimatedGasM2.toString());

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