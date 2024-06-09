// RUN COMMAND:
// powershell
// $env:contractAddress="0x3bCD41AC6acc6C7071da1f02a2e46a98a9e8E4E1"; npx hardhat run .\gas-reports\gas-eventCreation.js --network sepolia

const main = async () => {
    const [owner] = await ethers.getSigners();
    
    const nftContractFactory = await hre.ethers.getContractFactory('EventFactory');
    const nftContract = await nftContractFactory.attach(process.env.contractAddress);
    // const nftContract = await nftContractFactory.deploy();
    // await nftContract.deployed();

    // SFT
    const sectorsNameS = ["A1"];
    const sectorsNoPlaceS = [50];
    const sectorsNumerableS = [false];
    const sectorsPriceS = [1000000000000000];

    // Estimating gas for createEvent method using callStatic
    const estimatedGasS = await nftContract.estimateGas.createEvent(
        1, 
        "https://bafkreiajmvoddrzqjupncsvhyyqdphmz3nrztglogtotimizqm7jhsmqza.ipfs.nftstorage.link", 
        sectorsNameS, 
        sectorsNoPlaceS, 
        sectorsNumerableS, 
        sectorsPriceS
    );
    console.log("Estimated Gas Units for event with 50 SFT: ", estimatedGasS.toString());

    // NFT
    const sectorsNameN = ["A1"];
    const sectorsNoPlaceN = [50];
    const sectorsNumerableN = [true];
    const sectorsPriceN = [1000000000000000];

    // Estimating gas for createEvent method using callStatic
    const estimatedGasN = await nftContract.estimateGas.createEvent(
        1, 
        "https://bafkreiajmvoddrzqjupncsvhyyqdphmz3nrztglogtotimizqm7jhsmqza.ipfs.nftstorage.link", 
        sectorsNameN, 
        sectorsNoPlaceN, 
        sectorsNumerableN, 
        sectorsPriceN
    );
    console.log("Estimated Gas Units for event with 50 NFT: ", estimatedGasN.toString());
    
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