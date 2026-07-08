document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollSpy();
    initClipboardButtons();
});

function initSmoothScroll() {
    document.querySelectorAll('.toc-link').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, '', link.getAttribute('href'));
        });
    });
}

function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('.toc-link'));
    if (!links.length) return;

    const linkByTargetId = new Map(links.map((link) => [link.getAttribute('href').slice(1), link]));
    const sections = Array.from(linkByTargetId.keys())
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    if (!sections.length) return;

    let activeId = null;

    const setActive = (id) => {
        if (id === activeId) return;
        activeId = id;
        links.forEach((link) => link.classList.remove('is-active'));
        const activeLink = linkByTargetId.get(id);
        if (activeLink) activeLink.classList.add('is-active');
    };

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (visible.length) {
                setActive(visible[0].target.id);
            }
        },
        {
            rootMargin: '-15% 0px -70% 0px',
            threshold: 0,
        }
    );

    sections.forEach((section) => observer.observe(section));
}

function initClipboardButtons() {
    document.querySelectorAll('.clipboard-btn').forEach((button) => {
        button.addEventListener('click', async () => {
            const code = button.closest('.copy-paste-code')?.querySelector('code');
            if (!code) return;

            try {
                await navigator.clipboard.writeText(code.textContent.trim());
            } catch (error) {
                const range = document.createRange();
                range.selectNodeContents(code);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('copy');
                selection.removeAllRanges();
            }

            button.classList.add('is-copied');
            clearTimeout(button._copyTimeout);
            button._copyTimeout = setTimeout(() => button.classList.remove('is-copied'), 1500);
        });
    });
}
