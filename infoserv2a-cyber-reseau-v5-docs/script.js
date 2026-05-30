document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("id2app-ready");

  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Votre demande est prête à être transmise à INFOSERV2A.");
    });
  });
});