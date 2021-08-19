const Assert = require('assert')
const Seneca = require('seneca')
const SenecaSearchMem = require('../search-mem')


async function run() {
  const seneca = Seneca()


  seneca.use(SenecaSearchMem, {
    search: {
      fields: ['name', 'extra'], // <~~ query-able fields

      storeFields: ['name', 'extra'], // <~~ return-able fields

      searchOptions: {}
    }
  })


  seneca.use('promisify')


  const docs = [
    { id: '1001', name: 'bob' },
    { id: '1002', name: 'foo', extra: 'bob' }
  ]

  for (const doc of docs) {
    await seneca.post('sys:search,cmd:add', { doc })
      .then(added => Assert(added.ok))
  }


  const out = await seneca.post('sys:search,cmd:search',
    { query: 'bob' })

  console.dir(out, { depth: 32 }) // dbg


  return
}


run()
