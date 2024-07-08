const trails = document.querySelectorAll('.trail');
const pulseSvg = document.getElementById('pulse-svg');


const smoothPointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
const totalPointsArray = [40, 35, 30, 25, 20, 15, 10];

window.addEventListener('mousemove', (e) => {
    gsap.to(smoothPointer, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
    });
});

window.addEventListener('click', (e) => {
    const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulse.setAttribute('cx', e.clientX);
    pulse.setAttribute('cy', e.clientY);
    pulse.setAttribute('r', 0);
    let randomRed = Math.floor(Math.random() * 155 + 100);
    let randomGreen = Math.floor(Math.random() * 155 + 100);
    let randomBlue = Math.floor(Math.random() * 155 + 100);
    pulse.setAttribute('fill', `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 0.5)`);

    pulseSvg.appendChild(pulse);

    gsap.to(pulse, {
        attr: { r: 50 },
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            pulse.remove();
        }
    });
});

function updatePath() {
    trails.forEach((path, index) => {
        let points = path.points || [];
        points.unshift({ ...smoothPointer });
        while (points.length > totalPointsArray[index]) {
            points.pop();
        }
        path.points = points;
        if (points.length > 1) {
            let d = `M ${points[0].x} ${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
                d += ` L ${points[i].x} ${points[i].y}`;
            }
            path.setAttribute('d', d);
        }
    });

    requestAnimationFrame(updatePath);
}

updatePath();
