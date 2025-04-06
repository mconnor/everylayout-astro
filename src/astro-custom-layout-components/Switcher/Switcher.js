/**
 * @module switcher-l
 * @description Switch directly between horizontal and vertical layouts at a given (container width-based) breakpoint or 'threshold'
 * @property {string} threshold=var(--measure) A CSS `width` value (representing the 'container breakpoint')
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {integer} limit=4 A number representing the maximum number of items permitted for a horizontal layout
 */
export default class Switcher extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  render = () => {
    this.i = `Switcher-${[this.threshold, this.space, this.limit].join('')}`;
    this.dataset.i = this.i;
    if (!document.getElementById(this.i)) {
      const styleEl = document.createElement('style');
      styleEl.id = this.i;
      styleEl.innerHTML = `
          [data-i="${this.i}"] {
            gap: ${this.space};
          }

          [data-i="${this.i}"] > * {
            flex-basis: calc((${this.threshold} - 100%) * 999);
          }

          [data-i="${this.i}"] > :nth-last-child(n+${Number.parseInt(this.limit) + 1}),
          [data-i="${this.i}"] > :nth-last-child(n+${Number.parseInt(this.limit) + 1}) ~ * {
            flex-basis: 100%;
          }
        `
        .replace(/\s{2,}/g, ' ')
        .trim();
      document.head.appendChild(styleEl);
    }
  };
  get threshold() {
    return this.getAttribute('threshold') || 'var(--measure)';
  }

  set threshold(val) {
    this.setAttribute('threshold', val);
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    this.setAttribute('space', val);
  }

  get limit() {
    return this.getAttribute('limit') || '5';
  }

  set limit(val) {
    this.setAttribute('limit', val);
  }

  static get observedAttributes() {
    return ['threshold', 'space', 'limit'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define('switcher-l', Switcher);
