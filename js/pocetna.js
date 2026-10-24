$(document).ready(function () {
    const typedString = document.getElementById("typewriter");
    if (!typedString || typeof Typewriter === "undefined") return;

    const typewriter = new Typewriter(typedString, {
        loop: true,
        delay: 75,
    });

    typewriter
        .pauseFor(500)
        .typeString('<span class="custom-text-shadow">Budi izvrstan u onom što vidiš!</span>')
        .pauseFor(300)
        .deleteChars(5)
        .typeString('<span class="custom-text-shadow">oliš!</span>')
        .pauseFor(300)
        .typeString('<br><span class="custom-color-gradient custom-text-shadow">ZAISKRI!</span>')
        .pauseFor(5000)
        .deleteAll()
        .start();
});
