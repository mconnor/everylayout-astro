/**
 * @module icon-l
 * @description
 * A custom element for inline icon insertion
 * @property {string} space=null The space between the text and the icon. If null, natural word spacing is preserved
 * @property {string} label=null Turns the element into an image in assistive technologies and adds an aria-label of the value
 */
export default class Icon extends HTMLElement {
  render: () => void
  i: string | undefined
  constructor() {
    super()
    this.render = () => {
      if (this.label) {
        this.setAttribute('role', 'img')
        this.setAttribute('aria-label', this.label)
      }
      if (this.space) {
        this.i = `Icon-${this.space}`
        this.dataset.i = this.i
        if (!document.getElementById(this.i)) {
          const styleEl = document.createElement('style')
          styleEl.id = this.i
          styleEl.innerHTML = `
            [data-i="${this.i}"] {
              display: inline-flex;
              align-items: baseline;
            }

            [data-i="${this.i}"] > svg {
              margin-inline-end: ${this.space};
            }
          `
            .replace(/\s\s+/g, ' ')
            .trim()
          document.head.appendChild(styleEl)
        }
      }
    }
  }

  get space() {
    return this.getAttribute('space') || null
  }

  set space(val) {
    val ? this.setAttribute('space', val) : this.removeAttribute('space')
  }

  get label() {
    return this.getAttribute('label') || null
  }

  set label(val) {
    val ? this.setAttribute('label', val) : this.removeAttribute('label')
  }

  static get observedAttributes() {
    return ['space', 'label']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }
}

if ('customElements' in window) {
  customElements.define('icon-l', Icon)
}
