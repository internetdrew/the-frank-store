export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      title: 'Banner Small Text',
      name: 'smallText',
      type: 'string',
    },
    {
      title: 'Banner Large Text',
      name: 'largeText',
      type: 'string',
    },
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
