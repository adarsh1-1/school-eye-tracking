const video = document.getElementById("video");
const pupils = document.querySelectorAll(".pupil");

/* Start laptop camera */
navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" }
}).then(stream => {
    video.srcObject = stream;
});

/* FaceMesh setup */
const faceMesh = new FaceMesh({
    locateFile: file =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
});

faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.6
});

/* Eye-based tracking */
faceMesh.onResults(results => {
    if (!results.multiFaceLandmarks.length) return;

    const face = results.multiFaceLandmarks[0];

    /*
      Left eye center: landmarks 468–471
      Right eye center: landmarks 473–476
    */

    const leftEye = face[468];
    const rightEye = face[473];

    // Average eye position
    const eyeX = ((leftEye.x + rightEye.x) / 2 - 0.5) * 2;
    const eyeY = ((leftEye.y + rightEye.y) / 2 - 0.5) * 2;

    pupils.forEach(pupil => {
        pupil.style.transform = `
            translate(${eyeX * 6}px, ${eyeY * 6}px)
        `;
    });
});

/* Camera loop */
const camera = new Camera(video, {
    onFrame: async () => {
        await faceMesh.send({ image: video });
    },
    width: 640,
    height: 480
});

camera.start();
