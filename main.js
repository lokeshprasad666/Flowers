const flowers = document.querySelectorAll('.flower');

flowers.forEach(flower => {
    flower.addEventListener('mouseenter', () => {
        flower.classList.add('bloom');
        const message = flower.getAttribute('data-message');
        displayMessage(message);
    });

    flower.addEventListener('mouseleave', () => {
        flower.classList.remove('bloom');
        hideMessage();
    });
});

function displayMessage(message) {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    messageBox.style.display = 'block';
}

function hideMessage() {
    const messageBox = document.getElementById('message-box');
    messageBox.style.display = 'none';
}