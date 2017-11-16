export const offsetTop = el => {
  let total = 0;
  let parent = el;
  while (parent) {
    total += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return total;
};
