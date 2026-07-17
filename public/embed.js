(function() {
  const BASE_URL = 'https://easytools.kr';

  function initEmbed() {
    // 1. Setup Header
    let headerContainer = document.getElementById('easytools-header');
    let headerIframe = document.getElementById('easytools-header-iframe');

    if (!headerIframe) {
      headerIframe = document.createElement('iframe');
      headerIframe.id = 'easytools-header-iframe';
      headerIframe.src = `${BASE_URL}/header`;
      headerIframe.scrolling = 'no';
      headerIframe.style.width = '100%';
      headerIframe.style.height = '64px';
      headerIframe.style.border = 'none';
      headerIframe.style.overflow = 'hidden';
      headerIframe.style.display = 'block';
      headerIframe.style.transition = 'height 0.15s ease';
      headerIframe.style.position = 'absolute';
      headerIframe.style.top = '0';
      headerIframe.style.left = '0';
      headerIframe.style.zIndex = '99999';

      if (headerContainer) {
        headerContainer.style.position = 'relative';
        headerContainer.style.height = '64px';
        headerContainer.style.zIndex = '99999';
        headerContainer.appendChild(headerIframe);
      } else {
        // Prepend directly to body if no container is defined
        document.body.style.paddingTop = '64px';
        document.body.insertBefore(headerIframe, document.body.firstChild);
      }
    }

    // 2. Setup Footer
    let footerContainer = document.getElementById('easytools-footer');
    let footerIframe = document.getElementById('easytools-footer-iframe');

    if (!footerIframe) {
      footerIframe = document.createElement('iframe');
      footerIframe.id = 'easytools-footer-iframe';
      footerIframe.src = `${BASE_URL}/footer`;
      footerIframe.scrolling = 'no';
      footerIframe.style.width = '100%';
      footerIframe.style.height = '260px'; // Fallback starting height
      footerIframe.style.border = 'none';
      footerIframe.style.overflow = 'hidden';
      footerIframe.style.display = 'block';
      footerIframe.style.transition = 'height 0.15s ease';

      if (footerContainer) {
        footerContainer.appendChild(footerIframe);
      } else {
        // Append directly to body if no container is defined
        document.body.appendChild(footerIframe);
      }
    }

    // 3. Listen for Resize Events from iframes
    window.addEventListener('message', function(event) {
      // Validate sender origin (allow base site, localhost dev servers, and subdomains)
      const origin = event.origin;
      const isAllowed = 
        origin === BASE_URL || 
        origin.includes('easytools.kr') || 
        origin.startsWith('http://localhost') || 
        origin.includes('vercel.app');

      if (!isAllowed) {
        return;
      }

      const data = event.data;
      if (!data) return;

      if (data.type === 'easytools-header-resize') {
        const header = document.getElementById('easytools-header-iframe');
        if (header) {
          header.style.height = data.height + 'px';
        }
      }

      if (data.type === 'easytools-header-open') {
        const header = document.getElementById('easytools-header-iframe');
        if (header) {
          header.style.position = 'fixed';
          header.style.top = '0';
          header.style.left = '0';
          header.style.width = '100vw';
          header.style.height = '100vh';
          header.style.zIndex = '999999';
        }
      }

      if (data.type === 'easytools-header-close') {
        const header = document.getElementById('easytools-header-iframe');
        if (header) {
          header.style.position = 'absolute';
          header.style.top = '0';
          header.style.left = '0';
          header.style.width = '100%';
          header.style.height = '64px';
          header.style.zIndex = '99999';
        }
      }

      if (data.type === 'easytools-footer-resize') {
        const footer = document.getElementById('easytools-footer-iframe');
        if (footer) {
          footer.style.height = data.height + 'px';
        }
      }
    });
  }

  // Initialize once the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmbed);
  } else {
    initEmbed();
  }
})();
