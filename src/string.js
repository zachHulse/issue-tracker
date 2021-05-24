export default function replace(str, ...rest) {
  return rest.reduce((prev, curr) => prev.replace('{}', curr), '');
}
