const InputDisplayNames = {
  ratioSatFats: 'Fette (gesamt)'
}

const DisplayNames = {
  kJ: 'kJ',
  kcal: 'Kalorien',
  sugar: 'Zucker',
  satFats: 'gesättigte Fette',
  ratioSatFats: 'gesamte Fette',
  sodium: 'Salz',
  protein: 'Protein',
  fiber: 'Ballaststoffe',
  goodStuff: 'Vollkorn etc.',
  cheese: 'Milchprodukte',
  general: 'Allgemein',
  fats: 'Öle',
  drinks: 'Getränke',
  cheesePlaceholder: 'ein Milchprodukt',
  generalPlaceholder: 'ein Lebensmittel',
  fatsPlaceholder: 'ein Öl',
  drinksPlaceholder: 'ein Getränk',
  name: 'Name',
  letterScore: 'Gesamtpunktzahl'
}



const InfoTexts = {
  kJ: 'Beschreibt die Energie eines Lebensmittels und wird negativ gewertet.'
}

const InputInfoTexts = {
  kJ: 'Der Energiegehalt des Lebensmittels',
  goodStuff: 'Umfasst Obst, Gemüse, Hülsenfüchte, Vollkorn'
}

function GetInputDisplayNames(prop) {
  return InputDisplayNames[prop] ?? DisplayNames[prop]
}

function GetInfoTexts(prop) {
  return InfoTexts[prop] ?? 'Lorem Ipsum sit dolor amet...'
}

function GetInputInfoTexts(prop){
  return InputInfoTexts[prop] ?? '';
}

function GetPlaceholderText(prop) {
  return GetDisplayNames(prop + 'Placeholder')
}

function GetDisplayNames(prop, wasUsed= true) {
  if (!wasUsed) {
    return DisplayNames[prop] + '(nicht gewertet)'
  }
  return DisplayNames[prop] ?? prop
}

export {GetInputDisplayNames, GetDisplayNames, GetInfoTexts, GetInputInfoTexts, GetPlaceholderText};