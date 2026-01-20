document.addEventListener("mousemove", (e) => {
    const pupils = document.querySelectorAll(".pupil");

    pupils.forEach(pupil => {
        const eye = pupil.parentElement;
        const eyeRect = eye.getBoundingClientRect();

        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(
            e.clientY - eyeCenterY,
            e.clientX - eyeCenterX
        );

        const radius = 6;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
});
