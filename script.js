
document.addEventListener("DOMContentLoaded", () => {
    // --- Entrance Animations ---
    const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)", duration: 1 } });

    // 1. Flags Drop In
    tl.to(".flag__birthday", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "bounce.out"
    })
        // 2. Title Letters Stagger In
        .to(".title .happy span, .title .birthday span", {
            y: 0,
            opacity: 1,
            visibility: "visible",
            stagger: 0.05,
            duration: 0.8
        }, "-=0.5")
        // 3. Hat Lands
        .to(".title .hat", {
            top: -30,
            rotation: 0,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        }, "-=0.5")
        // 4. Balloons Float Up
        .to(".balloon_one, .balloon_two", {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.2
        }, "-=1")
        // 5. Image & Name Appear
        .to(".box__account", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        }, "-=1")
        // 6. Date & Name Text Expand
        .to(".date__of__birth", {
            y: 0,
            opacity: 1,
            visibility: "visible",
            width: "300px",
            height: "50px",
            duration: 1
        }, "-=0.5")
        // 7. Button Pop In
        .to(".btn", {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.5")
        // 8. Decorations
        .to(".decorate_star, .decorate_flower--one, .decorate_flower--two, .decorate_flower--three, .smiley__icon, .cricle", {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 1
        }, "-=1");

    // --- Interactive Elements ---

    // Mail Box Interaction
    const mailBtn = document.getElementById("btn__letter");
    const boxMail = document.querySelector(".boxMail");
    const closeBtn = document.querySelector(".fa-xmark");

    mailBtn.addEventListener("click", () => {
        // Show the modal
        boxMail.classList.add("active");

        // Trigger Confetti
        triggerConfetti();

        // Animate Modal Content Entrance
        gsap.fromTo(".boxMail-container",
            { scale: 0, rotation: -10 },
            { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.2)" }
        );
    });

    closeBtn.addEventListener("click", () => {
        // Animate Modal Exit
        gsap.to(".boxMail-container", {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                boxMail.classList.remove("active");
                // Reset for next open
                gsap.set(".boxMail-container", { scale: 0.9, opacity: 1 });
            }
        });
    });

    // Hover Effects for Button (GSAP)
    mailBtn.addEventListener("mouseenter", () => {
        gsap.to(mailBtn, { scale: 1.1, duration: 0.2 });
        gsap.to("#btn__letter i", { rotation: 360, repeat: -1, duration: 1, ease: "linear" });
    });

    mailBtn.addEventListener("mouseleave", () => {
        gsap.to(mailBtn, { scale: 1, duration: 0.2 });
        gsap.killTweensOf("#btn__letter i");
        gsap.set("#btn__letter i", { rotation: 0 });
    });

    // --- Confetti Function ---
    function triggerConfetti() {
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 999999,
            colors: ['#FF7882', '#DACCBF', '#FFFFFF', '#FFD700'] // Pink, Beige, White, Gold
        };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }
});
