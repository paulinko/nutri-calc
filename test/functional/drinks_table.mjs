import assert from 'assert';
import {DrinksTable, ProteinReasonLowBadScore, ProteinReasonHighGoodStuffScore, ProteinReasonNotApplied} from '../../src/libs/tables.mjs';


const NutriProps = {
    kJ: 155,
    sugar: 8.67,
    satFats: 0.0,
    protein: 0.14,
    fiber: 0,
    goodStuff: 0,
    salt: 0.091
}

describe('DrinksTable', function () {
    describe('#calculateScore()', function () {
        it('gets the correct Score if badScore is high ', function () {
            let result = DrinksTable.calculateScore(NutriProps)
            assert.equal(result.letterScore.points, 'E')
            assert.equal(result.letterScore.value, 12, 'result points are 12')
            assert.equal(result.applyProtein, false, 'Protein was not applied')
            assert.equal(result.proteinAppliedReason, ProteinReasonNotApplied, 'bad score was high')
            assert.equal(result.badScore, 12, 'bad score is 12')
        });

        it('gets the correct Score if badScore is low', function () {
            let nutriProps = {...NutriProps, sugar: 0, protein: 10};
            let result = DrinksTable.calculateScore(nutriProps)
            assert.equal(result.letterScore.points, 'B')
            assert.equal(result.letterScore.value, 1)
            assert.equal(result.applyProtein, true, 'Protein was applied')
            assert.equal(result.proteinAppliedReason, ProteinReasonLowBadScore, 'bad score was low')
            assert.equal(result.badScore, 6, 'bad score is 6')
        });

        it('gets the correct Score if badScore is high but a lot of veggies', function () {
            let nutriProps = {...NutriProps, goodStuff: 100, protein:10};
            let result = DrinksTable.calculateScore(nutriProps)
            assert.equal(result.letterScore.points, 'B')
            assert.equal(result.letterScore.value, -3)
            assert.equal(result.applyProtein, true, 'Protein was applied')
            assert.equal(result.proteinAppliedReason, ProteinReasonHighGoodStuffScore, 'high good stuff score')
            assert.equal(result.badScore, 12, 'bad score is 12')
        });

    });
});