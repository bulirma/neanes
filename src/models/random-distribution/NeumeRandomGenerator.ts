import {
  PrimaryAccidentalNeumeGeneratorArgs,
  SecondaryAccidentalNeumeGeneratorArgs,
  TertiaryAccidentalNeumeGeneratorArgs,
} from '@/models/random-distribution/AccidentalNeumes';
import { Distribution } from '@/models/random-distribution/Config';
import {
  PrimaryGorgonNeumeGeneratorArgs,
  SecondaryGorgonNeumeGeneratorArgs,
} from '@/models/random-distribution/GorgonNeumes';
import { QuantitativeNeumeGeneratorArgs } from '@/models/random-distribution/QuantitativeNeumes';
import { TimeNeumeGeneratorArgs } from '@/models/random-distribution/TimeNeumes';
import { VocalExpressionNeumeGeneratorArgs } from '@/models/random-distribution/VocalExpressionNeumes';

type ArgsT =
  | QuantitativeNeumeGeneratorArgs
  | PrimaryGorgonNeumeGeneratorArgs
  | SecondaryGorgonNeumeGeneratorArgs
  | VocalExpressionNeumeGeneratorArgs
  | TimeNeumeGeneratorArgs
  | PrimaryAccidentalNeumeGeneratorArgs
  | SecondaryAccidentalNeumeGeneratorArgs
  | TertiaryAccidentalNeumeGeneratorArgs;

export class NeumeGenerator<DistributionT extends Distribution> {
  distribution: DistributionT;

  protected genCumulativeDistribution(args: ArgsT): DistributionT {
    const cumulativeDist = {};
    let distValue = 0;
    for (const key of args.neumes) {
      distValue += this.distribution[key];
      Object.assign(cumulativeDist, { [key]: distValue });
    }
    Object.assign(cumulativeDist, { Denominator: distValue });
    return cumulativeDist as DistributionT;
  }

  constructor(args: ArgsT) {
    const denominator =
      args.neumeDistribution.Denominator ?? args.neumes.length;
    let designatedVal = 0;
    let undefCount = 0;
    for (const key of args.neumes) {
      const value = args.neumeDistribution[key];
      if (value === undefined) {
        ++undefCount;
      } else {
        designatedVal += value;
      }
    }
    if (designatedVal > denominator) {
      throw new Error('not a distribution');
    }
    const dist = {
      Denominator: denominator,
    };
    const uniformResidualVal =
      undefCount === 0 ? 0 : (denominator - designatedVal) / undefCount;
    for (const key of args.neumes) {
      const val = args.neumeDistribution[key];
      if (val === undefined) {
        Object.assign(dist, { [key]: uniformResidualVal });
      } else {
        Object.assign(dist, { [key]: val });
      }
    }
    this.distribution = dist as DistributionT;
  }
}
