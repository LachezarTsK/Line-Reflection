
import kotlin.math.abs
import kotlin.math.min
import kotlin.math.max

class Solution {

    private companion object {
        const val EPSILON = 0.00001
    }

    private var verticalReflectionAxis: Double = 0.0

    fun isReflected(points: Array<IntArray>): Boolean {
        var minX = Int.MAX_VALUE
        var maxX = Int.MIN_VALUE
        for (point in points) {
            minX = min(minX, point[0])
            maxX = max(maxX, point[0])
        }
        verticalReflectionAxis = getVerticalAxis(minX, maxX)
        points.sortWith { first, second -> comparator(first, second) }
        return allPointsAreSymetricInRespectToTheVerticalReflectionAxis(points)
    }

    private fun allPointsAreSymetricInRespectToTheVerticalReflectionAxis(points: Array<IntArray>): Boolean {
        var left = 0
        var right = points.size - 1

        while (left <= right) {
            if (((verticalReflectionAxis != getVerticalAxis(points[left][0], points[right][0])))
                || (!pointsHaveSymetricVerticalCoordinates(points[left][1], points[right][1])
                        && !pointsStandAtTheVerticalReflectionAxis(points[left][0], points[right][0]))) {
                return false
            }
            ++left
            --right

            while (left <= right && pointsAreDuplicates(points[left], points[left - 1])) {
                ++left
            }
            while (left <= right && pointsAreDuplicates(points[right], points[right + 1])) {
                --right
            }
        }
        return true
    }

    private fun comparator(first: IntArray, second: IntArray): Int {
        if (first[0] == second[0] && first[0] < verticalReflectionAxis) {
            return second[1] - first[1]
        }
        if (first[0] == second[0] && first[0] >= verticalReflectionAxis) {
            return first[1] - second[1]
        }
        return first[0] - second[0]
    }

    private fun getVerticalAxis(xFirst: Int, xSecond: Int): Double {
        return (xFirst.toDouble() + xSecond) / 2
    }

    private fun pointsStandAtTheVerticalReflectionAxis(xFirst: Int, xSecond: Int): Boolean {
        return abs(xFirst - verticalReflectionAxis) < EPSILON
                && abs(xSecond - verticalReflectionAxis) < EPSILON
    }

    private fun pointsHaveSymetricVerticalCoordinates(yFirst: Int, ySecond: Int): Boolean {
        return yFirst == ySecond
    }

    private fun pointsAreDuplicates(first: IntArray, second: IntArray): Boolean {
        return first[0] == second[0] && first[1] == second[1]
    }
}
