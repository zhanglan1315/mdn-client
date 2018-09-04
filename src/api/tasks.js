import build from './_builder'

export default build([
  ['search', 'tasks/search', 'data'],
  ['create', 'tasks/create', 'data'],
  ['destroy', 'tasks/destroy'],
  ['updateStatus', 'tasks/status/update'],
  ['updateComment', 'tasks/comment/update'],
  ['updateDuetime', 'tasks/duetime/update'],
  ['addArea', 'tasks/areas/add', 'data'],
  ['removeArea', 'tasks/areas/remove']
])
