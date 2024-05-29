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

        it('Should set proper price for ticket in first sector', async function() {
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
        it('Should allow organizer to withdraw funds', async function() {
            const { event, org, eventGoer } = await loadFixture(deployFactoryFixture);
            const tokenId = 1;
            await event.connect(eventGoer)['buyTicket'](tokenId, 1,
                {
                    value: ethers.utils.parseUnits(
                      (testFixtures.sectorsPrice[0]).toString(),
                      'wei'
                    ),
                }
            )

            const prevBalance = await org.getBalance();
            await event.connect(org)['withdrawOrgCredits']();
            const newBalance = await org.getBalance();
            await expect(newBalance.sub(prevBalance)).to.be.greaterThan(0)      
        })

        it('Should zero organizer funds after withdraw', async function() {
            const { event, org, eventGoer } = await loadFixture(deployFactoryFixture);
            const tokenId = 1;
            await event.connect(eventGoer)['buyTicket'](tokenId, 1,
                {
                    value: ethers.utils.parseUnits(
                      (testFixtures.sectorsPrice[0]).toString(),
                      'wei'
                    ),
                }
            )
            await event.connect(org)['withdrawOrgCredits']();
            const prevBalance = await org.getBalance();
            await event.connect(org)['withdrawOrgCredits']();
            const newBalance = await org.getBalance();
            await expect(newBalance.sub(prevBalance)).to.be.lessThan(0)      
        })

        it('Should revert if not organizer want to withdraw', async function() {
            const { event, eventGoer } = await loadFixture(deployFactoryFixture);
            await expect(
                event
                  .connect(eventGoer)
                  ['withdrawOrgCredits']()
              ).to.be.revertedWithCustomError(event, testFixtures.ErrorMessages.OnlyOwner)
        })
    })

    describe('Tickets', function() {
        it('Should transfer ticket to buyer', async function() {
            const { event, eventGoer } = await loadFixture(deployFactoryFixture);
            const tokenId = 1;
            const amount = 1;
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
              ).to.be.equal(amount);
        })

        it('Should transfer specified amount of tickets to buyer', async function() {
            const { event, eventGoer } = await loadFixture(deployFactoryFixture);
            const tokenId = 51;
            const amount = 5;
            await event.connect(eventGoer)['buyTicket'](tokenId, amount,
                {
                    value: ethers.utils.parseUnits(
                      (testFixtures.sectorsPrice[2] * amount).toString(),
                      'wei'
                    ),
                }
            )
            expect(
                await event['balanceOf'](eventGoer.address, tokenId)
              ).to.be.equal(amount);
        })

        it("Should revert if tokenId doesn't exists", async function () {
            const { event, eventGoer } = await loadFixture(
              deployFactoryFixture
            );
            const tokenId = 990;
            const amount = 1;
      
            await expect(
              event.connect(eventGoer)['buyTicket'](tokenId, amount)
            ).to.be.revertedWithCustomError(event, testFixtures.ErrorMessages.TokenNotAvailable)
        });
      
        it('Should revert if user want to buy more than is available', async function () {
            const { event, eventGoer } = await loadFixture(
                deployFactoryFixture
              );
              const tokenId = 1;
              const amount = 99999;
        
              await expect(
                event.connect(eventGoer)['buyTicket'](tokenId, amount)
              ).to.be.revertedWithCustomError(event, testFixtures.ErrorMessages.TokenNotAvailable)
        });

        it('Should revert if user pay less than ticket price', async function() {
            const { event, eventGoer } = await loadFixture(deployFactoryFixture);
            const tokenId = 1;
            await expect( event.connect(eventGoer)['buyTicket'](tokenId, 1,
                {
                    value: ethers.utils.parseUnits(
                      (testFixtures.sectorsPrice[0] - 1).toString(),
                      'wei'
                    ),
                }
            )).to.be.revertedWithCustomError(event, testFixtures.ErrorMessages.InsufficientFounds)
        })

        it('Should revert if token already sold', async function() {
            const { event, eventGoer } = await loadFixture(deployFactoryFixture);
            const tokenId = 1;
            const amount = 1;
            await event.connect(eventGoer)['buyTicket'](tokenId, amount, 
                {
                    value: ethers.utils.parseUnits(
                      (testFixtures.sectorsPrice[0]).toString(),
                      'wei'
                    ),
                }
            )
            await expect(event.connect(eventGoer)['buyTicket'](tokenId, amount,
                {
                    value: ethers.utils.parseUnits(
                      (testFixtures.sectorsPrice[0]).toString(),
                      'wei'
                    ),
                }
            )).to.be.revertedWithCustomError(event, testFixtures.ErrorMessages.TokenNotAvailable)
        })

        it('Should add token to sold token list after purchase', async function() {
            const { event, eventGoer } = await loadFixture(deployFactoryFixture);
            const tokenId = 1;
            const amount = 1;
            await event.connect(eventGoer)['buyTicket'](tokenId, amount, 
                {
                    value: ethers.utils.parseUnits(
                      (testFixtures.sectorsPrice[0]).toString(),
                      'wei'
                    ),
                }
            )
            const soldTokenIds = await event['getSoldTokenIds'](); 
            expect(soldTokenIds[0].toString()).to.be.equal(tokenId.toLocaleString())
        })
    })
})