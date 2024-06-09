
using System;

public class Solution
{
    private static readonly double EPSILON = 0.00001;
    private double verticalReflectionAxis;

    public bool IsReflected(int[][] points)
    {
        int minX = int.MaxValue;
        int maxX = int.MinValue;
        foreach (int[] point in points)
        {
            minX = Math.Min(minX, point[0]);
            maxX = Math.Max(maxX, point[0]);
        }
        verticalReflectionAxis = GetVerticalAxis(minX, maxX);
        Array.Sort(points, (first, second) => Comparator(first, second));
        return AllPointsAreSymetricInRespectToTheVerticalReflectionAxis(points);
    }

    private bool AllPointsAreSymetricInRespectToTheVerticalReflectionAxis(int[][] points)
    {
        int left = 0;
        int right = points.Length - 1;

        while (left <= right)
        {
            if (((verticalReflectionAxis != GetVerticalAxis(points[left][0], points[right][0])))
               || (!PointsHaveSymetricVerticalCoordinates(points[left][1], points[right][1])
               && !PointsStandAtTheVerticalReflectionAxis(points[left][0], points[right][0])))
            {
                return false;
            }
            ++left;
            --right;

            while (left <= right && PointsAreDuplicates(points[left], points[left - 1]))
            {
                ++left;
            }
            while (left <= right && PointsAreDuplicates(points[right], points[right + 1]))
            {
                --right;
            }
        }
        return true;
    }

    private int Comparator(int[] first, int[] second)
    {
        if (first[0] == second[0] && first[0] < verticalReflectionAxis)
        {
            return second[1] - first[1];
        }
        if (first[0] == second[0] && first[0] >= verticalReflectionAxis)
        {
            return first[1] - second[1];
        }
        return first[0] - second[0];
    }

    private double GetVerticalAxis(int xFirst, int xSecond)
    {
        return ((double)xFirst + xSecond) / 2;
    }

    private bool PointsStandAtTheVerticalReflectionAxis(int xFirst, int xSecond)
    {
        return Math.Abs(xFirst - verticalReflectionAxis) < EPSILON
            && Math.Abs(xSecond - verticalReflectionAxis) < EPSILON;
    }

    private bool PointsHaveSymetricVerticalCoordinates(int yFirst, int ySecond)
    {
        return yFirst == ySecond;
    }

    private bool PointsAreDuplicates(int[] first, int[] second)
    {
        return first[0] == second[0] && first[1] == second[1];
    }
}
