export function getColor(color: string) {
    if (color.startsWith("#")) {
        return color;
    }

    const regex = /^[a-zA-Z]+-[0-9]+$/;

    if (!regex.test(color)) {
        return `var(--color-${color}-5)`;
    }

    return `var(--color-${color})`;
}
