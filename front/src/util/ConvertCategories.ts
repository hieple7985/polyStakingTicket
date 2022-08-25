export interface ConvertCategoriesType {
  id: number,
  name: string,
  check: boolean,
}

export const ConvertCategories = (categories:ConvertCategoriesType[]): ConvertCategoriesType[] => {
  const result = categories.map(ele => {
    return { ...ele, check: false }
  })
  return result
}
