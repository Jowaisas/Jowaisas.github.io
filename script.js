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
