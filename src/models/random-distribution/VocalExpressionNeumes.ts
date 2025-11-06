import {
  QuantitativeNeume,
  restNeumes,
  VocalExpressionNeume,
} from '@/models/Neumes';
import {
  Distribution,
  PartialDistribution,
} from '@/models/random-distribution/Config';
import { NeumeGenerator } from '@/models/random-distribution/NeumeRandomGenerator';

const vocalExpressionNeumes = Object.values(VocalExpressionNeume);

export type VocalExpressionNeumePartialDistribution = {
  [prop in (typeof vocalExpressionNeumes)[number]]?: number;
} & PartialDistribution;

export type VocalExpressionNeumeDistribution = {
  [prop in (typeof vocalExpressionNeumes)[number]]: number;
} & Distribution;

export interface VocalExpressionNeumeGeneratorArgs {
  neumes: VocalExpressionNeume[];
  neumeDistribution: VocalExpressionNeumePartialDistribution;
}

export class VocalExpresssionNeumeGenerator extends NeumeGenerator<VocalExpressionNeumeDistribution> {
  cumulativeDistribution: VocalExpressionNeumeDistribution;

  constructor(neumeDistribution: VocalExpressionNeumePartialDistribution) {
    const args = {
      neumes: vocalExpressionNeumes,
      neumeDistribution: neumeDistribution,
    };
    super(args);
    this.cumulativeDistribution = this.genCumulativeDistribution(args);
  }

  isNextValid(quantitativeNeume: QuantitativeNeume): boolean {
    return !restNeumes.includes(quantitativeNeume);
  }

  next(): VocalExpressionNeume {
    const random = Math.random() * this.cumulativeDistribution.Denominator;
    for (const key of vocalExpressionNeumes) {
      if (random < this.cumulativeDistribution[key]) {
        return key;
      }
    }
    return vocalExpressionNeumes[vocalExpressionNeumes.length - 1];
  }
}
