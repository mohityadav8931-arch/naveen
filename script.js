(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  let toastTimer;
  const surpriseMessages = [
    {title:"A Smile 😊", icon:"😊", text:"May you find a little reason to smile today, and may that smile stay with you a little longer."},
    {title:"A Wish 🌟", icon:"🌟", text:"My wish for you is simple: peaceful days, good health, success in your goals, and people who treat you with kindness."},
    {title:"A Rose 🌹", icon:"🌹", text:"If life were a garden, I would wish it to be full of roses, bright colours, and moments that make you feel grateful."},
    {title:"A Hug 🤗", icon:"🤗", text:"Here is a warm virtual hug—just a small reminder to pause, breathe, and be kind to yourself."},
    {title:"A Star ✨", icon:"✨", text:"Keep believing in your dreams. Even a small step forward can lead to something wonderful."},
    {title:"A Compliment 💖", icon:"💖", text:"You deserve to be appreciated for your own unique qualities, your effort, and the person you are."},
    {title:"A Promise 🌷", icon:"🌷", text:"This page promises no grand things—only a sincere wish that you always find respect, kindness, and happiness."},
    {title:"A Thank You 💐", icon:"💐", text:"Thank you for taking a moment to visit this little page. I hope it added a soft, happy note to your day."},
    {title:"Good Luck 🍀", icon:"🍀", text:"Good luck with every new beginning. May your hard work open doors and may you feel proud of your progress."},
    {title:"One More ❤️", icon:"❤️", text:"One last reminder from Naveen: you are appreciated, and I hope life brings you many beautiful memories."}
  ];
  const showToast = (message) => {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  };
  function goToPage(id) {
    const target = document.getElementById(id);
    if (!target) return;
    $$(".page").forEach(page => page.classList.toggle("active", page === target));
    $$(".nav-link").forEach(button => button.classList.toggle("active", button.dataset.page === id));
    $("#mainNav").classList.remove("open");
    $("#menuToggle").setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  $$(".nav-link").forEach(button => button.addEventListener("click", () => goToPage(button.dataset.page)));
  $$("[data-go]").forEach(button => button.addEventListener("click", () => goToPage(button.dataset.go)));
  $("#menuToggle").addEventListener("click", () => {
    const nav = $("#mainNav");
    const isOpen = nav.classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
  });
  $$("[data-note]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.note;
    const notes = {
      wishNote: "Dear Dr Anshu, may your day be gentle, your mind peaceful, and your heart full of hope. 🌷",
      sparkleNote: "A little sparkle for your day: you do not have to be perfect to make the world brighter. ✨"
    };
    const note = document.getElementById(id);
    note.textContent = notes[id] || "A kind thought just for you. 💗";
    note.classList.add("visible");
  }));
  function createHearts(count = 20) {
    const icons = ["♥", "♡", "💗", "💕", "🌸", "✨"];
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = icons[Math.floor(Math.random() * icons.length)];
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.fontSize = `${16 + Math.random() * 23}px`;
      heart.style.animationDelay = `${Math.random() * 1.8}s`;
      heart.style.animationDuration = `${4.5 + Math.random() * 2.5}s`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 8000);
    }
  }
  $("#heartRainBtn").addEventListener("click", () => { createHearts(24); showToast("A little shower of hearts for Dr Anshu 💗"); });
  $("#finalHeartsBtn").addEventListener("click", () => { createHearts(32); showToast("Sending good wishes and hearts 💕"); });

  const envelope = $("#envelope");
  const letterCard = $("#letterCard");
  function openLetter() {
    envelope.classList.add("open");
    letterCard.classList.add("open");
    $("#openLetterBtn").textContent = "Letter opened ✓";
    $("#letterFeedback").textContent = "The letter is open. Read it at your own pace. 💌";
  }
  $("#openLetterBtn").addEventListener("click", openLetter);
  $("#readAgainBtn").addEventListener("click", () => {
    openLetter();
    letterCard.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast("Your letter is ready to read again 💌");
  });
  $("#copyLetterBtn").addEventListener("click", async () => {
    const text = `Dear Dr Anshu,\n\nI wanted to make something small but meaningful, simply to share a little warmth with you.\n\nSome feelings do not need grand speeches. Sometimes they live in a sincere wish for your happiness, in hoping your day goes well, and in wanting life to bring you more peaceful moments and reasons to smile.\n\nMay your dreams keep growing, may your hard work bring you success, and may kindness find you wherever you go. I hope you always make time for the things that bring you joy and the people who make you feel appreciated.\n\nThis little website is my way of sending a thoughtful message your way. No pressure and no expectation—just a kind note made especially for you.\n\nKeep smiling, keep shining, and take good care of yourself. You deserve good things and happy moments.\n\nWith care and warm wishes,\nNaveen ♥`;
    try {
      await navigator.clipboard.writeText(text);
      $("#letterFeedback").textContent = "Letter copied to clipboard. 💗";
      showToast("Love letter copied");
    } catch (error) {
      $("#letterFeedback").textContent = "Clipboard access is unavailable in this browser. You can select and copy the letter text manually.";
    }
  });

  function showSurprise(index) {
    const item = surpriseMessages[index];
    if (!item) return;
    $$(".surprise-card").forEach((card, i) => {
      const selected = i === index;
      card.classList.toggle("revealed", selected);
      card.setAttribute("aria-pressed", String(selected));
      $("small", card).textContent = selected ? "Message opened ✓" : "Tap to reveal";
    });
    $("#surpriseMessage").innerHTML = "";
    const icon = document.createElement("span");
    icon.className = "message-display-icon";
    icon.textContent = item.icon;
    const title = document.createElement("h3");
    title.textContent = item.title;
    const message = document.createElement("p");
    message.textContent = item.text;
    $("#surpriseMessage").append(icon, title, message);
    createHearts(5);
  }
  $$(".surprise-card").forEach(button => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => showSurprise(Number(button.dataset.surprise)));
  });
  $("#randomSurpriseBtn").addEventListener("click", () => {
    const index = Math.floor(Math.random() * surpriseMessages.length);
    showSurprise(index);
    showToast(`Your surprise: ${surpriseMessages[index].title}`);
  });
  $("#resetSurprisesBtn").addEventListener("click", () => {
    $$(".surprise-card").forEach(card => {
      card.classList.remove("revealed");
      card.setAttribute("aria-pressed", "false");
      $("small", card).textContent = "Tap to reveal";
    });
    $("#surpriseMessage").innerHTML = '<span class="message-display-icon">💌</span><h3>Your message is waiting</h3><p>Tap any of the ten cards above to reveal a little surprise.</p>';
    showToast("Surprise cards reset");
  });

  $("#photoInput").addEventListener("change", (event) => {
    const files = [...event.target.files].filter(file => file.type.startsWith("image/")).slice(0, 8);
    const grid = $("#memoryGrid");
    grid.innerHTML = "";
    if (!files.length) {
      grid.innerHTML = '<div class="memory-placeholder"><span>🌷</span><p>A happy moment</p></div><div class="memory-placeholder"><span>🌙</span><p>A peaceful evening</p></div><div class="memory-placeholder"><span>☀️</span><p>A bright new day</p></div>';
      return;
    }
    files.forEach((file, index) => {
      const url = URL.createObjectURL(file);
      const wrap = document.createElement("div");
      wrap.className = "photo-wrap";
      const img = document.createElement("img");
      img.className = "memory-photo";
      img.src = url;
      img.alt = `Selected memory photo ${index + 1}`;
      wrap.appendChild(img);
      grid.appendChild(wrap);
    });
    showToast(`${files.length} photo${files.length === 1 ? "" : "s"} added to your memory garden`);
  });
  $("#saveMemoryNote").addEventListener("click", () => {
    const text = $("#memoryNote").value.trim();
    if (!text) {
      $("#memoryFeedback").textContent = "Write a short note first, then press save.";
      return;
    }
    $("#memoryFeedback").textContent = "Your note is displayed here for this visit. It is not uploaded to a server.";
    showToast("Your note is ready in this page 🌷");
  });
  $("#clearMemoryNote").addEventListener("click", () => {
    $("#memoryNote").value = "";
    $("#memoryFeedback").textContent = "Note cleared.";
  });

  $("#finalSurpriseBtn").addEventListener("click", () => {
    const final = $("#finalMessage");
    final.innerHTML = '<span>🎁💖✨</span><p>Surprise, Dr Anshu! May your future be filled with happiness, success, calm moments, and memories that make you smile. Thank you for visiting this little corner of kindness.</p><p><strong>With warm wishes, Naveen ♥</strong></p>';
    final.classList.add("visible");
    createHearts(30);
    $("#finalSurpriseBtn").textContent = "Surprise opened ✓";
  });
  $("#thankYouBtn").addEventListener("click", () => {
    const note = $("#thankYouNote");
    note.textContent = "Thank you for being here, Dr Anshu. This little page was made to send you a sincere smile and a wish for good things ahead. — Naveen 💗";
    note.classList.add("visible");
  });
  $("#backToTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();