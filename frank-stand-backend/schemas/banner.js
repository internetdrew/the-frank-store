export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      title: 'Related Frank',
      name: 'relatedFrank',
      type: 'reference',
      to: [{type: 'frank'}],
    },
  ],
}
