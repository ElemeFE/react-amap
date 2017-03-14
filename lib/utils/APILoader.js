const DEFAULT_CONFIG = {
  v: 1.3,
  protocol: window.location.protocol || 'https:',
  hostAndPath: 'webapi.amap.com/maps',
  key: 'f97efc35164149d0c0f299e7a8adb3d2',
  plugin: [],
  callback: '__amap_init_callback'
};

let __script_loaded = false;
const queuedLoader = [];
export default class APILoader {
  constructor(key) {
    this.config = DEFAULT_CONFIG;
    if (key) {
      this.config.key = key;
    } else if('AMAP_KEY' in window) {
      this.config.key = window.AMAP_KEY;
    } else {
      
    }
  }
  
  getScriptSrc(cfg) {
    let scriptSrc = `${cfg.protocol}//${cfg.hostAndPath}?v=${cfg.v}&key=${cfg.key}&callback=${cfg.callback}`;
    if (cfg.plugin.length) scriptSrc += `&plugin=${cfg.plugin.join(',')}`;
    return scriptSrc;
  }
  
  load() {
    const _config = this.config;
    /*
     * 初次加载同步加载插件；
     * 后面再加载的时候，要确保所依赖的插件也全部异步加载成功
     */
    if (window.AMap) {
      // 要确保所有的插件加载成功
      if (_config.plugin && _config.plugin.length) {
        const promiseArr = [];
        _config.plugin.forEach((p) => {
          const pro = new Promise((resolve) => {
            window.AMap.plugin(p, () => {
              resolve();
            });
          });
          promiseArr.push(pro);
        });
        return Promise.all(promiseArr);
      }
      return Promise.resolve();
    }
    
    if (__script_loaded) {
      return new Promise(resolve => {
        queuedLoader.push(() => {
          resolve();
        });
      });
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = this.getScriptSrc(_config);
  
    const scriptLoadingPromise = new Promise((resolve, reject) => {
      window[_config.callback] = () => {
        queuedLoader.forEach(event => event());
        resolve();
      };
      script.onerror = error => reject(error);
    });
    document.head.appendChild(script);
    __script_loaded = true;
    return scriptLoadingPromise;
  }
}
