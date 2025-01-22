const elevators = document.querySelectorAll(".elevatorPosition");
const userFloors = document.querySelectorAll(".userFloor");

const userFloorsArr = [];

userFloors.forEach((el, index) => {
  userFloorsArr.push({
    element: el,
    floor: null
  });
});
const dataElevators = []

elevators.forEach((element)=>{
  dataElevators.push(element)
})

const userFloorsNumberArr = userFloorsArr.reverse();
userFloorsNumberArr.forEach((el, index) => {
  el.floor = index + 1;
});

const moveElevator = (elevator, targetFloor) => {
  elevator.setAttribute("current-floor", targetFloor);
  elevator.style.transform = `translateY(${-(targetFloor - 1) * 43}px)`;
};

const handleClick = (e) => {
  const userFloor = userFloorsNumberArr.find(el => el.element === e.target).floor;

  const elevatorDistances = dataElevators.map((elevator, index) => {
    return {
      elevator,
      distance: Math.abs(userFloor - elevator.getAttribute("current-floor"))
    };
  });
  const closestElevator = elevatorDistances.reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr));
  moveElevator(closestElevator.elevator, userFloor);
};

document.querySelector('.UsersPosition').addEventListener('click', handleClick);

