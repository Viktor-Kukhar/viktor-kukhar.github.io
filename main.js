class MinimalSite {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.setYear();
  }

  setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
  }

  // Tableau embeds removed; no JS needed for static images
}

document.addEventListener('DOMContentLoaded', () => {
  new MinimalSite();
});