// ===== Hover video previews on the project cards =====
// Each card with data-video="YOUTUBE_ID" plays that trailer, muted, over its
// capsule image while the mouse is on the card. data-start sets where it begins
// (in seconds). The player is only created on hover, so the page stays fast.

// Only on devices with a real mouse; on phones a tap just opens the project page.
if (window.matchMedia('(hover: hover)').matches) {

    document.querySelectorAll('.project-card[data-video]').forEach(card => {
        const id = card.dataset.video;
        const start = card.dataset.start || 0;
        const imageLink = card.querySelector('.project-image-link');
        let player = null;

        card.addEventListener('mouseenter', () => {
            if (player) return;

            const params = new URLSearchParams({
                autoplay: 1,         // start right away
                mute: 1,             // browsers only allow autoplay when muted
                controls: 0,         // no play bar
                loop: 1,
                playlist: id,        // YouTube needs this for loop to work
                start: start,
                playsinline: 1,
                rel: 0,              // no "more videos" from other channels at the end
                iv_load_policy: 3,   // no annotations
                disablekb: 1
            });

            player = document.createElement('iframe');
            player.className = 'project-hover-video';
            player.src = `https://www.youtube-nocookie.com/embed/${id}?${params}`;
            player.title = '';
            player.allow = 'autoplay; encrypted-media';
            player.referrerPolicy = 'strict-origin-when-cross-origin';
            player.tabIndex = -1;   // keyboard users skip it; the link still works

            // Fade in once loaded, after a short pause so YouTube's black loading
            // screen stays hidden behind the capsule image.
            player.addEventListener('load', () => {
                setTimeout(() => player && player.classList.add('is-playing'), 600);
            });

            imageLink.appendChild(player);
        });

        card.addEventListener('mouseleave', () => {
            if (player) {
                player.remove();   // stops the video and frees memory
                player = null;
            }
        });
    });
}


// ===== Gallery viewer (project pages) =====
// Clicking a .gallery-item opens its image large in a viewer over the page.
// Arrows or the arrow keys move between images; Esc, the X, or clicking the
// dark background closes it. Without JavaScript the links still open the image.

const galleryItems = [...document.querySelectorAll('.gallery-item')];

if (galleryItems.length) {
    const viewer = document.createElement('dialog');
    viewer.className = 'lightbox';
    viewer.innerHTML = `
        <img class="lightbox-image" alt="">
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
        <button class="lightbox-next" aria-label="Next image">&#8250;</button>
        <p class="lightbox-count"></p>
    `;
    document.body.appendChild(viewer);

    const image = viewer.querySelector('.lightbox-image');
    const count = viewer.querySelector('.lightbox-count');
    let current = 0;

    function show(index) {
        // Wrap around: past the last image goes to the first, and back
        current = (index + galleryItems.length) % galleryItems.length;
        const item = galleryItems[current];
        image.src = item.href;
        image.alt = item.querySelector('img').alt;
        count.textContent = `${current + 1} / ${galleryItems.length}`;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', event => {
            event.preventDefault();   // stay on the page instead of opening the image file
            show(index);
            viewer.showModal();
        });
    });

    viewer.querySelector('.lightbox-close').addEventListener('click', () => viewer.close());
    viewer.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
    viewer.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));

    // Clicking the dark background (the dialog itself, not its contents) closes it
    viewer.addEventListener('click', event => {
        if (event.target === viewer) viewer.close();
    });

    // Arrow keys move between images (Esc closing is built into <dialog>)
    viewer.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') show(current - 1);
        if (event.key === 'ArrowRight') show(current + 1);
    });
}
