function createMaskFromCutouts() {
    const overlay = document.querySelector(".overlay");
    const cutouts = document.querySelectorAll(".cutout");
  
    const svgNS = "http://www.w3.org/2000/svg";
    const maskId = "text-mask";
  
    const existing = document.querySelector("svg#dynamic-mask");
    if (existing) existing.remove();
  
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("id", "dynamic-mask");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.zIndex = "2";
    svg.style.pointerEvents = "none";
  
    const mask = document.createElementNS(svgNS, "mask");
    mask.setAttribute("id", maskId);
  
    const base = document.createElementNS(svgNS, "rect");
    base.setAttribute("width", "100%");
    base.setAttribute("height", "100%");
    base.setAttribute("fill", "white");
    mask.appendChild(base);
  
    const padding = -1;
  
    cutouts.forEach((el) => {
      const bbox = el.getBoundingClientRect();
  
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", bbox.left - padding);
      rect.setAttribute("y", bbox.top - padding);
      rect.setAttribute("width", bbox.width + padding);
      rect.setAttribute("height", bbox.height + padding);
      rect.setAttribute("fill", "black");
      mask.appendChild(rect);
    });
  
    svg.appendChild(mask);
    document.body.appendChild(svg);
  
    const maskUrl = `url(#${maskId})`;
    overlay.style.maskImage = maskUrl;
    overlay.style.webkitMaskImage = maskUrl;
  }
  
  window.addEventListener("DOMContentLoaded", createMaskFromCutouts);
  window.addEventListener("resize", () => {
    setTimeout(createMaskFromCutouts, 100);
  });
  