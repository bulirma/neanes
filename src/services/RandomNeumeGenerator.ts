import { NoteElement, ScoreElement } from '@/models/Element';
import {
  GorgonNeume,
  QuantitativeNeume,
  TimeNeume,
} from '@/models/Neumes';
import { getSecondaryNeume } from '@/models/NeumeReplacements';
import {
  allQuantitativeNeumes,
  allTimeNeumes,
  includesHyporoe,
  includesPetasti,
  isCompoundNeume,
  isHapleDisabled,
  isKoronisDisabled,
  getKlasmaType,
  GorgonIndexSetting,
  hapleNeumes,
  KlasmaType,
  primaryGorgonNeumes,
  secondaryGorgonNeumes,
  slowGorgonNeumes,
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

  genQuantitativeNeume(): QuantitativeNeume {
    return allQuantitativeNeumes[this.randomQuantitativeNeumeIndex()];
  }

  genPrimaryGorgonNeume(
    quantitativeNeume: QuantitativeNeume,
  ): GorgonNeume | null {
    if (includesPetasti(quantitativeNeume)) {
      return null;
    }
    // TODO: must not be on psefiston except for oligon with kentamata below
    const includeSlow = quantitativeNeume === QuantitativeNeume.KentemataPlusOligon;
    const gorgonSettings: GorgonIndexSetting = {
      omitBottom: false,
      includeSlow: includeSlow
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

  randomTimeNeumeIndex(
    timeSettings: TimeIndexSettings
  ): number {
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

  genSecondaryGorgonNeume(
    quantitativeNeume: QuantitativeNeume,
  ): GorgonNeume | null {
    if (includesPetasti(quantitativeNeume)) {
      return null;
    }
    // TODO: must not be on psefiston except for oligon with kentamata below
    if (getSecondaryNeume(quantitativeNeume) === null) {
      return null;
    }
    const randomIndex = this.randomSecondaryGorgonNeumeIndex();
    return randomIndex < 0 ? null : secondaryGorgonNeumes[randomIndex];
  }

  genTimeNeume(
    quantitativeNeume: QuantitativeNeume,
  ): TimeNeume | null {
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
    if (timeSettings.klasmaType === KlasmaType.KLASMA_BOTH || timeSettings.klasmaType === KlasmaType.KLASMA_TOP) {
      enabledNeumes.push(TimeNeume.Klasma_Top);
    }
    if (timeSettings.klasmaType === KlasmaType.KLASMA_BOTH || timeSettings.klasmaType === KlasmaType.KLASMA_BOTTOM) {
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

  next(): ScoreElement {
    const score = new NoteElement();
    const quantitativeNeume = this.genQuantitativeNeume();
    const gorgonNeume = this.genPrimaryGorgonNeume(quantitativeNeume);
    const secondaryGorgonNeume = this.genSecondaryGorgonNeume(quantitativeNeume);
    const attrs = {
      quantitativeNeume: quantitativeNeume,
      gorgonNeume: gorgonNeume,
      secondaryGorgonNeume: secondaryGorgonNeume,
    };
    Object.assign(score, attrs);
    return score;
  }
}
