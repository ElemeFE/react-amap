const isObject = (args) => {
  return !!args && Object.prototype.toString.call(args).slice(8, -1) === 'Object';
}

export default isObject;
