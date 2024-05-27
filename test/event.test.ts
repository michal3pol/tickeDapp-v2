import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import * as testFixtures from './fixtures.test'

describe('Event contract', function() {

    // runs once and restores state before each
    async function deployFactoryFixture() {
        const [org, eventGoer] = await ethers.getSigners();

        const eventFactory = await ethers.getContractFactory('Event');
        const event = await eventFactory.deploy(
            org.address,
            testFixtures.ipfsLink,
            testFixtures.sectorsName,
            testFixtures.sectorsNoPlace,
            testFixtures.sectorsNumerable,
            testFixtures.sectorsPrice
        );
        await event.deployed();

        return {
            event,
            org,
            eventGoer
        } 
    }

    describe('Event creation', function() {
        it('Should assign organizer address', async function() {
            const { event, org } = await loadFixture(deployFactoryFixture);
            expect(await event['orgAddress']()).to.be.equal(org.address)
        })

        it('Should assign ipfs storage address', async function() {
            const { event } = await loadFixture(deployFactoryFixture);
            expect(await event['ipfsLink']()).to.be.equal(testFixtures.ipfsLink)
        })

        it('Should have empty sold token ids', async function() {
            const { event } = await loadFixture(deployFactoryFixture);
            expect(await event['getSoldTokenIds']()).to.be.empty
        })
    })

    describe('Tickets as tokens initialization', function() {
        it('Should create proper amount of tokens', async function() {
            const { event } = await loadFixture(deployFactoryFixture);
            expect(await event['balanceOf'](event.address, 
                testFixtures.numberOfNFTs + testFixtures.numberOfSFTs)).to.be.greaterThan(0)
            expect(await event['balanceOf'](event.address, 
                testFixtures.numberOfNFTs + testFixtures.numberOfSFTs + 1)).to.be.equal(0)
        })

        it('Should omit token with id 0 (description on ipfs)', async function() {
            const { event } = await loadFixture(deployFactoryFixture);
            expect(await event['balanceOf'](event.address, 0)).to.be.equal(0)
        })

        it('Shoul set proper price for ticket in first sector', async function() {
            const { event, eventGoer } = await loadFixture(deployFactoryFixture);
            const tokenId = 1;
            await event.connect(eventGoer)['buyTicket'](tokenId, 1,
                {
                    value: ethers.utils.parseUnits(
                      (testFixtures.sectorsPrice[0]).toString(),
                      'wei'
                    ),
                }
            )
            expect(
                await event['balanceOf'](eventGoer.address, tokenId)
            ).to.be.equal(1);
        })
    })

    describe('Organizer functionalities', function() {
        it('Should allow organizer to withdraw funds', )
    })

})