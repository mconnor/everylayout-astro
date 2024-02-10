/**
 * @module imposter-l
 * @description
 * A custom element to be positioned absolutely over any element
 * @property {boolean} breakout=false Whether the element is allowed to break out of the container over which it is positioned
 * @property {string} margin=0 The minimum space between the element and the inside edges of the positioning container over which it is placed (where `breakout` is not applied)
 * @property {boolean} fixed=false Whether to position the element relative to the viewport
 */
export default class Imposter extends HTMLElement {
  render: () => void
  i: string
  constructor() {
    super()
    this.render = () => {
      this.i = `Imposter-${[this.breakout, this.fixed, this.margin].join('')}`
      this.dataset.i = this.i
      const margin = this.margin === '0' ? '0px' : this.margin
      if (!document.getElementById(this.i) && (!this.breakout || this.fixed)) {
        const styleEl = document.createElement('style')
        styleEl.id = this.i
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            ${
              !this.breakout
                ? `
              max-inline-size: calc(100% - (${margin} * 2));
              max-block-size: calc(100% - (${margin} * 2));
              overflow: auto;`
                : ''
            }
            ${
              this.fixed
                ? `
              position: fixed;`
                : ''
            }
          }
        `
          .replace(/\s\s+/g, ' ')
          .trim()
        document.head.appendChild(styleEl)
      }
    }
  }

  get breakout() {
    return this.hasAttribute('breakout')
  }

  set breakout(val) {
    if (val) {
      this.setAttribute('breakout', '')
    } else {
      this.removeAttribute('breakout')
    }
  }

  get fixed() {
    return this.hasAttribute('fixed')
  }

  set fixed(val) {
    if (val) {
      this.setAttribute('fixed', '')
    } else {
      this.removeAttribute('fixed')
    }
  }

  get margin() {
    return this.getAttribute('margin') || '0px'
  }

  set margin(val) {
    this.setAttribute('margin', val)
  }

  static get observedAttributes() {
    return ['breakout', 'margin', 'fixed']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }
}

if ('customElements' in window) {
  customElements.define('imposter-l', Imposter)
}
