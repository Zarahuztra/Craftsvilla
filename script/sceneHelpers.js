// script/sceneHelpers.js
// Helper functions to render different scene types
import { goToScene } from "./navigation.js";

// 1) Intro scene content
export function addIntro(frameWrapper) {
  const heading = document.createElement("h1");
  heading.textContent = "Velkommen til Craftsvilla";
  Object.assign(heading.style, {
    position: "absolute",
    top: "100px",
    left: "42%",
    fontFamily: "Metamorphous, sans-serif",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "2.5rem",
    zIndex: "3",
    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
  });
  frameWrapper.appendChild(heading);

  const paragraph = document.createElement("p");
  paragraph.textContent =
    "Slipp kreativiteten løs i landlige omgivelser rett utenfor Oslo";
  Object.assign(paragraph.style, {
    position: "absolute",
    top: "160px",
    left: "42%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "1.3rem",
    zIndex: "3",
    textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
  });
  frameWrapper.appendChild(paragraph);

  // Buttons
  const btnApply = document.createElement("button");
  btnApply.className = "frame-button";
  btnApply.textContent = "Meld deg på";
  btnApply.onclick = () => goToScene(2);
  frameWrapper.appendChild(btnApply);

  const btnLearnMore = document.createElement("button");
  btnLearnMore.className = "frame-button";
  btnLearnMore.textContent = "Finn ut mer";
  btnLearnMore.style.left = "calc(50% + 150px)";
  btnLearnMore.onclick = () => goToScene(1);
  frameWrapper.appendChild(btnLearnMore);
}

// 2) TextInfo scene content
// script/sceneHelpers.js

export function addTextInfo(frameWrapper, scene, idx) {
  // 1) Build the text container
  const container = document.createElement("div");
  container.className = "scene-text-container";

  const heading = document.createElement("h3");
  heading.textContent = scene.title;
  container.appendChild(heading);

  // Ensure you have all three paragraphs in your scenesData.js
  if (scene.text && Array.isArray(scene.text)) {
    scene.text.forEach((pText) => {
      const p = document.createElement("p");
      p.textContent = pText;
      container.appendChild(p);
    });
  }

  // Append the text container first
  frameWrapper.appendChild(container);

  // 2) Then, if this is scene index 1, add the two buttons
  if (idx === 1) {
    const btnContainer = document.createElement("div");
    btnContainer.className = "scene2-button-container";

    const btn1 = document.createElement("button");
    btn1.className = "frame-button";
    btn1.textContent = "Meld deg på";
    btn1.onclick = () => goToScene(2);

    const btn2 = document.createElement("button");
    btn2.className = "frame-button";
    btn2.textContent = "Finn oss her";
    btn2.onclick = () => goToScene(4);

    btnContainer.appendChild(btn1);
    btnContainer.appendChild(btn2);

    // Now append the buttons *after* the text container
    frameWrapper.appendChild(btnContainer);
  }
}

// 3) Cards scene content
export function addCards(frameWrapper) {
  // Top row of course cards
  const cardRowTop = document.createElement("div");
  Object.assign(cardRowTop.style, {
    position: "absolute",
    top: "140px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "40px",
    zIndex: "3",
  });

  for (let j = 1; j <= 3; j++) {
    const card = document.createElement("div");
    Object.assign(card.style, {
      width: "220px",
      height: "300px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "-6px 8px 10px rgba(0,0,0,0.7)",
      overflow: "hidden",
    });
    const img = document.createElement("img");
    img.src = `images/card${j}.jpg`;
    img.alt = `Kursbilde ${j}`;
    Object.assign(img.style, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    });
    card.appendChild(img);
    cardRowTop.appendChild(card);
  }

  // Bottom row of info cards
  const cardRowBottom = document.createElement("div");
  Object.assign(cardRowBottom.style, {
    position: "absolute",
    top: "470px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "40px",
    zIndex: "3",
  });

  const productData = [
    {
      title: "Mosaikk - 400 kr",
      desc: "Inkluderer: Ramme, A4 treplate, fargede steiner, gummi.",
    },
    {
      title: "Akvarell - 200 kr",
      desc: "Inkluderer: Ramme, akvarellpapir med designmal, akvarellfarger, pensler.",
    },
    {
      title: "Akryl - 300 kr",
      desc: "Inkluderer: Ramme, akrylpapir m/ mal, farger, pensler.",
    },
  ];

  productData.forEach((prod, j) => {
    const infoCard = document.createElement("div");
    Object.assign(infoCard.style, {
      width: "200px",
      height: "120px",
      padding: "10px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "-6px 8px 10px rgba(0,0,0,0.7)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    });
    const title = document.createElement("h3");
    title.textContent = prod.title;
    Object.assign(title.style, {
      margin: "0 0 4px 0",
      fontSize: "0.95rem",
    });
    const paragraph = document.createElement("p");
    paragraph.textContent = prod.desc;
    Object.assign(paragraph.style, {
      margin: "0 0 6px 0",
      fontSize: "0.75rem",
    });
    const btnContainer = document.createElement("div");
    Object.assign(btnContainer.style, {
      display: "flex",
      justifyContent: "center",
      gap: "6px",
    });
    const dateBtn = document.createElement("button");
    dateBtn.textContent = "28. juni";
    Object.assign(dateBtn.style, {
      borderRadius: "8px",
      fontSize: "0.7rem",
    });
    dateBtn.onclick = () =>
      alert(`Sjekker dato for ${prod.title.split(" -")[0]}`);
    const infoBtn = document.createElement("button");
    infoBtn.textContent = "13. juli";
    Object.assign(infoBtn.style, {
      borderRadius: "8px",
      fontSize: "0.7rem",
    });
    infoBtn.onclick = () => alert(`Mer info om ${prod.title.split(" -")[0]}`);
    btnContainer.appendChild(dateBtn);
    btnContainer.appendChild(infoBtn);
    infoCard.appendChild(title);
    infoCard.appendChild(paragraph);
    infoCard.appendChild(btnContainer);
    cardRowBottom.appendChild(infoCard);
  });

  frameWrapper.appendChild(cardRowTop);
  frameWrapper.appendChild(cardRowBottom);
}

// 4) KidCards scene content
export function addKidCards(frameWrapper) {
  const kids = [
    { name: "Marius", age: 6 },
    { name: "Ingrid", age: 8 },
    { name: "Lars", age: 10 },
    { name: "Sofie", age: 7 },
    { name: "Emil", age: 12 },
    { name: "Nora", age: 9 },
    { name: "Anna", age: 5 },
    { name: "Kasper", age: 11 },
    { name: "Maja", age: 4 },
  ];

  const grid = document.createElement("div");
  grid.className = "card-grid";

  kids.forEach((kid, idx) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = `images/img${idx + 1}.jpg`;
    img.alt = `${kid.name}, ${kid.age} år`;

    const overlay = document.createElement("div");
    overlay.className = "card-overlay";
    overlay.textContent = `${kid.name}, ${kid.age} år`;

    card.appendChild(img);
    card.appendChild(overlay);
    grid.appendChild(card);
  });

  frameWrapper.appendChild(grid);
}

// 5) Velgdato scene content

export function addVelgdato(frameWrapper) {
  const cards = [
    { title: "Alternativ 1", desc: "Beskrivelse 1", url: "#" },
    { title: "Alternativ 2", desc: "Beskrivelse 2", url: "#" },
    { title: "Alternativ 3", desc: "Beskrivelse 3", url: "#" },
    { title: "Alternativ 4", desc: "Beskrivelse 4", url: "#" },
    { title: "Alternativ 5", desc: "Beskrivelse 5", url: "#" },
    { title: "Alternativ 6", desc: "Beskrivelse 6", url: "#" },
  ];

  const row1 = document.createElement("div");
  const row2 = document.createElement("div");
  row1.className = row2.className = "velgdato-row";

  cards.forEach((c, i) => {
    const a = document.createElement("a");
    a.href = c.url;
    a.className = "velgdato-card";
    a.innerHTML = `
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <span class="velgdato-select-text">Velg</span>
    `;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Valgt:", c.title);
      // evt. naviger her
    });
    i < 3 ? row1.appendChild(a) : row2.appendChild(a);
  });

  frameWrapper.append(row1, row2);
}
