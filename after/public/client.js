const form = document.getElementById('contactForm');
const statusEl = document.getElementById('status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending...';

    const payload = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    try {
        const res = await fetch('/api/form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            statusEl.textContent = data.error || 'Something went wrong. Please try again.';
            return;
        }

        statusEl.textContent = 'Sent. We\'ll reply soon.';
        form.reset();
    } catch (err) {
        statusEl.textContent = 'Network error. Please try again.';
    }
});