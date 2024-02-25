function Ref(name, link, language) {
    this.name = name
    this.link = link
    this.language = language
}

const Sources = [
    new Ref('Updated Nutri-Score Technical and Scientific FAQ ',
    'https://www.santepubliquefrance.fr/media/files/02-determinants-de-sante/nutrition-et-activite-physique/nutri-score/q-a-en',
    'en'
    ),
    new Ref('Nutri-Score Technical and Scientific FAQ ',
        'https://www.santepubliquefrance.fr/content/download/150263/file/2021_07_21_QR_scientifique_et_technique_V41_EN.pdf',
        'en'
    ),
    new Ref('Die wichtigsten Fragen und Antworten zum Nutri-Score',
        'https://www.vzhh.de/sites/default/files/medien/134/dokumente/2019-10_Verbraucherzentrale-Hamburg_Fragen-und-Antworten-zum-Nutri-Score.pdf',
        'de'
    ),
    new Ref('Development of a new front-of-pack nutrition label in France: the five-colour Nutri-Score',
        'https://www.euro.who.int/__data/assets/pdf_file/0008/357308/PHP-1122-NutriScore-eng.pdf',
        'en'
    )
]

const FurtherReadings = [
    new Ref(' Warum Nesquik einen so guten Nutri-Score bekommt',
        'https://www.vzhh.de/themen/lebensmittel-ernaehrung/warum-nesquik-einen-so-guten-nutri-score-bekommt',
        'deutsch')
]

export {Sources, FurtherReadings};