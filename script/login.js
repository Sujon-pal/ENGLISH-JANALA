const navbar = document.getElementById('navbar')
const vocabulary = document.getElementById("vocabulary");
const faq = document.getElementById("faq");
const banner = document.getElementById("banner");
const footer = document.getElementById('footer')


navbar.classList.add("hidden");
vocabulary.classList.add("hidden");
faq.classList.add("hidden");



document.getElementById("login-btn").addEventListener("click", () => {
  const name = document.getElementById('userName').value.trim();
  const password = document.getElementById('password').value;

  if (!name) {
    alert("Please enter your name");
    return;
  }

  if (password !== "12345") {
    alert("Wrong password ❌");
    return;
  }

  alert(`Welcome ${name} 🎉`);

  // hide banner
  banner.classList.add("hidden");

  // show app
  navbar.classList.remove("hidden");
  vocabulary.classList.remove("hidden");
  faq.classList.remove("hidden");


});

