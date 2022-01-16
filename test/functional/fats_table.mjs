import assert from 'assert';
import {FatsTable, ProteinReasonLowBadScore, ProteinReasonHighGoodStuffScore, ProteinReasonNotApplied} from '../../src/libs/tables.mjs';


const NutriProps = {
    kJ: 3766,
    sugar: 0,
    satFats: 7.3,
    protein: 0,
    fiber: 0,
    goodStuff: 100,
    totalFats: 100,
    salt: 0
}

describe('FatsTable', function () {
    describe('#calculateScore()', function () {
        it('gets the correct Score', function () {
            let result = FatsTable.calculateScore(NutriProps)
            assert.equal(result.letterScore.points, 'C')
            assert.equal(result.letterScore.value, 5)
        });
    });
});