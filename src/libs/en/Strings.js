import {
    ProteinReasonNotApplied,
    ProteinReasonLowBadScore,
    ProteinReasonHighGoodStuffScore,
    ProteinReasonIsCheese
} from '@/libs/tables'


const DisplayNames = {
    kJ: 'kJ',
    kcal: 'Calories',
    sugar: 'Sugar',
    satFats: 'Saturated Fat',
    totalFats: 'Fat (total)',
    ratioSatFats: 'Percentage of Saturated Fats',
    sodium: 'Sodium',
    salt: 'Salt',
    protein: 'Protein',
    fiber: 'Fiber',
    goodStuff: 'Vegetables, fruit, nuts',
    cheese: 'Dairy Products',
    general: 'Solid Foods',
    fats: 'Fats',
    drinks: 'Drinks',
    cheesePlaceholder: 'a dairy product',
    generalPlaceholder: 'a solid food',
    fatsPlaceholder: 'a fat',
    drinksPlaceholder: 'a drink',
    name: 'name',
    letterScore: 'Total Score',
    share: 'Share result',


    heading: 'Nutri Score Calculator',
    calculate_now: 'Calculate now',
    calculate_score: 'Calculate Score',

    last_updated: 'Last updated',
    sources_used: 'Sources used',

    calculate: 'Calculate',
    calculate_for: 'Calculate for ',
    negative_inputs: 'Negative Ingredients',
    positive_inputs: 'Positive Ingredients',
    result_for: 'Result for',
    category: 'Category',

    score: 'Score',
    distribution_points: 'Distribution of Points',
    explanation: 'Explanation',

    details: 'Details',
    score_limits: 'Score/Scale',
    higher_is: 'more is',
    better: 'better',
    worse: 'worse',
    show_limits: 'Show Scale',
    hide_limits: 'Hide Scale',
    score_limits_info: 'This scale shows the limits for the different scores',
    tendency: 'Trend',
    tendency_info: 'This diagram shows the tendency of the score. The assignment of points is done step by step. Therefore, it is shown here whether the value tends to the better or worse score..',

    diff_from_points: 'diff away from points',
    bordering_on: 'bordering on points',

    share_result: 'Share Result',

    de: 'german',
    en: 'english'
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

export {
    InfoTexts,
    ProteinAppliedDisplayNames,
    DisplayNames,
    InputInfoTexts
};