import assert from 'assert';
import {CheeseTable, ProteinReasonIsCheese} from '../../src/libs/tables.mjs';


const NutriProps = {
    kJ: 1146,
    sugar: 0,
    satFats: 13.9,
    protein: 23.1,
    fiber: 0,
    goodStuff: 0,
    salt: 1.38
}

describe('CheeseTable', function () {
    describe('#calculateScore()', function () {
        it('gets the correct Score', function () {
            let result = CheeseTable.calculateScore(NutriProps)
            assert.equal(result.letterScore.points, 'D')
            assert.equal(result.letterScore.value, 14)
            assert.equal(result.applyProtein, true, 'Protein was applied')
            assert.equal(result.proteinAppliedReason, ProteinReasonIsCheese, 'apply reason is cheese')
            assert.equal(result.badScore, 19, 'bad score is 19')
        });

    });
});