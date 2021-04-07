function getEnumNumberValues<T>(enm: T): number[] {
  const enumValues = Object.values(enm);

  const numberEnumValues = enumValues.reduce((acc: number[], value) => {
    if (typeof value !== 'string') {
      acc.push(value);
    }

    return acc;
  }, []);

  const isValid = numberEnumValues.length === enumValues.length / 2;

  if (!isValid) {
    throw new Error(
      `Looks like enum contains not only number keys: ${JSON.stringify(
        enm,
        null,
        2
      )}`
    );
  }

  return numberEnumValues;
}

export default getEnumNumberValues;
