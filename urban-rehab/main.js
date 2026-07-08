document.addEventListener('DOMContentLoaded', function () {
    /* ---------------------------------------------
       Footer year
    --------------------------------------------- */
    var yearEl = document.getElementById('footerYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* ---------------------------------------------
       Desktop mega menu / dropdown (click toggle,
       on top of the CSS :hover behaviour) — lets
       keyboard and touch users open/close the panels.
    --------------------------------------------- */
    var menuParents = document.querySelectorAll('.nav-item.has-mega, .nav-item.has-dropdown');

    menuParents.forEach(function (item) {
        var trigger = item.querySelector('.nav-link');

        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            var isOpen = item.classList.contains('is-open');

            menuParents.forEach(function (other) {
                other.classList.remove('is-open');
            });

            if (!isOpen) {
                item.classList.add('is-open');
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-item.has-mega, .nav-item.has-dropdown')) {
            menuParents.forEach(function (item) {
                item.classList.remove('is-open');
            });
        }
    });

    /* ---------------------------------------------
       Mobile off-canvas menu
    --------------------------------------------- */
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileMenuToggle = document.getElementById('mobileMenuToggle');
    var mobileMenuClose = document.getElementById('mobileMenuClose');
    var mobileMenuTrack = document.getElementById('mobileMenuTrack');

    function openMobileMenu() {
        mobileMenu.classList.add('is-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('is-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        goToPanel(0);
    }

    function goToPanel(index) {
        mobileMenuTrack.style.transform = 'translateX(-' + (index * 100) + '%)';
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    document.querySelectorAll('[data-goto]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            goToPanel(parseInt(btn.getAttribute('data-goto'), 10));
        });
    });

    document.querySelectorAll('.mobile-menu-link').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    /* ---------------------------------------------
       Services "Load More" (mobile progressive reveal)
    --------------------------------------------- */
    var loadMoreBtn = document.getElementById('loadMoreServices');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            document.querySelectorAll('.extra-service').forEach(function (card) {
                card.classList.add('is-visible');
            });
            loadMoreBtn.classList.add('d-none');
        });
    }

    /* ---------------------------------------------
       Testimonial carousel
    --------------------------------------------- */
    var track = document.getElementById('testimonialTrack');
    var dotsWrap = document.getElementById('testimonialDots');
    var prevBtn = document.getElementById('testimonialPrev');
    var nextBtn = document.getElementById('testimonialNext');

    if (track) {
        var slides = track.querySelectorAll('.testimonial-card');
        var current = 0;

        slides.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'testimonial-dot';
            dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
            dot.addEventListener('click', function () {
                goToSlide(i);
            });
            dotsWrap.appendChild(dot);
        });

        var dots = dotsWrap.querySelectorAll('.testimonial-dot');

        function goToSlide(index) {
            current = (index + slides.length) % slides.length;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            dots.forEach(function (dot, i) {
                dot.classList.toggle('is-active', i === current);
            });
        }

        if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(current - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(current + 1); });

        goToSlide(0);
    }

    /* ---------------------------------------------
       Find Us accordion
    --------------------------------------------- */
    document.querySelectorAll('.location-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            var item = toggle.closest('.location-item');
            item.classList.toggle('is-open');
        });
    });
});
