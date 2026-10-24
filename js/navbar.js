// Mobile hamburger menu toggle + highlighting of the current page link.
$(document).ready(function () {
    const $menu = $("#nav-menu");

    $("#trakaLFunk").on("click", function (event) {
        event.stopPropagation();
        $menu.toggleClass("nav-menu-visible");
    });

    // Close the mobile menu after a link is clicked or when clicking elsewhere.
    $menu.on("click", "a", function () {
        $menu.removeClass("nav-menu-visible");
    });
    $(document).on("click", function (event) {
        if (!$(event.target).closest("#nav-menu, #trakaLFunk").length) {
            $menu.removeClass("nav-menu-visible");
        }
    });

    // Highlight the link of the current page.
    const currentPage = decodeURIComponent(window.location.pathname.split("/").pop()) || "index.html";
    $menu.find("a").each(function () {
        if ($(this).attr("href") === currentPage) {
            $(this).addClass("selected");
        }
    });
});
