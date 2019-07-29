(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = '\
      <style>\
        :host {\
            border-radius:25px;\
            border-width: 4px;\
            border-color: black;\
            border-style: solid;\
        }\
      </style>\
      <slot></slot>\
    ';

    class HTMLBox extends HTMLElement {
        constructor() {
            super();
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(tmpl.content.cloneNode(true));
            //this.style.height = "100%";
            this.addEventListener('click', function() {
                console.log("Awesomebox_v2 was clicked!");
                this.dispatchEvent(new Event('onClick'));
            });
        }

        get html() {
            return this.innerHTML;
        }

        set html(newHTML) {
            this.innerHTML = newHTML;
        }

        getHTML() {
            return this.html;
        }

        setHTML(newHTML) {
            this.html = newHTML;
        }

        static get observedAttributes() {
            return ['html'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this[name] = newValue;
        }
    }

    customElements.define('sdk-htmlbox', HTMLBox);
})();