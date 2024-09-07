import chroma from "chroma-js";

export function getTextColor(bgColor: chroma.Color, color: chroma.Color) {
    const luminance = chroma(bgColor).luminance();
    return luminance < 0.5 ? "#FFFFFF" : color;
}
