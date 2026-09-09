// header.js
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="gallery-header" style="margin-bottom: 5px; text-align: center;">
        <a href="/index.html" style="margin-right: 50px;">home</a>
        <span style="margin-right: 50px;">|</span>
        <a href="/about-me.html" style="margin-right: 50px;">about me</a>
        <span style="margin-right: 50px;">|</span>
        <a href="/workterms/workterm1.html" style="margin-right: 50px;">workterms</a>
        <span style="margin-right: 50px;">|</span>
        <a href="/gallery.html">gallery</a>
      </div>
    `;
  }
}
customElements.define('site-header', SiteHeader);