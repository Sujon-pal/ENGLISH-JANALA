let allWords = []; // সমস্ত word save করার জন্য

// Level Buttons
function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((ref) => ref.json())
    .then((data) => displayCategories(data.data))
    .catch((err) => console.error("Level fetch error:", err));
}

// Display Level Buttons
function displayCategories(categories) {
  const allBtnContainer = document.getElementById("all-btn-container");

  for (let cat of categories) {
    let div = document.createElement("div");
    div.innerHTML = `
      <button 
        onClick="loadAllWords(${cat.level_no}, this)"
        class="btn btn-sm bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white flex items-center gap-2"
      >
        <i class="fa-brands fa-leanpub"></i>
        Lesson-${cat.level_no}
      </button>
    `;
    allBtnContainer.append(div);
  }
}

//  Load All Words & Filter by Level
function loadAllWords(level, btn) {
  // hide lesson when click lesson btn
  const lessonMessage = document.getElementById("lesson-message");
  if (lessonMessage) {
    lessonMessage.style.display = "none";
  }

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((ref) => ref.json())
    .then((data) => {
      allWords = data.data; // save all words
      showWordsByLevel(level, btn);
    })
    .catch((err) => console.error("Words fetch error:", err));
}

// Show words filtered by level
function showWordsByLevel(level, btn) {
  const filtered = allWords.filter((word) => word.level === level);

  displayWords(filtered);

  // Active button highlight
  setActive(btn);
}

// Display word cards
function displayWords(words) {
  const container = document.getElementById("words-container");
  container.innerHTML = "";

  if (!words.length) {
    container.innerHTML = `<div 
        class="text-center w-11/12 mx-auto bg-amber-50 lg:mt-8 mt-8 lg:py-15 py-10 rounded-2xl col-span-full"
      >
      <i class="fa-solid fa-triangle-exclamation text-5xl pb-3"></i>
        <p class="text-xs text-gray-600">এই <span class="text-sky-600">Lesson </span>  এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="text-2xl font-semibold mt-2">
           নেক্সট <span class="text-sky-600">Lesson</span>এ যান।
        </h1>
      </div>`;
    return;
  }

  words.forEach((word) => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded-xl border shadow-sm hover:shadow-md";
    div.innerHTML = `
      <h2 class="text-xl font-bold">${word.word}</h2>
      <p class="text-sm text-gray-600">Meaning: ${word.meaning ?? "N/A"}</p>
      <p class="text-sm text-gray-500">Pronunciation: ${word.pronunciation}</p>
    `;
    container.appendChild(div);
  });
}

// Active Button Style
function setActive(btn) {
  document.querySelectorAll("#all-btn-container button").forEach((b) => {
    b.classList.remove("!bg-blue-800", "!text-white");
    b.classList.add("bg-transparent", "text-blue-800");
  });

  btn.classList.add("!bg-blue-800", "!text-white");
  btn.classList.remove("bg-transparent", "text-blue-800");
}

loadCategories();
