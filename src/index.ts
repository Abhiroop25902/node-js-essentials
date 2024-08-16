export const getPropertyWithDefault = <O extends Object, K extends keyof O>(
    propertyName: K,
    defaultValue: O[K],
    obj: O,
): O[K] => {
    return propertyName in obj ? obj[propertyName] : defaultValue;
};
