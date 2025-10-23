import { QuantitativeNeume } from '@/models/Neumes';

const quantitativeNeumeValues = Object.values(QuantitativeNeume);

export type QuantitativeNeumePartialDistribution = {
  [prop in (typeof quantitativeNeumeValues)[number]]?: number;
};

export type QuantitativeNeumeCumulativeDistribution = {
  [prop in (typeof quantitativeNeumeValues)[number]]: number;
};

export class QuantitativeNeumeGenerator {
  distribution: QuantitativeNeumeCumulativeDistribution;
  //distributionFunction: Map<number, QuantitativeNeume>;

  constructor(
    quantitativeNeumeDistribution: QuantitativeNeumePartialDistribution,
  ) {
    let designatedProb = 0;
    let undefCount = 0;
    for (const key of quantitativeNeumeValues) {
      const value = quantitativeNeumeDistribution[key];
      console.log(value);
      if (value === undefined) {
        ++undefCount;
      } else {
        designatedProb += value;
      }
    }
    if (designatedProb > 1 + Number.EPSILON) {
      throw new Error('not a distribution');
    }
    const dist = {};
    //this.distributionFunction = new Map<number, QuantitativeNeume>();
    let cumulativeProb = 0;
    const uniformResidualProb = undefCount === 0 ? 0 : (1 - designatedProb) / undefCount;
    for (const key of quantitativeNeumeValues) {
      const prob = quantitativeNeumeDistribution[key];
      if (prob === undefined) {
        cumulativeProb += uniformResidualProb;
      } else {
        cumulativeProb += prob;
      }
      Object.assign(dist, {
        [key]: cumulativeProb,
      });
      //this.distributionFunction.set(cumulativeProb, key);
    }
    this.distribution = dist as QuantitativeNeumeCumulativeDistribution;
  }

  next(): QuantitativeNeume {
    const random = Math.random();
    //console.log(random);
    //console.log(this.distribution);
    for (const key of quantitativeNeumeValues) {
      if (random < this.distribution[key]) {
        return key;
      }
    }
    return quantitativeNeumeValues[quantitativeNeumeValues.length - 1];
  }
}
