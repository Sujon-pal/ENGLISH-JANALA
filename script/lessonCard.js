function loadLessonCard(levelNo) {
  const lessonMessage = document.getElementById("lesson-message");
  const wordsContainer = document.getElementById("words-container");

  
  lessonMessage.innerHTML = "";
  wordsContainer.innerHTML = "";

  
  lessonMessage.classList.add("hidden");

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data => {
      const filterCard = data.data.filter(card => card.level === levelNo);

      // যদি কোনো word না থাকে → empty message show
      if (!filterCard.length) {
        lessonMessage.classList.remove("hidden");
        lessonMessage.innerHTML = `
          <div 
            class="text-center w-11/12 mx-auto bg-amber-50 mt-8 py-10 rounded-2xl col-span-full"
          >
            <i class="fa-solid fa-triangle-exclamation text-5xl pb-3"></i>
            <p class="text-xs text-gray-600">
              এই <span class="text-sky-600">Lesson</span> এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h1 class="text-2xl font-semibold mt-2">
              নেক্সট <span class="text-sky-600">Lesson</span> এ যান।
            </h1>
          </div>
        `;
        return;
      }

      // Words show
      filterCard.forEach(card => {
        const div = document.createElement("div");
        div.className = "p-4 border rounded-lg shadow-sm mb-3 bg-slate-50";

        div.innerHTML = `
          <h2 class="text-xl font-bold">${card.word}</h2>
          <p class="text-sm text-gray-600">Meaning: ${card.meaning ?? "N/A"}</p>
          <p class="text-sm text-gray-500">Pronunciation: ${card.pronunciation ?? "N/A"}</p>
        `;
        wordsContainer.appendChild(div);
      });
    });
}
