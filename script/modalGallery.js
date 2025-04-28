// modalGallery.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".card img"));
  const modalBg = document.querySelector(".modal-backdrop");
  const modalImg = modalBg.querySelector("img");
  const prevArrow = modalBg.querySelector(".modal-arrow.prev");
  const nextArrow = modalBg.querySelector(".modal-arrow.next");
  const closeBtn = modalBg.querySelector(".modal-close");
  const images = cards.map((c) => c.src);
  let idx = 0;

  cards.forEach((img, i) =>
    img.addEventListener("click", () => {
      idx = i;
      modalImg.src = images[i];
      modalBg.classList.add("open");
    })
  );
  prevArrow.addEventListener("click", () => {
    idx = (idx - 1 + images.length) % images.length;
    modalImg.src = images[idx];
  });
  nextArrow.addEventListener("click", () => {
    idx = (idx + 1) % images.length;
    modalImg.src = images[idx];
  });
  closeBtn.addEventListener("click", () => modalBg.classList.remove("open"));
  modalBg.addEventListener("click", (e) => {
    if (e.target === modalBg) modalBg.classList.remove("open");
  });
});
