/* ============================================
   HORSE — Component Loader + Retro Utilities
   ============================================ */

(function () {
    'use strict';

    /* --- Component Loader ---
       Any element with [data-component="name"] will have its
       innerHTML replaced with the contents of components/name.html.
       Paths are resolved relative to the page location.
    */
    function getBasePath() {
        // Determine if we're in /pages/ or at root
        var path = window.location.pathname;
        if (path.indexOf('/pages/') !== -1) {
            return '../';
        }
        return './';
    }

    function loadComponents() {
        var basePath = getBasePath();
        var slots = document.querySelectorAll('[data-component]');

        slots.forEach(function (slot) {
            var name = slot.getAttribute('data-component');
            var url = basePath + 'components/' + name + '.html';

            fetch(url)
                .then(function (res) {
                    if (!res.ok) throw new Error('Component not found: ' + name);
                    return res.text();
                })
                .then(function (html) {
                    slot.innerHTML = html;

                    // Fire a custom event so other scripts can react
                    slot.dispatchEvent(new CustomEvent('component:loaded', {
                        detail: { name: name },
                        bubbles: true
                    }));
                })
                .catch(function (err) {
                    console.warn('[horse]', err.message);
                    // Fail silently in production — component just won't render
                });
        });
    }

    /* --- Fake Visitor Counter ---
       Finds elements with class .visitor-counter and populates
       them with a deterministic-but-plausible visitor number.
    */
    function initVisitorCounters() {
        var counters = document.querySelectorAll('.visitor-counter');
        counters.forEach(function (el) {
            // Seed from a stored value or generate one
            var key = 'horse_visitors';
            var count = parseInt(localStorage.getItem(key), 10);
            if (isNaN(count)) {
                // Start somewhere that feels like a real site from 2003
                count = 4827 + Math.floor(Math.random() * 200);
            }
            // Increment by 1 each visit
            count++;
            localStorage.setItem(key, count);
            el.textContent = String(count).padStart(7, '0');
        });
    }

    /* --- Current Year Helper ---
       Auto-fills elements with [data-year] with the current year.
    */
    function initYear() {
        var els = document.querySelectorAll('[data-year]');
        var year = new Date().getFullYear();
        els.forEach(function (el) {
            el.textContent = year;
        });
    }

    /* --- Custom Cursor ---
       If a cursor file exists at assets/cursors/default.cur,
       apply it to the body. Individual elements can override
       with inline style or their own class.
    */
    function initCursors() {
        var basePath = getBasePath();
        // Only set if the file exists — we test via a tiny fetch
        fetch(basePath + 'assets/cursors/default.cur', { method: 'HEAD' })
            .then(function (res) {
                if (res.ok) {
                    document.body.style.cursor = 'url(' + basePath + 'assets/cursors/default.cur), auto';
                }
            })
            .catch(function () {
                // No cursor file, no problem
            });
    }

    /* --- Retro Tooltip ---
       Elements with [data-tooltip] get a basic browser-native
       title tooltip. No fancy libraries needed.
    */
    function initTooltips() {
        var els = document.querySelectorAll('[data-tooltip]');
        els.forEach(function (el) {
            el.setAttribute('title', el.getAttribute('data-tooltip'));
        });
    }

    /* --- Gallery Loader --- */
    function initGallery() {
        var container = document.getElementById('gallery-container');
        if (!container) return;

        var prevBtn = document.getElementById('btn-gallery-prev');
        var nextBtn = document.getElementById('btn-gallery-next');

        function getScrollAmount() {
            return container.firstElementChild ? container.firstElementChild.offsetWidth + 16 : 300;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            });
        }

        var basePath = getBasePath();
        fetch(basePath + 'assets/data/drawings.json')
            .then(function (res) {
                if (!res.ok) throw new Error('Could not load drawings.json');
                return res.json();
            })
            .then(function (data) {
                container.innerHTML = '';
                data.forEach(function (item) {
                    var wrapper = document.createElement('div');
                    wrapper.className = 'beveled-inset bg-white';
                    wrapper.style.display = 'inline-block';
                    wrapper.style.margin = '8px';
                    wrapper.style.verticalAlign = 'top';
                    wrapper.style.width = 'calc(50% - 24px)';
                    wrapper.style.boxSizing = 'border-box';
                    wrapper.style.whiteSpace = 'normal';

                    if (item.type === 'placeholder' || !item.file) {
                        wrapper.style.height = 'auto';
                        wrapper.style.aspectRatio = '1 / 1';
                        wrapper.style.position = 'relative';

                        var inner = document.createElement('div');
                        inner.style.position = 'absolute';
                        inner.style.top = '50%';
                        inner.style.left = '50%';
                        inner.style.transform = 'translate(-50%, -50%)';
                        inner.style.color = '#ccc';
                        inner.style.fontFamily = 'Courier New, monospace';
                        inner.style.fontSize = '12px';
                        inner.style.textAlign = 'center';
                        inner.textContent = item.desc || '[ EMPTY_SLOT ]';

                        wrapper.appendChild(inner);
                    } else {
                        wrapper.style.padding = '8px';

                        var img = document.createElement('img');
                        var fileName = item.file.split('/').pop();
                        img.src = basePath + 'assets/images/' + fileName;
                        img.alt = item.alt || 'drawing';
                        img.style.display = 'block';
                        img.style.width = '100%';
                        img.style.height = 'auto';
                        img.style.border = '1px solid black';

                        var textContainer = document.createElement('div');
                        textContainer.className = 'font-mono text-muted';
                        textContainer.style.fontSize = '11px';
                        textContainer.style.marginTop = '4px';
                        textContainer.style.textAlign = 'left';
                        textContainer.style.whiteSpace = 'normal';
                        textContainer.innerHTML = '<b>FILE:</b> ' + fileName + '<br><b>DESC:</b> ' + (item.desc || '');

                        wrapper.appendChild(img);
                        wrapper.appendChild(textContainer);
                    }
                    container.appendChild(wrapper);
                });
            })
            .catch(function (err) {
                console.warn('[horse] Gallery error:', err.message);
                container.innerHTML = '<div style="color:red; font-family:monospace; padding:8px;">ERROR LOADING SYS_DIGITAL_ARTIFACTS</div>';
            });
    }

    /* --- Dead Link Interceptor ---
       Catches clicks on a[href="#"] or empty hrefs
       and redirects to 404.html
    */
    function initDeadLinks() {
        document.body.addEventListener('click', function (e) {
            var anchor = e.target.closest('a');
            if (anchor) {
                var href = anchor.getAttribute('href');
                if (href === '#' || href === '') {
                    e.preventDefault();
                    var basePath = getBasePath();
                    window.location.href = basePath + '404.html';
                }
            }
        });
    }

    /* --- Init on DOM Ready --- */
    document.addEventListener('DOMContentLoaded', function () {
        loadComponents();
        initVisitorCounters();
        initYear();
        initCursors();
        initTooltips();
        initGallery();
        initDeadLinks();
    });

})();
