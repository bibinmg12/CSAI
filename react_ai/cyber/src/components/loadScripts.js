export function loadScripts(urls) {
  urls.forEach(url => {
    const script = document.createElement('script');
    script.src = process.env.PUBLIC_URL + url;
    script.async = true;
    document.body.appendChild(script);
  });
}
