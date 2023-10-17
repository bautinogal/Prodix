import _ from 'lodash';

//callback function to stringify circular objects into json
const refReplacer = () => {
  // let m = new Map(),
  //   v = new Map(),
  //   init = null;

  // return function (field, value) {
  //   let p = m.get(this) + (Array.isArray(this) ? `[${field}]` : '.' + field);
  //   let isComplex = value === Object(value)

  //   if (isComplex) m.set(value, p);

  //   let pp = v.get(value) || '';
  //   let path = p.replace(/undefined\.\.?/, '');
  //   let val = pp ? `#REF:${pp[0] == '[' ? '$' : '$.'}${pp}` : value;

  //   !init ? (init = value) : (val === init ? val = "#REF:$" : 0);
  //   if (!pp && isComplex) v.set(value, path);

  //   return val;
  // }
};

const randomNumber = (min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => Math.random() * (max - min + 1) + min;
const randomInt = (min, max) => Math.floor(randomNumber(min, max));
const randomChances = (...chances) => {
  chances = chances.reduce((p, x) => Array.isArray(x) ? [...p, ...x] : [...p, x], [])
  chances = chances.map(x => x ? x : 0); // converts "null" and "undefined" to 0
  var total = chances.reduce((prev, x) => prev += x, 0);
  var rand = Math.random() * total;
  var res = 0;
  var acum = 0;
  for (let i = 0; i < chances.length; i++) {
    if (rand > acum) res = i;
    acum = acum + chances[i];
  }
  return res;
};
// const randomElements = (arr, count) => {
//   let res = [];
//   let tmp = [...arr];
//   for (let i = 0; i < count && tmp.length != 0; i++) {
//     let pos = randomIntFromInterval(0, tmp.length - 1);
//     res.push(tmp.splice(pos, 1)[0]);
//   }
//   return res;
// };
const randomString = (n = 32) => {
  let result = Math.random().toString(36).slice(-n);
  while (result.length < n) {
    result += Math.random().toString(36).slice(-n + result.length)
  }
  return result;
};

const secondInMilli = 1000;
const minuteInMilli = secondInMilli * 60;
const hourInMilli = minuteInMilli * 60;
const dayInMilli = hourInMilli * 24;
const randomDate = (maxDaysBack = 1, maxDaysFuture = 1) => Math.floor(Date.now() + dayInMilli * randomNumber(maxDaysBack, maxDaysFuture));

const toPascalCase = (str, explicitConv) => {
  let res = null;
  if (explicitConv?.[str]) {
    res = explicitConv[str];
  } else {
    res = str[0].toUpperCase() + str.slice(1);
    res = res.endsWith('Id') ? res.slice(0, res.length - 2) + "ID" : res;
  }
  return res;
};
const toCamelCase = (str, explicitConv) => {
  let res = null;
  if (explicitConv?.[str]) {
    res = explicitConv[str];
  } else {
    res = str[0].toLowerCase() + str.slice(1);
    res = res.endsWith('ID') ? res.slice(0, res.length - 2) + "Id" : res;
  }
  return res;
};
const keysToPC = (obj, explicitConv) => Object.entries(obj).reduce((p, x) => ({ ...p, [toPascalCase(x[0], explicitConv)]: x[1] }), {});
const keysToCC = (obj, explicitConv) => Object.entries(obj).reduce((p, x) => ({ ...p, [toCamelCase(x[0], explicitConv)]: x[1] }), {});

const timeout = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * It removes all the empty strings and null values from an object.
 * @param obj - The object to remove empty properties from.
 * @returns The object with empty strings and null values removed.
 */
export const removeEmpty = (obj) => {
  Object.keys(obj).forEach((k) => ((obj[k] == null || obj[k] === "") && obj[k] !== undefined) && delete obj[k]);
  return obj;
};

export const capitalize = (str) => {
  try {
    if (str == null || str == "") return "-";
    const words = str.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  } catch (error) {
    console.error("error capitalizing, str: " + str + " error: " + error);
    return "-";
  }
};

export const centsToPesos = (cents) => '$' + new Intl.NumberFormat('es-ES').format(cents / 100);

export const isIOS = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'] .includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);

export default {
  ..._, refReplacer, isIOS,
  randomNumber, randomInt, randomChances, randomString,
  secondInMilli, minuteInMilli, hourInMilli, dayInMilli, randomDate,
  toPascalCase, toCamelCase, keysToPC, keysToCC, timeout, centsToPesos
};