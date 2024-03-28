/**
 * @module cluster-l
 * @description
 * A custom element for grouping items, with control over the margin between them
 * @property {string} justify=flex-start A CSS `justify-content` value
 * @property {string} align=flex-start A CSS `align-items` value
 * @property {string} space=var(--s1) A CSS `gap` value. The minimum space between the clustered child elements.
 */
export default class Cluster extends HTMLElement {
  constructor() {
    super()
    this.render = () => {
      this.i = `Cluster-${[this.justify, this.align, this.space].join('')}`
      this.dataset.i = this.i
      if (!document.getElementById(this.i)) {
        const styleEl = document.createElement('style')
        styleEl.id = this.i
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            justify-content: ${this.justify};
            align-items: ${this.align};
            gap: ${this.space};
          }
        `
          .replace(/\s\s+/g, ' ')
          .trim()
        document.head.appendChild(styleEl)
      }
    }
  }

  get justify() {
    return this.getAttribute('justify') || 'flex-start'
  }

  set justify(val) {
    this.setAttribute('justify', val)
  }

  get align() {
    return this.getAttribute('align') || 'flex-start'
  }

  set align(val) {
    this.setAttribute('align', val)
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)'
  }

  set space(val) {
    this.setAttribute('space', val)
  }

  static get observedAttributes() {
    return ['justify', 'align', 'space']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }
}

if ('customElements' in window) {
  customElements.define('cluster-l', Cluster)
}
