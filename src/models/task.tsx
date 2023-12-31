

export default interface Task{
  id: string,
  taskName: string,
  taskSort: number,
  createdDt: string,
  dueDt: string,
  isCompleted: boolean,
  isArchieved: boolean,
  todoCategoryId: string,
  todoPriorityId: string,
  syncDt: string
}