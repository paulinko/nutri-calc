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

    heading: 'Nutri-Score-Berechner',
    calculate_now: 'Jetzt berechnen',
    calculate_score: 'Score berechnen',

    last_updated: 'Letzte Aktualisierung',
    sources_used: 'Verwendete Quellen',

    calculate: 'Berechnen',
    calculate_for: 'Berechnung für ',
    negative_inputs: 'Negative Inhaltsstoffe',
    positive_inputs: 'Positive Inhaltsstoffe',
    result_for: 'Ergebnis für',
    category: 'Kategorie',

    score: 'Score',
    distribution_points: 'Punkteverteilung',
    explanation: 'Erklärung',

    details: 'Details',
    score_limits: 'Score/Grenzwerte',
    higher_is: 'je höher desto',
    better: 'besser',
    worse: 'schlechter',
    show_limits: 'Grenzwerte anzeigen',
    hide_limits: 'Grenzwerte ausblenden',
    score_limits_info: 'Diese Skala zeigt die Grenzwerte für die verschiedenen zu erreichenden Punktzahlen',
    tendency: 'Tendenz',
    tendency_info: 'Dieses Diagramm zeigt die Tendenz der Punktzahl an. Die Zuordnung von Punkten erfolgt stufenweise. Daher wird hier gezeigt, ob der Wert eher zur besseren oder schlechteren Punktzahl tendiert.',

    diff_from_points: 'diff von points entfernt',
    bordering_on: 'an der Grenze zu points',

    share_result: 'Ergebnis teilen',
    calculate_new: 'Neue Berechnung',


    badge_explanation: `Das "superscript" bedeutet, dass der Wert dieses Inhaltstoffes eher zur direction bzw. tendency Punktzahl tendiert.`,
    better_dat: 'besseren',
    worse_dat: 'schlechteren',
    higher_dat: 'höheren',
    lower_dat: 'niedrigeren',

    actions: 'Aktionen',

    de: 'deutsch',
    en: 'englisch',

    privacy: 'Datenschutzerklärung',
    imprint: 'Kontakt',
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

const CurrentLocale = 'de';

export {
    InfoTexts,
    ProteinAppliedDisplayNames,
    DisplayNames,
    InputInfoTexts,
    CurrentLocale
};