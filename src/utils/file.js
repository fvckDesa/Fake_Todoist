import CSV from "../lib/csv";

export function createFile(name, content, type) {
  let fileTxt;
  switch(type) {
    case "text/csv":
      fileTxt = CSV.stringify(content);
      break;
    case "application/json":
      fileTxt = JSON.stringify(content);
      break;
    default:
      throw new Error(`${type} file type is not supported`);
  }
  return new File([fileTxt], `${name}.${type.replace(/[a-z]+\//, "")}`);
}

export async function parseFile(file) {
  const url = URL.createObjectURL(file);
  const txt = await (await (await fetch(url)).blob()).text();
  let data;

  URL.revokeObjectURL(url);

  switch(file.type) {
    case "text/csv":
      data = CSV.parse(txt, parseDate);
      break;
    case "application/json":
      data = JSON.parse(txt, parseDate);
      break;
    default:
      throw new Error(`${file.type} file type is not supported`);
  }
  return data;
}

function parseDate(key, value) {
  if(key === "dueDate" && !isNaN(Date.parse(value))) {
    return new Date(Date.parse(value));
  }
  return value;
}