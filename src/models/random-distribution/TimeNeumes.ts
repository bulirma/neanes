import { QuantitativeNeume, restNeumes, TimeNeume } from '@/models/Neumes';
import {
  Distribution,
  PartialDistribution,
} from '@/models/random-distribution/Config';
import { NeumeGenerator } from '@/models/random-distribution/NeumeRandomGenerator';
import {
  getKlasmaType,
  isHapleDisabled,
  isKoronisDisabled,
  KlasmaType,
} from '@/utils/NeumeCompositionHelper';

const timeNeumes = Object.values(TimeNeume);

export type TimeNeumePartialDistribution = {
  [prop in (typeof timeNeumes)[number]]?: number;
} & PartialDistribution;

export type TimeNeumeDistribution = {
  [prop in (typeof timeNeumes)[number]]: number;
} & Distribution;

export interface TimeNeumeGeneratorArgs {
  neumes: TimeNeume[];
  neumeDistribution: TimeNeumePartialDistribution;
}

export class TimeNeumeGenerator extends NeumeGenerator<TimeNeumeDistribution> {
  constructor(neumeDistribution: TimeNeumePartialDistribution) {
    super({
      neumes: timeNeumes,
      neumeDistribution: neumeDistribution,
    } as TimeNeumeGeneratorArgs);
  }

  getEnabledNeumes(quantitativeNeume: QuantitativeNeume): TimeNeume[] {
    const settings = {
      klasmaType: getKlasmaType(quantitativeNeume),
      hapleEnabled: !isHapleDisabled(quantitativeNeume),
      koronisEnabled: !isKoronisDisabled(quantitativeNeume),
    };
    let enabledNeumes: TimeNeume[] = [];
    if (
      settings.klasmaType === KlasmaType.KLASMA_TOP ||
      settings.klasmaType === KlasmaType.KLASMA_BOTH
    ) {
      enabledNeumes.push(TimeNeume.Klasma_Top);
    }
    if (
      settings.klasmaType === KlasmaType.KLASMA_BOTTOM ||
      settings.klasmaType === KlasmaType.KLASMA_BOTH
    ) {
      enabledNeumes.push(TimeNeume.Klasma_Bottom);
    }
    if (settings.hapleEnabled) {
      enabledNeumes = enabledNeumes.concat(timeNeumes.slice(2, 6));
    }
    if (settings.koronisEnabled) {
      enabledNeumes.push(TimeNeume.Koronis);
    }
    return enabledNeumes;
  }

  isNextValid(quantitativeNeume: QuantitativeNeume): boolean {
    return !restNeumes.includes(quantitativeNeume);
  }

  next(quantitativeNeume: QuantitativeNeume): TimeNeume {
    const enabledNeumes = this.getEnabledNeumes(quantitativeNeume);
    const cumulativeDist = this.genCumulativeDistribution({
      neumes: enabledNeumes,
      neumeDistribution: this.distribution,
    });
    const random = Math.random() * cumulativeDist.Denominator;
    for (const key of enabledNeumes) {
      if (random < cumulativeDist[key]) {
        return key;
      }
    }
    return timeNeumes[timeNeumes.length - 1];
  }
}
