// script/navigation.js
import { scenes } from "./scenesData.js";

let currentIndex = 0;

/**
 * Navigate to a specific scene by index, slide the frame row,
 * update nav buttons, and hide paint cursor if leaving paint scene.
 */
export function goToScene(targetIndex) {
  if (targetIndex < 0 || targetIndex >= scenes.length) return;
  currentIndex = targetIndex;

  // Slide frames
  const frameRow = document.getElementById("frameRow");
  if (frameRow) {
    frameRow.style.transform = `translateX(-${currentIndex * 100}vw)`;
  }

  updateButtons();

  // Hide paint cursor when not on paint scene
  const paintIndex = scenes.findIndex((s) => s.type === "paint");
  const customCursor = document.getElementById("custom-cursor");
  if (customCursor) {
    if (currentIndex !== paintIndex) {
      customCursor.style.display = "none";
      document.body.style.cursor = "default";
    }
  }
}

/**
 * Move forward or back by one frame.
 */
export function scrollFrames(direction) {
  const newIndex = Math.min(
    Math.max(currentIndex + direction, 0),
    scenes.length - 1
  );
  goToScene(newIndex);
}

/**
 * Enable or disable nav arrows based on currentIndex.
 */
export function updateButtons() {
  const leftBtn = document.querySelector(".nav-left");
  const rightBtn = document.querySelector(".nav-right");
  if (leftBtn) leftBtn.disabled = currentIndex === 0;
  if (rightBtn) rightBtn.disabled = currentIndex === scenes.length - 1;
}

// Wire up nav arrow click handlers on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const leftBtn = document.querySelector(".nav-left");
  const rightBtn = document.querySelector(".nav-right");
  if (leftBtn) leftBtn.addEventListener("click", () => scrollFrames(-1));
  if (rightBtn) rightBtn.addEventListener("click", () => scrollFrames(1));
  updateButtons();
});
