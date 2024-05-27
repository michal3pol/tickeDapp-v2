# First set of data
Write-Host "Sepolia dev, addr: 0xF951645DbDf8051676999F44c26233c7edA7EEC1"
$env:contractAddress="0xF951645DbDf8051676999F44c26233c7edA7EEC1"
npx hardhat run .\gas-reports\gas-eventCreation.js --network sepolia

# Second set of data
Write-Host "Polygon zkEVM dev, addr: 0xc43766eDa341cb46FC39E5d995fBeB3A22701D4C"
$env:contractAddress="0xc43766eDa341cb46FC39E5d995fBeB3A22701D4C"
npx hardhat run .\gas-reports\gas-eventCreation.js --network zkEVM

# Third set of data
Write-Host "Neon dev net, addr: 0xd6084291EAe5CE4c6267Df602C1EA829450ABbfA"
$env:contractAddress="0xd6084291EAe5CE4c6267Df602C1EA829450ABbfA"
npx hardhat run .\gas-reports\gas-eventCreation.js --network neondevnet