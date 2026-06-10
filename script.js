const setStatus = (form, message, isError = false) => {
  const status = form.querySelector(".form-status");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("error", isError);
};

document.querySelectorAll("[data-counter]").forEach((counter) => {
  const key = "srcSportsVisits";
  const visits = Number(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, String(visits));
  counter.textContent = visits.toLocaleString();
});

document.querySelectorAll("[data-captcha]").forEach((captcha) => {
  const first = Math.floor(Math.random() * 5) + 2;
  const second = Math.floor(Math.random() * 5) + 2;
  captcha.dataset.answer = String(first + second);
  const question = captcha.querySelector("[data-captcha-question]");
  if (question) question.textContent = `${first} + ${second}`;
});

document.querySelectorAll("[data-validated-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const captcha = form.querySelector("[data-captcha]");
    const captchaInput = captcha?.querySelector("input");

    if (!form.checkValidity()) {
      setStatus(form, "Please complete all required fields with valid information.", true);
      form.reportValidity();
      return;
    }

    if (captcha && captchaInput?.value.trim() !== captcha.dataset.answer) {
      setStatus(form, "CAPTCHA answer is incorrect. Please try again.", true);
      captchaInput.focus();
      return;
    }

    const type = form.dataset.formType;
    const message = type === "booking"
      ? "Booking request prepared. A confirmation email would be sent to you."
      : "Registration received. A confirmation email would be sent to you.";

    setStatus(form, message);
    form.reset();
    document.querySelectorAll("[data-captcha]").forEach((captchaBlock) => {
      const first = Math.floor(Math.random() * 5) + 2;
      const second = Math.floor(Math.random() * 5) + 2;
      captchaBlock.dataset.answer = String(first + second);
      const question = captchaBlock.querySelector("[data-captcha-question]");
      if (question) question.textContent = `${first} + ${second}`;
    });
  });
});

document.querySelectorAll("[data-forum-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const list = document.querySelector("[data-question-list]");
    const question = textarea.value.trim();

    if (!question) {
      setStatus(form, "Please enter a question before posting.", true);
      textarea.focus();
      return;
    }

    const item = document.createElement("article");
    const title = document.createElement("h3");
    const answer = document.createElement("p");
    title.textContent = question;
    answer.textContent = "Thanks for posting. The academy team would review this and respond in the community forum.";
    item.append(title, answer);
    list.prepend(item);
    textarea.value = "";
    setStatus(form, "Question posted to the community Q&A.");
  });
});

const sportContent = {
  football: {
    tag: "Team training",
    title: "Football development pathway",
    text: "Ball control, passing, tactical movement, match communication, and small-sided games.",
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1000&q=85",
    alt: "Football players competing during a match",
    progress: 76,
    linkText: "Book Football",
  },
  basketball: {
    tag: "Court skills",
    title: "Basketball skills clinic",
    text: "Ball handling, shooting form, footwork, defensive stance, transition play, and court decisions.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85",
    alt: "Basketball player jumping toward the basket indoors",
    progress: 74,
    linkText: "Book Basketball",
  },
  volleyball: {
    tag: "Court movement",
    title: "Volleyball fundamentals",
    text: "Serving, passing, setting, rotation, jumping mechanics, and fast team communication.",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1000&q=85",
    alt: "Volleyball players jumping at the net outdoors",
    progress: 68,
    linkText: "Book Volleyball",
  },
  wrestling: {
    tag: "Mat control",
    title: "Wrestling foundation",
    text: "Strength, balance, safe takedown positioning, control, and supervised partner drills.",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1000&q=85",
    alt: "Athletes practicing wrestling style conditioning in a gym",
    progress: 82,
    linkText: "Book Wrestling",
  },
  taekwondo: {
    tag: "Martial arts",
    title: "Taekwondo development",
    text: "Kicking technique, flexibility, discipline, sparring basics, and confidence under pressure.",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=85",
    alt: "Martial arts athletes practicing kicks in uniform",
    progress: 79,
    linkText: "Book Taekwondo",
  },
  judo: {
    tag: "Grappling skills",
    title: "Judo fundamentals",
    text: "Breakfalls, grips, throwing mechanics, respectful practice, and safe technical progression.",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1000&q=85",
    alt: "Athletes practicing strength training for combat sports",
    progress: 82,
    linkText: "Book Judo",
  },
  rugby: {
    tag: "Contact sport",
    title: "Rugby development",
    text: "Passing, handling, support lines, safe contact technique, fitness, and team structure.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=85",
    alt: "Rugby players competing on a field",
    progress: 84,
    linkText: "Book Rugby",
  },
  ballet: {
    tag: "Movement discipline",
    title: "Ballet training",
    text: "Posture, balance, flexibility, rhythm, controlled movement, and performance confidence.",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1000&q=85",
    alt: "Ballet dancer practicing in a studio",
    progress: 71,
    linkText: "Book Ballet",
  },
  "table-tennis": {
    tag: "Indoor skill",
    title: "Table Tennis pathway",
    text: "Serve control, footwork, spin reading, rally consistency, and singles ladder preparation.",
    image: "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?auto=format&fit=crop&w=1000&q=85",
    alt: "Table tennis player preparing to serve",
    progress: 66,
    linkText: "Book Table Tennis",
  },
  handball: {
    tag: "Indoor team sport",
    title: "Handball sessions",
    text: "Passing, shooting, defensive shape, goalkeeper movement, and quick transition play.",
    image: "https://images.unsplash.com/photo-1611251135345-18c56206b863?auto=format&fit=crop&w=1000&q=85",
    alt: "Indoor team sport athlete holding a ball",
    progress: 78,
    linkText: "Book Handball",
  },
  gymnastics: {
    tag: "Body control",
    title: "Gymnastics basics",
    text: "Mobility, balance, tumbling foundations, strength, coordination, and safe progression.",
    image: "https://images.unsplash.com/photo-1562771242-a02d9090c90c?auto=format&fit=crop&w=1000&q=85",
    alt: "Gymnast training in a studio",
    progress: 80,
    linkText: "Book Gymnastics",
  },
  fitness: {
    tag: "Conditioning",
    title: "Speed and fitness block",
    text: "Sprint work, agility, mobility, core strength, and recovery habits for every athlete.",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=1000&q=85",
    alt: "Runner training on a track at sunset",
    progress: 88,
    linkText: "Book Fitness",
  },
};

document.querySelectorAll("[data-sport-panel]").forEach((panel) => {
  const image = panel.querySelector("[data-sport-image]");
  const tag = panel.querySelector("[data-sport-tag]");
  const title = panel.querySelector("[data-sport-title]");
  const text = panel.querySelector("[data-sport-text]");
  const progress = panel.querySelector("[data-sport-progress]");
  const link = panel.querySelector("[data-sport-link]");

  panel.querySelectorAll("[data-sport]").forEach((button) => {
    button.addEventListener("click", () => {
      const content = sportContent[button.dataset.sport];
      if (!content) return;
      panel.querySelectorAll("[data-sport]").forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      image.src = content.image;
      image.alt = content.alt;
      tag.textContent = content.tag;
      title.textContent = content.title;
      text.textContent = content.text;
      progress.value = content.progress;
      progress.textContent = `${content.progress}%`;
      link.textContent = content.linkText;
    });
  });
});

document.querySelectorAll("[data-quiz-form]").forEach((form) => {
  const result = form.querySelector("[data-quiz-result]");
  const matches = {
    team: "Recommended: Team Sports Coaching. Start with football, basketball, or volleyball sessions.",
    strength: "Recommended: Combat Sports Foundation. Try wrestling, taekwondo, or judo for strength and confidence.",
    fitness: "Recommended: Speed & Conditioning. Build stamina, agility, and recovery habits.",
    new: "Recommended: New Activities. Explore volleyball or martial arts beginner sessions.",
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const goal = new FormData(form).get("goal");
    result.textContent = matches[goal] || "Choose a goal to see your suggested program.";
  });
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

document.querySelectorAll("[data-activity-card]").forEach((card) => {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-pressed", "false");

  const toggle = () => {
    const selected = card.classList.toggle("selected");
    card.setAttribute("aria-pressed", String(selected));
  };

  card.addEventListener("click", toggle);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  });
});

const valueContent = {
  mission: {
    eyebrow: "Mission",
    title: "Develop confident athletes",
    text: "We make sport structured, inclusive, and motivating through clear coaching, safe training, and practical feedback after each session.",
  },
  vision: {
    eyebrow: "Vision",
    title: "A stronger sports culture",
    text: "We want a campus and community where athletes discover talent, build discipline, and represent SRC with pride.",
  },
  respect: {
    eyebrow: "Value",
    title: "Respect and fair play",
    text: "Athletes learn to compete hard, support teammates, listen to coaches, and treat opponents with professionalism.",
  },
  inclusion: {
    eyebrow: "Value",
    title: "Access for every level",
    text: "Beginners, returning athletes, and advanced players all get a pathway that meets them where they are.",
  },
};

document.querySelectorAll("[data-value-grid]").forEach((grid) => {
  const detail = document.querySelector("[data-value-detail]");
  const eyebrow = detail?.querySelector(".eyebrow");
  const title = detail?.querySelector("h3");
  const text = detail?.querySelector("p:last-child");

  grid.querySelectorAll("[data-value]").forEach((button) => {
    button.addEventListener("click", () => {
      const content = valueContent[button.dataset.value];
      if (!content || !detail) return;

      grid.querySelectorAll("[data-value]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      eyebrow.textContent = content.eyebrow;
      title.textContent = content.title;
      text.textContent = content.text;
    });
  });
});

document.querySelectorAll(".menu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const nav = document.getElementById(button.getAttribute("aria-controls"));
    const isOpen = nav?.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });
});

document.querySelectorAll("[data-roster-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    if (!panel) return;
    const isHidden = panel.hasAttribute("hidden");
    panel.toggleAttribute("hidden", !isHidden);
    button.textContent = isHidden ? "Hide Player Profile" : "View Player Profile";
  });
});

const searchIndex = [
  { title: "Home", keywords: "home hero all sports search media visitor counter", url: "index.html" },
  { title: "About", keywords: "about mission vision values funding sources community", url: "about.html" },
  { title: "New Activities", keywords: "wrestling taekwondo judo volleyball forum questions", url: "activities.html" },
  { title: "Events", keywords: "events fixtures schedules attendance competitions football handball table tennis", url: "events.html" },
  { title: "Teams", keywords: "teams coaches schedules player profiles dashboard", url: "teams.html" },
  { title: "Blog", keywords: "blog announcements university sports news community posts", url: "blog.html" },
  { title: "Register", keywords: "register email subscription captcha confirmation football rugby ballet gymnastics", url: "register.html" },
  { title: "Book Online", keywords: "booking book online accessible form validation email submission", url: "book.html" },
];

if (window.jQuery) {
  $("[data-site-search]").each(function () {
    const $form = $(this);
    const $input = $form.find("input[type='search']");
    const $results = $form.find("[data-search-results]");

    const renderResults = (query) => {
      const q = query.trim().toLowerCase();
      $results.empty();
      if (!q) {
        $results.removeClass("open");
        return;
      }

      const matches = searchIndex.filter((item) =>
        `${item.title} ${item.keywords}`.toLowerCase().includes(q)
      );

      if (!matches.length) {
        $results.append($("<p>").text("No matching page found."));
      } else {
        matches.forEach((item) => {
          $results.append($("<a>").attr("href", item.url).text(item.title));
        });
      }
      $results.addClass("open");
    };

    $input.on("input", function () {
      renderResults($(this).val());
    });

    $form.on("submit", function (event) {
      event.preventDefault();
      const firstLink = $results.find("a").first();
      if (firstLink.length) window.location.href = firstLink.attr("href");
    });
  });
}
