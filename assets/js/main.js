/**
 * Template Name: Evently
 * Template URL: https://bootstrapmade.com/evently-bootstrap-events-template/
 * Updated: Jul 19 2025 with Bootstrap v5.3.7
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Countdown timer
   */
  function updateCountDown(countDownItem) {
    const timeleft =
      new Date(countDownItem.getAttribute("data-count")).getTime() -
      new Date().getTime();

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    const daysElement = countDownItem.querySelector(".count-days");
    const hoursElement = countDownItem.querySelector(".count-hours");
    const minutesElement = countDownItem.querySelector(".count-minutes");
    const secondsElement = countDownItem.querySelector(".count-seconds");

    if (daysElement) daysElement.innerHTML = days;
    if (hoursElement) hoursElement.innerHTML = hours;
    if (minutesElement) minutesElement.innerHTML = minutes;
    if (secondsElement) secondsElement.innerHTML = seconds;
  }

  document.querySelectorAll(".countdown").forEach(function (countDownItem) {
    updateCountDown(countDownItem);
    setInterval(function () {
      updateCountDown(countDownItem);
    }, 1000);
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /*
   * Pricing Toggle
   */

  const pricingContainers = document.querySelectorAll(
    ".pricing-toggle-container"
  );

  pricingContainers.forEach(function (container) {
    const pricingSwitch = container.querySelector(
      '.pricing-toggle input[type="checkbox"]'
    );
    const monthlyText = container.querySelector(".monthly");
    const yearlyText = container.querySelector(".yearly");

    pricingSwitch.addEventListener("change", function () {
      const pricingItems = container.querySelectorAll(".pricing-item");

      if (this.checked) {
        monthlyText.classList.remove("active");
        yearlyText.classList.add("active");
        pricingItems.forEach((item) => {
          item.classList.add("yearly-active");
        });
      } else {
        monthlyText.classList.add("active");
        yearlyText.classList.remove("active");
        pricingItems.forEach((item) => {
          item.classList.remove("yearly-active");
        });
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const enquireBtn = document.getElementById("enquire-btn");
    const modal = document.getElementById("enquiry-modal");
    const modalClose = document.getElementById("modal-close");
    const form = document.getElementById("event-registration");
    const submitBtn = form.querySelector("button[type='submit']");
    const addressTextarea = document.getElementById("popup-address");
    const addressCount = document.getElementById("popup-addressCount");

    // Character counter for address field
    if (addressTextarea && addressCount) {
      addressTextarea.addEventListener("input", function () {
        const length = this.value.length;
        addressCount.textContent = `${length}/7 characters (minimum 7 required)`;

        if (length < 7) {
          addressCount.classList.add("invalid");
          addressCount.style.color = "#dc3545";
        } else {
          addressCount.classList.remove("invalid");
          addressCount.style.color = "#6c757d";
        }
      });
    }

    // Open modal - Handle multiple enquire buttons
    function openModal(source = "enquire_btn") {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";

      // Set tracking information with source
      setTrackingInfo(source);

      setTimeout(() => {
        document.getElementById("popup-name").focus();
      }, 300);
    }

    // Main enquire button
    if (enquireBtn) {
      enquireBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal("main_enquire_btn");
      });
    }

    // Sticky footer enquire button
    const stickyEnquireBtn = document.querySelector(
      ".sticky-buttons .btn-enquire"
    );
    if (stickyEnquireBtn) {
      stickyEnquireBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal("sticky_enquire_btn");
      });
    }

    // Any other enquire buttons on the page
    const allEnquireBtns = document.querySelectorAll(
      '[id*="enquire"], [class*="enquire"], a[href*="enquire"]'
    );
    allEnquireBtns.forEach((btn, index) => {
      if (btn !== enquireBtn && btn !== stickyEnquireBtn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          openModal(`enquire_btn_${index + 1}`);
        });
      }
    });

    // Close modal
    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      form.reset();
      submitBtn.classList.remove("loading");
      submitBtn.innerHTML = `REGISTER NOW <i class="bi bi-arrow-right-circle ms-2"></i>`;

      // Reset address counter
      if (addressCount) {
        addressCount.textContent = "0/7 characters (minimum 7 required)";
        addressCount.classList.remove("invalid");
        addressCount.style.color = "#6c757d";
      }
    }

    modalClose.addEventListener("click", closeModal);

    // Close on overlay click
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });

    // Set tracking information - Updated to accept source parameter
    function setTrackingInfo(source = "enquire_btn") {
      const now = new Date();
      document.getElementById("popup-timestamp").value = now.toISOString();
      document.getElementById("popup-source").value = source;
      document.getElementById("popup-campaign").value = "cedar_festive_night";
      document.getElementById("popup-channel").value = "website";
      document.getElementById("popup-medium").value = "popup";
      document.getElementById("popup-device").value = /Mobi|Android/i.test(
        navigator.userAgent
      )
        ? "mobile"
        : "desktop";

      // Get URL parameters if available
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("gclid")) {
        document.getElementById("popup-gclid").value = urlParams.get("gclid");
      }
    }

    // Form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate required fields
      const name = document.getElementById("popup-name").value.trim();
      const email = document.getElementById("popup-email").value.trim();
      const phone = document.getElementById("popup-phone").value.trim();
      const address = document.getElementById("popup-address").value.trim();

      if (!name || !email || !phone || !address) {
        alert("Please fill in all required fields.");
        return;
      }

      if (address.length < 7) {
        alert("Please enter a complete address (minimum 7 characters).");
        document.getElementById("popup-address").focus();
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        document.getElementById("popup-email").focus();
        return;
      }

      // Phone validation (basic)
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number.");
        document.getElementById("popup-phone").focus();
        return;
      }

      submitBtn.classList.add("loading");
      submitBtn.innerHTML = "REGISTERING...";

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
    });
  });
})();
