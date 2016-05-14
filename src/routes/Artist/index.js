import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/artist/:artistId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Artist = require('./containers/ArtistView').default
      const reducer = require('./modules/artist').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'artist', reducer })

      /*  Return getComponent   */
      cb(null, Artist)

    /* Webpack named bundle   */
    })
  }
})
