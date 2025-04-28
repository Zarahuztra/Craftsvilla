// sceneRenderer.js
import { scenes, fallbackImage } from "./scenesData.js";
import { initializePainting } from "./painting.js"; // ← make sure this matches exactly
import {
  addIntro,
  addTextInfo,
  addCards,
  addKidCards,
  addVelgdato,
} from "./sceneHelpers.js";
let currentIndex = 0;
const frameRow = document.getElementById("frameRow");

export function renderScenes() {
  frameRow.innerHTML = "";
  scenes.forEach((scene, i) => {
    console.log(`Rendering scene ${i} – type="${scene.type}"`); // ← add this
    const container = document.createElement("div");
    container.className = "frame-container";

    // split images
    ["left", "right"].forEach((side) => {
      const split = document.createElement("img");
      split.src = "images/img5.jpg";
      Object.assign(split.style, {
        position: "absolute",
        [side]: "0",
        top: "55%",
        transform: "translateY(-50%)",
        width: "250px",
        height: "560px",
        objectFit: "cover",
        objectPosition: side === "left" ? "right" : "left",
        zIndex: "0",
        filter: "drop-shadow(-6px 8px 12px rgba(0,0,0,0.5))",
      });
      container.appendChild(split);
    });

    // frame wrapper
    const frameWrapper = document.createElement("div");
    frameWrapper.className = "frame-wrapper-inner";

    // clip wrapper
    const clipWrapper = document.createElement("div");
    clipWrapper.className = "clip-wrapper";

    // map vs image
    if (scene.type === "map") {
      const mapFrame = document.createElement("iframe");
      Object.assign(mapFrame, {
        src: scene.mapSrc,
        width: "875",
        height: "550",
        style:
          "border:0; position:absolute; width:95%; height:95%; top:2.5%; left:2.5%;",
      });
      clipWrapper.appendChild(mapFrame);
    } else {
      const img = document.createElement("img");
      img.src = scene.mainImage || fallbackImage;
      img.alt = scene.title || `Bilde ${i + 1}`;
      clipWrapper.appendChild(img);
    }

    frameWrapper.appendChild(clipWrapper);

    // overlay
    const overlay = document.createElement("img");
    Object.assign(overlay, {
      src: "images/frame3.png",
      className: "frame-overlay",
      alt: "Dekorativ ramme",
    });
    frameWrapper.appendChild(overlay);

    // dynamic content
    switch (scene.type) {
      case "intro":
        addIntro(frameWrapper);
        break;
      case "textInfo":
        addTextInfo(frameWrapper, scene, i);
        break;
      case "cards":
        addCards(frameWrapper);
        break;
      case "kidCards":
        addKidCards(frameWrapper);
        break;
      case "velgdato": // ← din nye type
        addVelgdato(frameWrapper);
        break;
      // paint handled by painting.js
    }

    container.appendChild(frameWrapper);
    frameRow.appendChild(container);
  });
}

// you’d define addIntro, addTextInfo, addCards, addKidCards
// exactly as in your original loop, just factored out into functions.

document.addEventListener("DOMContentLoaded", () => {
  renderScenes();
  initializePainting();
});
