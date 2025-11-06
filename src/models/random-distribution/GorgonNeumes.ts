import { getSecondaryNeume } from '@/models/NeumeReplacements';
import {
  GorgonNeume,
  QuantitativeNeume,
  VocalExpressionNeume,
} from '@/models/Neumes';
import {
  Distribution,
  PartialDistribution,
} from '@/models/random-distribution/Config';
import { NeumeGenerator } from '@/models/random-distribution/NeumeRandomGenerator';
import {
  includesHyporoe,
  includesPetasti,
  isCompoundNeume,
} from '@/utils/NeumeCompositionHelper';

const gorgonNeumes = Object.values(GorgonNeume);
const primaryGorgonNeumes = gorgonNeumes.slice(0, 12);
const secondaryGorgonNeumes = gorgonNeumes.slice(12, 23);
const slowGorgonNeumes = gorgonNeumes.slice(23);

export type PrimaryGorgonNeumePartialDistribution = {
  [prop in (typeof primaryGorgonNeumes)[number]]?: number;
} & {
  [prop in (typeof slowGorgonNeumes)[number]]?: number;
} & PartialDistribution;

export type PrimaryGorgonNeumeDistribution = {
  [prop in (typeof primaryGorgonNeumes)[number]]: number;
} & {
  [prop in (typeof slowGorgonNeumes)[number]]: number;
} & Distribution;

export interface PrimaryGorgonNeumeGeneratorArgs {
  neumes: GorgonNeume[];
  neumeDistribution: PrimaryGorgonNeumePartialDistribution;
}

export type SecondaryGorgonNeumePartialDistribution = {
  [prop in (typeof secondaryGorgonNeumes)[number]]?: number;
} & PartialDistribution;

export type SecondaryGorgonNeumeDistribution = {
  [prop in (typeof secondaryGorgonNeumes)[number]]: number;
} & Distribution;

export interface SecondaryGorgonNeumeGeneratorArgs {
  neumes: GorgonNeume[];
  neumeDistribution: SecondaryGorgonNeumePartialDistribution;
}

export class PrimaryGorgonNeumeGenerator extends NeumeGenerator<PrimaryGorgonNeumeDistribution> {
  noSlowNoBottomCumulativeDistribution: PrimaryGorgonNeumeDistribution;
  slowNoBottomCumulativeDistribution: PrimaryGorgonNeumeDistribution;
  bottomNoSlowCumulativeDistribution: PrimaryGorgonNeumeDistribution;

  private genNoSlowNoBottomCumulativeDistribution(): PrimaryGorgonNeumeDistribution {
    const cumulativeDist = {};
    let distValue = 0;
    for (const key of primaryGorgonNeumes) {
      if (key === GorgonNeume.Gorgon_Bottom || slowGorgonNeumes.includes(key)) {
        Object.assign(cumulativeDist, { [key]: 0 });
      } else {
        distValue += this.distribution[key];
        Object.assign(cumulativeDist, { [key]: distValue });
      }
    }
    Object.assign(cumulativeDist, { Denominator: distValue });
    return cumulativeDist as PrimaryGorgonNeumeDistribution;
  }

  private genSlowNoBottomCumulativeDistribution(): PrimaryGorgonNeumeDistribution {
    const cumulativeDist = {};
    let distValue = 0;
    for (const key of primaryGorgonNeumes) {
      if (key === GorgonNeume.Gorgon_Bottom) {
        Object.assign(cumulativeDist, { [key]: 0 });
      } else {
        distValue += this.distribution[key];
        Object.assign(cumulativeDist, { [key]: distValue });
      }
    }
    Object.assign(cumulativeDist, { Denominator: distValue });
    return cumulativeDist as PrimaryGorgonNeumeDistribution;
  }

  private genBottomNoSlowCumulativeDistribution(): PrimaryGorgonNeumeDistribution {
    const cumulativeDist = {};
    let distValue = 0;
    for (const key of primaryGorgonNeumes) {
      if (slowGorgonNeumes.includes(key)) {
        Object.assign(cumulativeDist, { [key]: 0 });
      } else {
        distValue += this.distribution[key];
        Object.assign(cumulativeDist, { [key]: distValue });
      }
    }
    Object.assign(cumulativeDist, { Denominator: distValue });
    return cumulativeDist as PrimaryGorgonNeumeDistribution;
  }

  constructor(neumeDistribution: PrimaryGorgonNeumePartialDistribution) {
    super({
      neumes: primaryGorgonNeumes.concat(slowGorgonNeumes),
      neumeDistribution: neumeDistribution,
    } as PrimaryGorgonNeumeGeneratorArgs);
    this.noSlowNoBottomCumulativeDistribution =
      this.genNoSlowNoBottomCumulativeDistribution();
    this.slowNoBottomCumulativeDistribution =
      this.genSlowNoBottomCumulativeDistribution();
    this.bottomNoSlowCumulativeDistribution =
      this.genBottomNoSlowCumulativeDistribution();
  }

  isNextValid(
    quantitativeNeume: QuantitativeNeume,
    vocalExpressionNeume: VocalExpressionNeume | null,
  ): boolean {
    if (includesPetasti(quantitativeNeume)) {
      return false;
    }
    if (
      vocalExpressionNeume === VocalExpressionNeume.Psifiston &&
      quantitativeNeume !== QuantitativeNeume.KentemataPlusOligon
    ) {
      return false;
    }
    return true;
  }

  next(quantitativeNeume: QuantitativeNeume): GorgonNeume {
    const includeSlow =
      quantitativeNeume === QuantitativeNeume.KentemataPlusOligon;
    let cumulativeDist: PrimaryGorgonNeumeDistribution;
    if (includeSlow) {
      cumulativeDist = this.slowNoBottomCumulativeDistribution;
    } else if (
      isCompoundNeume(quantitativeNeume) ||
      includesHyporoe(quantitativeNeume)
    ) {
      cumulativeDist = this.noSlowNoBottomCumulativeDistribution;
    } else {
      cumulativeDist = this.bottomNoSlowCumulativeDistribution;
    }
    const random = Math.random() * cumulativeDist.Denominator;
    for (const key of primaryGorgonNeumes) {
      if (random < cumulativeDist[key]) {
        return key;
      }
    }
    if (includeSlow) {
      return slowGorgonNeumes[slowGorgonNeumes.length - 1];
    }
    return primaryGorgonNeumes[primaryGorgonNeumes.length - 1];
  }
}

export class SecondaryGorgonNeumeGenerator extends NeumeGenerator<SecondaryGorgonNeumeDistribution> {
  cumulativeDistribution: SecondaryGorgonNeumeDistribution;

  constructor(neumeDistribution: SecondaryGorgonNeumePartialDistribution) {
    const args = {
      neumes: secondaryGorgonNeumes,
      neumeDistribution: neumeDistribution,
    } as SecondaryGorgonNeumeGeneratorArgs;
    super(args);
    this.cumulativeDistribution = this.genCumulativeDistribution(args);
  }

  isNextValid(
    quantitativeNeume: QuantitativeNeume,
    vocalExpressionNeume: VocalExpressionNeume | null,
  ): boolean {
    if (includesPetasti(quantitativeNeume)) {
      return false;
    }
    if (
      vocalExpressionNeume === VocalExpressionNeume.Psifiston &&
      quantitativeNeume !== QuantitativeNeume.KentemataPlusOligon
    ) {
      return false;
    }
    if (getSecondaryNeume(quantitativeNeume)) {
      return false;
    }
    return true;
  }

  next(): GorgonNeume {
    const random = Math.random() * this.cumulativeDistribution.Denominator;
    for (const key of primaryGorgonNeumes) {
      if (random < this.cumulativeDistribution[key]) {
        return key;
      }
    }
    return secondaryGorgonNeumes[secondaryGorgonNeumes.length - 1];
  }
}
