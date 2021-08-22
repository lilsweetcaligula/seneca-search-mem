const Seneca = require('seneca')
const Shared = require('seneca-search-test')
const SearchMem = require('../search-mem')


describe('Compliance tests', () => {
  const seneca = make_seneca()

  beforeAll(done => {
    seneca.ready(done)
  })

  Shared.supports_add({ seneca })

  Shared.supports_search({ seneca })

  Shared.supports_remove({ seneca })

  Shared.remove({ seneca })

  Shared.add({ seneca })

  Shared.search({ seneca })
})


function make_seneca() {
  const si = Seneca({ log: 'test' })

  si.use(SearchMem, {
    search: {
      fields: ['lorem', 'ipsum'],
      storeFields: ['lorem', 'ipsum']
    }
  })

  return si
}

