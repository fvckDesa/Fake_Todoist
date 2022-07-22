"use strict";

class SvgLoader extends HTMLElement {
  #src = "";
  #isConnected = false;
  onLoadSvg = () => {};
  onErrorSvg = () => {};
  constructor() {
    super();
    // create shadow root
    this.attachShadow({ mode: "open" });
    // default empty svg
    this.svg = document.createElement("svg");
    this.shadowRoot.appendChild(this.svg);
  }

  render(src) {
    if(!src) return;
    getSVG(src)
      .then((svg) => {
        const scriptRegex = /<script>(.|\n|\r)*<\/script>/g;
        // add svg to shadow root (not script)
        this.shadowRoot.innerHTML = svg.replace(scriptRegex, "");
        // set svg property to svg in shadow root
        this.svg = this.shadowRoot.querySelector("svg");
        // get script in svg file
        let svgScript = svg.match(scriptRegex);
        if (svgScript) {
          // run the script
          svgScript = svgScript[0].replace(/<\/?script>/g, "");
          try {
            eval(
              `const shadowRoot = this.shadowRoot;\n ${svgScript}`
            );
          } catch(err) {
            console.error(err);
          }
        }
        // add attributes to svg
        for (const { name, value } of this.attributes) {
          if (name.match(/^svg:/)) this.svg.setAttribute(name.slice(4), value);
        }
        // call onLoadSvg callback
        this.onLoadSvg(this.svg);
      })
      .catch((err) => {
        console.error(err);
        this.onErrorSvg(err);
      });
  }

  static get observedAttributes() {
    return ["src", "svg:class", "svg:id"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        this.#src = newValue;
        if(this.#isConnected) this.render(newValue);
        break;
      case "svg:class":
        this.svg.setAttribute("class", newValue);
        break;
      case "svg:id":
        this.svg.setAttribute("id", newValue);
        break;
    }
  }

  connectedCallback() {
    this.render(this.#src);
    // display: flex on svg-element to give it the same width and height as the internal svg
    this.style.cssText += `
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    this.#isConnected = true;
  }

  set src(newSrc) {
    this.setAttribute("src", newSrc);
  }

  get src() {
    return this.#src;
  }
}

const cache = localStorage.getItem("svg-cache")
  ? JSON.parse(localStorage.getItem("svg-cache"))
  : {};

async function getSVG(url) {
  if (cache[url]) return cache[url];
  let svg;
  try {
    svg = await (await fetch(url)).text();
    cache[url] = svg;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
  localStorage.setItem("svg-cache", JSON.stringify(cache));
  return svg;
}

customElements.define("svg-loader", SvgLoader);
