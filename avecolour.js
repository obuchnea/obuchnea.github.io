function getAverageColor(imgEl) {
  return new Promise((resolve) => {
    const size = 24; // small sample size = fast + still representative
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const compute = () => {
      try {
        ctx.drawImage(imgEl, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);
        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 10) continue; // skip near-transparent pixels
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }

        if (count === 0) return resolve(null);
        resolve(`rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`);
      } catch (err) {
        console.warn('Could not read pixels for', imgEl.src, err);
        resolve(null); // falls back to the CSS default (white)
      }
    };

    if (imgEl.complete && imgEl.naturalWidth !== 0) {
      compute();
    } else {
      imgEl.addEventListener('load', compute, { once: true });
      imgEl.addEventListener('error', () => resolve(null), { once: true });
    }
  });
}

async function applyAverageShadowColors() {
  const items = document.querySelectorAll('.gallery-item');
  for (const item of items) {
    const img = item.querySelector('img');
    if (!img) continue;
    const color = await getAverageColor(img);
    if (color) item.style.setProperty('--avg-color', color);
  }
}

document.addEventListener('DOMContentLoaded', applyAverageShadowColors);