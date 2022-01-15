import {ProteinReasonNotApplied, ProteinReasonLowBadScore, ProteinReasonHighGoodStuffScore, ProteinReasonIsCheese} from '@/libs/tables'


const DisplayNames = {
    kJ: 'kJ',
    kcal: 'kalories',
    sugar: 'sugar',
    satFats: 'saturated fat',
    totalFats: 'fat (total)',
    ratioSatFats: 'percentage saturated fats',
    sodium: 'sodium',
    salt: 'salt',
    protein: 'protein',
    fiber: 'fiber',
    goodStuff: 'Vegetables, fruit, nuts',
    cheese: 'dairy products',
    general: 'solid foods',
    fats: 'fats',
    drinks: 'drinks',
    cheesePlaceholder: 'a dairy product',
    generalPlaceholder: 'a solid food',
    fatsPlaceholder: 'an fat',
    drinksPlaceholder: 'a drink',
    name: 'name',
    letterScore: 'total score',
    share: 'Share result',
}
const ProteinAppliedDisplayNames = new Map([
    [ProteinReasonNotApplied, 'because it is not a dairy product, the number of negative points is greater than 11 and the product consists of less than 80% fruit,vegetables or nuts.'],
    [ProteinReasonLowBadScore, 'because the number of negative points is less than 11 points'],
    [ProteinReasonHighGoodStuffScore, 'because the negative sum is greater than 11 points, but the product consists of more than 80% fruit, vegetables or nuts'],
    [ProteinReasonIsCheese, 'because the protein content of dairy products is always included']
]);


const InfoTexts = {
    kJ: 'Beschreibt die Energie eines Lebensmittels und wird negativ gewertet.',
    drinks: 'Here the Nutri-Score can be calculated for beverages such as teas, lemonades and juices. Dairy drinks are not calculated here, but via the "Dairy products" category. The Nutri-Score for water is an exception: it is always A. Water is the only beverage that can achieve the score A.',
    cheese: 'Here the Nutri-Score can be calculated for dairy products such as milk drinks, cheese or yogurt. Cream and butter are calculated with the category "Fats".',
    fats: 'Here the Nutri-Score can be calculated for foods with high fat content like cream, oils or butter.',
    general: 'The "General" category is used to calculate the Nutri-Score for solid foods. There are separate calculation types for dairy products, fats and beverages.'
}

const InputInfoTexts = {
    kJ: 'Der Energiegehalt des Lebensmittels',
    goodStuff: 'Umfasst Obst, Gemüse, Hülsenfüchte, Vollkorn'
}


function GetInfoTexts(prop) {
    return InfoTexts[prop] ?? 'Lorem Ipsum sit dolor amet...'
}

function GetInputInfoTexts(prop) {
    return InputInfoTexts[prop] ?? '';
}

function GetPlaceholderText(prop) {
    return GetDisplayNames(prop + 'Placeholder')
}

function GetDisplayNames(prop, wasUsed = true) {
    if (!wasUsed) {
        return DisplayNames[prop] + '(not counted)'
    }
    return DisplayNames[prop] ?? prop
}

function GetProteinAppliedReason(reason) {
    return ProteinAppliedDisplayNames.get(reason) ?? 'invalid value'
}

export {
    GetDisplayNames,
    GetInfoTexts,
    GetInputInfoTexts,
    GetPlaceholderText,
    GetProteinAppliedReason
};