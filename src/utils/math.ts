export function curve(s: number, r: number, d: number, x: number): number {
    const ratio = r / s;
    const result = Math.floor(
        s * (ratio + (1 - ratio) * Math.exp((1 - x) / d))
    );
    return Math.min(result, s);
}
