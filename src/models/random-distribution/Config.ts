import {
  PrimaryAccidentalNeumePartialDistribution,
  SecondaryAccidentalNeumePartialDistribution,
  TertiaryAccidentalNeumePartialDistribution,
} from '@/models/random-distribution/AccidentalNeumes';
import {
  PrimaryGorgonNeumePartialDistribution,
  SecondaryGorgonNeumePartialDistribution,
} from '@/models/random-distribution/GorgonNeumes';
import { QuantitativeNeumePartialDistribution } from '@/models/random-distribution/QuantitativeNeumes';
import { TimeNeumePartialDistribution } from '@/models/random-distribution/TimeNeumes';
import { VocalExpressionNeumePartialDistribution } from '@/models/random-distribution/VocalExpressionNeumes';

export interface PartialDistribution {
  Denominator?: number;
}

export interface Distribution {
  Denominator: number;
}

export interface NeumeTypeChances {
  PrimaryGorgonNeume: number;
  SecondaryGorgonNeume: number;
  TimeNeume: number;
  VocalExpressionNeume: number;
  PrimaryAccidentalNeume: number;
  SecondaryAccidentalNeume: number;
  TertiaryAccidentalNeume: number;
  MeasureBarNeume: number;
}

export interface BatchConfig {
  NeumeTypeChances: NeumeTypeChances;
  QuantitativeNeumeDistribution?: QuantitativeNeumePartialDistribution;
  VocalExpressionNeumeDistribution?: VocalExpressionNeumePartialDistribution;
  PrimaryGorgonNeumeDistribution?: PrimaryGorgonNeumePartialDistribution;
  SecondaryGorgonNeumeDistribution?: SecondaryGorgonNeumePartialDistribution;
  TimeNeumeDistribution?: TimeNeumePartialDistribution;
  PrimaryAccidentalNeumeDistribution?: PrimaryAccidentalNeumePartialDistribution;
  SecondaryAccidentalNeumeDistribution?: SecondaryAccidentalNeumePartialDistribution;
  TertiaryAccidentalNeumeDistribution?: TertiaryAccidentalNeumePartialDistribution;
}
