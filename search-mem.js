const Minisearch = require('minisearch')


function search_mem(options) {
  const seneca = this


  if (null == options.search) {
    return seneca.fail('The "search" option is required')
  }

  const { search: search_config } = options
  const minisearch = new Minisearch(search_config)


  /*
   * BEGIN: DEBUG
   */

  minisearch.addAll([
    { id: '1000', name: 'bob' },
    { id: '1001', name: 'boba' },
    { id: '1002', name: 'foo', extra: 'bobb' }
  ])

  /*
   * END: DEBUG
   */


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

    console.dir(out, { depth: 32 }) // dbg


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
