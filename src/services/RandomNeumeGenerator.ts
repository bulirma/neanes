import { NoteElement, ScoreElement } from '@/models/Element';
import {
  GorgonNeume,
  QuantitativeNeume,
} from '@/models/Neumes';
import { getSecondaryNeume } from '@/models/NeumeReplacements';
import {
  allQuantitativeNeumes,
  includesHyporoe,
  includesPetasti,
  isCompoundNeume,
  GorgonIndexSetting,
  primaryGorgonNeumes,
  secondaryGorgonNeumes,
  slowGorgonNeumes,
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
