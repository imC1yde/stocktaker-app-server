// checks for at least one existing value in input object
export const checkForAnyValue = <T extends Object>(input: T): boolean => {
  return Object
    .values(input)
    .some(value => value !== null && value !== undefined && value !== '')
}