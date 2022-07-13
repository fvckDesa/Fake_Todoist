class SvgLoader extends HTMLElement {
  constructor() {
    super();
    // create shadow root
    this.attachShadow({ mode: "open" });
    // render svg
    this.render();
  }

  render() {
    getSVG(this.getAttribute("src")).then((svg) => {
      this.shadowRoot.innerHTML = svg;
      this.svg = this.shadowRoot.querySelector("svg");
      for (const { name, value } of this.attributes) {
        this.svg.setAttribute(name, value);
      }
    });
  }

  static get observedAttributes() {
    return ["src", "width", "height", "class", "id"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        this.render();
        break;
      default:
        if (this.svg) this.svg.setAttribute(name, newValue);
        break;
    }
  }
}

async function getSVG(url) {
  let svg;
  try {
    svg = await (await fetch(url)).text();
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
  return svg;
}

customElements.define("svg-loader", SvgLoader);
