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

	const nikosGame = await NikosGame.deploy();
	await nikosGame.deployed();
	console.log("NikosGame                     deployed to:>>", nikosGame.address);

	const telegramMineSweper = await TelegramMineSweper.deploy(nikosGame.address, "1000", "0", "500", accounts[0].address);
	await telegramMineSweper.deployed();
	console.log("TelegramMineSweper                     deployed to:>>", telegramMineSweper.address);

	console.log("==========================================================================");
	console.log("VERIFY CONTRACTS");
	console.log("==========================================================================");

	await nikosGame.setRouletteContract(telegramMineSweper.address);

	console.log("================================================================================");
	console.log("DONE");
	console.log("================================================================================");

	const contracts = {
		telegramMineSweper: telegramMineSweper.address,
		nikosGame: nikosGame.address
	};

	await fs.writeFileSync("contracts.json", JSON.stringify(contracts));

	const contractVerify = {
		telegramMineSweper: telegramMineSweper.address,
		nikosGame: nikosGame.address
	};

	await fs.writeFileSync("contracts-verify.json", JSON.stringify(contractVerify));

	await hre
		.run("verify:verify", {
			address: nikosGame.address
		})
		.catch(console.log);

	await hre
		.run("verify:verify", {
			address: telegramMineSweper.address,
			constructorArguments: [nikosGame.address, "1000", "0", "500", accounts[0].address]
		})
		.catch(console.log);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
