export function getColor(color: string) {
    if (color.startsWith("#")) {
        return color;
    }

    const regex = /^[a-zA-Z]+-[0-9]+$/;

    if (!regex.test(color)) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(`--color-${color}-5`)
            .trim();
    }

    return getComputedStyle(document.documentElement)
        .getPropertyValue(`--color-${color}`)
        .trim();
}
