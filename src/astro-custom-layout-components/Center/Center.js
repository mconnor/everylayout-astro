/**
 * @module center-l
 * @description
 * A custom element for centering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} max=var(--measure) A CSS `max-width` value
 * @property {boolean} andText=false Center align the text too (`text-align: center`)
 * @property {boolean} gutters=0 The minimum space on either side of the content
 * @property {boolean} intrinsic=false Center child elements based on their content width
 */
export default class Center extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  render() {
    this.i = `Center-${[this.max, this.andText, this.gutters, this.intrinsic].join('')}`;
    this.dataset.i = this.i;
    if (!document.getElementById(this.i)) {
      const styleEl = document.createElement('style');
      styleEl.id = this.i;
      styleEl.innerHTML = `
        [data-i="${this.i}"] {
          max-width: ${this.max};
          ${
            this.gutters
              ? `
          padding-inline-start: ${this.gutters};
          padding-inline-end: ${this.gutters};`
              : ''
          }
          ${this.andText ? `text-align: center;` : ''}
          ${
            this.intrinsic
              ? `
          display: flex;
          flex-direction: column;
          align-items: center;`
              : ''
          }
        }
      `
        .replace(/\s{2,}/g, ' ')
        .trim();
      document.head.appendChild(styleEl);
    }
  }

  get max() {
    return this.getAttribute('max') || 'var(--measure)';
  }

  set max(val) {
    this.setAttribute('max', val);
  }

  get andText() {
    return this.hasAttribute('andText');
  }

  set andText(val) {
    if (val) {
      this.setAttribute('andText', '');
    } else {
      this.removeAttribute('andText');
    }
  }

  get gutters() {
    return this.getAttribute('gutters') || null;
  }

  set gutters(val) {
    this.setAttribute('gutters', val);
  }

  get intrinsic() {
    return this.hasAttribute('intrinsic');
  }

  set intrinsic(val) {
    if (val) {
      this.setAttribute('intrinsic', '');
    } else {
      this.removeAttribute('intrinsic');
    }
  }

  static get observedAttributes() {
    return ['max', 'andText', 'gutters', 'intrinsic'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('center-l', Center);
