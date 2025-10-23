import {
  Accidental,
  //Fthora,
  GorgonNeume,
  MeasureBar,
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
  TimeNeume,
  VocalExpressionNeume,
} from '@/models/Neumes';

const allGorgonNeumes = Object.values(GorgonNeume);
const allAccidentalNeumes = Object.values(Accidental);

export const allQuantitativeNeumes = Object.values(QuantitativeNeume);
export const primaryGorgonNeumes = allGorgonNeumes.slice(0, 12);
export const secondaryGorgonNeumes = allGorgonNeumes.slice(12, 23);
export const slowGorgonNeumes = Object.values(GorgonNeume).slice(23);
export const allTimeNeumes = Object.values(TimeNeume);
export const hapleNeumes = allTimeNeumes.slice(2, 6);
export const allVocalExpressionNeumes = Object.values(VocalExpressionNeume);
export const primaryAccidentalNeumes = allAccidentalNeumes
  .slice(0, 4)
  .concat(allAccidentalNeumes.slice(12, 16));
export const secondaryAccidentalNeumes = allAccidentalNeumes
  .slice(4, 8)
  .concat(allAccidentalNeumes.slice(16, 20));
export const tertiaryAccidentalNeumes = allAccidentalNeumes
  .slice(8, 12)
  .concat(allAccidentalNeumes.slice(20, 24));
export const allMeasureBars = Object.values(MeasureBar);
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

export enum KlasmaType {
  KLASMA_TOP,
  KLASMA_BOTTOM,
  KLASMA_BOTH,
  NO_KLASMA,
}

export interface TimeIndexSettings {
  klasmaType: KlasmaType;
  hapleDisabled: boolean;
  koronisDisabled: boolean;
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

// klasma related functions

export function isBottomKlasmaOnlyNeume(
  quantitativeNeume: QuantitativeNeume,
): boolean {
  switch (quantitativeNeume) {
    case QuantitativeNeume.PetastiWithIson:
    case QuantitativeNeume.Petasti:
    case QuantitativeNeume.PetastiPlusOligon:
    case QuantitativeNeume.PetastiPlusKentimaAbove:
    case QuantitativeNeume.PetastiPlusHypsiliRight:
    case QuantitativeNeume.PetastiPlusHypsiliLeft:
    case QuantitativeNeume.PetastiPlusHypsiliPlusKentimaHorizontal:
    case QuantitativeNeume.PetastiPlusHypsiliPlusKentimaVertical:
    case QuantitativeNeume.PetastiPlusDoubleHypsili:
    case QuantitativeNeume.PetastiPlusApostrophos:
    case QuantitativeNeume.PetastiPlusElaphron:
    case QuantitativeNeume.PetastiPlusElaphronPlusApostrophos:
    case QuantitativeNeume.OligonPlusDoubleHypsili:
      return true;
  }
  return false;
}

export function isTopKlasmaOnlyNeume(
  quantitativeNeume: QuantitativeNeume,
): boolean {
  switch (quantitativeNeume) {
    case QuantitativeNeume.Ison:
    case QuantitativeNeume.KentemataPlusOligon:
    case QuantitativeNeume.Oligon:
    case QuantitativeNeume.OligonPlusKentimaBelow:
    case QuantitativeNeume.OligonPlusKentima:
    case QuantitativeNeume.OligonPlusHypsiliRight:
    case QuantitativeNeume.Hamili:
    case QuantitativeNeume.HamiliPlusApostrophos:
    case QuantitativeNeume.HamiliPlusElaphron:
    case QuantitativeNeume.HamiliPlusElaphronPlusApostrophos:
    case QuantitativeNeume.DoubleHamili:
    case QuantitativeNeume.Apostrophos:
    case QuantitativeNeume.Elaphron:
    case QuantitativeNeume.ElaphronPlusApostrophos:
      return true;
  }
  return false;
}

export function isKlasmaDisabledNeume(
  quantitativeNeume: QuantitativeNeume,
): boolean {
  switch (quantitativeNeume) {
    case QuantitativeNeume.Hyporoe:
    case QuantitativeNeume.Kentemata:
    case QuantitativeNeume.OligonPlusKentemata:
    case QuantitativeNeume.OligonPlusHamiliPlusKentemata:
    case QuantitativeNeume.OligonPlusIsonPlusKentemata:
    case QuantitativeNeume.OligonPlusElaphronPlusKentemata:
    case QuantitativeNeume.OligonPlusApostrophosPlusKentemata:
    case QuantitativeNeume.OligonPlusElaphronPlusApostrophosPlusKentemata:
      return true;
  }
  return false;
}

export function getKlasmaType(
  quantitativeNeume: QuantitativeNeume,
): KlasmaType {
  if (isKlasmaDisabledNeume(quantitativeNeume)) {
    return KlasmaType.NO_KLASMA;
  }
  if (isTopKlasmaOnlyNeume(quantitativeNeume)) {
    return KlasmaType.KLASMA_TOP;
  }
  if (isBottomKlasmaOnlyNeume(quantitativeNeume)) {
    return KlasmaType.KLASMA_BOTTOM;
  }
  return KlasmaType.KLASMA_BOTH;
}

// other time neumes
export const isHapleDisabled = isKlasmaDisabledNeume;
export const isKoronisDisabled = isKlasmaDisabledNeume;
