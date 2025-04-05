import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
        {/* Script to disable Next.js error overlay */}
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.addEventListener('error', function(e) {
                  // Prevent error overlay for fetch/axios errors
                  if (e.message && (e.message.includes('fetch failed') || e.message.includes('Axios'))) {
                    e.stopImmediatePropagation();
                  }
                });
                
                // Hide existing error overlays
                const hideOverlay = () => {
                  const errorOverlays = document.querySelectorAll('[data-nextjs-dialog-overlay]');
                  errorOverlays.forEach(overlay => overlay.remove());
                };
                
                // Run immediately and set interval to keep checking
                hideOverlay();
                setInterval(hideOverlay, 100);
              `
            }}
          />
        )}
      </body>
    </Html>
  );
}
