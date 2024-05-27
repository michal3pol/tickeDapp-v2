
const main = async () => {
    
    const nftContractFactory = await hre.ethers.getContractFactory('Event');
    const nftContract = await nftContractFactory.attach("0x241d9885603253dF96bA6251D71412D65117f46a");

    const tokenId = 3;

    const estimatedGasNFT = await nftContract.estimateGas.buyTicket(
        tokenId,
        1, {
            value: "100000000000000"
        }
    )
    console.log(estimatedGasNFT.toString())

    tokenIdSFT = 1;
    const estimatedGasSFT = await nftContract.estimateGas.buyTicket(
        tokenIdSFT,
        1, {
            value: "100000000000000"
        }
    )
    console.log(estimatedGasSFT.toString())
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