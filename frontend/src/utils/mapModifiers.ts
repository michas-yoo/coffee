import { IModifier, IModifierType, IProductModifier, IProductRaw } from "../interfaces";

type Modifiers = {
  [key: number]: IProductModifier,
};

export function mapModifiers({ modifier_types, modifiers }: IProductRaw): IProductModifier[] {
  const productModifiersList: Modifiers = {};

  modifier_types.forEach((type: IModifierType): void => {
    productModifiersList[type.id] = {
      id: type.id,
      name: type.name,
      multipleSelect: !!type.multi_selectable,
      modifiers: [],
    };
  });

  modifiers.forEach((modifier: IModifier) => {
    productModifiersList[modifier.type].modifiers.push(modifier);
  });

  return Object.values(productModifiersList);
}
