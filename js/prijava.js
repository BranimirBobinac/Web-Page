document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("logregForm");
    const submitButton = loginForm.querySelector('button[type="submit"]');

    function getErrorMessage(data, fallback) {
        if (data && Array.isArray(data.errorMessages) && data.errorMessages.length) {
            return data.errorMessages.join(", ");
        }
        return fallback;
    }

    async function authenticateUser(username, password) {
        let response;
        try {
            response = await fetch("https://www.fulek.com/data/api/user/login", {
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

        if (data && data.isSuccess && data.data && data.data.token) {
            return data.data.token;
        }
        throw getErrorMessage(data, "Prijava neuspješna.");
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

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (username === "" || password === "") {
            showDialog("Neuspjeh", "Molimo unesite podatke!");
            return;
        }

        submitButton.disabled = true;
        authenticateUser(username, password)
            .then((token) => {
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("username", username.split("@")[0]);
                showDialog("Uspjeh", "Prijava uspješna!");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
            })
            .catch((error) => {
                console.error("Error during login:", error);
                showDialog("Neuspjeh prilikom prijave", String(error));
                submitButton.disabled = false;
            });
    });
});
