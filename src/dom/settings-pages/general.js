import { generalPageTemplate } from "../elements";
import appSettings from "../../settings";
import { homeViewEls } from "../../settings/data";

let handleChange;

const generalPage = generalPageTemplate.cloneNode(true).firstElementChild;
const fields = [...generalPage.querySelectorAll("select")];

fields.forEach((field) =>
  field.addEventListener("change", ({ target }) => {
    handleChange(target.name, +target.value);
  })
);

const [homeView] = fields;

export default function activeGeneralPage(change) {
  handleChange = change ?? (() => {});
  createHomeView();
  // set fields value
  fields.forEach((field) => {
    field.value = appSettings[field.name];
  });

  return {
    page: generalPage,
    getValue: () => {
      return fields.map(({ name, value }) => ({ setting: name, value: isNaN(value) ? value : +value }));
    },
  };
}

function createHomeView() {
  homeView.replaceChildren(
    ...homeViewEls.map((obj) => {
      if (obj.group === false) {
        return createOption(obj);
      }

      const { label, els } = obj;

      const optgroup = document.createElement("optgroup");
      optgroup.label = label;
      optgroup.replaceChildren(...els.map(createOption));

      return optgroup;
    })
  );
}

function createOption({ txt, value }) {
  const option = document.createElement("option");
  option.innerText = txt;
  option.value = value;
  option.selected = value === appSettings["homeViewId"];
  return option;
}
