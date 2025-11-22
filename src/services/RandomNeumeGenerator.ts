import { NoteElement, ScoreElement } from '@/models/Element';
import {
  Accidental,
  GorgonNeume,
  TimeNeume,
  VocalExpressionNeume,
} from '@/models/Neumes';
import {
  PrimaryAccidentalNeumeGenerator,
  PrimaryAccidentalNeumePartialDistribution,
  SecondaryAccidentalNeumeGenerator,
  TertiaryAccidentalNeumeGenerator,
} from '@/models/random-distribution/AccidentalNeumes';
import {
  BatchConfig,
  NeumeTypeChances,
} from '@/models/random-distribution/Config';
import {
  PrimaryGorgonNeumeGenerator,
  SecondaryGorgonNeumeGenerator,
  SecondaryGorgonNeumePartialDistribution,
} from '@/models/random-distribution/GorgonNeumes';
import {
  QuantitativeNeumeGenerator,
  QuantitativeNeumePartialDistribution,
} from '@/models/random-distribution/QuantitativeNeumes';
import {
  TimeNeumeGenerator,
  TimeNeumePartialDistribution,
} from '@/models/random-distribution/TimeNeumes';
import {
  VocalExpressionNeumePartialDistribution,
  VocalExpresssionNeumeGenerator,
} from '@/models/random-distribution/VocalExpressionNeumes';
import { IIpcService } from '@/services/ipc/IIpcService';
import { IpcService } from '@/services/ipc/IpcService';

export class RandomNeumeGenerator {
  ipcService: IIpcService;

  neumeTypeChances?: NeumeTypeChances;
  quantitativeNuemeGenerator?: QuantitativeNeumeGenerator;
  vocalExpressionNeumeGenerator?: VocalExpresssionNeumeGenerator;
  primaryGorgonNeumeGenerator?: PrimaryGorgonNeumeGenerator;
  secondaryGorgonNeumeGenerator?: SecondaryGorgonNeumeGenerator;
  timeNeumeGenerator?: TimeNeumeGenerator;
  primaryAccidentalNeumeGenerator?: PrimaryAccidentalNeumeGenerator;
  secondaryAccidentalNeumeGenerator?: SecondaryAccidentalNeumeGenerator;
  tertiaryAccidentalNeumeGenerator?: TertiaryAccidentalNeumeGenerator;

  constructor() {
    this.ipcService = new IpcService();
    this.ipcService.getBatchConfig().then((config) => {
      this.initialize(config);
    });
  }

  initialize(batchConfig: BatchConfig) {
    this.neumeTypeChances = batchConfig.NeumeTypeChances ?? {
      PrimaryGorgonNeume: 0,
      SecondaryGorgonNeume: 0,
      TimeNeume: 0,
      VocalExpressionNeume: 0,
      PrimaryAccidentalNeume: 0,
      SecondaryAccidentalNeume: 0,
      TertiaryAccidentalNeume: 0,
    };

    const quantitativeNeumeDist =
      batchConfig.QuantitativeNeumeDistribution ??
      ({} as QuantitativeNeumePartialDistribution);
    const vocalExpressionNeumeDist =
      batchConfig.VocalExpressionNeumeDistribution ??
      ({} as VocalExpressionNeumePartialDistribution);
    const primaryGorgonNeumeDist =
      batchConfig.PrimaryGorgonNeumeDistribution ??
      ({} as PrimaryAccidentalNeumePartialDistribution);
    const secondaryGorgonNeumeDist =
      batchConfig.SecondaryGorgonNeumeDistribution ??
      ({} as SecondaryGorgonNeumePartialDistribution);
    const timeNeumeDist =
      batchConfig.TimeNeumeDistribution ?? ({} as TimeNeumePartialDistribution);
    const primaryAccidentalNeumeDist =
      batchConfig.PrimaryGorgonNeumeDistribution ??
      ({} as PrimaryAccidentalNeumePartialDistribution);
    const secondaryAccidentalNeumeDist =
      batchConfig.SecondaryGorgonNeumeDistribution ??
      ({} as SecondaryGorgonNeumePartialDistribution);
    const tertiaryAccidentalNeumeDist =
      batchConfig.TertiaryAccidentalNeumeDistribution ??
      ({} as SecondaryGorgonNeumePartialDistribution);

    this.quantitativeNuemeGenerator = new QuantitativeNeumeGenerator(
      quantitativeNeumeDist,
    );
    this.vocalExpressionNeumeGenerator = new VocalExpresssionNeumeGenerator(
      vocalExpressionNeumeDist,
    );
    this.primaryGorgonNeumeGenerator = new PrimaryGorgonNeumeGenerator(
      primaryGorgonNeumeDist,
    );
    this.secondaryGorgonNeumeGenerator = new SecondaryGorgonNeumeGenerator(
      secondaryGorgonNeumeDist,
    );
    this.timeNeumeGenerator = new TimeNeumeGenerator(timeNeumeDist);
    this.primaryAccidentalNeumeGenerator = new PrimaryAccidentalNeumeGenerator(
      primaryAccidentalNeumeDist,
    );
    this.secondaryAccidentalNeumeGenerator =
      new SecondaryAccidentalNeumeGenerator(secondaryAccidentalNeumeDist);
    this.tertiaryAccidentalNeumeGenerator =
      new TertiaryAccidentalNeumeGenerator(tertiaryAccidentalNeumeDist);
  }

  next(): ScoreElement {
    if (this.neumeTypeChances === undefined) {
      throw new Error('Random neume generator was not initialized');
    }
    const score = new NoteElement();
    const quantitativeNeume = this.quantitativeNuemeGenerator!.next();
    let vocalExpressionNeume: VocalExpressionNeume | null = null;
    if (Math.random() < this.neumeTypeChances.VocalExpressionNeume) {
      vocalExpressionNeume = this.vocalExpressionNeumeGenerator!.isNextValid(
        quantitativeNeume,
      )
        ? this.vocalExpressionNeumeGenerator!.next()
        : null;
    }
    let primaryGorgonNeume: GorgonNeume | null = null;
    if (Math.random() < this.neumeTypeChances.PrimaryGorgonNeume) {
      primaryGorgonNeume = this.primaryGorgonNeumeGenerator!.isNextValid(
        quantitativeNeume,
        vocalExpressionNeume,
      )
        ? this.primaryGorgonNeumeGenerator!.next(quantitativeNeume)
        : null;
    }
    let secondaryGorgonNeume: GorgonNeume | null = null;
    if (Math.random() < this.neumeTypeChances.SecondaryGorgonNeume) {
      secondaryGorgonNeume = this.secondaryGorgonNeumeGenerator!.isNextValid(
        quantitativeNeume,
        vocalExpressionNeume,
      )
        ? this.secondaryGorgonNeumeGenerator!.next()
        : null;
    }
    let timeNeume: TimeNeume | null = null;
    if (Math.random() < this.neumeTypeChances.TimeNeume) {
      timeNeume = this.timeNeumeGenerator!.isNextValid(quantitativeNeume)
        ? this.timeNeumeGenerator!.next(quantitativeNeume)
        : null;
    }
    let primaryAccidentalNeume: Accidental | null = null;
    if (Math.random() < this.neumeTypeChances.PrimaryAccidentalNeume) {
      primaryAccidentalNeume =
        this.primaryAccidentalNeumeGenerator!.isNextValid(quantitativeNeume)
          ? this.primaryAccidentalNeumeGenerator!.next()
          : null;
    }
    let secondaryAccidentalNeume: Accidental | null = null;
    if (Math.random() < this.neumeTypeChances.SecondaryAccidentalNeume) {
      secondaryAccidentalNeume =
        this.secondaryAccidentalNeumeGenerator!.isNextValid(quantitativeNeume)
          ? this.secondaryAccidentalNeumeGenerator!.next()
          : null;
    }
    let tertiaryAccidentalNeume: Accidental | null = null;
    if (Math.random() < this.neumeTypeChances.TertiaryAccidentalNeume) {
      tertiaryAccidentalNeume =
        this.tertiaryAccidentalNeumeGenerator!.isNextValid(quantitativeNeume)
          ? this.tertiaryAccidentalNeumeGenerator!.next()
          : null;
    }

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
