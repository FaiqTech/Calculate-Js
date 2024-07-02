// Google Analytics kodu üçün
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-70447982-5");

// Toggling üçün "checkbox" və konteyneri tapırıq
const toggleMode = document.getElementById("toggle-mode");
const container = document.querySelector(".container");

// Toggling event-i dinləyici əlavə edirik
toggleMode.addEventListener("change", function () {
  container.classList.toggle("dark-mode");
});

// Klaviatura düyməsi basıldığında işləyəcək funksiya əlavə edirik
document.addEventListener("keydown", function (event) {
  handleKeyPress(event.key);
});

// Bu funksiya klaviatura düymələrinin basılmasını idarə edir
function handleKeyPress(key) {
  // "Enter" düyməsi basıldığında "=" düyməsini basırıq
  if (key === "Enter") {
    handleButtonPress("=");
  }
  // "Delete" və ya "Backspace" düyməsi basıldığında "CE" düyməsini basırıq
  if (key === "Delete" || key === "Backspace") {
    handleButtonPress("CE");
  }
  // Rəqəm düyməsi basıldığında müvafiq rəqəm düyməsini basırıq
  if (/[0-9]/.test(key)) {
    handleButtonPress(key);
  }
  // Operator düyməsi basıldığında (+, -, *, /, %), müvafiq operator düyməsini basırıq
  if (/[\+\-\*\/%]/.test(key)) {
    handleButtonPress(key);
  }
}

// Bu funksiya verilən dəyər üçün kalkulyator düyməsini basmağı simulyasiya edir
function handleButtonPress(value) {
  // Verilən dəyərə əsasən müvafiq düymə elementini tapırıq
  const button = document.querySelector(`button[value="${value}"]`);
  if (button) {
    button.click();
  }
}

// "C" düyməsi üçün hamısını təmizləyən funksiya
function clearAll() {
  document.getElementById("answer").value = "";
}

// "CE" düyməsi üçün son girişi silən funksiya
function deleteLastEntry() {
  const answer = document.getElementById("answer");
  answer.value = answer.value.slice(0, -1);
}

// Düymələrə funksionallıq əlavə edirik
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function () {
    const value = this.innerText;
    const answer = document.getElementById("answer");

    if (value === "C") {
      clearAll();
    } else if (value === "CE") {
      deleteLastEntry();
    } else if (value === "=") {
      try {
        // Hesablama aparmaq üçün eval funksiyasından istifadə edirik
        answer.value = eval(answer.value.replace("X", "*"));
      } catch {
        answer.value = "Error"; // Xəta baş verərsə, "Error" yazdırırıq
      }
    } else {
      // Digər hallarda, düymənin dəyərini ekranın sonuna əlavə edirik
      answer.value += value;
    }
  });
});
