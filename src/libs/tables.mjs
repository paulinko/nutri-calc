function getResult(value, row, representativeSpan, lowest=0) {
    let fractal = null
    let upper = row[1]
    let lower = (row[0] === -Infinity) ? lowest : row[0]
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

function getPoints(scale, value, lowest=0) {
    let representativeSpanRow = scale[scale.length - 2]
    let representativeSpan = representativeSpanRow[1] - representativeSpanRow[0]
    for (const row of scale) {
        if (row.length === 3) {
            if (value > row[0] && value <= row[1]) {
                return getResult(value, row, representativeSpan, lowest)
            }
        }
        if (row.length === 2) {
            debugger
            if (typeof row[0] === 'string' ||  row[0] instanceof String) {
                if (value == row[0]) {
                    return {
                        value,
                        fractal: 0,
                        points: row[1]
                    }
                }
            } else {
                if (value < row[0]) {
                    return {
                        value,
                        fractal: 0,
                        points: row[1]
                    }
                }
            }
        }
    }
    console.log(scale, value)
    return null;
}

function saltToSodium(salt) {
    return salt * 1000 / 2.5;
}
const ProteinReasonNotApplied = 0;
const ProteinReasonLowBadScore = 1;
const ProteinReasonHighGoodStuffScore = 2;
const ProteinReasonIsCheese = 3;
const ProteinReasonBelowThreshold11 = 4;
const ProteinReasonBelowThreshold7 = 5;
const ProteinReasonIsDrink = 6;

function getApplyProtein(badScore, goodStuffValue) {
    let applyProtein = (badScore < 11 || (badScore >= 11 && goodStuffValue.value >= 80));
    let reason = ProteinReasonNotApplied
    if (applyProtein) {
        reason = (badScore < 11) ? ProteinReasonLowBadScore : ProteinReasonHighGoodStuffScore;
    }
    return {
        applyProtein,
        reason,
        threshold: 11
    };
}



function getApplyProteinUpdated2023(badScore, useLowerThreshold=false) {
    const threshold = useLowerThreshold ? 7 : 11
    let applyProtein = (badScore <  threshold);
    let reason = ProteinReasonNotApplied
    if (applyProtein) {
        reason = (useLowerThreshold) ? ProteinReasonBelowThreshold7 : ProteinReasonBelowThreshold11;
    }
    return {
        applyProtein,
        reason
    };
}


const PropModes = {
    BOTH: 0,
    ONLY_INPUT: 1,
    ONLY_OUTPUT: 2
}

function Prop(scale, mode = PropModes.BOTH) {
    this.scale = scale;
    this.mode = mode;
}

const StdKj = new Prop([
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
]);

const StdKjUpdated2023 = StdKj;


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

const StdSugarUpdated2023 = new Prop([
    [-Infinity, 3.4, 0],
    [3.4, 6.8, 1],
    [6.8, 10, 2],
    [10, 14, 3],
    [14, 17, 4],
    [17, 20, 5],
    [20, 24, 6],
    [24, 27, 7],
    [27, 31, 8],
    [31, 34, 9],
    [34, 37, 10],
    [37, 41, 11],
    [41, 44, 12],
    [44, 48, 13],
    [48, 51, 14],
    [51, Infinity, 15]
]);

const StdSatFats = new Prop([
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
]);

const StdSatFatsUpdated2023 = StdSatFats;

const StdSodium = new Prop([
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
], PropModes.ONLY_OUTPUT)

const StdSalt = new Prop(null, PropModes.ONLY_INPUT)
const StdSaltUpdated2023 = new Prop([
    [-Infinity, 0.2, 0],
    [0.2, 0.4, 1],
    [0.4, 0.6, 2],
    [0.6, 0.8, 3],
    [0.8, 1.0, 4],
    [1.0, 1.2, 5],
    [1.2, 1.4, 6],
    [1.4, 1.6, 7],
    [1.6, 1.8, 8],
    [1.8, 2.0, 9],
    [2.0, 2.2, 10],
    [2.2, 2.4, 11],
    [2.4, 2.6, 12],
    [2.6, 2.8, 13],
    [2.8, 3.0, 14],
    [3.0, 3.2, 15],
    [3.2, 3.4, 16],
    [3.4, 3.6, 17],
    [3.6, 3.8, 18],
    [3.8, 4.0, 19],
    [4.0, Infinity, 20],
]);

const StdProtein = new Prop([
    [-Infinity, 1.6, 0],
    [1.6, 3.2, 1],
    [3.2, 4.8, 2],
    [4.8, 6.4, 3],
    [6.4, 8, 4],
    [8, Infinity, 5],
])

const StdProteinUpdated2023 = new Prop([
    [-Infinity, 2.4, 0],
    [2.4, 4.8, 1],
    [4.8, 7.2, 2],
    [7.2, 9.6, 3],
    [9.6, 12, 4],
    [12, 14, 5],
    [14, 17, 6],
    [17, Infinity, 7],
])

const StdFiber = new Prop([
    [-Infinity, 0.9, 0],
    [0.9, 1.9, 1],
    [1.9, 2.8, 2],
    [2.8, 3.7, 3],
    [3.7, 4.7, 4],
    [4.7, Infinity, 5],
])


const StdFiberUpdated2023 = new Prop([
    [-Infinity, 3.0, 0],
    [3.0, 4.1, 1],
    [4.1, 5.2, 2],
    [5.2, 6.3, 3],
    [6.3, 7.4, 4],
    [7.4, Infinity, 5],
])

const StdGoodStuff = new Prop([
    [-Infinity, 40, 0],
    [40, 60, 1],
    [60, 80, 2],
    [80, Infinity, 5],
])

const StdGoodStuffUpdated2023 = StdGoodStuff

const StdPointsToScore = [
    [-Infinity, -1, 'A'],
    [-1, 2, 'B'],
    [2, 10, 'C'],
    [10, 18, 'D'],
    [18, 41, 'E']
];

class Table {
    static nutriprops = {
        n: {
            kJ: StdKj,
            sugar: StdSugar,
            satFats: StdSatFats,
            sodium: StdSodium,
            salt: StdSalt
        },
        p: {
            protein: StdProtein,
            fiber: StdFiber,
            goodStuff: StdGoodStuff
        }
    };

    static pointsToScore = StdPointsToScore

    static getInputNames(obj) {
        return Object.entries(obj).filter(([, prop]) => prop.mode === PropModes.BOTH ||
             prop.mode === PropModes.ONLY_INPUT)
    }

    static negativeInputs() {
        return this.getInputNames(this.nutriprops.n)
    }

    static positiveInputs() {
        return this.getInputNames(this.nutriprops.p)
    }

    static getBadValues(nutriInfo) {
        return {
            kjValue: getPoints(this.nutriprops.n.kJ.scale, nutriInfo.kJ),
            sugarValue: getPoints(this.nutriprops.n.sugar.scale, nutriInfo.sugar),
            satFatsValue: getPoints(this.nutriprops.n.satFats.scale, nutriInfo.satFats),
            sodiumValue: getPoints(this.nutriprops.n.sodium.scale, saltToSodium(nutriInfo.salt)),
        }
    }

    static getGoodValues(nutriInfo) {
        return {
            protValue: getPoints(this.nutriprops.p.protein.scale, nutriInfo.protein),
            fiberValue: getPoints(this.nutriprops.p.fiber.scale, nutriInfo.fiber),
            goodStuffValue: getPoints(this.nutriprops.p.goodStuff.scale, nutriInfo.goodStuff),
        }
    }

}


class TableUpdated2023 {
    static nutriprops = {
        n: {
            kJ: StdKjUpdated2023,
            sugar: StdSugarUpdated2023,
            satFats: StdSatFatsUpdated2023,
            salt: StdSaltUpdated2023
        },
        p: {
            protein: StdProteinUpdated2023,
            fiber: StdFiberUpdated2023,
            goodStuff: StdGoodStuffUpdated2023
        }
    };

    static pointsToScore = StdPointsToScore

    static getInputNames(obj) {
        return Object.entries(obj).filter(([, prop]) => prop.mode === PropModes.BOTH ||
             prop.mode === PropModes.ONLY_INPUT)
    }

    static negativeInputs() {
        return this.getInputNames(this.nutriprops.n)
    }

    static positiveInputs() {
        return this.getInputNames(this.nutriprops.p)
    }

    static getBadValues(nutriInfo) {
        return {
            kjValue: getPoints(this.nutriprops.n.kJ.scale, nutriInfo.kJ),
            sugarValue: getPoints(this.nutriprops.n.sugar.scale, nutriInfo.sugar),
            satFatsValue: getPoints(this.nutriprops.n.satFats.scale, nutriInfo.satFats),
            saltValue: getPoints(this.nutriprops.n.salt.scale, nutriInfo.salt),
        }
    }

    static getGoodValues(nutriInfo) {
        return {
            protValue: getPoints(this.nutriprops.p.protein.scale, nutriInfo.protein),
            fiberValue: getPoints(this.nutriprops.p.fiber.scale, nutriInfo.fiber),
            goodStuffValue: getPoints(this.nutriprops.p.goodStuff.scale, nutriInfo.goodStuff),
        }
    }

}


class GeneralTable extends Table {
    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, sodiumValue} = this.getBadValues(nutriInfo)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)

        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + sodiumValue.points;
        const pCalc = getApplyProtein(badScore, goodStuffValue);

        let totalScore = badScore - goodStuffValue.points - fiberValue.points;

        if (pCalc.applyProtein) {
            totalScore -= protValue.points
        }

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['sodium', sodiumValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}

class GeneralTableUpdated2023 extends TableUpdated2023 {
    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, saltValue} = this.getBadValues(nutriInfo)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)

        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + saltValue.points;
        const pCalc = getApplyProtein(badScore, goodStuffValue);

        let totalScore = badScore - goodStuffValue.points - fiberValue.points;

        if (pCalc.applyProtein) {
            totalScore -= protValue.points
        }

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['salt', saltValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}

class RedMeatTableUpdated2023 extends TableUpdated2023 {
    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, saltValue} = this.getBadValues(nutriInfo)
        let {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)

        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + saltValue.points;
        const pCalc = getApplyProtein(badScore, goodStuffValue);

        let totalScore = badScore - goodStuffValue.points - fiberValue.points;

        const capProtein = (protValue.points > 2)
        let originalProteinPoints = null  
        if (capProtein) {
            originalProteinPoints = protValue.points
            protValue.points = 2
        }

        if (pCalc.applyProtein) {
            totalScore -= protValue.points 
        }

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['salt', saltValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            proteinCapped: capProtein,
            proteinOriginalValue: originalProteinPoints,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}

class CheeseTable extends Table {
    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, sodiumValue} = this.getBadValues(nutriInfo)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)

        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + sodiumValue.points;
        const goodScore = protValue.points + goodStuffValue.points + fiberValue.points
        const totalScore = badScore - goodScore;

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['sodium', sodiumValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: true,
            proteinAppliedReason: ProteinReasonIsCheese,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}

class CheeseTableUpdated2023 extends TableUpdated2023 {
    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, saltValue} = this.getBadValues(nutriInfo)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)

        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + saltValue.points;
        const goodScore = protValue.points + goodStuffValue.points + fiberValue.points
        const totalScore = badScore - goodScore;

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['salt', saltValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: true,
            proteinAppliedReason: ProteinReasonIsCheese,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}


class FatsTableUpdated2023 extends TableUpdated2023 {
    static nutriprops = {
        n: {
            sugar: StdSugarUpdated2023,
            salt: StdSaltUpdated2023,
            satFats: new Prop([
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
            ]),
            energyFromSaturates: new Prop([
                [-Infinity, 120, 0],
                [120, 240, 1],
                [240, 360, 2],
                [360, 480, 3],
                [480, 600, 4],
                [600, 720, 5],
                [720, 840, 6],
                [840, 960, 7],
                [960, 1080, 8],
                [1080, 1200, 9],
                [1200, Infinity, 10],
            ], PropModes.ONLY_OUTPUT)
        },
        p: {
            protein: StdProtein,
            fiber: StdFiber,
            goodStuff: StdGoodStuff
        }
    };

    static getBadValues(nutriInfo) {
        const energyFromSaturates = nutriInfo.satFats  * 37 
        return {
            satFatsValue: getPoints(this.nutriprops.n.satFats.scale, nutriInfo.satFats),
            sugarValue: getPoints(this.nutriprops.n.sugar.scale, nutriInfo.sugar),
            energyFromSaturatesValue: getPoints(this.nutriprops.n.energyFromSaturates.scale, energyFromSaturates),
            saltValue: getPoints(this.nutriprops.n.salt.scale, nutriInfo.salt),
        }
    }

    static calculateScore(data) {
        const {satFatsValue, sugarValue, energyFromSaturatesValue, saltValue} = this.getBadValues(data)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(data)

        const badScore = energyFromSaturatesValue.points + sugarValue.points + satFatsValue.points + saltValue.points;

        const pCalc = getApplyProtein(badScore, goodStuffValue)
        const goodScore = goodStuffValue.points + fiberValue.points + ((pCalc.applyProtein) ? protValue.points : 0)

        let totalScore = badScore - goodScore;

        return {
            negatives: new Map(
                [
                    ['satFats', satFatsValue],
                    ['sugar', sugarValue],
                    ['energyFromSaturates', energyFromSaturatesValue],
                    ['salt', saltValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}

class FatsTable extends Table {
    static nutriprops = {
        n: {
            kJ: StdKj,
            sugar: StdSugar,
            satFats: StdSatFats,
            sodium: StdSodium,
            totalFats: new Prop(null, PropModes.ONLY_INPUT),
            salt: StdSalt,
            ratioSatFats: new Prop([
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
            ], PropModes.ONLY_OUTPUT)
        },
        p: {
            protein: StdProtein,
            fiber: StdFiber,
            goodStuff: StdGoodStuff
        }
    };

    static getBadValues(nutriInfo) {
        const ratio = nutriInfo.satFats / nutriInfo.totalFats * 100
        return {
            kjValue: getPoints(this.nutriprops.n.kJ.scale, nutriInfo.kJ),
            sugarValue: getPoints(this.nutriprops.n.sugar.scale, nutriInfo.sugar),
            ratioValue: getPoints(this.nutriprops.n.ratioSatFats.scale, ratio),
            sodiumValue: getPoints(this.nutriprops.n.sodium.scale, saltToSodium(nutriInfo.salt)),
        }
    }

    static calculateScore(data) {
        const {kjValue, sugarValue, ratioValue, sodiumValue} = this.getBadValues(data)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(data)

        const badScore = kjValue.points + sugarValue.points + ratioValue.points + sodiumValue.points;

        const pCalc = getApplyProtein(badScore, goodStuffValue)
        const goodScore = goodStuffValue.points + fiberValue.points + ((pCalc.applyProtein) ? protValue.points : 0)

        let totalScore = badScore - goodScore;

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['ratioSatFats', ratioValue],
                    ['sodium', sodiumValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -15)
        }
    }
}


class DrinksTable extends Table {
    static nutriprops = {
        n: {
            kJ: new Prop([
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
            ]),
            sugar: new Prop([
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

            ]),
            salt: StdSalt,
            satFats: StdSatFats,
            sodium: StdSodium,
        },
        p: {
            protein: StdProtein,
            fiber: StdFiber,
            goodStuff: new Prop([
                [-Infinity, 40, 0],
                [40, 60, 2],
                [60, 80, 4],
                [80, Infinity, 10],
            ])
        }
    };
    static pointsToScore = [
        [-Infinity, -Infinity, 'A'],
        [-Infinity, 2, 'B'],
        [3, 5, 'C'],
        [5, 9, 'D'],
        [9, Infinity, 'E']
    ];

    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, sodiumValue} = this.getBadValues(nutriInfo)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)


        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + sodiumValue.points;
        const pCalc = getApplyProtein(badScore, goodStuffValue)
        const goodScore = goodStuffValue.points + fiberValue.points + ((pCalc.applyProtein) ? protValue.points : 0)

        const totalScore = badScore - goodScore;

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['sodium', sodiumValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: pCalc.applyProtein,
            proteinAppliedReason: pCalc.reason,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -20, )
        }
    }
}


class DrinksTableUpdated2023 extends TableUpdated2023 {
    static nutriprops = {
        n: {
            kJ: new Prop([
                [-Infinity, 30, 0],
                [30, 90, 1],
                [90, 150, 2],
                [150, 210, 3],
                [210, 240, 4],
                [240, 270, 5],
                [270, 300, 6],
                [300, 330, 7],
                [330, 360, 8],
                [360, 390, 9],
                [390, Infinity, 10],
            ]),
            sugar: new Prop([
                [-Infinity, 0.5, 0],
                [0.5, 2, 1],
                [2, 3.5, 2],
                [3.5, 5, 3],
                [5, 6, 4],
                [6, 7, 5],
                [7, 8, 6],
                [8, 9, 7],
                [9, 10, 8],
                [10, 11, 9],
                [11, Infinity, 10]

            ]),
            salt: StdSaltUpdated2023,
            satFats: StdSatFatsUpdated2023,
            hasSweeteners: new Prop([
                ['false', 0],
                ['true', 4],
            ])
        },
        p: {
            protein: new Prop([
                [-Infinity, 1.2, 0],
                [1.2, 4.8, 1],
                [1.5, 7.2, 2],
                [1.8, 9.6, 3],
                [2.1, 12, 4],
                [2.4, 14, 5],
                [2.7, 17, 6],
                [3.0, Infinity, 7]]),
            fiber: new Prop([
                [-Infinity, 3.0, 0],
                [3.0, 4.1, 1],
                [4.1, 5.2, 2],
                [5.2, 6.3, 3],
                [6.3, 7.4, 4],
                [7.4, Infinity, 5]
            ]),
            goodStuff: new Prop([
                [-Infinity, 40, 0],
                [40, 60, 2],
                [60, 80, 4],
                [80, Infinity, 6],
            ])
        }
    };

    static getBadValues(nutriInfo) {
        return {
            kjValue: getPoints(this.nutriprops.n.kJ.scale, nutriInfo.kJ),
            sugarValue: getPoints(this.nutriprops.n.sugar.scale, nutriInfo.sugar),
            satFatsValue: getPoints(this.nutriprops.n.satFats.scale, nutriInfo.satFats),
            saltValue: getPoints(this.nutriprops.n.salt.scale, nutriInfo.salt),
            hasSweetenersValue: getPoints(this.nutriprops.n.hasSweeteners.scale, nutriInfo.hasSweeteners),
        }
    }

    static calculateScore(nutriInfo) {
        const {kjValue, sugarValue, satFatsValue, saltValue, hasSweetenersValue} = this.getBadValues(nutriInfo)
        const {protValue, fiberValue, goodStuffValue} = this.getGoodValues(nutriInfo)


        const badScore = kjValue.points + sugarValue.points + satFatsValue.points + saltValue.points + hasSweetenersValue.points;
        const goodScore = goodStuffValue.points + fiberValue.points + protValue.points

        debugger
        const totalScore = badScore - goodScore;

        return {
            negatives: new Map(
                [
                    ['kJ', kjValue],
                    ['sugar', sugarValue],
                    ['satFats', satFatsValue],
                    ['hasSweeteners', hasSweetenersValue],
                    ['salt', saltValue],
                ]
            ),
            positives: new Map([
                    ['protein', protValue],
                    ['fiber', fiberValue],
                    ['goodStuff', goodStuffValue]
                ]
            ),
            badScore,
            applyProtein: true,
            proteinAppliedReason: ProteinReasonIsDrink,
            totalScore,
            letterScore: getPoints(this.pointsToScore, totalScore, -20)
        }
    }
}

function getUnit(nutriProp) {
    switch (nutriProp) {
        case 'kJ':
        case 'energyFromSaturates':
            return 'kJ'
        case 'sodium':
            return 'mg'
        case 'ratioSatFats':
            return '%'
        case 'letterScore':
            return 'P'
        case 'goodStuff':
            return '%'
        case 'hasSweeteners':
            return ' '
        default:
            return 'g'
    }
}

function WasPropUsedInCalculation(propName, result) {
    return (propName !== 'protein' || result.applyProtein)
}


function GetLegacyTable(mode) {
    switch (mode) {
        case 'general':
          return GeneralTable
        case 'fats':
          return FatsTable
        case 'cheese':
          return CheeseTable
        case 'drinks':
          return DrinksTable
        default:
          return GeneralTable
    }
}


function GetUpdated2023Table(mode) {
    switch (mode) {
        case 'general':
          return GeneralTableUpdated2023
        case 'redMeat':
            return RedMeatTableUpdated2023
        case 'fats':
          return FatsTableUpdated2023   
        case 'cheese':
          return CheeseTableUpdated2023
        case 'drinks':
          return DrinksTableUpdated2023
        default:
          return GeneralTableUpdated2023
    }
}

export {
    GetUpdated2023Table,
    GetLegacyTable,
    getUnit,
    ProteinReasonIsCheese,
    ProteinReasonNotApplied,
    ProteinReasonLowBadScore,
    ProteinReasonHighGoodStuffScore,
    WasPropUsedInCalculation,
    getPoints,
    Prop
};