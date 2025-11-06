import { Accidental, QuantitativeNeume, restNeumes } from '@/models/Neumes';
import {
  Distribution,
  PartialDistribution,
} from '@/models/random-distribution/Config';
import { NeumeGenerator } from '@/models/random-distribution/NeumeRandomGenerator';

const accidentalNeumes = Object.values(Accidental);
const primaryAccidentalNeumes = accidentalNeumes
  .slice(0, 4)
  .concat(accidentalNeumes.slice(12, 16));
const secondaryAccidentalNeumes = accidentalNeumes
  .slice(4, 8)
  .concat(accidentalNeumes.slice(16, 20));
const tertiaryAccidentalNeumes = accidentalNeumes
  .slice(8, 12)
  .concat(accidentalNeumes.slice(20, 24));

export type PrimaryAccidentalNeumePartialDistribution = {
  [prop in (typeof primaryAccidentalNeumes)[number]]?: number;
} & PartialDistribution;

export type PrimaryAccidentalNeumeDistribution = {
  [prop in (typeof primaryAccidentalNeumes)[number]]: number;
} & Distribution;

export interface PrimaryAccidentalNeumeGeneratorArgs {
  neumes: Accidental[];
  neumeDistribution: PrimaryAccidentalNeumePartialDistribution;
}

export type SecondaryAccidentalNeumePartialDistribution = {
  [prop in (typeof secondaryAccidentalNeumes)[number]]?: number;
} & PartialDistribution;

export type SecondaryAccidentalNeumeDistribution = {
  [prop in (typeof secondaryAccidentalNeumes)[number]]: number;
} & Distribution;

export interface SecondaryAccidentalNeumeGeneratorArgs {
  neumes: Accidental[];
  neumeDistribution: SecondaryAccidentalNeumePartialDistribution;
}

export type TertiaryAccidentalNeumePartialDistribution = {
  [prop in (typeof tertiaryAccidentalNeumes)[number]]?: number;
} & PartialDistribution;

export type TertiaryAccidentalNeumeDistribution = {
  [prop in (typeof tertiaryAccidentalNeumes)[number]]: number;
} & Distribution;

export interface TertiaryAccidentalNeumeGeneratorArgs {
  neumes: Accidental[];
  neumeDistribution: PrimaryAccidentalNeumePartialDistribution;
}

export class PrimaryAccidentalNeumeGenerator extends NeumeGenerator<PrimaryAccidentalNeumeDistribution> {
  cumulativeDistribution: PrimaryAccidentalNeumeDistribution;

  constructor(neumeDistribution: PrimaryAccidentalNeumePartialDistribution) {
    const args = {
      neumes: primaryAccidentalNeumes,
      neumeDistribution: neumeDistribution,
    };
    super(args);
    this.cumulativeDistribution = this.genCumulativeDistribution(args);
  }

  isNextValid(quantitativeNeume: QuantitativeNeume): boolean {
    return !restNeumes.includes(quantitativeNeume);
  }

  next(): Accidental {
    const random = Math.random() * this.cumulativeDistribution.Denominator;
    for (const key of primaryAccidentalNeumes) {
      if (random < this.cumulativeDistribution[key]) {
        return key;
      }
    }
    return primaryAccidentalNeumes[primaryAccidentalNeumes.length - 1];
  }
}

export class SecondaryAccidentalNeumeGenerator extends NeumeGenerator<SecondaryAccidentalNeumeDistribution> {
  cumulativeDistribution: SecondaryAccidentalNeumeDistribution;

  constructor(neumeDistribution: SecondaryAccidentalNeumePartialDistribution) {
    const args = {
      neumes: secondaryAccidentalNeumes,
      neumeDistribution: neumeDistribution,
    };
    super(args);
    this.cumulativeDistribution = this.genCumulativeDistribution(args);
  }

  isNextValid(quantitativeNeume: QuantitativeNeume): boolean {
    return !restNeumes.includes(quantitativeNeume);
  }

  next(): Accidental {
    const random = Math.random() * this.cumulativeDistribution.Denominator;
    for (const key of secondaryAccidentalNeumes) {
      if (random < this.cumulativeDistribution[key]) {
        return key;
      }
    }
    return secondaryAccidentalNeumes[secondaryAccidentalNeumes.length - 1];
  }
}

export class TertiaryAccidentalNeumeGenerator extends NeumeGenerator<TertiaryAccidentalNeumeDistribution> {
  cumulativeDistribution: TertiaryAccidentalNeumeDistribution;

  constructor(neumeDistribution: TertiaryAccidentalNeumePartialDistribution) {
    const args = {
      neumes: tertiaryAccidentalNeumes,
      neumeDistribution: neumeDistribution,
    };
    super(args);
    this.cumulativeDistribution = this.genCumulativeDistribution(args);
  }

  isNextValid(quantitativeNeume: QuantitativeNeume): boolean {
    return !restNeumes.includes(quantitativeNeume);
  }

  next(): Accidental {
    const random = Math.random() * this.cumulativeDistribution.Denominator;
    for (const key of tertiaryAccidentalNeumes) {
      if (random < this.cumulativeDistribution[key]) {
        return key;
      }
    }
    return tertiaryAccidentalNeumes[tertiaryAccidentalNeumes.length - 1];
  }
}
