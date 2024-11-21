let phoneNumbers = [
  "+998 90 123 45 67",
  "+998 91 234 56 78",
  "+998 93 345 67 89",
  "+998 90 123 45 67",
  "+998 91 234 56 78",
  "+998 93 345 67 89",
  "+998 90 123 45 67",
  "+998 91 234 56 78",
  "+998 93 345 67 89",
  "+998 99 876 54 32",
  "+998 97 765 43 21",
  "+998 95 654 32 10",
  "+998 93 543 21 09",
  "+998 91 432 10 98",
  "+998 90 321 09 87",
  "+998 99 210 98 76",
  "+998 97 109 87 65",
  "+998 95 098 76 54",
];

// Elementlarni olish
const displayNumber = document.getElementById("display-number");
const randomBtn = document.getElementById("random-btn");
const addBtn = document.getElementById("add-btn");
const viewListBtn = document.getElementById("view-list-btn");

const addModal = document.getElementById("add-modal");
const listModal = document.getElementById("list-modal");

const cancelAddBtn = document.getElementById("cancel-add-btn");
const submitAddBtn = document.getElementById("submit-add-btn");
const closeListBtn = document.getElementById("close-list-btn");

const newNumberInput = document.getElementById("new-number");
const numberList = document.getElementById("number-list");

// Dark/Light Mode toggle
const themeToggleBtn = document.getElementById("theme-toggle-btn");

// Random raqam chiqarish
function randomNum() {
  randomBtn.setAttribute("disabled", true);
  const interval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * phoneNumbers.length);
    displayNumber.textContent = phoneNumbers[randomNumber];
  }, 100);
  setTimeout(() => {
    clearInterval(interval);
    randomBtn.removeAttribute("disabled");
    phoneNumbers.splice(phoneNumbers.indexOf(displayNumber.textContent), 1);
  }, 3000);
}
randomBtn.addEventListener("click", randomNum);

// Modalni ochish (yangi raqam qo‘shish uchun)
addBtn.addEventListener("click", () => {
  addModal.classList.remove("hidden");
});

// Modalni yopish (Bekor qilish tugmasi orqali)
cancelAddBtn.addEventListener("click", () => {
  addModal.classList.add("hidden");
  newNumberInput.value = "";
});

// Yangi raqam qo'shish
submitAddBtn.addEventListener("click", () => {
  const newNumber = newNumberInput.value.trim();
  if (newNumber && /^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(newNumber)) {
    phoneNumbers.push(newNumber);
    alert("Raqam muvaffaqiyatli qo'shildi!");
    newNumberInput.value = "";
    addModal.classList.add("hidden");
  } else {
    alert("Raqam formati noto'g'ri! (+998 xx xxx xx xx)");
  }
});

// Raqamlar ro'yxatini ko'rsatish
viewListBtn.addEventListener("click", () => {
  numberList.innerHTML = ""; // Eski ro'yxatni tozalash
  phoneNumbers.forEach((number) => {
    const li = document.createElement("li");
    li.textContent = number;
    numberList.appendChild(li);
  });
  listModal.classList.remove("hidden");
});

// Raqamlar ro'yxati modalini yopish
closeListBtn.addEventListener("click", () => {
  listModal.classList.add("hidden");
});

// Escape tugmasi modalni yopadi
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    addModal.classList.add("hidden");
    listModal.classList.add("hidden");
    newNumberInput.value = "";
  }
});

// Dark/Light Mode switch
themeToggleBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.replace("dark-mode", "light-mode");
    themeToggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light-mode");
  } else {
    document.body.classList.replace("light-mode", "dark-mode");
    themeToggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark-mode");
  }
});

// Tema o'rnatish (localStorage orqali)
const savedTheme = localStorage.getItem("theme") || "dark-mode";
document.body.classList.add(savedTheme);
themeToggleBtn.textContent = savedTheme === "dark-mode" ? "☀️" : "🌙";
