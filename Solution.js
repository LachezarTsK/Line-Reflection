
/**
 * @param {number[][]} points
 * @return {boolean}
 */
var isReflected = function (points) {
    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    for (let point of points) {
        minX = Math.min(minX, point[0]);
        maxX = Math.max(maxX, point[0]);
    }
    this.verticalReflectionAxis = getVerticalAxis(minX, maxX);
    this.EPSILON = 0.00001;
    points.sort((first, second) => comparator(first, second));
    return allPointsAreSymetricInRespectToTheVerticalReflectionAxis(points);
};

/**
 * @param {number[][]} points
 * @return {boolean}
 */
function allPointsAreSymetricInRespectToTheVerticalReflectionAxis(points) {
    let left = 0;
    let right = points.length - 1;

    while (left <= right) {
        if (((this.verticalReflectionAxis !== getVerticalAxis(points[left][0], points[right][0])))
            || (!pointsHaveSymetricVerticalCoordinates(points[left][1], points[right][1])
            && !pointsStandAtTheVerticalReflectionAxis(points[left][0], points[right][0]))) {
            return false;
        }
        ++left;
        --right;

        while (left <= right && pointsAreDuplicates(points[left], points[left - 1])) {
            ++left;
        }
        while (left <= right && pointsAreDuplicates(points[right], points[right + 1])) {
            --right;
        }
    }
    return true;
}

/**
 * @param {number[]} first
 * @param {number[]} second
 * @return {number}
 */
function comparator(first, second) {
    if (first[0] === second[0] && first[0] < this.verticalReflectionAxis) {
        return second[1] - first[1];
    }
    if (first[0] === second[0] && first[0] >= this.verticalReflectionAxis) {
        return first[1] - second[1];
    }
    return first[0] - second[0];
}

/**
 * @param {number} xFirst
 * @param {number} xSecond
 * @return {number}
 */
function getVerticalAxis(xFirst, xSecond) {
    return (xFirst + xSecond) / 2;
}

/**
 * @param {number} xFirst
 * @param {number} xSecond
 * @return {boolean}
 */
function pointsStandAtTheVerticalReflectionAxis(xFirst, xSecond) {
    return Math.abs(xFirst - this.verticalReflectionAxis) < this.EPSILON
        && Math.abs(xSecond - this.verticalReflectionAxis) < this.EPSILON;
}

/**
 * @param {number} yFirst
 * @param {number} ySecond
 * @return {boolean}
 */
function pointsHaveSymetricVerticalCoordinates(yFirst, ySecond) {
    return yFirst === ySecond;
}

/**
 * @param {number[]} first
 * @param {number[]} second
 * @return {boolean}
 */
function pointsAreDuplicates(first, second) {
    return first[0] === second[0] && first[1] === second[1];
}
