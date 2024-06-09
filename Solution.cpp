
#include <span>
#include <cmath>
#include <vector>
#include <limits>
#include <ranges>
using namespace std;

class Solution {

    inline static const double EPSILON = 0.00001;
    double verticalReflectionAxis = 0;

public:
    bool isReflected(vector<vector<int>>& points) {
        int minX = numeric_limits<int>::max();
        int maxX = numeric_limits<int>::min();
        for (const auto& point : points) {
            minX = min(minX, point[0]);
            maxX = max(maxX, point[0]);
        }

        auto comparator = [this](span<const int> first, span<const int> second) {
            if (first[0] == second[0] && first[0] < verticalReflectionAxis) {
                    return second[1] < first[1];
            }
            if (first[0] == second[0] && first[0] >= verticalReflectionAxis) {
                    return first[1] < second[1];
            }
            return first[0] < second[0];
        };

        verticalReflectionAxis = getVerticalAxis(minX, maxX);
        ranges::sort(points, comparator);
        return allPointsAreSymetricInRespectToTheVerticalReflectionAxis(points);
    }

private:
    bool allPointsAreSymetricInRespectToTheVerticalReflectionAxis(span<const vector<int>> points) const {
        int left = 0;
        int right = points.size() - 1;

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

    double getVerticalAxis(int xFirst, int xSecond) const {
        return (static_cast<double>(xFirst) + xSecond) / 2;
    }

    bool pointsStandAtTheVerticalReflectionAxis(int xFirst, int xSecond)  const {
        return abs(xFirst - verticalReflectionAxis) < EPSILON
	    && abs(xSecond - verticalReflectionAxis) < EPSILON;
    }

    bool pointsHaveSymetricVerticalCoordinates(int yFirst, int ySecond) const {
        return yFirst == ySecond;
    }

    bool pointsAreDuplicates(span<const int> first, span<const int> second) const {
        return first[0] == second[0] && first[1] == second[1];
    }
};
