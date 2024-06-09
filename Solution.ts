
function isReflected(points: number[][]): boolean {
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

function allPointsAreSymetricInRespectToTheVerticalReflectionAxis(points: number[][]): boolean {
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

function comparator(first: number[], second: number[]): number {
    if (first[0] === second[0] && first[0] < this.verticalReflectionAxis) {
        return second[1] - first[1];
    }
    if (first[0] === second[0] && first[0] >= this.verticalReflectionAxis) {
        return first[1] - second[1];
    }
    return first[0] - second[0];
}

function getVerticalAxis(xFirst: number, xSecond: number): number {
    return (xFirst + xSecond) / 2;
}

function pointsStandAtTheVerticalReflectionAxis(xFirst: number, xSecond: number): boolean {
    return Math.abs(xFirst - this.verticalReflectionAxis) < this.EPSILON
        && Math.abs(xSecond - this.verticalReflectionAxis) < this.EPSILON;
}

function pointsHaveSymetricVerticalCoordinates(yFirst: number, ySecond: number): boolean {
    return yFirst === ySecond;
}

function pointsAreDuplicates(first: number[], second: number[]): boolean {
    return first[0] === second[0] && first[1] === second[1];
}
