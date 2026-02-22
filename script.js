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

    /* --- Init on DOM Ready --- */
    document.addEventListener('DOMContentLoaded', function () {
        loadComponents();
        initVisitorCounters();
        initYear();
        initCursors();
        initTooltips();
    });

})();
