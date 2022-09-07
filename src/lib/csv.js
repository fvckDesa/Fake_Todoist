function stringify(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("param must be an array");
  }
  return [
    Object.keys(isObject(arr[0]) ? arr[0] : arr),
    ...arr.map((obj) => {
      if (!isObject(obj)) {
        return `"${obj}"`;
      }
      return Object.values(obj)
        .map((value) => {
          let formattedValue = value;
          if (typeof value === "string") {
            formattedValue = formattedValue.replace(/"/g, "$&$&");
            formattedValue = formattedValue.replace(/,/g, "\\,");
            formattedValue = formattedValue.replace(/\\n/g, "\\$&");
          }
          if (value instanceof Date) {
            formattedValue = value.toJSON();
          }
          return `"${formattedValue}"`;
        })
        .join(",");
    }),
  ].join("\n");
}

function parse(csvTxt, reviver = defaultReviver) {
  const header = csvTxt.split("\n")[0].split(",");
  const content = csvTxt
    .split("\n")
    .slice(1)
    .map((line) => line.split(/(?<!\\),/));
  if (content.every((v) => v.length === 1)) {
    return content.flat().map(formatValue).map((v, i) => reviver(`${i}`, v));
  }
  return content
    .map((el) =>
      el.map((value, i) => {
        let formattedValue = formatValue(value);
        return [header[i], reviver(header[i], formattedValue)];
      })
    )
    .map((entries) => Object.fromEntries(entries));
}

function defaultReviver(key, value) {
  return value;
}

function isObject(obj) {
  return !!obj && typeof obj === "object";
}

function formatValue(value) {
  let formattedValue = value
    .replace(/\\(?=,)/g, "")
    .replace(/""/g, '"')
    .replace(/\\\\n/, "\n");
  formattedValue = formattedValue.slice(1, formattedValue.length - 1);
  if (!isNaN(formattedValue)) {
    formattedValue = Number(formattedValue);
  } else if (formattedValue == "true" || formattedValue == "false") {
    formattedValue = formattedValue == "true";
  } else if (formattedValue === "null") {
    formattedValue = null;
  }

  return formattedValue;
}

const CSV = { stringify, parse };

export default CSV;
