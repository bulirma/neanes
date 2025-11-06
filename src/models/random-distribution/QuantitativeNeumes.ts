import { QuantitativeNeume } from '@/models/Neumes';
import {
  Distribution,
  PartialDistribution,
} from '@/models/random-distribution/Config';
import { NeumeGenerator } from '@/models/random-distribution/NeumeRandomGenerator';

const quantitativeNeumes = Object.values(QuantitativeNeume);

export type QuantitativeNeumePartialDistribution = {
  [prop in (typeof quantitativeNeumes)[number]]?: number;
} & PartialDistribution;

export type QuantitativeNeumeDistribution = {
  [prop in (typeof quantitativeNeumes)[number]]: number;
} & Distribution;

export interface QuantitativeNeumeGeneratorArgs {
  neumes: QuantitativeNeume[];
  neumeDistribution: QuantitativeNeumePartialDistribution;
}

export class QuantitativeNeumeGenerator extends NeumeGenerator<QuantitativeNeumeDistribution> {
  cumulativeDistribution: QuantitativeNeumeDistribution;

  constructor(neumeDistribution: QuantitativeNeumePartialDistribution) {
    const args = {
      neumes: quantitativeNeumes,
      neumeDistribution: neumeDistribution,
    } as QuantitativeNeumeGeneratorArgs;
    super(args);
    this.cumulativeDistribution = this.genCumulativeDistribution(args);
  }

  next(): QuantitativeNeume {
    const random = Math.random() * this.cumulativeDistribution.Denominator;
    for (const key of quantitativeNeumes) {
      if (random < this.cumulativeDistribution[key]) {
        return key;
      }
    }
    return quantitativeNeumes[quantitativeNeumes.length - 1];
  }
}
