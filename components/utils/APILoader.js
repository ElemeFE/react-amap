const DEFAULT_CONFIG = {
  v: '1.4.0',
  hostAndPath: 'webapi.amap.com/maps',
  key: 'f97efc35164149d0c0f299e7a8adb3d2',
  callback: '__amap_init_callback',
  useAMapUI: false
}

let mainPromise = null
let amapuiPromise = null
let amapuiInited = false
export default class APILoader {
  constructor({ key, useAMapUI, version, protocol }) {
    this.config = { ...DEFAULT_CONFIG, useAMapUI, protocol }
    if (typeof window !== 'undefined') {
      if (key) {
        this.config.key = key
      } else if ('amapkey' in window) {
        this.config.key = window.amapkey
      }
    }
    if (version) {
      this.config.v = version
    }
    this.protocol = protocol || window.location.protocol
    if (this.protocol.indexOf(':') === -1) {
      this.protocol += ':'
    }
  }

  getScriptSrc(cfg) {
    return `${this.protocol}//${cfg.hostAndPath}?v=${cfg.v}&key=${cfg.key}&callback=${cfg.callback}`
  }

  buildScriptTag(src) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = src
    return script
  }

  getAmapuiPromise() {
    const script = this.buildScriptTag(`${this.protocol}//webapi.amap.com/ui/1.0/main-async.js`)
    const p = new Promise(resolve => {
      script.onload = () => {
        resolve()
      }
    })
    document.body.appendChild(script)
    return p
  }

  getMainPromise() {
    const script = this.buildScriptTag(this.getScriptSrc(this.config))
    const p = new Promise(resolve => {
      window[this.config.callback] = () => {
        resolve()
        delete window[this.config.callback]
      }
    })
    document.body.appendChild(script)
    return p
  }

  load() {
    if (typeof window === 'undefined') {
      return null
    }
    const { useAMapUI } = this.config
    mainPromise = mainPromise || this.getMainPromise()
    if (useAMapUI) {
      amapuiPromise = amapuiPromise || this.getAmapuiPromise()
    }
    return new Promise(resolve => {
      mainPromise.then(() => {
        if (useAMapUI && amapuiPromise) {
          amapuiPromise.then(() => {
            if (window.initAMapUI && !amapuiInited) {
              window.initAMapUI()
              if (typeof useAMapUI === 'function') {
                useAMapUI()
              }
              amapuiInited = true
            }
            resolve()
          })
        } else {
          resolve()
        }
      })
    })
  }
}
