document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("logregForm");
    const submitButton = registerForm.querySelector('button[type="submit"]');

    function getErrorMessage(data, fallback) {
        if (data && Array.isArray(data.errorMessages) && data.errorMessages.length) {
            return data.errorMessages.join(", ");
        }
        return fallback;
    }

    async function registerUser(username, password) {
        let response;
        try {
            response = await fetch("https://www.fulek.com/data/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
        } catch (error) {
            throw "Greška u komunikaciji sa serverom. Pokušajte ponovno.";
        }

        let data = null;
        try {
            data = await response.json();
        } catch (e) {
            // The server didn't return JSON.
        }

        if (data && data.isSuccess) {
            return true;
        }
        throw getErrorMessage(data, "Registracija neuspješna.");
    }

    function showDialog(title, message) {
        $("#dialog-content").text(message);
        $("#dialog-message").dialog({
            title: title,
            modal: true,
            position: { my: "center", at: "center", of: window },
            show: { effect: "fade", duration: 100 },
            hide: { effect: "fade", duration: 100 },
        });
    }

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (username === "" || password === "") {
            showDialog("Neuspjeh", "Molimo unesite podatke!");
            return;
        }

        submitButton.disabled = true;
        registerUser(username, password)
            .then(() => {
                showDialog("Uspjeh", "Registracija uspješna! Sada se možete prijaviti.");
                setTimeout(() => {
                    window.location.href = "Prijava.html";
                }, 1500);
            })
            .catch((error) => {
                console.error("Error during registration:", error);
                showDialog("Neuspjeh pri kreiranju korisnika", String(error));
                submitButton.disabled = false;
            });
    });
});
