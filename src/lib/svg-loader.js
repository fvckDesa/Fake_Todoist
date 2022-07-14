class SvgLoader extends HTMLElement {
  constructor() {
    super();
    // create shadow root
    this.attachShadow({ mode: "open" });
    // display: flex on svg-element to give it the same width and height as the internal svg 
    this.style.display = "flex";
    // default empty svg
    this.svg = document.createElement("svg");
    // render svg
    this.render(this.getAttribute("src"));
  }

  render(src) {
    if(!src) return;
    getSVG(src).then((svg) => {
      const scriptRegex = /<script>(.|\n|\r)*<\/script>/g;
      // add svg to shadow root (not script)
      this.shadowRoot.innerHTML = svg.replace(scriptRegex, "");
      // set svg property to svg in shadow root
      this.svg = this.shadowRoot.querySelector("svg");
      // get script in svg file
      let svgScript = svg.match(scriptRegex);
      if(svgScript) {
        // run the script
        svgScript = svgScript[0].replace(/<\/?script>/g, "");
        eval(`const shadowRoot = document.querySelector("#today-icon").shadowRoot;\n ${svgScript}`);
      }
      // add attributes to svg
      for (const { name, value } of this.attributes) {
        if(name.match(/^svg:/)) this.svg.setAttribute(name.slice(4), value);
        if(name === "width" || name === "height") this.svg.setAttribute(name, value);
      }
    });
  }

  static get observedAttributes() {
    return ["src", "svg:class", "svg:id", "width", "height"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        this.render(newValue);
        break;
      case "svg:class":
        this.svg.setAttribute("class", newValue);
        break;
      case "svg:id":
        this.svg.setAttribute("id", newValue);
        break;
      case "width":
        this.style.width = newValue;
        this.svg.setAttribute("width", newValue);
        break;
      case "height":
        this.style.height = newValue;
        this.svg.setAttribute("height", newValue);
        break;
    }
  }

  set src(newSrc) {
    this.setAttribute("src", newSrc);
  }

  set width(newWidth) {
    this.setAttribute("width", newWidth);
  }
  
  set height(newHeight) {
    this.setAttribute("height", newHeight);
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
