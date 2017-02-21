const bindEvent = (mapObj, eventMap, instance) => {
  const list = Object.keys(eventMap);
  list.forEach((ev) => {
    mapObj.on(ev, (e) => {
      const evName = `on${eventMap[ev]}`;
      if (evName in instance) {
        instance[evName].call(instance, e);
      }
    })
  });
};

export default  bindEvent;