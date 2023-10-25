const { ethers, upgrades } = require("hardhat");
const fs = require("fs");

async function main() {
	//* Loading accounts */
	const accounts = await ethers.getSigners();

	console.log('=====================================================================================');
	console.log('ACCOUNTS:');
	console.log('=====================================================================================');
	for (let i = 0; i < accounts.length; i++) {
		const account = accounts[i];
		console.log(` Account ${i}: ${account.address}`);
	}

	//* Loading contract factory */
	const TelegramMineSweper = await ethers.getContractFactory("TelegramMineSweper");
	const NikosGame = await ethers.getContractFactory("NikosGame");

	//* Deploy contracts */
	console.log("================================================================================");
	console.log("DEPLOYING CONTRACTS");
	console.log("================================================================================");

	const telegramMineSweper = await TelegramMineSweper.attach("0x2F341a1473ddf528e75D6BBA9cc6C28BE024b9b5");
	await telegramMineSweper.callStatic.newGame(555, 4, 1000, "0x6162630000000000000000000000000000000000000000000000000000000000", [accounts[0].address, "0x2421Fe061b874B72F9bd347A03F21E2D80cb1D7E"], 1200);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
