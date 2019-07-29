(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = '\
        <form id="form">\
            <fieldset>\
                <legend>HTML BOX Properties</legend>\
                <table>\
                    <tr>\
                        <td>HTML</td>\
                        <td><input id="aps_html" type="textarea" name="html"></td>\
                    </tr>\
                </table>\
            </fieldset>\
        </form>\
    ';

    class HTMLBOXAps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('propertiesChanged', { detail: { properties: {
                html: this.html 
            }}}));
            return false;
        }

        get html() {
            return this._shadowRoot.getElementById("aps_html").value;
        }

        set html(newHTML) {
            this._shadowRoot.getElementById("aps_html").value = newHTML;
        }

        static get observedAttributes() {
            return ['html'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }
    }

    customElements.define('sdk-htmlbox-aps', HTMLBOXAps);
})();