// Shared auth helpers: token handling and the logged-in navigation state.

function getValidToken() {
    const token = sessionStorage.getItem("token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
        // JWT "exp" is in seconds; drop the token once it has expired.
        if (payload.exp && payload.exp * 1000 < Date.now()) {
            logout(false);
            return null;
        }
    } catch (e) {
        // Malformed token - treat the user as logged out.
        logout(false);
        return null;
    }
    return token;
}

function logout(redirect = true) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    if (redirect) {
        window.location.href = "index.html";
    }
}

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getValidToken()}`,
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const token = getValidToken();
    if (!token) return;

    const username = $("<span>").text(sessionStorage.getItem("username") || "").html();

    $(".prijava").remove();

    $(".nav-menu").prepend(`
        <li><a href="#" id="logout"><span class="material-symbols-outlined navicon-blue">logout</span>Odjava (${username})</a></li>
    `);

    $(".nav-menu").append(`
        <li><a href="NastavniPlan.html"><span class="material-symbols-outlined navicon">article</span>Nastavni plan</a></li>
    `);

    $("#logout").on("click", function (event) {
        event.preventDefault();
        logout();
    });
});
