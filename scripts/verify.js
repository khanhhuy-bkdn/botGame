const hre = require("hardhat");
const contracts = require("../contracts-verify.json");

async function main() {
  // Verify contracts
  console.log(
    "========================================================================================="
  );
  console.log("VERIFY CONTRACTS");
  console.log(
    "========================================================================================="
  );

  // await hre
  //   .run("verify:verify", {
  //     address: "0x20b1C7744AAcf4DB4E0fcce6C47F3c770fDf43F1"
  //   })
  //   .catch(console.log);

  // for (key in contracts)
  //   await hre
  //     .run("verify:verify", {
  //       address: contracts[key]
  //     })
  //     .catch(console.log);

  await hre
    .run("verify:verify", {
      address: contracts.telegramMineSweper,
      constructorArguments: ["0x5336ACf74752DbC825B7B6FeB5Ce36550991C7B5",
        "1000", "0", "500",
        "0xE18a6e52428aa8E7d96B4221247f052c9Fa916c0"
      ]
    })
    .catch(console.log);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
