export const isUndefined = <T>(
  value: T | undefined | null
): value is undefined | null => value === undefined || value === null;

export const isDefined = <T>(value: T | undefined | null): value is T =>
  !isUndefined(value);
