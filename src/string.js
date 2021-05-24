export default function replace(str, ...rest) {
  return rest.reduce((prev, curr) => prev.replace('{}', curr), '');
}

export const title = (str) =>
  str
    .split('_')
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join('');
