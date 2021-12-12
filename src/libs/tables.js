function getResult(value, row, representativeSpan) {
    let fractal = null
    let upper = row[1]
    let lower = (row[0] === -Infinity) ? 0 : row[0]
    let relativeValue = value - lower

    let diff = representativeSpan;
    if (upper !== Infinity) {
        diff = upper - lower
    }

    fractal = calculateFractal(relativeValue, diff)

    return {
        value,
        fractal,
        points: row[2]
    }
}

function calculateFractal(relativeValue, diff) {
    let fractal = relativeValue / diff
    return (fractal < 1) ? fractal : 1;
}

function getPoints(table, value) {
    let representativeSpanRow = table[table.length - 2]
    let representativeSpan = representativeSpanRow[1] - representativeSpanRow[0]
    for (const row of table) {
        if (row.length === 3) {
            if (value > row[0] && value <= row[1]) {
                return getResult(value, row, representativeSpan)
            }
        }
        if (row.length === 2) {
            if (value < row[0]) {
                return row[1]
            }
        }
    }
    console.log(table, value)
    return null;
}

const ProteinReasonNotApplied = 0;
const ProteinReasonLowBadScore = 1;
const ProteinReasonHighGoodStuffScore = 2;
const ProteinReasonIsCheese = 3;

function getApplyProtein(badScore, goodStuffValue) {
    let applyProtein = (badScore < 11 || (badScore >= 11 && goodStuffValue.points === 5));
    let reason = ProteinReasonNotApplied
    if (applyProtein) {
        reason = (badScore < 11) ? ProteinReasonLowBadScore : ProteinReasonHighGoodStuffScore;
    }
    return {
         applyProtein,
         reason
    };
}

const GeneralTable = {
    nutriprops: {
        n: {
            kJ: [ //E2
                [-Infinity, 335, 0],
                [335, 670, 1],
                [670, 1005, 2],
                [1005, 1340, 3],
                [1340, 1675, 4],
                [1675, 2010, 5],
                [2010, 2345, 6],
                [2345, 2680, 7],
                [2680, 3015, 8],
                [3015, 3350, 9],
                [3350, Infinity, 10],
            ],
            sugar: [ //H2
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

            ],
            satFats: [ //G2
                [-Infinity, 1, 0],
                [1, 2, 1],
                [2, 3, 2],
                [3, 4, 3],
                [4, 5, 4],
                [5, 6, 5],
                [6, 7, 6],
                [7, 8, 7],
                [8, 9, 8],
                [9, 10, 9],
                [10, Infinity, 10],
            ],
            sodium: [
                [-Infinity, 90, 0],
                [90, 180, 1],
                [180, 270, 2],
                [270, 360, 3],
                [360, 450, 4],
                [450, 540, 5],
                [540, 630, 6],
                [630, 720, 7],
                [720, 810, 8],
                [810, 900, 9],
                [900, Infinity, 10]
            ]
        },
        p: {
            protein: [
                [-Infinity, 1.6, 0],
                [1.6, 3.2, 1],
                [3.2, 4.8, 2],
                [4.8, 6.4, 3],
                [6.4, 8, 4],
                [8, Infinity, 5],
            ],
            fiber: [
                [-Infinity, 0.9, 0],
                [0.9, 1.9, 1],
                [1.9, 2.8, 2],
                [2.8, 3.7, 3],
                [3.7, 4.7, 4],
                [4.7, Infinity, 5],
            ],
            goodStuff: [
                [-Infinity, 40, 0],
                [40, 60, 1],
                [60, 80, 2],
                [80, Infinity, 5],
            ],
        }
    },

    pointsToScore: [
        [-Infinity, -1, 'A'],
        [-1, 2, 'B'],
        [2, 10, 'C'],
        [10, 18, 'D'],
        [18, Infinity, 'E']
    ],

    calculateScore: function (nutirInfo) {

        const kjValue = getPoints(this.nutriprops.n.kJ, nutirInfo.kJ);
        const sugarValue = getPoints(this.nutriprops.n.sugar, nutirInfo.sugar);
        const satFatsValue = getPoints(this.nutriprops.n.satFats, nutirInfo.satFats);
        const sodiumValue = getPoints(this.nutriprops.n.sodium, nutirInfo.sodium);

        const protValue = getPoints(this.nutriprops.p.protein, nutirInfo.protein);
        const fiberValue = getPoints(this.nutriprops.p.fiber, nutirInfo.fiber);
        const goodStuff = getPoints(this.nutriprops.p.goodStuff, nutirInfo.goodStuff);

        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + sodiumValue.points;
        const pCalc = getApplyProtein(badScore, goodStuff);

        let totalScore = badScore - goodStuff.points - fiberValue.points;

        if (pCalc.applyProtein) {
            totalScore -= protValue.points
        }

        return {
            negatives: {
                kJ: kjValue,
                sugar: sugarValue,
                satFats: satFatsValue,
                sodium: sodiumValue
            },
            positives: {
                protein: protValue,
                fiber: fiberValue,
                goodStuff: goodStuff,
            },
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore)
        }
    }
}

const CheeseTable = {
    nutriprops: {
        n: {
            kJ: [
                [-Infinity, 335, 0],
                [335, 670, 1],
                [670, 1005, 2],
                [1005, 1340, 3],
                [1340, 1675, 4],
                [1675, 2010, 5],
                [2010, 2345, 6],
                [2345, 2680, 7],
                [2680, 3015, 8],
                [3015, 3350, 9],
                [3350, Infinity, 10],
            ],
            sugar: [
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

            ],
            satFats: [
                [-Infinity, 1, 0],
                [1, 2, 1],
                [2, 3, 2],
                [3, 4, 3],
                [4, 5, 4],
                [5, 6, 5],
                [6, 7, 6],
                [7, 8, 7],
                [8, 9, 8],
                [9, 10, 9],
                [Infinity, 10],
            ],
            sodium: [
                [-Infinity, 90, 0],
                [90, 180, 1],
                [180, 270, 2],
                [270, 360, 3],
                [360, 450, 4],
                [450, 540, 5],
                [540, 630, 6],
                [630, 720, 7],
                [720, 810, 8],
                [810, 900, 9],
                [900, Infinity, 10]
            ],
        },
        p: {
            protein: [
                [-Infinity, 1.6, 0],
                [1.6, 3.2, 1],
                [3.2, 4.8, 2],
                [4.8, 6.4, 3],
                [6.4, 8, 4],
                [8, Infinity, 5],
            ],
            fiber: [
                [-Infinity, 0.9, 0],
                [0.9, 1.9, 1],
                [1.9, 2.8, 2],
                [2.8, 3.7, 3],
                [3.7, 4.7, 4],
                [4.7, Infinity, 5],
            ],
            goodStuff: [
                [-Infinity, 40, 0],
                [40, 60, 1],
                [60, 80, 2],
                [80, Infinity, 5],
            ]
        }
    },
    pointsToScore: [
        [-Infinity, 0, 'A'],
        [0, 2, 'B'],
        [2, 10, 'C'],
        [10, 18, 'D'],
        [18, Infinity, 'E']
    ],

    calculateScore: function (value) {
        const kjValue = getPoints(this.nutriprops.n.kJ, value.kJ);
        const sugarValue = getPoints(this.nutriprops.n.sugar, value.sugar);
        const satFatsValue = getPoints(this.nutriprops.n.satFats, value.satFats);
        const sodiumValue = getPoints(this.nutriprops.n.sodium, value.sodium);

        const protValue = getPoints(this.nutriprops.p.protein, value.protein);
        const fiberValue = getPoints(this.nutriprops.p.fiber, value.fiber);
        const goodStuffValue = getPoints(this.nutriprops.p.goodStuff, value.goodStuff);


        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + sodiumValue.points;
        const goodScore = protValue.points + goodStuffValue.points + fiberValue.points
        const totalScore = badScore - goodScore;

        return {
            negatives: {
                kJ: kjValue,
                sugar: sugarValue,
                satFats: satFatsValue,
                sodium: sodiumValue
            },
            positives: {
                protein: protValue,
                fiber: fiberValue,
                goodStuff: goodStuffValue,
            },
            badScore,
            applyProtein: true,
            proteinAppliedReason: ProteinReasonIsCheese,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore)
        }
    }
}

const FatsTable = {
    nutriprops: {
        n: {
            kJ: [
                [-Infinity, 335, 0],
                [335, 670, 1],
                [670, 1005, 2],
                [1005, 1340, 3],
                [1340, 1675, 4],
                [1675, 2010, 5],
                [2010, 2345, 6],
                [2345, 2680, 7],
                [2680, 3015, 8],
                [3015, 3350, 9],
                [3350, Infinity, 10],
            ],
            sugar: [
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

            ],
            satFats: [
                [-Infinity, 1, 0],
                [1, 2, 1],
                [2, 3, 2],
                [3, 4, 3],
                [4, 5, 4],
                [5, 6, 5],
                [6, 7, 6],
                [7, 8, 7],
                [8, 9, 8],
                [9, 10, 9],
                [10, Infinity, 10],
            ],
            ratioSatFats: [
                [-Infinity, 10, 0],
                [10, 16, 1],
                [16, 22, 2],
                [22, 28, 3],
                [28, 34, 4],
                [34, 40, 5],
                [40, 46, 6],
                [46, 52, 7],
                [52, 58, 8],
                [58, 64, 9],
                [64, Infinity, 10]
            ],
            sodium: [
                [-Infinity, 90, 0],
                [90, 180, 1],
                [180, 270, 2],
                [270, 360, 3],
                [360, 450, 4],
                [450, 540, 5],
                [540, 630, 6],
                [630, 720, 7],
                [720, 810, 8],
                [810, 900, 9],
                [900, Infinity, 10]
            ],
        },
        p: {
            protein: [
                [-Infinity, 1.6, 0],
                [1.6, 3.2, 1],
                [3.2, 4.8, 2],
                [4.8, 6.4, 3],
                [6.4, 8, 4],
                [8, Infinity, 5],
            ],
            fiber: [
                [-Infinity, 0.9, 0],
                [0.9, 1.9, 1],
                [1.9, 2.8, 2],
                [2.8, 3.7, 3],
                [3.7, 4.7, 4],
                [4.7, Infinity, 5],
            ],
            goodStuff: [
                [-Infinity, 40, 0],
                [40, 60, 1],
                [60, 80, 2],
                [80, Infinity, 5],
            ]
        }
    },

    pointsToScore: [
        [-Infinity, 0, 'A'],
        [0, 2, 'B'],
        [2, 10, 'C'],
        [10, 18, 'D'],
        [18, Infinity, 'E']
    ],


    calculateScore: function (data) {
        const kjValue = getPoints(this.nutriprops.n.kJ, data.kJ);
        const sugarValue = getPoints(this.nutriprops.n.sugar, data.sugar);
        const sodiumValue = getPoints(this.nutriprops.n.sodium, data.sodium);

        const ratio = data.satFats / data.ratioSatFats * 100
        const ratioValue = getPoints(this.nutriprops.n.ratioSatFats, ratio);

        const protValue = getPoints(this.nutriprops.p.protein, data.protein);
        const fiberValue = getPoints(this.nutriprops.p.fiber, data.fiber);
        const oilValue = getPoints(this.nutriprops.p.goodStuff, data.goodStuff);


        const badScore = kjValue.points + sugarValue.points + ratioValue.points + sodiumValue.points;
        const pCalc = getApplyProtein(badScore, oilValue)
        const goodScore = oilValue.points + fiberValue.points + ((pCalc.applyProtein) ? protValue.points : 0)

        let totalScore = badScore - goodScore;

        return {
            negatives: {
                kJ: kjValue,
                sugar: sugarValue,
                ratioSatFats: ratioValue,
                sodium: sodiumValue
            },
            positives: {
                protein: protValue,
                fiber: fiberValue,
                oil: oilValue
            },
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore)
        }
    }
}

const DrinksTable = {
    nutriprops: {
        n: {
            kJ: [
                [-Infinity, 0, 0],
                [0, 30, 1],
                [30, 60, 2],
                [60, 90, 3],
                [90, 120, 4],
                [120, 150, 5],
                [150, 180, 6],
                [180, 210, 7],
                [210, 240, 8],
                [240, 270, 9],
                [270, Infinity, 10],
            ],
            sugar: [
                [-Infinity, 0, 0],
                [0, 1.5, 1],
                [1.5, 3, 2],
                [3, 4.5, 3],
                [4.5, 6, 4],
                [6, 7.5, 5],
                [7.5, 9, 6],
                [9, 10.5, 7],
                [10.5, 12, 8],
                [12, 13.5, 9],
                [13.5, Infinity, 10]

            ],
            satFats: [
                [-Infinity, 1, 0],
                [1, 2, 1],
                [2, 3, 2],
                [3, 4, 3],
                [4, 5, 4],
                [5, 6, 5],
                [6, 7, 6],
                [7, 8, 7],
                [8, 9, 8],
                [9, 10, 9],
                [10, Infinity, 10],
            ],
            sodium: [
                [-Infinity, 90, 0],
                [90, 180, 1],
                [180, 270, 2],
                [270, 360, 3],
                [360, 450, 4],
                [450, 540, 5],
                [540, 630, 6],
                [630, 720, 7],
                [720, 810, 8],
                [810, 900, 9],
                [900, Infinity, 10]
            ],
        },
        p: {
            protein: [
                [-Infinity, 1.6, 0],
                [1.6, 3.2, 1],
                [3.2, 4.8, 2],
                [4.8, 6.4, 3],
                [6.4, 8, 4],
                [8, Infinity, 5],
            ],
            fiber: [
                [-Infinity, 0.9, 0],
                [0.9, 1.9, 1],
                [1.9, 2.8, 2],
                [2.8, 3.7, 3],
                [3.7, 4.7, 4],
                [4.7, Infinity, 5],
            ],
            goodStuff: [
                [-Infinity, 40, 0],
                [40, 60, 2],
                [60, 80, 4],
                [80, Infinity, 10],
            ]
        }
    },

    pointsToScore: [
        [-Infinity, 2, 'B'],
        [3, 5, 'C'],
        [5, 9, 'D'],
        [9, Infinity, 'E']
    ],

    calculateScore: function (data) {
        const kjValue = getPoints(this.nutriprops.n.kJ, data.kJ);
        const sugarValue = getPoints(this.nutriprops.n.sugar, data.sugar);
        const sodiumValue = getPoints(this.nutriprops.n.sodium, data.sodium);
        const satFatsValue = getPoints(this.nutriprops.n.satFats, data.satFats);

        const protValue = getPoints(this.nutriprops.p.protein, data.protein);
        const fiberValue = getPoints(this.nutriprops.p.fiber, data.fiber);
        const goodStuffValue = getPoints(this.nutriprops.p.goodStuff, data.goodStuff);


        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + sodiumValue.points;
        const pCalc = getApplyProtein(badScore, goodStuffValue)
        const goodScore = goodStuffValue.points + fiberValue.points + ((pCalc.applyProtein) ? protValue.points : 0)

        const totalScore = badScore - goodScore;

        return {
            negatives: {
                kJ: kjValue,
                sugar: sugarValue,
                satFats: satFatsValue,
                sodium: sodiumValue
            },
            positives: {
                protein: protValue,
                fiber: fiberValue,
                goodStuff: goodStuffValue,
            },
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore)
        }
    }
}

function getUnit(nutriProp) {
    switch (nutriProp) {
        case 'kJ':
            return 'kJ'
        case 'sodium':
            return 'mg'
        case 'letterScore':
            return 'Punkte'
        default:
            return 'g'
    }
}

export {GeneralTable, FatsTable, DrinksTable, CheeseTable, getUnit};