// RUN COMMAND:
// powershell
// $env:contractAddress="0x3bCD41AC6acc6C7071da1f02a2e46a98a9e8E4E1"; npx hardhat run .\gas-reports\gas-eventCreation.js --network sepolia

const main = async () => {
    const [owner] = await ethers.getSigners();
    
    const nftContractFactory = await hre.ethers.getContractFactory('StorageTest');
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();

    const nameE = ""
    const descriptionE = ""
    const imageLinkE = "" 
    const dateE = 0
    const sectorsE = []; 
    const tokensE = []

    const estimatedGasE = await nftContract.estimateGas.store(nameE, descriptionE, imageLinkE, dateE, sectorsE, tokensE);
    console.log("Estimated Gas Units empty", estimatedGasE.toString());

    // this is 128 bajtów - 1024bity -> strings - 688 bits, numbers - 10*8bits + 1*256
    const name1 = "Concert name"
    const description1 = "this is a test description this is a test test descriptionn"
    const imageLink1 = "testtest.com" 
    const date1 = 1717954572
    const sectors1 = ['A1']; 
    const tokens1 = [1,2,3,4,5,6,7,8,9,10]

    const estimatedGas1 = await nftContract.estimateGas.store(name1, description1, imageLink1, date1, sectors1, tokens1);
    console.log("Estimated Gas Units [1] ", estimatedGas1.toString());


    // 1kB - strings - 6568 bits, numbers - 160*8bits + 1*256 - 8192 
    const name2 = "The Beatles - Magical Mystery Journey Tour Sandomierz"
    const description2 = "Join us on the Magical Mystery Journey, a spectacular tour celebrating the timeless music and legacy of The Beatles. Relive the magic as we travel through the iconic eras of their career, from the early days in Liverpool to the heights of global superstardom. Featuring a stunning live band, immersive multimedia, and rare archival footage, this tour is a must-see for Beatles fans of all ages. Step aboard the yellow submarine, twist and shout with your friends, and experience the Fab Four like never before! Featuring a stunning live band, immersive multimedia, and rare archival footage, this tour is a must-see for Beatles fans of all ages. Step aboard the yellow submarine, twist and shout with your friends, and experience the Fab Four like never before!"
    const imageLink2 = "testtest.com" 
    const date2 = 1717954572
    const sectors2 = ['A1', 'A2']; 
    const tokens2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,123,123,123,123,123,123,123,123,123,123]

    const estimatedGas2 = await nftContract.estimateGas.store(name2, description2, imageLink2, date2, sectors2, tokens2);
    console.log("Estimated Gas Units [2] ", estimatedGas2.toString());

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