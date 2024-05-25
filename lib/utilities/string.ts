//
// ##############################
// * ##########
// ##############################
//

//
export const hasStringMatch = (value: string, compare: string) => {
  //
  const hasStringMatch = value.match(compare) ?? []
  return hasStringMatch[0] === compare
}

//
// ##############################
// * ########## Export Default
// ##############################
//

export const stringUtilities = {
  hasStringMatch
}
export default stringUtilities
