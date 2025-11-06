import { NoteElement, ScoreElement } from '@/models/Element';
import { PrimaryAccidentalNeumeGenerator, PrimaryAccidentalNeumePartialDistribution, SecondaryAccidentalNeumeGenerator, TertiaryAccidentalNeumeGenerator } from '@/models/random-distribution/AccidentalNeumes';
import {
  BatchConfig,
  NeumeTypeDistribution,
} from '@/models/random-distribution/Config';
import { PrimaryGorgonNeumeGenerator, SecondaryGorgonNeumeGenerator, SecondaryGorgonNeumePartialDistribution } from '@/models/random-distribution/GorgonNeumes';
import {
  QuantitativeNeumeGenerator,
  QuantitativeNeumePartialDistribution,
} from '@/models/random-distribution/QuantitativeNeumes';
import { TimeNeumeGenerator, TimeNeumePartialDistribution } from '@/models/random-distribution/TimeNeumes';
import { VocalExpressionNeumePartialDistribution, VocalExpresssionNeumeGenerator } from '@/models/random-distribution/VocalExpressionNeumes';

export class RandomNeumeGenerator {
  neumeTypeDistribution?: NeumeTypeDistribution;
  quantitativeNuemeGenerator?: QuantitativeNeumeGenerator;
  vocalExpressionNeumeGenerator?: VocalExpresssionNeumeGenerator;
  primaryGorgonNeumeGenerator?: PrimaryGorgonNeumeGenerator;
  secondaryGorgonNeumeGenerator?: SecondaryGorgonNeumeGenerator;
  timeNeumeGenerator?: TimeNeumeGenerator;
  primaryAccidentalNeumeGenerator?: PrimaryAccidentalNeumeGenerator;
  secondaryAccidentalNeumeGenerator?: SecondaryAccidentalNeumeGenerator;
  tertiaryAccidentalNeumeGenerator?: TertiaryAccidentalNeumeGenerator;

  initialize(batchConfig: BatchConfig) {
    this.neumeTypeDistribution = batchConfig.NeumeTypeDistribution ?? {
      PrimaryGorgonNeume: 1,
      SecondaryGorgonNeume: 1,
      TimeNeume: 1,
      VocalExpressionNeume: 1,
      PrimaryAccidentalNeume: 1,
      SecondaryAccidentalNeume: 1,
      TertiaryAccidentalNeume: 1,
    };

    const quantitativeNeumeDist = batchConfig.QuantitativeNeumeDistribution ??
      ({} as QuantitativeNeumePartialDistribution);
    const vocalExpressionNeumeDist = batchConfig.VocalExpressionNeumeDistribution ??
      ({} as VocalExpressionNeumePartialDistribution);
    const primaryGorgonNeumeDist = batchConfig.PrimaryGorgonNeumeDistribution ??
      ({} as PrimaryAccidentalNeumePartialDistribution);
    const secondaryGorgonNeumeDist = batchConfig.SecondaryGorgonNeumeDistribution ??
      ({} as SecondaryGorgonNeumePartialDistribution);
    const timeNeumeDist = batchConfig.TimeNeumeDistribution ??
      ({} as TimeNeumePartialDistribution);
    const primaryAccidentalNeumeDist = batchConfig.PrimaryGorgonNeumeDistribution ??
      ({} as PrimaryAccidentalNeumePartialDistribution);
    const secondaryAccidentalNeumeDist = batchConfig.SecondaryGorgonNeumeDistribution ??
      ({} as SecondaryGorgonNeumePartialDistribution);
    const tertiaryAccidentalNeumeDist = batchConfig.TertiaryAccidentalNeumeDistribution ??
      ({} as SecondaryGorgonNeumePartialDistribution);

    this.quantitativeNuemeGenerator = new QuantitativeNeumeGenerator(quantitativeNeumeDist);
    this.vocalExpressionNeumeGenerator = new VocalExpresssionNeumeGenerator(vocalExpressionNeumeDist);
    this.primaryGorgonNeumeGenerator = new PrimaryGorgonNeumeGenerator(primaryGorgonNeumeDist);
    this.secondaryGorgonNeumeGenerator = new SecondaryGorgonNeumeGenerator(secondaryGorgonNeumeDist);
    this.timeNeumeGenerator = new TimeNeumeGenerator(timeNeumeDist);
    this.primaryAccidentalNeumeGenerator = new PrimaryAccidentalNeumeGenerator(primaryAccidentalNeumeDist);
    this.secondaryAccidentalNeumeGenerator = new SecondaryAccidentalNeumeGenerator(secondaryAccidentalNeumeDist);
    this.tertiaryAccidentalNeumeGenerator = new TertiaryAccidentalNeumeGenerator(tertiaryAccidentalNeumeDist);
  }

  //next(): ScoreElement {
  //  const score = new NoteElement();
  //  const quantitativeNeume = this.genQuantitativeNeume();
  //  const vocalExpressionNeume =
  //    this.genVocalExpressionNeume(quantitativeNeume);
  //  const gorgonNeume = this.genPrimaryGorgonNeume(
  //    quantitativeNeume,
  //    vocalExpressionNeume,
  //  );
  //  const secondaryGorgonNeume = this.genSecondaryGorgonNeume(
  //    quantitativeNeume,
  //    vocalExpressionNeume,
  //  );
  //  const timeNeume = this.genTimeNeume(quantitativeNeume);
  //  const accidentalNeume = this.genPrimaryAccidentalNeume(quantitativeNeume);
  //  const secondaryAccidentalNeume =
  //    this.genSecondaryAccidentalNeume(quantitativeNeume);
  //  const tertiaryAccidentalNeume =
  //    this.genTertiaryAccidentalNeume(quantitativeNeume);
  //  const attrs = {
  //    quantitativeNeume: quantitativeNeume,
  //    gorgonNeume: gorgonNeume,
  //    secondaryGorgonNeume: secondaryGorgonNeume,
  //    timeNeume: timeNeume,
  //    vocalExpressionNeume: vocalExpressionNeume,
  //    accidental: accidentalNeume,
  //    secondaryAccidental: secondaryAccidentalNeume,
  //    tertiaryAccidental: tertiaryAccidentalNeume,
  //  };
  //  Object.assign(score, attrs);
  //  return score;
  //}

  next(): ScoreElement {
    if (this.neumeTypeDistribution === undefined) {
      throw new Error('Random neume generator was not initialized');
    }
    const score = new NoteElement();
    const quantitativeNeume = this.quantitativeNuemeGenerator!.next();
    const vocalExpressionNeume = this.vocalExpressionNeumeGenerator!.isNextValid(quantitativeNeume) ?
      this.vocalExpressionNeumeGenerator!.next() : null;
    const primaryGorgonNeume = this.primaryGorgonNeumeGenerator!.isNextValid(quantitativeNeume, vocalExpressionNeume) ?
      this.primaryGorgonNeumeGenerator!.next(quantitativeNeume) : null;
    const secondaryGorgonNeume = this.secondaryGorgonNeumeGenerator!.isNextValid(quantitativeNeume, vocalExpressionNeume) ?
      this.secondaryGorgonNeumeGenerator!.next() : null;
    const timeNeume = this.timeNeumeGenerator!.isNextValid(quantitativeNeume) ?
      this.timeNeumeGenerator!.next(quantitativeNeume) : null;
    const primaryAccidentalNeume = this.primaryAccidentalNeumeGenerator!.isNextValid(quantitativeNeume) ?
      this.primaryAccidentalNeumeGenerator!.next() : null;
    const secondaryAccidentalNeume = this.secondaryAccidentalNeumeGenerator!.isNextValid(quantitativeNeume) ?
      this.secondaryAccidentalNeumeGenerator!.next() : null;
    const tertiaryAccidentalNeume = this.tertiaryAccidentalNeumeGenerator!.isNextValid(quantitativeNeume) ?
      this.tertiaryAccidentalNeumeGenerator!.next() : null;

    const attrs = {
      quantitativeNeume: quantitativeNeume,
      vocalExpressionNeume: vocalExpressionNeume,
      gorgonNeume: primaryGorgonNeume,
      secondaryGorgonNeume: secondaryGorgonNeume,
      timeNeume: timeNeume,
      accidental: primaryAccidentalNeume,
      secondaryAccidental: secondaryAccidentalNeume,
      tertiaryAccidental: tertiaryAccidentalNeume,
    };
    Object.assign(score, attrs);

    return score;
  }
}
