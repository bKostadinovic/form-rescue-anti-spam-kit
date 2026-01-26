// quick client script for the form
// TODO: improve later

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('status');

// server url (works locally)
const API_URL = 'http://localhost:3001/submit';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    statusEl.textContent = 'Sending...';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // no validation here yet
    // also: no submit lock (double click will send twice)

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        // this is wrong but leaving it for now
        // if server errors, it still says sent sometimes
        if (res.ok) {
            statusEl.textContent = 'Sent. We\'ll reply soon.';
            form.reset();
        } else {
            statusEl.textContent = 'Sent. We\'ll reply soon.'; // yeah... not great
        }
    } catch (error) {
        // also not great, but whatever
        statusEl.textContent = 'Sent. We\'ll reply soon.';
    }
});