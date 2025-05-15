import { 
    QuantitativeNeume
} from '@/models/Neumes';

const allQuantitativeNeumes = [
    // ascending
    QuantitativeNeume.Ison,
    QuantitativeNeume.Oligon,
    QuantitativeNeume.OligonPlusKentima,
    QuantitativeNeume.OligonPlusKentimaBelow,
    QuantitativeNeume.OligonPlusKentimaAbove,
    QuantitativeNeume.OligonPlusHypsiliRight,
    QuantitativeNeume.OligonPlusHypsiliLeft,
    QuantitativeNeume.OligonPlusHypsiliPlusKentimaHorizontal,
    QuantitativeNeume.OligonPlusHypsiliPlusKentimaVertical,
    QuantitativeNeume.OligonPlusDoubleHypsili,
    QuantitativeNeume.VareiaDotted,
    QuantitativeNeume.Cross,
    QuantitativeNeume.Breath,
    QuantitativeNeume.OligonKentimataDoubleYpsili,
    QuantitativeNeume.OligonKentimaDoubleYpsiliRight,
    QuantitativeNeume.OligonKentimaDoubleYpsiliLeft,
    QuantitativeNeume.OligonTripleYpsili,
    QuantitativeNeume.OligonKentimataTripleYpsili,
    QuantitativeNeume.OligonKentimaTripleYpsili,

    // ascending with petasti
    QuantitativeNeume.PetastiWithIson,
    QuantitativeNeume.Petasti,
    QuantitativeNeume.PetastiPlusOligon,
    QuantitativeNeume.PetastiPlusKentimaAbove,
    QuantitativeNeume.PetastiPlusHypsiliRight,
    QuantitativeNeume.PetastiPlusHypsiliLeft,
    QuantitativeNeume.PetastiPlusHypsiliPlusKentimaHorizontal,
    QuantitativeNeume.PetastiPlusHypsiliPlusKentimaVertical,
    QuantitativeNeume.PetastiPlusDoubleHypsili,
    QuantitativeNeume.PetastiKentimataDoubleYpsili,
    QuantitativeNeume.PetastiKentimaDoubleYpsiliRight,
    QuantitativeNeume.PetastiKentimaDoubleYpsiliLeft,
    QuantitativeNeume.PetastiTripleYpsili,
    QuantitativeNeume.PetastiKentimataTripleYpsili,
    QuantitativeNeume.PetastiKentimaTripleYpsili,
    QuantitativeNeume.PetastiPlusApostrophos,
    QuantitativeNeume.PetastiPlusElaphron,
    QuantitativeNeume.PetastiPlusElaphronPlusApostrophos,
    QuantitativeNeume.PetastiPlusRunningElaphron,
    QuantitativeNeume.PetastiPlusHyporoe,
    QuantitativeNeume.PetastiHamili,
    QuantitativeNeume.PetastiHamiliApostrofos,
    QuantitativeNeume.PetastiHamiliElafron,
    QuantitativeNeume.PetastiHamiliElafronApostrofos,
    QuantitativeNeume.PetastiDoubleHamili,
    QuantitativeNeume.PetastiDoubleHamiliApostrofos,

    // descending
    QuantitativeNeume.IsonPlusApostrophos,
    QuantitativeNeume.Apostrophos,
    QuantitativeNeume.RunningElaphron,
    QuantitativeNeume.DoubleApostrophos,
    QuantitativeNeume.Hyporoe,
    QuantitativeNeume.Elaphron,
    QuantitativeNeume.ElaphronPlusApostrophos,
    QuantitativeNeume.Hamili,
    QuantitativeNeume.HamiliPlusApostrophos,
    QuantitativeNeume.HamiliPlusElaphron,
    QuantitativeNeume.HamiliPlusElaphronPlusApostrophos,
    QuantitativeNeume.DoubleHamili,
    QuantitativeNeume.DoubleHamiliApostrofos,
    QuantitativeNeume.DoubleHamiliElafron,
    QuantitativeNeume.DoubleHamiliElafronApostrofos,
    QuantitativeNeume.TripleHamili,

    // combination
    QuantitativeNeume.Kentemata,
    QuantitativeNeume.OligonPlusKentemata,
    QuantitativeNeume.KentemataPlusOligon,
    QuantitativeNeume.OligonPlusIsonPlusKentemata,
    QuantitativeNeume.OligonKentimaMiddleKentimata,
    QuantitativeNeume.OligonPlusKentemataPlusHypsiliRight,
    QuantitativeNeume.OligonPlusKentemataPlusHypsiliLeft,
    QuantitativeNeume.OligonPlusApostrophosPlusKentemata,
    QuantitativeNeume.OligonPlusElaphronPlusKentemata,
    QuantitativeNeume.OligonPlusRunningElaphronPlusKentemata,
    QuantitativeNeume.OligonPlusHyporoePlusKentemata,
    QuantitativeNeume.OligonPlusElaphronPlusApostrophosPlusKentemata,
    QuantitativeNeume.OligonPlusHamiliPlusKentemata,
    QuantitativeNeume.OligonPlusIson,
    QuantitativeNeume.OligonPlusApostrophos,
    QuantitativeNeume.OligonPlusElaphron,
    QuantitativeNeume.OligonPlusHyporoe,
    QuantitativeNeume.OligonPlusElaphronPlusApostrophos,
    QuantitativeNeume.OligonPlusHamili,

    // vareia
    //QuantitativeNeume.VareiaDotted4,
    //QuantitativeNeume.VareiaDotted3,
    //QuantitativeNeume.VareiaDotted2,
    //QuantitativeNeume.VareiaDotted,
];

export class UniformRandomNeumeGenerator {
    next(): QuantitativeNeume {
        const l: number = allQuantitativeNeumes.length;
        const i: number = Math.floor(Math.random() * l);
        return allQuantitativeNeumes[i];
    }
};
