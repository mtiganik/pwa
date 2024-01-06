import { Category, Priority } from "../models"


export const getDefaultCategory = ():Category => {
  var cat:Category = {
    id: crypto.randomUUID(),
    categoryName: "Unknown",
    categorySort: 0,
    syncDt: new Date().toISOString(),
    tag: ""
  }
  return cat
}

export const getDefaultPriority = ():Priority => {
  var pri:Priority = {
    id: crypto.randomUUID(),
    priorityName: "Unknown",
    prioritySort: 0,
    syncDt: new Date().toISOString(),
    tag: ""
  }
  return pri
}