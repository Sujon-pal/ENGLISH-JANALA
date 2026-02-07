function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((ref) => ref.json())
    .then((data) =>displayCategories(data.data));
}

function displayCategories(categories) {
  const allBtnContainer = document.getElementById("all-btn-container");

  for (let cat of categories) {
    let div = document.createElement('div');
    div.innerHTML = `
    
    <button
          class="btn btn-sm bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white flex items-center gap-2"
        >
          <i class="fa-brands fa-leanpub"></i>
          Lesson-${cat.level_no}
        </button>
    `
    allBtnContainer.append(div)
  }
}

loadCategories();
