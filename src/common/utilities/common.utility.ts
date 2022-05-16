export const uniq = (a) => [...new Set(a)];

export const flatten = (a) => {
  return Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
};
