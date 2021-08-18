const Seneca = require('seneca')
const SenecaSearchMem = require('./search-mem')


async function run() {
  const seneca = Seneca()


  seneca.use(SenecaSearchMem, {
    search: {
      fields: ['name', 'extra'], // <~~ query-able fields

      storeFields: ['name', 'extra'], // <~~ return-able fields

      searchOptions: {
        fuzzy: 0.2
      }
    }
  })


  seneca.use('promisify')


  const out = await seneca.post('sys:search,cmd:search', {
    query: 'bob'
  })

  console.dir(out, { depth: 32 }) // dbg


  return
}


run()
