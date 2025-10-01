import { NoteElement, ScoreElement } from '@/models/Element';
import { getSecondaryNeume } from '@/models/NeumeReplacements';
import {
  Accidental,
  GorgonNeume,
  MeasureBar,
  QuantitativeNeume,
  restNeumes,
  TimeNeume,
  VocalExpressionNeume,
} from '@/models/Neumes';
import {
  allMeasureBars,
  allQuantitativeNeumes,
  allTimeNeumes,
  allVocalExpressionNeumes,
  getKlasmaType,
  GorgonIndexSetting,
  hapleNeumes,
  includesHyporoe,
  includesPetasti,
  isCompoundNeume,
  isHapleDisabled,
  isKoronisDisabled,
  KlasmaType,
  primaryAccidentalNeumes,
  //includesHyporoe,
  primaryGorgonNeumes,
  secondaryAccidentalNeumes,
  secondaryGorgonNeumes,
  slowGorgonNeumes,
  tertiaryAccidentalNeumes,
  TimeIndexSettings,
} from '@/utils/NeumeCompositionHelper';

export class UniformRandomNeumeGenerator {
  randomQuantitativeNeumeIndex(): number {
    return Math.floor(Math.random() * allQuantitativeNeumes.length);
  }

  randomPrimaryGorgonNeumeIndex(gorgonSetting: GorgonIndexSetting): number {
    let range = primaryGorgonNeumes.length;
    if (!gorgonSetting.omitBottom) {
      ++range;
    }
    if (gorgonSetting.includeSlow) {
      range += 3;
    }
    const idx = Math.floor(Math.random() * range);
    if (gorgonSetting.omitBottom) {
      if (range >= primaryGorgonNeumes.length) {
        return range - primaryGorgonNeumes.length;
      }
      return idx < 2 ? idx - 1 : idx;
    }
    if (range > primaryGorgonNeumes.length) {
      return range - primaryGorgonNeumes.length - 1;
    }
    return idx - 1;
  }

  randomSecondaryGorgonNeumeIndex(): number {
    return Math.floor(Math.random() * (secondaryGorgonNeumes.length + 1)) - 1;
  }

  randomTimeNeumeIndex(timeSettings: TimeIndexSettings): number {
    let range = allTimeNeumes.length + 1;
    if (timeSettings.hapleDisabled) {
      range -= 4;
    }
    if (timeSettings.koronisDisabled) {
      --range;
    }
    switch (timeSettings.klasmaType) {
      case KlasmaType.KLASMA_TOP:
      case KlasmaType.KLASMA_BOTTOM:
        --range;
        break;
      case KlasmaType.NO_KLASMA:
        range -= 2;
    }
    return Math.floor(Math.random() * range) - 1;
  }

  randomVocalExpressionNeumeIndex(): number {
    return (
      Math.floor(Math.random() * (allVocalExpressionNeumes.length + 1)) - 1
    );
  }

  randomPrimaryAccidentalNeumeIndex(): number {
    return Math.floor(Math.random() * (primaryAccidentalNeumes.length + 1)) - 1;
  }

  randomSecondaryAccidentalNeumeIndex(): number {
    return (
      Math.floor(Math.random() * (secondaryAccidentalNeumes.length + 1)) - 1
    );
  }

  randomTertiaryAccidentalNeumeIndex(): number {
    return (
      Math.floor(Math.random() * (tertiaryAccidentalNeumes.length + 1)) - 1
    );
  }

  randomMeasureBarNeumeIndex(): number {
    return Math.floor(Math.random() * (allMeasureBars.length + 1)) - 1;
  }

  genQuantitativeNeume(): QuantitativeNeume {
    return allQuantitativeNeumes[this.randomQuantitativeNeumeIndex()];
  }

  genPrimaryGorgonNeume(
    quantitativeNeume: QuantitativeNeume,
    vocanExpressionNeume: VocalExpressionNeume | null,
  ): GorgonNeume | null {
    if (includesPetasti(quantitativeNeume)) {
      return null;
    }
    if (
      vocanExpressionNeume === VocalExpressionNeume.Psifiston &&
      quantitativeNeume !== QuantitativeNeume.KentemataPlusOligon
    ) {
      return null;
    }
    const includeSlow =
      quantitativeNeume === QuantitativeNeume.KentemataPlusOligon;
    const gorgonSettings: GorgonIndexSetting = {
      omitBottom: false,
      includeSlow: includeSlow,
    };
    if (
      isCompoundNeume(quantitativeNeume) ||
      includesHyporoe(quantitativeNeume)
    ) {
      gorgonSettings.omitBottom = true;
    }
    const randomIndex = this.randomPrimaryGorgonNeumeIndex(gorgonSettings);
    if (includeSlow) {
      return slowGorgonNeumes[randomIndex];
    }
    return randomIndex < 0 ? null : primaryGorgonNeumes[randomIndex];
  }

  genSecondaryGorgonNeume(
    quantitativeNeume: QuantitativeNeume,
    vocanExpressionNeume: VocalExpressionNeume | null,
  ): GorgonNeume | null {
    if (includesPetasti(quantitativeNeume)) {
      return null;
    }
    if (
      vocanExpressionNeume === VocalExpressionNeume.Psifiston &&
      quantitativeNeume !== QuantitativeNeume.KentemataPlusOligon
    ) {
      return null;
    }
    if (getSecondaryNeume(quantitativeNeume) === null) {
      return null;
    }
    const randomIndex = this.randomSecondaryGorgonNeumeIndex();
    return randomIndex < 0 ? null : secondaryGorgonNeumes[randomIndex];
  }

  genTimeNeume(quantitativeNeume: QuantitativeNeume): TimeNeume | null {
    // TODO: also disable for rest neumes
    const timeSettings: TimeIndexSettings = {
      klasmaType: getKlasmaType(quantitativeNeume),
      hapleDisabled: isHapleDisabled(quantitativeNeume),
      koronisDisabled: isKoronisDisabled(quantitativeNeume),
    };
    const randomIndex = this.randomTimeNeumeIndex(timeSettings);
    if (randomIndex < 0) {
      return null;
    }
    let enabledNeumes = [];
    if (
      timeSettings.klasmaType === KlasmaType.KLASMA_BOTH ||
      timeSettings.klasmaType === KlasmaType.KLASMA_TOP
    ) {
      enabledNeumes.push(TimeNeume.Klasma_Top);
    }
    if (
      timeSettings.klasmaType === KlasmaType.KLASMA_BOTH ||
      timeSettings.klasmaType === KlasmaType.KLASMA_BOTTOM
    ) {
      enabledNeumes.push(TimeNeume.Klasma_Bottom);
    }
    if (!timeSettings.hapleDisabled) {
      enabledNeumes = enabledNeumes.concat(hapleNeumes);
    }
    if (!timeSettings.koronisDisabled) {
      enabledNeumes.push(TimeNeume.Koronis);
    }
    return enabledNeumes[randomIndex];
  }

  genVocalExpressionNeume(
    quantitativeNeume: QuantitativeNeume,
  ): VocalExpressionNeume | null {
    if (restNeumes.includes(quantitativeNeume)) {
      return null;
    }
    const randomIndex = this.randomVocalExpressionNeumeIndex();
    return randomIndex < 0 ? null : allVocalExpressionNeumes[randomIndex];
  }

  genPrimaryAccidentalNeume(
    quantitativeNeume: QuantitativeNeume,
  ): Accidental | null {
    if (restNeumes.includes(quantitativeNeume)) {
      return null;
    }
    const randomIndex = this.randomPrimaryAccidentalNeumeIndex();
    return randomIndex < 0 ? null : primaryAccidentalNeumes[randomIndex];
  }

  genSecondaryAccidentalNeume(
    quantitativeNeume: QuantitativeNeume,
  ): Accidental | null {
    if (restNeumes.includes(quantitativeNeume)) {
      return null;
    }
    const randomIndex = this.randomSecondaryAccidentalNeumeIndex();
    return randomIndex < 0 ? null : secondaryAccidentalNeumes[randomIndex];
  }

  genTertiaryAccidentalNeume(
    quantitativeNeume: QuantitativeNeume,
  ): Accidental | null {
    if (restNeumes.includes(quantitativeNeume)) {
      return null;
    }
    const randomIndex = this.randomTertiaryAccidentalNeumeIndex();
    return randomIndex < 0 ? null : tertiaryAccidentalNeumes[randomIndex];
  }

  genMeasureBarNeume(): MeasureBar | null {
    const randomIndex = this.randomMeasureBarNeumeIndex();
    return randomIndex < 0 ? null : allMeasureBars[randomIndex];
  }

  next(): ScoreElement {
    const score = new NoteElement();
    const quantitativeNeume = this.genQuantitativeNeume();
    const vocalExpressionNeume =
      this.genVocalExpressionNeume(quantitativeNeume);
    const gorgonNeume = this.genPrimaryGorgonNeume(
      quantitativeNeume,
      vocalExpressionNeume,
    );
    const secondaryGorgonNeume = this.genSecondaryGorgonNeume(
      quantitativeNeume,
      vocalExpressionNeume,
    );
    const timeNeume = this.genTimeNeume(quantitativeNeume);
    const accidentalNeume = this.genPrimaryAccidentalNeume(quantitativeNeume);
    const secondaryAccidentalNeume =
      this.genSecondaryAccidentalNeume(quantitativeNeume);
    const tertiaryAccidentalNeume =
      this.genTertiaryAccidentalNeume(quantitativeNeume);
    const attrs = {
      quantitativeNeume: quantitativeNeume,
      gorgonNeume: gorgonNeume,
      secondaryGorgonNeume: secondaryGorgonNeume,
      timeNeume: timeNeume,
      vocalExpressionNeume: vocalExpressionNeume,
      accidental: accidentalNeume,
      secondaryAccidental: secondaryAccidentalNeume,
      tertiaryAccidental: tertiaryAccidentalNeume,
    };
    Object.assign(score, attrs);
    return score;
  }

  test(): ScoreElement {
    const score = new NoteElement();
    const attrs = {
      quantitativeNeume: null,
      gorgonNeume: GorgonNeume.Gorgon_Top,
    };
    Object.assign(score, attrs);
    return score;
  }
}
