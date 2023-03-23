const delay = ms => new Promise(res => setTimeout(res, ms));

function shake(element) {
    let animationDuration = 600;
    let animationKeyframes = [
        { transform: 'translate(2px, 1px) rotate(0deg)' },
        { transform: 'translate(-1px, -2px) rotate(-1deg)' },
        { transform: 'translate(-3px, 0px) rotate(1deg)' },
        { transform: 'translate(0px, 2px) rotate(0deg)' },
        { transform: 'translate(1px, -1px) rotate(1deg)' },
        { transform: 'translate(-1px, 2px) rotate(-1deg)' },
        { transform: 'translate(-3px, 1px) rotate(0deg)' },
        { transform: 'translate(2px, 1px) rotate(-1deg)' },
        { transform: 'translate(-1px, -1px) rotate(1deg)' },
        { transform: 'translate(2px, 2px) rotate(0deg)' },
        { transform: 'translate(1px, -2px) rotate(-1deg)' }
    ];

    element.animate(animationKeyframes, {
        duration: animationDuration,
        iterations: 1,
        easing: 'linear'
    });
}


// Wait for the DOMContentLoaded event before running the handlePageLoad function
(async() => {
    const styleTag = document.createElement('style');
    styleTag.textContent = 'button:not(:disabled).bglpi-disabled { cursor: not-allowed; opacity: 0.65;}';
    document.head.appendChild(styleTag);

    await delay(1000);
    const saveButton = document.querySelector('button[title="Sauvegarder"]');
    const addButton = document.querySelector('button[name="add"]');
    const handleAnswerClick = () => {
        // Define the target element to observe
        const target = document.querySelector('iframe[title="Zone de Texte Riche"]').contentDocument.querySelector('#tinymce');

        // Define a function to be called when the length of the target element changes
        const handleLengthChange = (mutationsList, observer) => {
            const currentLength = target.innerHTML.length;
            if (currentLength > 30) {
                saveButton.classList.add('bglpi-disabled');
                saveButton.addEventListener("mouseover", handleSaveHover);
                addButton.addEventListener('click', handleAddClick);
            }
        };

        // Create a new MutationObserver
        const observer = new MutationObserver(handleLengthChange);

        // Define the configuration for the observer
        const config = { characterData: true, subtree: true };

        // Start observing the target element for changes to its length
        observer.observe(target, config);
    };
    document.querySelector('button.answer-action').addEventListener('click', handleAnswerClick);
    const handleSaveHover = () => {
        shake(addButton);
    };

    const handleAddClick = () => {
        saveButton.classList.remove('bglpi-disabled');
        saveButton.removeEventListener("mouseover", handleSaveHover)
    };
})();

