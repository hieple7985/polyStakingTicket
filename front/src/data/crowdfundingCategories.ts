export interface CFCategoryInterface {
  id: number,
  name: string,
}

const crowdfundingCategories: CFCategoryInterface[] = [
  {
    id: 1,
    name: "upcoming",
  },
  {
    id: 2,
    name: "inprogress",
  },
  {
    id: 3,
    name: "ended",
  },
  {
    id: 4,
    name: "refund",
  },
  {
    id: 9999,
    name: "joined",
  },

]

export default crowdfundingCategories