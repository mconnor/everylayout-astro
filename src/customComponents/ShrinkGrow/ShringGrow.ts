export default class ShrinkGrow extends HTMLElement {
  observable: boolean
  denominator: any
  translateWidth: (t: any) => number
  decPlaces: number
  setDenominator: () => void
  playPause: () => void
  container: any
  button: any
  observe: () => void
  inner: any
  currentWidth: any
  metaElem: any
  constructor() {
    super(),
      this.attachShadow({
        mode: 'open',
      }),
      (this.observable = 'ResizeObserver' in window),
      (this.translateWidth = (t) => t / this.denominator),
      (this.decPlaces = 'px' === this.unit ? 0 : 2),
      (this.setDenominator = () => {
        const t = document.createElement('div')
        this.appendChild(t),
          (t.style.width = `1${this.unit}`),
          (t.style.display = 'inline-block'),
          (this.denominator = t.offsetWidth),
          this.removeChild(t)
      }),
      (this.playPause = () => {
        let t = this.container.style.animationPlayState
        ;(this.container.style.animationPlayState =
          'paused' === t ? 'running' : 'paused'),
          this.button.setAttribute(
            'aria-label',
            'paused' === t ? 'pause' : 'play',
          )
      }),
      (this.observe = () => {
        if (
          (this.render(),
          !this.static &&
            (this.observable && this.setDenominator(),
            (this.container = this.shadowRoot.querySelector('.container')),
            (this.inner = this.shadowRoot.querySelector('.inner')),
            this.observable &&
              ((this.currentWidth = this.translateWidth(
                this.inner.offsetWidth,
              )),
              (this.metaElem = this.shadowRoot.querySelector('.width')),
              (this.metaElem.textContent = this.currentWidth.toFixed(
                this.decPlaces,
              ))),
            (this.container.style.animationPlayState = 'paused'),
            (this.button = this.shadowRoot.querySelector('.meta button')),
            this.button.addEventListener('click', () => {
              this.playPause()
            }),
            this.observable))
        ) {
          new ResizeObserver((t) => {
            for (let e of t) {
              const t = e.contentRect
              ;(this.currentWidth = this.translateWidth(t.width)),
                (this.decPlaces = 'px' === this.unit ? 0 : 2),
                (this.metaElem.textContent = this.currentWidth.toFixed(
                  this.decPlaces,
                ))
            }
          }).observe(this.inner)
        }
      }),
      (this.render = () => {
        this.shadowRoot.innerHTML = `\n        <style>\n          :host {\n            border-width: 0 !important;\n            padding: 0 !important;\n          }\n\n          @keyframes squeeze {\n            0% { width: ${this.wide} }\n            100% { width: ${this.narrow} }\n          }\n\n          .container {\n            background-color: var(--color-light);\n            box-sizing: border-box;\n            margin-inline: auto;\n            ${this.static ? '' : `animation: ${this.duration}s linear infinite alternate squeeze;`}\n            height: ${this.height};\n            overflow-y: auto;\n            filter: invert(100%);\n            padding: ${this.noPad ? '0' : 'var(--s2)'};\n            ${'auto' !== this.height ? '\n              display: flex;\n              flex-direction: column;\n              justify-content: center;\n             ' : ''}\n          }\n\n          .inner {\n            box-sizing: border-box;\n          }\n\n          .meta {\n            text-align: center;\n            margin-block-end: var(--s-1);\n            font-family: Menlo, Courier,Courier New, Andale Mono, monospace;\n          }\n\n          .meta button {\n            all: unset;\n            cursor: pointer;\n            display: inline-block;\n            width: var(--s1);\n            height: var(--s1);\n            padding: var(--s-1);\n            border-radius: 100%;\n          }\n\n          .meta button:focus {\n            box-shadow: inset 0 0 0 var(--border-thin) var(--color-mid);\n          }\n\n          .meta button svg {\n            width: 100%;\n            height: 100%;\n          }\n\n          [aria-label="play"] .icon-pause {\n            display: none;\n          }\n\n          [aria-label="pause"] .icon-play {\n            display: none;\n          }\n        </style>\n        ${this.static ? '' : `\n        <div class="meta">\n          <button aria-label="play">\n            <svg class="icon-play" viewBox="0 0 10 10" focusable="false">\n              <path d="M1,0 10,5 1,10" />\n            </svg>\n            <svg class="icon-pause" viewBox="0 0 10 10" focusable="false">\n              <path d="M0,0 0,10 3,10 3,0 M7,0 7,10 10,10 10,0" />\n            </svg>\n          </button>\n          <div>\n            <span class="width"></span><span class="unit">${this.observable ? this.unit : ''}</span>\n          </div>\n        </div>\n        `}\n        <div class="container" role="group" aria-label="${this.static ? 'Demo:' : 'Interactive demo:'} ${this.label}">\n          <div class="inner">\n            <slot></slot>\n          </div>\n        </div>\n      `
      })
  }
  render() {
    throw new Error('Method not implemented.')
  }
  static get observedAttributes() {
    return [
      'wide',
      'narrow',
      'height',
      'duration',
      'unit',
      'label',
      'noPad',
      'static',
    ]
  }
  attributeChangedCallback() {
    this.observe()
  }
  connectedCallback() {
    this.observe()
  }
  get wide() {
    return this.getAttribute('wide') || '100%'
  }
  set wide(t) {
    return this.setAttribute('wide', t)
  }
  get narrow() {
    return this.getAttribute('narrow') || '300px'
  }
  set narrow(t) {
    return this.setAttribute('narrow', t)
  }
  get duration() {
    return this.getAttribute('duration') || '5'
  }
  set duration(t) {
    return this.setAttribute('duration', t)
  }
  get height() {
    return this.getAttribute('height') || '25vh'
  }
  set height(t) {
    return this.setAttribute('height', t)
  }
  get unit() {
    return this.getAttribute('unit') || 'px'
  }
  set unit(t) {
    return this.setAttribute('unit', t)
  }
  get label() {
    return (
      this.getAttribute('label') || 'Responsive demonstration of the layout'
    )
  }
  set label(t) {
    return this.setAttribute('label', t)
  }
  get noPad() {
    return this.hasAttribute('noPad')
  }
  set noPad(t) {
    return t ? this.setAttribute('noPad', '') : this.removeAttribute('noPad')
  }
  get static() {
    return this.hasAttribute('static')
  }
  set static(t) {
    return t ? this.setAttribute('static', '') : this.removeAttribute('static')
  }
}
'customElements' in window && customElements.define('shrink-grow', ShrinkGrow)
