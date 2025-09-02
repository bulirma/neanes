import { NoteElement, ScoreElement } from '@/models/Element';
import { QuantitativeNeume } from '@/models/Neumes';

const allQuantitativeNeumes = Object.values(QuantitativeNeume);

export class UniformRandomNeumeGenerator {
  randomQuantitativeNeumeIndex(): number {
    return Math.floor(Math.random() * allQuantitativeNeumes.length);
  }

  genQuantitativeNeume(): QuantitativeNeume {
    return allQuantitativeNeumes[this.randomQuantitativeNeumeIndex()];
  }

  next(): ScoreElement {
    const score = new NoteElement();
    const quantitativeNeume = this.genQuantitativeNeume();
    const attrs = {
      quantitativeNeume: quantitativeNeume,
    };
    Object.assign(score, attrs);
    return score;
  }
}
