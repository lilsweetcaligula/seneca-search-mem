const Minisearch = require('minisearch')


function search_mem(options) {
  const seneca = this


  if (null == options.search) {
    return seneca.fail('The "search" option is required')
  }

  const { search: search_config } = options
  const minisearch = new Minisearch(search_config)


  seneca.add('sys:search,cmd:add', function (msg, reply) {
    if (null == msg.doc) {
      return {
        ok: false,
        why: 'invalid-field',
        details: {
          path: ['doc'],
          why_exactly: 'required'
        }
      }
    }

    const { doc } = msg


    minisearch.add(doc)


    return reply(null, { ok: true })
  })


  seneca.add('sys:search,cmd:search', function (msg, reply) {
    if (null == msg.query) {
      return {
        ok: false,
        why: 'invalid-field',
        details: {
          path: ['query'],
          why_exactly: 'required'
        }
      }
    }

    const { query } = msg


    /* NOTE: For more information, please see documentation at:
     *
     * https://www.npmjs.com/package/minisearch
     *
     */
    const out = minisearch.search(query)


    const hits = out.map(hit => {
      const { id } = hit


      const fields = search_config.storeFields || []

      const doc = fields.reduce((acc, k) => {
        if (k in hit) {
          acc[k] = hit[k]
        }

        return acc
      }, {})


      return { id, doc }
    })


    return reply(null, { ok: true, data: { hits } })
  })


  return
}


module.exports = search_mem
