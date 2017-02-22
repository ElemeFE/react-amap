import isFun from './isFun';

// 先检查组件实例中是否有对应方法；如果有执行该方法；
// 如果没有，检查实例的 props 属性中是否有，有的话直接调用
const bindEvent = (mapObj, eventList, instance) => {
  eventList.forEach((ev) => {
    mapObj.on(ev.toLowerCase(), (e) => {
      const evName = `on${ev}`;
      if (evName in instance) {
        instance[evName].call(instance, e);
      } else if(isFun(instance.props[evName])) {
        instance.props[evName].call(null, e);
      }
    })
  });
};

export default  bindEvent;