![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

> Run standardisation tests on your [Seneca.js](https://www.npmjs.com/package/seneca) plugin.

# @seneca/search-mini

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |

A Seneca search plugin for local testing based on the Minisearch package

## Install
```sh
$ npm install @seneca/search-mini
```




## Quick Example

```js
const SearchMini = require('@seneca/search-mini')

seneca
  .test()
  .use(SearchMini, {
    search: {
      // fields to be used for each search to be performed
      fields: ['text', 'category'],
      // fields to be stored in the hits after the performed search
      // more on this: https://lucaong.github.io/minisearch
      storeFields: ['text', 'category']
    }

  })

let docs = [
  {
    id: 1,
    title: 'Moby Dick',
    text: 'Call me Ishmael. Some years ago...',
    category: 'fiction'
  },
  {
    id: 2,
    title: 'Zen and the Art of Motorcycle Maintenance',
    text: 'I can see by my watch...',
    category: 'fiction'
  },
  // ...
] 

for(const doc of docs) { // make sure to index all the documents
  // index a document
  await seneca.post('sys:search,cmd:add', {doc,})
}

let out = await seneca.post('sys:search,cmd:search',
  // perform a search by query: { query: String, params: Object }
  {query: 'drama', params: {},
})
// access the hits of the performed search for reuse
console.log('search hits: ', out.data.hits)
  
```



## More Examples

## Motivation

## Support

## API

## Contributing

## Background
