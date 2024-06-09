
package main

import (
	"fmt"
	"math"
	"sort"
)

var EPSILON float64 = 0.00001
var verticalReflectionAxis float64

func isReflected(points [][]int) bool {
	var minX = math.MaxInt
	var maxX = math.MinInt
	for _, point := range points {
		minX = min(minX, point[0])
		maxX = max(maxX, point[0])
	}
	verticalReflectionAxis = getVerticalAxis(minX, maxX)
	sort.Sort(ComparatorPoints(points))

	/*
			Alternatively, sortng without ComparatorPoints:

			sort.Slice(points, func(first int, second int) bool {
		 	if points[first][0] == points[second][0] && float64(points[first][0]) < verticalReflectionAxis {
		 		return points[second][1] < points[first][1]
		 	}
		 	if points[first][0] == points[second][0] && float64(points[first][0]) >= verticalReflectionAxis {
		 		return points[first][1] < points[second][1]
		 	}
		 	return points[first][0] < points[second][0]
		    })
	*/
	return allPointsAreSymetricInRespectToTheVerticalReflectionAxis(points)
}

func allPointsAreSymetricInRespectToTheVerticalReflectionAxis(points [][]int) bool {
	left := 0
	right := len(points) - 1

	for left <= right {
		if (verticalReflectionAxis != getVerticalAxis(points[left][0], points[right][0])) ||
		   (!pointsHaveSymetricVerticalCoordinates(points[left][1], points[right][1]) &&
		    !pointsStandAtTheVerticalReflectionAxis(points[left][0], points[right][0])) {
		   return false
		}
		left++
		right--

		for left <= right && pointsAreDuplicates(points[left], points[left-1]) {
			left++
		}
		for left <= right && pointsAreDuplicates(points[right], points[right+1]) {
			right--
		}
	}
	return true
}

type ComparatorPoints [][]int

func (c ComparatorPoints) Len() int {
	return len(c)
}

func (c ComparatorPoints) Swap(first, second int) {
	c[first], c[second] = c[second], c[first]
}

func (c ComparatorPoints) Less(first, second int) bool {
	if c[first][0] == c[second][0] && float64(c[first][0]) < verticalReflectionAxis {
		return c[second][1] < c[first][1]
	}
	if c[first][0] == c[second][0] && float64(c[first][0]) >= verticalReflectionAxis {
		return c[first][1] < c[second][1]
	}
	return c[first][0] < c[second][0]
}

func getVerticalAxis(xFirst int, xSecond int) float64 {
	return float64(xFirst+xSecond) / 2
}

func pointsStandAtTheVerticalReflectionAxis(xFirst int, xSecond int) bool {
	return math.Abs(float64(xFirst)-verticalReflectionAxis) < EPSILON &&
	       math.Abs(float64(xSecond)-verticalReflectionAxis) < EPSILON
}

func pointsHaveSymetricVerticalCoordinates(yFirst int, ySecond int) bool {
	return yFirst == ySecond
}

func pointsAreDuplicates(first []int, second []int) bool {
	return first[0] == second[0] && first[1] == second[1]
}
