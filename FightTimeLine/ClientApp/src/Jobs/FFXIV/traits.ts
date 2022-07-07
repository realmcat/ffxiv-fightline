import { IAbility, IJob, TraitFunction } from "src/core/Models";

export function abilityTrait(
  abilityName: string,
  func: ((abiility: IAbility) => void) | Partial<IAbility>): TraitFunction {

  return (job: IJob) => {
    const ability = job.abilities[abilityName];
    if (ability) {
      if (typeof func === "function") {
        func(ability);
      }
      else {
        Object.assign(ability, func);
      }
    }
  };
}

export function abilityRemovedTrait(abilityName: string, level: number): TraitFunction {
  return abilityTrait(abilityName, ab => ab.levelRemoved = level);
}


export function combineTraits(traits: TraitFunction[]): TraitFunction {
  return (job: IJob) => {
    traits.forEach(t => t(job));
  };
}
