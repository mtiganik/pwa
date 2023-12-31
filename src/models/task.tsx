

export default interface Task{
  id: string,
  taskName: string,
  createdDt: string,
  dueDt: string,
  isCompleted: boolean,
  isArchieved: boolean | null,
  todoCategoryId: string,
  todoPriorityId: string,
  syncDt: string,
}