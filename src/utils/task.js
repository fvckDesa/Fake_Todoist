export function filterTask(task) {
  const { id, complete, ...other } = task;
  return other;
}