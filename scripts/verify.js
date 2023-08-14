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
      address: contracts.telegramRussianRoulette,
      constructorArguments: ["0xB38E718996d2673b888af4d7E6402e85703e6086",
        "1000",
        "900",
        "100",
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
