import assert from 'assert';
import {GeneralTable, ProteinReasonLowBadScore, ProteinReasonHighGoodStuffScore, ProteinReasonNotApplied} from '../../src/libs/tables.mjs';


const NutriProps = {
    kJ: 1590,
    sugar: 22.4,
    satFats: 0.6,
    protein: 8.5,
    fiber: 8.6,
    goodStuff: 53.1,
    totalFats: 100,
    salt: 0.22
}

describe('GeneralTable', function () {
    describe('#calculateScore()', function () {
        it('gets the correct Score if badScore is low ', function () {
            let result = GeneralTable.calculateScore(NutriProps)
            assert.equal(result.letterScore.points, 'A')
            assert.equal(result.letterScore.value, -3)
            assert.equal(result.applyProtein, true, 'Protein was applied')
            assert.equal(result.proteinAppliedReason, ProteinReasonLowBadScore, 'bad score was low')
            assert.equal(result.badScore, 8, 'bad score is 8')
        });

        it('gets the correct Score if badScore is high', function () {
            let nutriProps = {...NutriProps, satFats: 10};
            let result = GeneralTable.calculateScore(nutriProps)
            assert.equal(result.letterScore.points, 'D')
            assert.equal(result.letterScore.value, 11)
            assert.equal(result.applyProtein, false, 'Protein was applied')
            assert.equal(result.proteinAppliedReason, ProteinReasonNotApplied, 'bad score was low')
            assert.equal(result.badScore, 17, 'bad score is 17')
        });

        it('gets the correct Score if badScore is high but a lot of veggies', function () {
            let nutriProps = {...NutriProps, goodStuff: 93, satFats: 10};
            let result = GeneralTable.calculateScore(nutriProps)
            assert.equal(result.letterScore.points, 'B')
            assert.equal(result.letterScore.value, 2)
            assert.equal(result.applyProtein, true, 'Protein was applied')
            assert.equal(result.proteinAppliedReason, ProteinReasonHighGoodStuffScore, 'bad score was low')
            assert.equal(result.badScore, 17, 'bad score is 17')
        });

    });
});