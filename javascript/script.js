
document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(function (question) {
        question.addEventListener("click", function () {
            const answer = question.nextElementSibling;
            const isOpen = question.getAttribute("aria-expanded") === "true";

            question.setAttribute("aria-expanded", String(!isOpen));
            answer.hidden = isOpen;
        });
    });
});

/* Gallery Lightbox */
document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeButton = document.getElementById("lightbox-close");

    // Stop if this page does not contain the lightbox
    if (!lightbox || !lightboxImage || !closeButton) {
        return;
    }

    let previousFocus = null;

    function openLightbox(image) {
        previousFocus = image;

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = image.alt;

        lightbox.hidden = false;
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.hidden = true;
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
        document.body.style.overflow = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    galleryImages.forEach(function (image) {
        image.addEventListener("click", function () {
            openLightbox(image);
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    // Close when clicking the dark background
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with the Escape key
    document.addEventListener("keydown", function (event) {
        if (!lightbox.hidden && event.key === "Escape") {
            closeLightbox();
        }
    });
});

/* Mobile Hamburger Menu */
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    if (!menuToggle || !mainNav) {
        return;
    }

    menuToggle.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });
});

/* Enquiry Form Validation */
document.addEventListener("DOMContentLoaded", function () {
    const enquiryForm = document.getElementById("enquiry-form");

    if (!enquiryForm) {
        return;
    }

    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("enquiry-name");
        const email = document.getElementById("enquiry-email");
        const course = document.getElementById("enquiry-course");
        const message = document.getElementById("enquiry-message");
        const feedback = document.getElementById("enquiry-feedback");

        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const courseError = document.getElementById("course-error");
        const messageError = document.getElementById("message-error");

        nameError.textContent = "";
        emailError.textContent = "";
        courseError.textContent = "";
        messageError.textContent = "";
        feedback.textContent = "";

        let isValid = true;

        if (name.value.trim() === "") {
            nameError.textContent = "Please enter your full name.";
            isValid = false;
        }

        if (!email.validity.valid || email.value.trim() === "") {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (course.value === "") {
            courseError.textContent = "Please select a course.";
            isValid = false;
        }

        if (message.value.trim() === "") {
            messageError.textContent = "Please enter your enquiry.";
            isValid = false;
        }

        if (isValid) {
            feedback.textContent =
                "Thank you, " + name.value.trim() +
                "! Your enquiry has passed validation. Please use the contact details to send it to the academy.";
            feedback.style.color = "green";

            enquiryForm.reset();
        } else {
            feedback.textContent = "Please correct the errors above.";
            feedback.style.color = "red";
        }
    });
});

/* Contact Form Validation */
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const program = document.getElementById("program");
        const message = document.getElementById("message");
        const feedback = document.getElementById("contact-feedback");

        const errors = {
            name: document.getElementById("contact-name-error"),
            email: document.getElementById("contact-email-error"),
            phone: document.getElementById("contact-phone-error"),
            program: document.getElementById("contact-program-error"),
            message: document.getElementById("contact-message-error")
        };

        Object.values(errors).forEach(function (error) {
            error.textContent = "";
        });

        feedback.textContent = "";

        let isValid = true;

        if (name.value.trim() === "") {
            errors.name.textContent = "Please enter your full name.";
            isValid = false;
        }

        if (email.value.trim() === "" || !email.validity.valid) {
            errors.email.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (
            phone.value.trim() !== "" &&
            !/^[0-9+\s()-]{7,20}$/.test(phone.value.trim())
        ) {
            errors.phone.textContent = "Please enter a valid phone number.";
            isValid = false;
        }

        if (program.value === "") {
            errors.program.textContent = "Please select a program.";
            isValid = false;
        }

        if (message.value.trim() === "") {
            errors.message.textContent = "Please enter your message.";
            isValid = false;
        }

        if (!isValid) {
            feedback.textContent = "Please correct the errors above.";
            feedback.style.color = "red";
            return;
        }

        feedback.textContent =
            "Your details are valid. Preparing your email...";
        feedback.style.color = "green";

        const subject = encodeURIComponent("Modeling Academy Enquiry");
        const body = encodeURIComponent(
            "Name: " + name.value.trim() +
            "\nEmail: " + email.value.trim() +
            "\nPhone: " + phone.value.trim() +
            "\nProgram: " + program.options[program.selectedIndex].text +
            "\nMessage: " + message.value.trim()
        );

        window.location.href =
            "mailto:owammtebeni4@gmail.com?subject=" +
            subject + "&body=" + body;
    });
});
/* Program Search and Filter */
document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("program-search");
    const courses = document.querySelectorAll("main article");
    const feedback = document.getElementById("search-feedback");

    if (!searchInput || !feedback || courses.length === 0) {
        return;
    }

    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value.toLowerCase().trim();
        let visibleCourses = 0;

        courses.forEach(function (course) {

            const courseText = course.textContent.toLowerCase();

            if (courseText.includes(searchText)) {
                course.style.display = "";
                visibleCourses++;
            } else {
                course.style.display = "none";
            }

        });

        if (visibleCourses === 0) {
            feedback.textContent = "No matching courses found.";
        } else {
            feedback.textContent =
                visibleCourses + " course(s) found.";
        }

    });

});
/* Interactive Cape Town Map */
document.addEventListener("DOMContentLoaded", function () {

    const mapElement = document.getElementById("map");

    if (!mapElement) {
        return;
    }

    const map = L.map("map").setView(
        [-33.9249, 18.4241], 12
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
    ).addTo(map);

    L.marker([-33.9249, 18.4241])
      s  .addTo(map)
        .bindPopup("Cape Town, South Africa")
        .openPopup();

});
