class MinimalSite {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.setYear();
    this.initTableauEmbeds();
  }

  setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
  }

  initTableauEmbeds() {
    const containers = document.querySelectorAll('.tableau-embed');
    containers.forEach((container, index) => {
      const url = container.getAttribute('data-tableau-url');
      if (!url) return;

      // Compose a minimal, embedded URL with explicit sizing
      const hasQuery = url.includes('?');
      const sizeParams = ':size=1200,800&:showVizHome=no&:embed=yes&:toolbar=no&:tabs=no&:device=desktop';
      const src = url + (hasQuery ? '&' : '?') + sizeParams;

      // Calculate scale based on container width
      const scaleX = container.offsetWidth / 1200;
      const scaledHeight = 800 * scaleX;
      
      // Set container sizing to match scaled iframe
      container.style.height = `${scaledHeight}px`;
      container.style.width = '100%';
      container.style.overflow = 'hidden';
      container.style.position = 'relative';

      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = container.getAttribute('data-title') || `Tableau dashboard ${index + 1}`;
      iframe.style.width = '1200px';
      iframe.style.height = '800px';
      iframe.style.border = '0';
      iframe.style.display = 'block';
      iframe.style.transformOrigin = 'top left';
      iframe.style.transform = `scale(${scaleX})`;
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.scrolling = 'no';
      
      iframe.loading = 'lazy';
      iframe.setAttribute('allowfullscreen', '');
      iframe.referrerPolicy = 'no-referrer-when-downgrade';

      container.appendChild(iframe);

      // Adjust scale and container height on window resize
      const handleResize = () => {
        const newScaleX = container.offsetWidth / 1200;
        const newScaledHeight = 800 * newScaleX;
        iframe.style.transform = `scale(${newScaleX})`;
        container.style.height = `${newScaledHeight}px`;
      };
      
      window.addEventListener('resize', handleResize);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MinimalSite();
});