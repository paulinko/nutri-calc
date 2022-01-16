import assert from 'assert';
import {GeneralTable, getPoints, Prop} from '../../src/libs/tables.mjs';

const StdSugar = new Prop([
    [-Infinity, 4.5, 0],
    [4.5, 9, 1],
    [9, 13.5, 2],
    [13.5, 18, 3],
    [18, 22.5, 4],
    [22.5, 27, 5],
    [27, 31, 6],
    [31, 36, 7],
    [36, 40, 8],
    [40, 45, 9],
    [45, Infinity, 10]

]);

describe('Tables', function () {
    describe('#getPoints()', function () {
        it('gets the correct Points for a scale ', function () {
            let result = getPoints(StdSugar.scale, 6.75)
            assert.equal(0.5, result.fractal);
            assert.equal(1, result.points);
            assert.equal(6.75, result.value);
        });
        it('value must be greater than lower bound', function () {
            let result = getPoints(StdSugar.scale, 9)
            assert.equal(1, result.fractal);
            assert.equal(1, result.points);
            assert.equal(9, result.value);
        });
        it('values out of the scale are treated correctly', function () {
            let result = getPoints(StdSugar.scale, 199)
            assert.equal(1, result.fractal);
            assert.equal(10, result.points);
            assert.equal(199, result.value);

            result = getPoints(StdSugar.scale, 0)
            assert.equal(0, result.fractal);
            assert.equal(0, result.points);
            assert.equal(0, result.value);
        });
    });
});