// header.js
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="gallery-header">
        <a href="/">home</a>
        <span>|</span>
        <a href="/about-me/">about me</a>
        <span>|</span>
        <a href="/workterms/workterm1/">workterms</a>
        <span>|</span>
        <a href="/gallery/">gallery</a>
      </div>
    `;
  }
}
customElements.define('site-header', SiteHeader);

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", e => {
            const href = link.href;

            // Ignore external links, anchors, new tabs, etc.
            if (
                !href ||
                link.target === "_blank" ||
                href.startsWith("#") ||
                new URL(href).origin !== window.location.origin
            ) {
                return;
            }

            e.preventDefault();

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
});