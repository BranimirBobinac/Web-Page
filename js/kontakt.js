$(document).ready(function () {
    var $contactForm = $("#contact-form");
    if (!$contactForm.length) return;

    $contactForm.dialog({
        autoOpen: false,
        modal: true,
        width: Math.min(600, $(window).width() - 32),
        resizable: false,
        draggable: false,
        position: { my: "center", at: "center", of: window },
        show: { effect: "fade", duration: 400 },
        hide: { effect: "fade", duration: 400 },
        create: function () {
            var title = $(this).parent().find(".ui-dialog-title");
            title.prepend('<span class="material-symbols-outlined navicon align-middle">mail</span> ');
        }
    });

    $("#contact-link").on("click", function (event) {
        event.preventDefault();
        $contactForm.dialog("open");
    });

    $(window).on("resize", function () {
        if ($contactForm.dialog("isOpen")) {
            $contactForm.dialog("option", "width", Math.min(600, $(window).width() - 32));
            $contactForm.dialog("option", "position", { my: "center", at: "center", of: window });
        }
    });
});
