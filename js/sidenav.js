$(document).ready(function () {
    var isSidenavOpen = false;
    var marginThreshold = 20;
    var sidenavWidth = 250;

    function openNav() {
        $("#mySidenav").css("width", sidenavWidth + "px");
        isSidenavOpen = true;
    }

    function closeNav() {
        $("#mySidenav").css("width", "0");
        isSidenavOpen = false;
    }

    $(".closebtn").on("click", function (event) {
        event.preventDefault();
        closeNav();
    });

    // Close the side menu after jumping to a section.
    $("#mySidenav a").not(".closebtn").on("click", closeNav);

    $(document).on("mousemove", function (event) {
        if (event.clientX < marginThreshold && !isSidenavOpen) {
            openNav();
        } else if (event.clientX >= sidenavWidth && isSidenavOpen) {
            closeNav();
        }
    });
});
