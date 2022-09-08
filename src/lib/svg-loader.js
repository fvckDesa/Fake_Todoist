"use strict";
import HandlerRequests from "./handlerRequests";

const cache = localStorage.getItem("svg-cache")
  ? JSON.parse(localStorage.getItem("svg-cache"))
  : {};

const handlerRequests = new HandlerRequests(getSVG);

let isConnected = false, isLoadSVG = false, isErrorSVG = false;

class SvgLoader extends HTMLElement {
  #onLoadSvg = () => {};
  #onErrorSvg = () => {};
  constructor() {
    super();
    // create shadow root
    this.attachShadow({ mode: "open" });
    // default empty svg
    this.svg = document.createElement("svg");
    this.shadowRoot.appendChild(this.svg);
  }

  #render(src) {
    if (!src) return;
    if (src in cache) {
      return this.#loadSVG(cache[src]);
    }

    handlerRequests.setRequest(src, this.#loadSVG.bind(this));
  }

  #loadSVG(svgTxt) {
    const scriptRegex = /<script>(.|\n|\r)*<\/script>/g;
    // add svg to shadow root (not script)
    this.shadowRoot.innerHTML = svgTxt.replace(scriptRegex, "");
    // set svg property to svg in shadow root
    this.svg = this.shadowRoot.querySelector("svg");
    // get script in svg file
    let svgScript = svgTxt.match(scriptRegex);
    if (svgScript) {
      // run the script
      svgScript = svgScript[0].replace(/<\/?script>/g, "");
      try {
        eval(`"use strict";\r\n${svgScript}`);
      } catch (err) {
        console.error(err);
        this.#onErrorSvg(err);
        isErrorSVG = true;
        return;
      }
    }
    this.#onLoadSvg(this.svg);
    isLoadSVG = true;
  }

  static get observedAttributes() {
    return ["src"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        this.#render(newValue);
        break;
    }
  }

  connectedCallback() {
    if(this.src) this.setAttribute("src", this.src);
    // display: flex on svg-element to give it the same width and height as the internal svg
    this.style.cssText += `
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    isConnected = true;
  }

  disconnectedCallback() {
    isConnected = false;
  }

  set src(newSrc) {
    if(isConnected) {
      this.setAttribute("src", newSrc);
      return;
    }
    this.#render(newSrc);
  }

  set onLoadSvg(cb) {
    if (isLoadSVG) cb(this.svg);
    this.#onLoadSvg = cb;
  }

  set onErrorSvg(cb) {
    if (isErrorSVG) cb(this.svg);
    this.#onErrorSvg = cb;
  }
}

async function getSVG(url) {
  let svg;
  try {
    svg = await (await fetch(url, { mode: "cors" })).text();
    cache[url] = svg;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
  localStorage.setItem("svg-cache", JSON.stringify(cache));
  return svg;
}

customElements.define("svg-loader", SvgLoader);
