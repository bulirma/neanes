import { QuantitativeNeumePartialDistribution } from '@/models/random-distribution/QuantitativeNeumes';

export interface NeumeUseFlags {
  GorgonNeume: Boolean;
  TimeNeume: Boolean;
  VocalExpressionNeume: Boolean;
  AccidentalNeume: Boolean;
  MeasureBarNeume: Boolean;
}

export interface BatchConfig {
  NeumeUseFlags?: NeumeUseFlags;
  QuantitativeNeume?: QuantitativeNeumePartialDistribution;
}
