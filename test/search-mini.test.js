const Seneca = require('seneca')
const Shared = require('seneca-search-test')

const PluginValidator = require('seneca-plugin-validator')
const { Maintain } = require('@seneca/maintain')

const SearchMem = require('../search-mini')



test('validate', PluginValidator(SearchMem, module))

test('seneca maintain', () => {
  Maintain()
})

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
  }).use('doc')

  return si
}
