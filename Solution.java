
import java.util.Arrays;

public class Solution {

    private static final double EPSILON = 0.00001;
    private double verticalReflectionAxis;

    public boolean isReflected(int[][] points) {
        int minX = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;
        for (int[] point : points) {
            minX = Math.min(minX, point[0]);
            maxX = Math.max(maxX, point[0]);
        }
        verticalReflectionAxis = getVerticalAxis(minX, maxX);
        Arrays.sort(points, (first, second) -> comparator(first, second));
        return allPointsAreSymetricInRespectToTheVerticalReflectionAxis(points);
    }

    private boolean allPointsAreSymetricInRespectToTheVerticalReflectionAxis(int[][] points) {
        int left = 0;
        int right = points.length - 1;

        while (left <= right) {
            if (((verticalReflectionAxis != getVerticalAxis(points[left][0], points[right][0])))
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

    private int comparator(int[] first, int[] second) {
        if (first[0] == second[0] && first[0] < verticalReflectionAxis) {
            return second[1] - first[1];
        }
        if (first[0] == second[0] && first[0] >= verticalReflectionAxis) {
            return first[1] - second[1];
        }
        return first[0] - second[0];
    }

    private double getVerticalAxis(int xFirst, int xSecond) {
        return ((double) xFirst + xSecond) / 2;
    }

    private boolean pointsStandAtTheVerticalReflectionAxis(int xFirst, int xSecond) {
        return Math.abs(xFirst - verticalReflectionAxis) < EPSILON
                && Math.abs(xSecond - verticalReflectionAxis) < EPSILON;
    }

    private boolean pointsHaveSymetricVerticalCoordinates(int yFirst, int ySecond) {
        return yFirst == ySecond;
    }

    private boolean pointsAreDuplicates(int[] first, int[] second) {
        return first[0] == second[0] && first[1] == second[1];
    }
}
