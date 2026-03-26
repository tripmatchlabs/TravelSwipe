document.documentElement.classList.add("js-enabled");

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}

const waitlistForm = document.getElementById("waitlist-form");
const feedback = document.getElementById("form-feedback");
const emailInput = document.getElementById("email");

if (waitlistForm && feedback && emailInput) {
  waitlistForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!emailInput.checkValidity()) {
      feedback.textContent = "Enter a valid email address to preview the waitlist flow.";
      feedback.classList.remove("is-success");
      feedback.classList.add("is-error");
      emailInput.focus();
      return;
    }

    feedback.textContent = `${emailInput.value} is queued for launch updates. Demo capture only on this static page.`;
    feedback.classList.remove("is-error");
    feedback.classList.add("is-success");
    waitlistForm.reset();
  });
}
