// script/painting.js
import { scenes } from "./scenesData.js";
import { goToScene } from "./navigation.js";

/**
 * Initialize the paint scene: sets up the paint board, cursor, and UI tools.
 */
export function initializePainting() {
  console.log("▶ initializePainting()");
  const paintSceneIndex = scenes.findIndex((scene) => scene.type === "paint");
  if (paintSceneIndex === -1) return;

  const frameRow = document.getElementById("frameRow");
  const paintContainer = frameRow && frameRow.children[paintSceneIndex];
  if (!paintContainer) {
    console.error("Paint container not found!");
    return;
  }

  const clipWrapper = paintContainer.querySelector(".clip-wrapper");
  if (!clipWrapper) {
    console.error("Clip wrapper not found in paint container!");
    return;
  }

  // Avoid re-initializing if already set up
  if (clipWrapper.querySelector(".paint-board")) return;

  // Create the paint board
  const paintBoard = document.createElement("div");
  paintBoard.className = "paint-board";
  Object.assign(paintBoard.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "3",
    pointerEvents: "auto",
    cursor: "crosshair",
  });
  clipWrapper.appendChild(paintBoard);

  // Setup custom cursor element
  let customCursor = document.getElementById("custom-cursor");
  if (!customCursor) {
    customCursor = document.createElement("div");
    customCursor.id = "custom-cursor";
    Object.assign(customCursor.style, {
      position: "fixed",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "9999",
      border: "2px solid #fff",
      boxShadow: "0 0 3px rgba(0, 0, 0, 0.6)",
      display: "none",
    });
    document.body.appendChild(customCursor);
  }

  // Painting state
  let currentMode = "mosaic";
  let currentColor = "#ff0000";
  let isPainting = false;

  // Stroke functions
  const paintWatercolorStroke = (x, y, color) => {
    const stroke = document.createElement("div");
    stroke.classList.add("watercolor-stroke");
    Object.assign(stroke.style, {
      position: "absolute",
      borderRadius: "50%",
      backgroundColor: color,
      width: "20px",
      height: "20px",
      left: `${x - 10}px`,
      top: `${y - 10}px`,
      opacity: "1",
      transition: "all 2s ease-out",
    });
    paintBoard.appendChild(stroke);
    setTimeout(() => {
      Object.assign(stroke.style, {
        width: "30px",
        height: "30px",
        left: `${x - 15}px`,
        top: `${y - 15}px`,
        opacity: "0.7",
      });
    }, 500);
  };

  const paintAcrylicStroke = (x, y, color) => {
    const stroke = document.createElement("div");
    Object.assign(stroke.style, {
      position: "absolute",
      borderRadius: "50%",
      backgroundColor: color,
      width: "16px",
      height: "16px",
      left: `${x - 8}px`,
      top: `${y - 8}px`,
      opacity: "1",
    });
    paintBoard.appendChild(stroke);
  };

  const paintStroke = (e) => {
    const rect = paintBoard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (currentMode === "watercolor") paintWatercolorStroke(x, y, currentColor);
    else if (currentMode === "acrylic") paintAcrylicStroke(x, y, currentColor);
  };

  // Mosaic placement
  const placeMosaic = (e) => {
    const rect = paintBoard.getBoundingClientRect();
    const x = e.clientX - rect.left - 15;
    const y = e.clientY - rect.top - 15;
    const piece = document.createElement("div");
    Object.assign(piece.style, {
      position: "absolute",
      width: "30px",
      height: "30px",
      border: "1px solid #333",
      borderRadius: "50%",
      backgroundColor: currentColor,
      left: `${x}px`,
      top: `${y}px`,
    });
    paintBoard.appendChild(piece);
  };

  // Board actions
  const resetBoard = () => {
    paintBoard.innerHTML = "";
    customCursor.style.display = "none";
    document.body.style.cursor = "default";
  };

  const saveArt = () => {
    if (typeof html2canvas === "undefined") {
      alert("Lagre-funksjonen (html2canvas) er ikke lastet inn ennå.");
      return;
    }
    ui.style.display = "none";
    html2canvas(paintBoard, { backgroundColor: null })
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = "mitt_kunstverk.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        ui.style.display = "flex";
      })
      .catch((err) => {
        console.error("Feil ved lagring med html2canvas:", err);
        alert("Kunne ikke lagre bildet.");
        ui.style.display = "flex";
      });
  };

  // UI container
  const ui = document.createElement("div");
  Object.assign(ui.style, {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    background: "rgba(200, 200, 200, 0.9)",
    padding: "12px",
    borderRadius: "10px",
    zIndex: "4",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    width: "max-content",
  });
  clipWrapper.appendChild(ui);

  // Color palette
  const colorRow = document.createElement("div");
  Object.assign(colorRow.style, {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  });
  const modeRow = document.createElement("div");
  Object.assign(modeRow.style, {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  });
  const actionRow = document.createElement("div");
  Object.assign(actionRow.style, {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  });

  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#ffffff",
    "#000000",
  ];
  colors.forEach((color) => {
    const circle = document.createElement("div");
    Object.assign(circle.style, {
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      backgroundColor: color,
      border: `1px solid ${color === "#ffffff" ? "#ccc" : "#000"}`,
      cursor: "pointer",
    });
    circle.addEventListener("click", () => {
      currentColor = color;
      if (currentMode !== "mosaic") {
        customCursor.style.backgroundColor = color;
        customCursor.style.display = "block";
        document.body.style.cursor = "none";
      } else {
        customCursor.style.display = "none";
        document.body.style.cursor = "default";
      }
    });
    colorRow.appendChild(circle);
  });

  ["mosaic", "watercolor", "acrylic"].forEach((mode) => {
    const btn = document.createElement("button");
    btn.textContent =
      mode === "mosaic"
        ? "Mosaikk"
        : mode === "watercolor"
        ? "Akvarell"
        : "Akryl";
    Object.assign(btn.style, {
      padding: "4px 8px",
      fontSize: "0.75rem",
      borderRadius: "6px",
      cursor: "pointer",
    });
    btn.addEventListener("click", () => {
      currentMode = mode;
      if (mode === "mosaic") {
        customCursor.style.display = "none";
        document.body.style.cursor = "default";
        paintBoard.style.cursor = "crosshair";
      } else {
        customCursor.style.backgroundColor = currentColor;
        customCursor.style.display = "block";
        document.body.style.cursor = "none";
        paintBoard.style.cursor = "none";
      }
    });
    modeRow.appendChild(btn);
  });

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Lagre";
  Object.assign(saveBtn.style, {
    padding: "4px 8px",
    fontSize: "0.75rem",
    borderRadius: "6px",
    backgroundColor: "#fff",
    cursor: "pointer",
  });
  saveBtn.addEventListener("click", saveArt);
  actionRow.appendChild(saveBtn);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  Object.assign(resetBtn.style, {
    padding: "4px 8px",
    fontSize: "0.75rem",
    borderRadius: "6px",
    backgroundColor: "#fff",
    cursor: "pointer",
  });
  resetBtn.addEventListener("click", resetBoard);
  actionRow.appendChild(resetBtn);

  ui.appendChild(colorRow);
  ui.appendChild(modeRow);
  ui.appendChild(actionRow);

  // Painting event listeners
  paintBoard.addEventListener("pointerdown", (e) => {
    if (currentMode === "mosaic") placeMosaic(e);
    else {
      isPainting = true;
      paintStroke(e);
    }
  });
  paintBoard.addEventListener("pointermove", (e) => {
    if (isPainting) paintStroke(e);
  });
  ["pointerup", "pointerleave"].forEach((ev) =>
    paintBoard.addEventListener(ev, () => {
      isPainting = false;
    })
  );
  document.addEventListener("mousemove", (e) => {
    if (customCursor.style.display === "block") {
      customCursor.style.left = e.clientX + "px";
      customCursor.style.top = e.clientY + "px";
    }
  });

  // Load html2canvas for saving
  if (!document.querySelector('script[src*="html2canvas"]')) {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
    script.onerror = () => console.error("Kunne ikke laste html2canvas.");
    script.onload = () => console.log("html2canvas lastet.");
    document.body.appendChild(script);
  } else {
    console.log("html2canvas allerede lastet.");
  }
}
