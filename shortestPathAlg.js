

// Written for Infor Hackathon on 2/27/20 by Harrison Woodward
// Based on Traveling Salesman Problem: Fastest route to each location (once) and back to start
// Provides shortest route through a hypothetical "Target" store based on shopping list
// Each point represents an aisle that contains your item
// Example input: ['B6', 'D17', 'E2', 'E7', 'H14', 'J20', 'J2', 'L5']

function findShortestPath(pointsArray) {
  // Door is at A1
  pointsArray.push('A1');
  var dict = {}, route, totalDistance, shortestRoute = 999999, finalroute;
  for (var j = 0; j < 20000; j++) {
    dict = buildDict(pointsArray);
    //route = calculateRoute2(pointsArray, dict);
    route = calculateRoute3(pointsArray);
    // console.log(route);
    totalDistance = calculateDistance(route, dict);
    // console.log('Total distance travelled: ' + totalDistance);
    if (totalDistance < shortestRoute) {
      shortestRoute = totalDistance;
      finalRoute = route;
    }
  }
  console.log('The shortest route calculated is: ');
  console.log(finalRoute);
  console.log('With a distance traveled of: ');
  console.log(shortestRoute);
  return finalRoute;
}

// Compile object containing the distances between every pair of points
function buildDict(pointsArray) {
  var point, distance, dict = {};
  for (var i = 0; i < pointsArray.length; i++) {
    point = pointsArray[i];
    for (var j = 0; j < pointsArray.length; j++) {
      if (i!==j) {
        distance = findDistanceBeweenTwoPoints(point, pointsArray[j]);
        if (!dict[point]) {
          dict[point] = {};
          // dict2[point] = {};
        }
        dict[point][pointsArray[j]] = distance;
        // dict2[point][pointsArray[j]] = distance;
      }
    }
  }
  return dict;
}

// Iteration 3, don't need dictionary to randomly choose a route.
function calculateRoute3(points) {
  var value, route = ['A1'], routeSize = points.length, newArray = ['A1'];
  while(true) {
    if (route.length === routeSize) {
      break;
    }
    var choice = Math.floor(Math.random() * (points.length));
    value = points[choice];
    if (value && value !== 'A1') {
      route.push(value);
      newArray.push(value);
      points.splice(choice, 1);
    }
  }
  route.push('A1');
  // need array back to normal each iteration
  for (var j = 1; j < newArray.length; j++) {
    points.push(newArray[j]);
  }
  return route;
}

// function that calculates a route randomly
// a brute force implementation when you do this x number of times and keep the shortest
function calculateRoute2(points, dictbackup) {
  var route = ['A1'], current, startingPoint, next, keys, key, last = '',
  dict = dictbackup;
  for (var i = 0; i < points.length; i++) {
    startingPoint = route[i];
    if (dict[startingPoint]) {
      keys = Object.keys(dict[startingPoint]);
      var whichKey = Math.floor(Math.random() * (keys.length));
      current = dict[startingPoint][keys[whichKey]];
      if (current) {
        key = keys[whichKey];
        if (key != 'A1') {
            next = keys[whichKey];
        }
      }
      if (route.length === points.length) {
        break;
      }
      if (last != next) {
        last = next;
        route.push(next);
        for (var k = 0; k < keys.length; k++) {
          delete dict[keys[k]][next];
        }
      } else {
        i--;
      }
    }
  }
  route.push('A1');
  return route;
}

// find total distance of a given route
function calculateDistance(route, dict) {
  var startingPoint, nextPoint, total = 0;
  for (var i = 0; i < route.length; i++) {
    startingPoint = route[i];
    nextPoint = route[i+1];
    if (nextPoint) {
      total += dict[startingPoint][nextPoint];
    }
  }
  return total;
}

// function that calculates route based on nearest point to current location
// not effective, but first iteration for hackathon
function calculateRoute(points, dict) {
  var route = ['A1'], lowest, current, startingPoint, next, keys, key, last = '';
  for (var i = 0; i < points.length; i++) {
    startingPoint = route[i];
    lowest = 10000000;
    keys = Object.keys(dict[startingPoint]);
    for (var j = 0; j < keys.length; j++) {
      current = dict[startingPoint][keys[j]];
      if (current) {
        key = keys[j];
        if (key != 'A1') {
          if (current < lowest) {
            lowest = current;
            next = keys[j];
          }
        }
      }
    }
    if (last != next) {
      last = next;
      route.push(next);
      for (var k = 0; k < keys.length; k++) {
        delete dict[keys[k]][next];
      }
    }
  }
  route.push('A1');
  return route;
}

// self explanatory function, also involves parsing aisles (e.g. C12) into coordinates (2, 12)
function findDistanceBeweenTwoPoints(a, b) {
  var ax = '', ay = '', bx = '', by = '', dx, dy, d, dx2, dy2;
  for (var i=0; i<a.length; i++) { 
    if (a.charAt(i) >=0 && a.charAt(i) <= 1000) {
      ay += a.charAt(i); 
    } else {
      ax += a.charAt(i); 
    }
  }
  for (var i=0; i<b.length; i++) { 
    if (b.charAt(i) >=0 && b.charAt(i) <= 1000) {
      by += b.charAt(i); 
    } else {
      bx += b.charAt(i); 
    }
  }

  ay = parseInt(ay);
  by = parseInt(by);
  ax = ax.charCodeAt(0) - 65;
  bx = bx.charCodeAt(0) - 65;

  // change in x
  dx = bx-ax;
  // squared
  dx2 = dx*dx;

  // change in y
  dy = by-ay;
  // squared
  dy2 = dy*dy;

  // distance
  d = Math.sqrt(dx2 + dy2);
  //console.log(`Distance between points ${a} and ${b} is: ` + d);
  return d;
}

//var pointsArray = ['C6', 'D20', 'G2', 'L5', 'F15', 'H9',
//'E5', 'C16', 'I6', 'E4'];//, 'G17', 'J20', 'J2', 'A20', 'E1',
//'K15','B6', 'D17', 'E2', 'E7', 'H14', 'J8'];
//findShortestPath(pointsArray);




