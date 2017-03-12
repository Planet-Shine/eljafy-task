
const whiteMaxLightness = 3 * 0xff;
const rgbaRegExp = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

function getTwoHexChars(input) {
    return (+input + 0xf00).toString(16).slice(-2);
}

const $color = {
    getRGBColor(color) {
        var rgbaMatches;
        if (/^#[0-9a-f]{3}$/.test(color)) {
            color = color.slice(1);
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
        } else if (/^#[0-9a-f]{6}$/.test(color)) {
            color = color.slice(1);
        } else if (rgbaMatches = color.match(rgbaRegExp)) {
            color = getTwoHexChars(rgbaMatches[1])
                + getTwoHexChars(rgbaMatches[2])
                + getTwoHexChars(rgbaMatches[3]);
        }
        return [
            parseInt(color.slice(0,2), 16),
            parseInt(color.slice(2, -2), 16),
            parseInt(color.slice(-2), 16)
        ];
    },
    isItDark(color) {
        color = $color.getRGBColor(color);
        const lightness = color.reduce(function (result, item) {
            return result + item;
        });
        return (whiteMaxLightness / 2) > lightness;
    }
};

export default $color;