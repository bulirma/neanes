import {
  //Accidental,
  //Fthora,
  GorgonNeume,
  //MeasureBar,
  //Ison,
  //Letter,
  //MeasureBar,
  //MeasureNumber,
  //ModeSign,
  //Note,
  //NoteIndicator,
  QuantitativeNeume,
  //RootSign,
  //TempoSign,
  //Tie,
  //TimeNeume,
  //VocalExpressionNeume,
} from '@/models/Neumes';

const allGorgonNeumes = Object.values(GorgonNeume);

export const allQuantitativeNeumes = Object.values(QuantitativeNeume);
export const primaryGorgonNeumes = allGorgonNeumes.slice(0, 12);
export const secondaryGorgonNeumes = allGorgonNeumes.slice(12, 23);
export const slowGorgonNeumes = Object.values(GorgonNeume).slice(23);
//const allTimeNeumes = Object.values(TimeNeume);
//const hapleNeumes = allTimeNeumes.slice(2, 6);
//const allVocalExpressionNeumes = Object.values(VocalExpressionNeume);
//const allAccidentalNeumes = Object.values(Accidental);
//const allMeasureBars = Object.values(MeasureBar);
//const allFthoras = Object.values(Fthora);
//const allIsons = Object.values(Ison);
//const allTempoSigns = Object.values(TempoSign);
//const allNotes = Object.values(Note);
//const allRootSigns = Object.values(RootSign);
//const allModeSign = Object.values(ModeSign);
//const allMeasureNumbers = Object.values(MeasureNumber);
//const allNoteIndicators = Object.values(NoteIndicator);
//const allTies = Object.values(Tie);
//const allLetters = Object.values(Letter);

export interface GorgonIndexSetting {
  omitBottom: boolean;
  includeSlow: boolean;
}

// gorgon related neumes

export function isCompoundNeume(quantitativeNeume: QuantitativeNeume): boolean {
  switch (quantitativeNeume) {
    case QuantitativeNeume.PetastiPlusRunningElaphron:
    case QuantitativeNeume.OligonPlusKentemata:
    case QuantitativeNeume.KentemataPlusOligon:
    case QuantitativeNeume.OligonPlusIsonPlusKentemata:
    case QuantitativeNeume.OligonKentimaMiddleKentimata:
    case QuantitativeNeume.OligonPlusKentemataPlusHypsiliRight:
    case QuantitativeNeume.OligonPlusKentemataPlusHypsiliLeft:
    case QuantitativeNeume.OligonPlusApostrophosPlusKentemata:
    case QuantitativeNeume.OligonPlusElaphronPlusKentemata:
    case QuantitativeNeume.OligonPlusRunningElaphronPlusKentemata:
    case QuantitativeNeume.OligonPlusHyporoePlusKentemata:
    case QuantitativeNeume.OligonPlusElaphronPlusApostrophosPlusKentemata:
    case QuantitativeNeume.OligonPlusHamiliPlusKentemata:
      return true;
  }
  return false;
}

export function includesHyporoe(quantitativeNeume: QuantitativeNeume): boolean {
  switch (quantitativeNeume) {
    case QuantitativeNeume.OligonPlusHyporoePlusKentemata:
    case QuantitativeNeume.Hyporoe:
    case QuantitativeNeume.PetastiPlusHyporoe:
    case QuantitativeNeume.OligonPlusHyporoe:
      return true;
  }
  return false;
}

export function includesPetasti(quantitativeNeume: QuantitativeNeume): boolean {
  switch (quantitativeNeume) {
    case QuantitativeNeume.Petasti:
    case QuantitativeNeume.PetastiHamili:
    case QuantitativeNeume.PetastiWithIson:
    case QuantitativeNeume.PetastiPlusHyporoe:
    case QuantitativeNeume.PetastiPlusOligon:
    case QuantitativeNeume.PetastiDoubleHamili:
    case QuantitativeNeume.PetastiPlusElaphron:
    case QuantitativeNeume.PetastiPlusRunningElaphron:
    case QuantitativeNeume.PetastiTripleYpsili:
    case QuantitativeNeume.PetastiHamiliElafron:
    case QuantitativeNeume.PetastiPlusApostrophos:
    case QuantitativeNeume.PetastiPlusHypsiliLeft:
    case QuantitativeNeume.PetastiPlusHypsiliRight:
    case QuantitativeNeume.PetastiHamiliApostrofos:
    case QuantitativeNeume.PetastiPlusKentimaAbove:
    case QuantitativeNeume.PetastiPlusDoubleHypsili:
    case QuantitativeNeume.PetastiKentimaTripleYpsili:
    case QuantitativeNeume.PetastiKentimataDoubleYpsili:
    case QuantitativeNeume.PetastiKentimataTripleYpsili:
    case QuantitativeNeume.PetastiDoubleHamiliApostrofos:
    case QuantitativeNeume.PetastiHamiliElafronApostrofos:
    case QuantitativeNeume.PetastiKentimaDoubleYpsiliLeft:
    case QuantitativeNeume.PetastiKentimaDoubleYpsiliRight:
    case QuantitativeNeume.PetastiPlusElaphronPlusApostrophos:
    case QuantitativeNeume.PetastiPlusHypsiliPlusKentimaVertical:
    case QuantitativeNeume.PetastiPlusHypsiliPlusKentimaHorizontal:
      return true;
  }
  return false;
}
