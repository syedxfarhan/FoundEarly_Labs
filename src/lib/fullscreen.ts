/**
 * Fullscreen helpers (docs/16 §2). PresentationProvider owns state;
 * these utilities are usable outside React if needed.
 */

export async function enterFullscreen(
  element: Element = document.documentElement,
): Promise<void> {
  if (!document.fullscreenElement) {
    await element.requestFullscreen();
  }
}

export async function exitFullscreen(): Promise<void> {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  }
}

export async function toggleFullscreen(
  element: Element = document.documentElement,
): Promise<boolean> {
  if (document.fullscreenElement) {
    await exitFullscreen();
    return false;
  }
  await enterFullscreen(element);
  return true;
}

export function isFullscreen(): boolean {
  return Boolean(document.fullscreenElement);
}
