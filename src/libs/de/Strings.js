import {ProteinReasonNotApplied, ProteinReasonLowBadScore, ProteinReasonHighGoodStuffScore, ProteinReasonIsCheese} from '@/libs/tables'


const DisplayNames = {
    kJ: 'kJ',
    kcal: 'Kalorien',
    sugar: 'Zucker',
    satFats: 'gesättigte Fette',
    totalFats: 'Fette (gesamt)',
    ratioSatFats: 'Anteil gesättigter Fette',
    sodium: 'Natrium',
    salt: 'Salz',
    protein: 'Protein',
    fiber: 'Ballaststoffe',
    goodStuff: 'Gemüse, Obst, Nüsse',
    cheese: 'Milchprodukte',
    general: 'Allgemein',
    fats: 'Fette',
    drinks: 'Getränke',
    cheesePlaceholder: 'ein Milchprodukt',
    generalPlaceholder: 'ein Lebensmittel',
    fatsPlaceholder: 'ein Öl',
    drinksPlaceholder: 'ein Getränk',
    name: 'Name',
    letterScore: 'Gesamtpunktzahl',
    share: 'Ergebnis teilen',
}
const ProteinAppliedDisplayNames = new Map([
    [ProteinReasonNotApplied, 'weil es sich um kein Milchprodukt handelt, die Anzahl der Negativpunkte größer als 11 ist und das Produkt zu weniger als 80% aus Obst,Gemüse oder Nüssen besteht.'],
    [ProteinReasonLowBadScore, 'weil die Negativsumme weniger als 11 Punkte ist'],
    [ProteinReasonHighGoodStuffScore, 'weil die Negativsumme zwar größer als 11 Punkte ist, das Produkt aber zu mehr als 80% aus Obst,Gemüse oder Nüssen besteht'],
    [ProteinReasonIsCheese, 'weil bei Milchprodukten der Proteingehalt immer in die Bewertung einfließt']
]);


const InfoTexts = {
    kJ: 'Beschreibt die Energie eines Lebensmittels und wird negativ gewertet.',
    drinks: 'Hier kann der Nutri-Score für Getränke wie Tees, Limonaden und Säfte berechnet werden. Milchgetränke werden nicht hier, sondern über die Kategorie "Milchprodukte" berechnet. Der Nutri-Score für Wasser ist eine Ausnahme: Er ist immer A. Wasser ist das einzige Getränk, das den Score A erreichen kann.',
    cheese: 'Hier kann der Nutri-Score für Milchprodukte wie Milchgetränke, Käse oder Joghurt berechnet werden. Sahne und Butter werden mit der Kategorie "Fette" berechnet.',
    fats: 'Hier kann der Nutri-Score für Lebensmittel mit hohen Fettanteil wie Sahne, Öle oder Butter berechnet werden.',
    general: 'Die Kategorie "Allgemein" dient zur Berechnung des Nutri-Scores für die meisten Lebensmittel. Für Milchprodukte, Fette und Getränke gibt es eigene Berechnungsarten.'
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
        return DisplayNames[prop] + '(nicht gewertet)'
    }
    return DisplayNames[prop] ?? prop
}

function GetProteinAppliedReason(reason) {
    return ProteinAppliedDisplayNames.get(reason) ?? 'ungültiger Wert'
}

export {
    GetDisplayNames,
    GetInfoTexts,
    GetInputInfoTexts,
    GetPlaceholderText,
    GetProteinAppliedReason
};