
(function () {
  const page = document.getElementById('page');

  function isInvalid(href) {
    return !href || href === '#' || href.startsWith('#');
  }

  function go(href) {
    if (isInvalid(href)) return;
    if (page) page.classList.add('page-exit');
    window.setTimeout(function () {
      window.location.href = href;
    }, 180);
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[data-nav="tap"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (isInvalid(href)) return;

    e.preventDefault();

    link.classList.add('tap-active');
    window.setTimeout(function () {
      link.classList.remove('tap-active');
    }, 160);

    go(href);
  });
})();
