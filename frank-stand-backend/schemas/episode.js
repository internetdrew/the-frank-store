export default {
  title: 'Episode',
  name: 'episode',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Season',
      name: 'season',
      type: 'number',
      description: 'Which season was this Frank moment in?',
    },
    {
      title: 'Episode Number',
      name: 'number',
      type: 'number',
    },
  ],
}
