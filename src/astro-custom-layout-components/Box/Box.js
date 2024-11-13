/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {boolean} invert=false Whether to apply an inverted theme. Only recommended for greyscale designs.
 */
export default class Box extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  render() {
    this.i = `Box-${[this.padding, this.borderWidth, this.invert].join('')}`;
    this.dataset.i = this.i;
    if (!document.getElementById(this.i)) {
      let styleEl = document.createElement('style');
      styleEl.id = this.i;
      styleEl.innerHTML = `
        [data-i="${this.i}"] {
          padding: ${this.padding};
          border: ${this.borderWidth} solid;
          ${
            this.invert
              ? `background-color: var(--color-light);
            filter: invert(100%);`
              : ''
          }
        }

        [data-i="${this.i}"] {
          background-color: inherit;
        }
      `
        .replace(/\s{2,}/g, ' ')
        .trim();
      document.head.appendChild(styleEl);
    }
  }

  get padding() {
    return this.getAttribute('padding') || 'var(--s1)';
  }

  set padding(val) {
    this.setAttribute('padding', val);
  }

  get borderWidth() {
    return this.getAttribute('borderWidth') || 'var(--border-thin)';
  }

  set borderWidth(val) {
    this.setAttribute('borderWidth', val);
  }

  static get observedAttributes() {
    return ['borderWidth', 'padding', 'invert'];
  }

  get invert() {
    return this.hasAttribute('invert');
  }

  set invert(val) {
    if (val) {
      this.setAttribute('invert', '');
    } else {
      this.removeAttribute('invert');
    }
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}


  customElements.define('box-l', Box);

