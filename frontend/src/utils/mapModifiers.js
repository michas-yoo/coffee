export function mapModifiers({ modifier_types, modifiers }) {
  const productModifiersList = {};

  modifier_types.forEach((type) => {
    productModifiersList[type.id] = {
      id: type.id,
      name: type.name,
      multipleSelect: type.multi_selectable,
      modifiers: [],
    };
  });

  modifiers.forEach((modifier) => {
    productModifiersList[modifier.type].modifiers.push(modifier);
  });

  return Object.values(productModifiersList);
}
