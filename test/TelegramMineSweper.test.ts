import { expect } from "chai";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { upgrades, ethers } from "hardhat";
import { ZERO_ADDRESS as AddressZero, MAX_UINT256 as MaxUint256, BN, ZERO_ADDRESS, getTimestamp } from "./utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
    TokenTest,
    TokenTest__factory,
    TelegramMineSweper,
    TelegramMineSweper__factory
} from "../typechain-types";
import bigDecimal from "js-big-decimal";
import { BigNumber } from "ethers";

// signer variables
let owner: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let accounts: SignerWithAddress[];

// contract instance
let tokenTest: TokenTest;
let telegramMineSweper: TelegramMineSweper;

const ONE_DAY = 1 * 24 * 60 * 60;
const ONE_ETHER = ethers.utils.parseEther('1');
const ETHER_100M = ethers.utils.parseEther('100000000');
const ETHER_100K = ethers.utils.parseEther('100000');

const MAX_UINT256 = ethers.constants.MaxUint256;

describe("TelegramMineSweper", () => {
    beforeEach(async () => {
        [owner, user1, user2, ...accounts] = await ethers.getSigners();

        const TelegramMineSweper: TelegramMineSweper__factory = await ethers.getContractFactory("TelegramMineSweper");
        const TokenTest: TokenTest__factory = await ethers.getContractFactory("TokenTest");

        tokenTest = await TokenTest.deploy();
        await tokenTest.deployed();

        telegramMineSweper = await TelegramMineSweper.deploy(tokenTest.address, "1000", "0", "500", owner.address) as TelegramMineSweper;
        await telegramMineSweper.deployed();

        await tokenTest.connect(user1).approve(telegramMineSweper.address, ETHER_100M);
        await tokenTest.mint(user1.address, ETHER_100M);

        await tokenTest.connect(user2).approve(telegramMineSweper.address, ETHER_100M);
        await tokenTest.mint(user2.address, ETHER_100M);
    });

    describe("newGame", () => {
        it('should return successfully', async () => {
            const hashedMineSweper = ethers.utils.formatBytes32String("abc");
            await telegramMineSweper.newGame(1, 5, ETHER_100K, hashedMineSweper, [user1.address, user2.address], ETHER_100K);
        });
    });
});
