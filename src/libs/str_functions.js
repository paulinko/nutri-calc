import {
    InfoTexts,
    ProteinAppliedDisplayNames,
    DisplayNames,
    DisplayValues,
    InputInfoTexts,
    CurrentLocale,
    AvailableModalInfos
} from "@/libs/localized/Strings";

function trans(prop, args= null){
    let s = DisplayNames[prop] ?? prop
    if (args !== null) {
        for (const [k,v] of Object.entries(args)) {
            s = s.replace(k, v)
        }
    }
    return s
}

function GetInfoTexts(prop,algorithm) {
    return InfoTexts[algorithm][prop] ?? 'Lorem Ipsum sit dolor amet...'
}

function GetInputInfoTexts(prop) {
    return InputInfoTexts[prop] ?? '';
}

function GetPlaceholderText(prop) {
    return GetDisplayNames(prop + 'Placeholder')
}

function GetDisplayNames(prop, wasUsed = true) {
    if (!wasUsed) {
        return DisplayNames[prop] + ' (' + DisplayNames['not_counted'] + ') '
    }
    return DisplayNames[prop] ?? prop
}

function GetDisplayValue(prop, value) {
    if (DisplayValues[prop] && DisplayValues[prop][value]) {

        return DisplayValues[prop][value]
    }

    return value.toLocaleString()
}

function GetProteinAppliedReason(reason) {
    return ProteinAppliedDisplayNames.get(reason) ?? 'invalid value'
}

export {
    GetDisplayNames,
    GetDisplayValue,
    GetInfoTexts,
    trans,
    GetInputInfoTexts,
    GetPlaceholderText,
    GetProteinAppliedReason,
    CurrentLocale,
    AvailableModalInfos
};