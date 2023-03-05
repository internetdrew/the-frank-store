export default {
  title: 'Frank',
  name: 'frank',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Season',
      name: 'season',
      type: 'number',
      description: 'Which season was this Frank moment in?',
    },
    {
      title: 'Episode',
      name: 'episode',
      type: 'number',
      description: 'Which episode of the season was this Frank moment in?',
    },
    {
      title: 'Quote',
      name: 'quote',
      type: 'string',
      description: "What's the famous line Frank uses in this scene?",
    },
    {
      title: 'Rage Level',
      name: 'rage',
      type: 'number',
      description: 'How angry is Frank in this scene, on a scale of 1 - 5?',
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 90,
      },
    },
  ],
}
