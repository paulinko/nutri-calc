const InputDisplayNames = {
  ratioSatFats: 'Fette (gesamt)'
}

const DisplayNames = {
  kJ: 'kJ',
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
  drinks: 'Getränke'
}


function GetInputDisplayNames(prop) {
  return InputDisplayNames[prop] ?? DisplayNames[prop]
}

function GetDisplayNames(prop) {
  return DisplayNames[prop]
}

export {GetInputDisplayNames, GetDisplayNames};