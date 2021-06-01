export default function replace(str, ...rest) {
  return rest.reduce((prev, curr) => prev.replace('{}', curr), str);
}

export const title = (str) =>
  str
    .split('_')
    .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join('');

export const isoToStandardDate = (str) => {
  const date = new Date(str);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
