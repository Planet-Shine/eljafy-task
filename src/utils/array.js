

const $array = {
    create(length) {
        const result = [];
        for (let i = 0; i < length; i++) {
            result.push(null);
        }
        return result;
    },
    splitByItemLength(array, newLength) {
        array = [...array];
        const result = $array.create(parseInt(array.length / newLength, 10))
            .map(() => array.splice(0, newLength));
        array.length && result.push(array);
        return result;
    }
};

export default $array;