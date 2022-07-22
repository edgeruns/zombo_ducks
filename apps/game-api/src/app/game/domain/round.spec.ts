import { Fighter } from './fighter'
import { Player } from './player';
import { Health } from './health';
import { Round } from './round';
import { Damage } from './damage';
import { Protection } from './protection';
import { MAX_ROUNDS } from './constants';

const playerFirst = new Player({
    id: 'first',
    wins: 11,
    loses: 0,
    avatar: 'https://avatars.ri',
    nickname: 'archi'
})

const playerSecond = new Player({
    id: 'second',
    wins: 10,
    loses: 0,
    avatar: 'https:/asdas',
    nickname: 'devdammit'
})

let round: Round
let fighterOne: Fighter
let fighterSecond: Fighter

describe('Round', () => {
    beforeEach(() => {
        fighterOne = new Fighter(playerFirst, new Health(100))
        fighterSecond = new Fighter(playerSecond, new Health(100))
        round = new Round()

        round.setFighters(fighterOne, fighterSecond)
    })

    it('should increase ready counter when ready', () => {
        round.setReady('first', {
            damage: new Damage(true, false, false),
            protection: new Protection(true, true, false)
        })

        expect(round.isAllReady()).toBeFalsy()

        round.setReady('second', {
            damage: new Damage(true, false, false),
            protection: new Protection(true, true, false)
        })

        expect(round.isAllReady()).toBeTruthy()
    })

    it('should compute health of fighters', () => {
        round.setReady('first', {
            damage: new Damage(true, false, false),
            protection: new Protection(true, true, false)
        })

        round.setReady('second', {
            damage: new Damage(false, false, true),
            protection: new Protection(true, true, false)
        })

        const [first, second] = round.compute(5)

        expect(first.health.getValue()).toEqual(80)
        expect(second.health.getValue()).toEqual(100)
    })
})
