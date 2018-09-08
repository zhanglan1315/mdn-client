export default function () {
  const plantId = this.plantId

  return [
    {
      text: '项目管理',
      icon: 'table',
      route: {
        name: 'plant projects',
        params: { plantId }
      }
    },
    {
      text: '基础数据',
      icon: 'storage',
      expanding: true,
      children: [
        {
          text: '零件数据',
          icon: 'table',
          actived: () => this.$router.hasMatched({
            name: 'plant table',
            params: { table: 'parts', groupId: plantId }
          }),
          route: {
            name: 'plant table data',
            params: { table: 'parts', groupId: plantId }
          }
        }
      ]
    },
    {
      text: '区域数据',
      icon: 'process',
      expanding: true,
      children: this.areas.map(area => {
        const params = {
          plantId,
          table: 'locations',
          groupId: area.id
        }

        return {
          text: area.text,
          icon: 'table',
          actived: () => this.$router.hasMatched({
            name: 'plant table',
            params
          }),
          route: {
            name: 'plant table data',
            params
          }
        }
      })
    }
  ]
}
