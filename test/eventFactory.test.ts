import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import * as testFixtures from './fixtures.test'
import { EventInfo } from 'src/types/event.model';

describe('EventFactory contract', function() {

    async function deployFactoryFixture() {
        const [owner, org, eventGoer] = await ethers.getSigners();

        const eventFactoryF = await ethers.getContractFactory('EventFactory');
        const eventFactory = await eventFactoryF.deploy();
        await eventFactory.deployed();

        return {
            eventFactory,
            owner,
            org,
            eventGoer
        } 
    }

    describe('Owner (deployer) functionalities', function() {
        it('Should set deployer as owner', async function() {
            const { eventFactory, owner } = await loadFixture(deployFactoryFixture)
            expect(await eventFactory['ownerAddr']()).to.equal(owner.address)
        })

        it('Should allow owner to change fee', async function() {
            const { eventFactory, owner } = await loadFixture(deployFactoryFixture)
            const newFee = 1
            eventFactory['updateOrgFee'](newFee)
            expect(await eventFactory['ownerFee']()).to.equal(newFee)
        })

        it('Should revert if not owner want to change fee', async function() {
            const { eventFactory, org } = await loadFixture(deployFactoryFixture)
            const newFee = 1
            await expect(
                eventFactory
                  .connect(org)
                  ['updateOrgFee'](newFee)
              ).to.be.revertedWithCustomError(eventFactory, testFixtures.ErrorMessages.OnlyOwner)
        })
        
        it('Should revert if not owner want to withdraw fees', async function() {
            const { eventFactory, org } = await loadFixture(deployFactoryFixture)
            await expect(
                eventFactory
                  .connect(org)
                  ['withdrawOrgCredits']()
              ).to.be.revertedWithCustomError(eventFactory, testFixtures.ErrorMessages.OnlyOwner)
        })

        it('Should withdraw if owner want to withdraw fees', async function() {
            const { eventFactory, owner, org } = await loadFixture(deployFactoryFixture)
            const newFee = 1000000000000000
            eventFactory['updateOrgFee'](newFee)

            await eventFactory.connect(org)['createEvent']
                (testFixtures.eventType, testFixtures.ipfsLink, testFixtures.sectorsName, testFixtures.sectorsNoPlace,
                    testFixtures.sectorsNumerable, testFixtures.sectorsPrice, 
                    {
                        value: ethers.utils.parseUnits(
                          (1000000000000000).toString(),
                          'wei'
                        ),
                      }
                )
            const prevBalance = await owner.getBalance();
            await eventFactory.connect(owner)['withdrawOrgCredits']();
            const newBalance = await owner.getBalance();
            await expect(newBalance.sub(prevBalance)).to.be.greaterThan(0)            
        })

    })

    describe('Rate functionality', function () {
        it("Should add positive vote for organizer", async function() {
            const { eventFactory, org, eventGoer } = await loadFixture(deployFactoryFixture)
            await eventFactory.connect(org)['createEvent']
                (testFixtures.eventType, testFixtures.ipfsLink, testFixtures.sectorsName, testFixtures.sectorsNoPlace,
                    testFixtures.sectorsNumerable, testFixtures.sectorsPrice)
            
            await eventFactory.connect(eventGoer)['rateOrganizer'](org.address, true);
            const organizerScore: testFixtures.RateScoreTest = await eventFactory['getOrganizerScore'](org.address); 
            await expect(organizerScore.postiveVotes).to.be.equal(1);
            await expect(organizerScore.negativeVotes).to.be.equal(0);
        })

        it("Should add negative vote for organizer", async function() {
            const { eventFactory, org, eventGoer } = await loadFixture(deployFactoryFixture)
            await eventFactory.connect(org)['createEvent']
                (testFixtures.eventType, testFixtures.ipfsLink, testFixtures.sectorsName, testFixtures.sectorsNoPlace,
                    testFixtures.sectorsNumerable, testFixtures.sectorsPrice)
            
            await eventFactory.connect(eventGoer)['rateOrganizer'](org.address, false);
            const organizerScore: testFixtures.RateScoreTest = await eventFactory['getOrganizerScore'](org.address); 
            await expect(organizerScore.postiveVotes).to.be.equal(0);
            await expect(organizerScore.negativeVotes).to.be.equal(1);
        })

        it("Should add votes for two organizer", async function() {
            const { eventFactory, owner, org, eventGoer } = await loadFixture(deployFactoryFixture)
            await eventFactory.connect(org)['createEvent']
                (testFixtures.eventType, testFixtures.ipfsLink, testFixtures.sectorsName, testFixtures.sectorsNoPlace,
                    testFixtures.sectorsNumerable, testFixtures.sectorsPrice)
            
            await eventFactory.connect(eventGoer)['rateOrganizer'](org.address, false);
            const organizerScore: testFixtures.RateScoreTest = await eventFactory['getOrganizerScore'](org.address); 
            await expect(organizerScore.postiveVotes).to.be.equal(0);
            await expect(organizerScore.negativeVotes).to.be.equal(1);

            // second organizer is owner
            await eventFactory.connect(eventGoer)['rateOrganizer'](owner.address, true);
            const organizerScoreOwner: testFixtures.RateScoreTest = await eventFactory['getOrganizerScore'](owner.address); 
            await expect(organizerScoreOwner.postiveVotes).to.be.equal(1);
            await expect(organizerScoreOwner.negativeVotes).to.be.equal(0);
        })

        it("Should revert if user vote second time for same organizer", async function() {
            const { eventFactory, org, eventGoer } = await loadFixture(deployFactoryFixture)
            await eventFactory.connect(org)['createEvent']
                (testFixtures.eventType, testFixtures.ipfsLink, testFixtures.sectorsName, testFixtures.sectorsNoPlace,
                    testFixtures.sectorsNumerable, testFixtures.sectorsPrice) 
            
            await eventFactory.connect(eventGoer)['rateOrganizer'](org.address, false);
            const organizerScore: testFixtures.RateScoreTest = await eventFactory['getOrganizerScore'](org.address); 
            await expect(organizerScore.postiveVotes).to.be.equal(0);
            await expect(organizerScore.negativeVotes).to.be.equal(1);

            await expect(
                eventFactory
                  .connect(eventGoer)
                  ['rateOrganizer'](org.address, false)
              ).to.be.revertedWithCustomError(eventFactory, testFixtures.ErrorMessages.AlreadyVoted)
        })
    })

    describe('Creating events functionality', function () {
        it("Should create event with specified event type", async function() {
            const { eventFactory, org } = await loadFixture(deployFactoryFixture)
            await eventFactory.connect(org)['createEvent']
                (testFixtures.eventType, testFixtures.ipfsLink, testFixtures.sectorsName, testFixtures.sectorsNoPlace,
                    testFixtures.sectorsNumerable, testFixtures.sectorsPrice) 

            const eventInfo: EventInfo[] = await eventFactory['getEventsByType'](testFixtures.eventType)
            await expect(eventInfo[0].descLink).to.be.equal(testFixtures.ipfsLink)
        })

        it("Should create event with specified fee", async function() {
            const { eventFactory, org } = await loadFixture(deployFactoryFixture)
            const newFee = 1000000000000000
            eventFactory['updateOrgFee'](newFee)

            await eventFactory.connect(org)['createEvent']
                (testFixtures.eventType, testFixtures.ipfsLink, testFixtures.sectorsName, testFixtures.sectorsNoPlace,
                    testFixtures.sectorsNumerable, testFixtures.sectorsPrice, 
                    {
                        value: ethers.utils.parseUnits(
                          (1000000000000000).toString(),
                          'wei'
                        ),
                    }
                )
            const eventInfo: EventInfo[] = await eventFactory['getEventsByType'](0)
            await expect(eventInfo[0].descLink).to.be.equal(testFixtures.ipfsLink)
        })

        it("Should revert if organizer didn't pay fee", async function() {
            const { eventFactory, org } = await loadFixture(deployFactoryFixture)
            const newFee = 1000000000000000
            eventFactory['updateOrgFee'](newFee)

            await expect(eventFactory.connect(org)['createEvent']
                (testFixtures.eventType, testFixtures.ipfsLink, testFixtures.sectorsName, testFixtures.sectorsNoPlace,
                    testFixtures.sectorsNumerable, testFixtures.sectorsPrice))
                    .to.be.revertedWithCustomError(eventFactory, testFixtures.ErrorMessages.InsufficientFounds)
        })

        it("Should revert if organizer didn't pay enough fee", async function() {
            const { eventFactory, org } = await loadFixture(deployFactoryFixture)
            const newFee = 1000000000000000
            eventFactory['updateOrgFee'](newFee)

            await expect(eventFactory.connect(org)['createEvent']
                (testFixtures.eventType, testFixtures.ipfsLink, testFixtures.sectorsName, testFixtures.sectorsNoPlace,
                    testFixtures.sectorsNumerable, testFixtures.sectorsPrice,
                    {
                        value: ethers.utils.parseUnits(
                          (10).toString(),
                          'wei'
                        ),
                    }
                )).to.be.revertedWithCustomError(eventFactory, testFixtures.ErrorMessages.InsufficientFounds)
        })
        
        it("Should add event to organizerEvents list", async function() {
            const { eventFactory, org } = await loadFixture(deployFactoryFixture)
            await eventFactory.connect(org)['createEvent']
                (testFixtures.eventType, testFixtures.ipfsLink, testFixtures.sectorsName, testFixtures.sectorsNoPlace,
                    testFixtures.sectorsNumerable, testFixtures.sectorsPrice) 

            const eventInfo: EventInfo[] = await eventFactory['getEventsByType'](testFixtures.eventType)
            const orgEvents = await eventFactory['getOrganizerEvents'](org.address)
            await expect(eventInfo[0].eventAddress).to.be.equal(orgEvents[0])
        })
    })

})





