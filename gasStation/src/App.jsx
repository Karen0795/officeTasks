import "./App.css";
import StationGate from "./components/StationGate/StationGate";
import {selectStation, setStationGateCount} from "./store/slices/stationSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
	const { strArr } = useSelector(selectStation);
	const dispatch = useDispatch();
	
	
	let remainder = 0;

	const handlerCalculated = () => {
		strArr.map((el, index) => {
			const newResult = { ...el, availableGalons: el.availableGalons + remainder }
			console.log(newResult);
			// el.availableGalons = (el.availableGalons + remainder)
				if (el.availableGalons == 0) {
					console.log('end');
				} else if (el.availableGalons < el.requiredGalonsTillNextStation) {
					console.log(`element number ${index+1} not equal`);
				} else { 
					remainder = remainder + (el.availableGalons-el.requiredGalonsTillNextStation)
				}
		});
		if (remainder >= 0) {
			console.log("hi");
		}
		else console.log("There is no option");
	};

	const handlerSubmit = (e) => {
		e.preventDefault();
		const [input] = e.target;
		const count = input.value;
		while (input.value > 0) {
			input.value--;
			dispatch(
				setStationGateCount({
					id: crypto.randomUUID(),
					availableGalons: Math.trunc(Math.random() * 5),
					requiredGalonsTillNextStation:
						Math.trunc(Math.random() * (count - 1)) + 1,
				})
			);
		}
		e.target.reset();
	};
	handlerCalculated();

	return (
		<div className="App">
			<h1> Welcome to Gas Station</h1>
			<form onSubmit={handlerSubmit}>
				<input
					onKeyDown={(e) => {
						if (
							!/[0-9]/.test(e.key) &&
							e.key !== "Backspace" &&
							e.key !== "Tab" &&
							e.key !== "Enter"
						) {
							e.preventDefault();
						}
					}}
					className="submitInputValue"
					type="text"
				/>
				<button className="submitButton">Select</button>
			</form>

			<div className="stationBox">
				{strArr.map((el, index) => {
					return (
						<StationGate key={el.id} stationInfo={el} stationNumber={index} />
					);
				})}
			</div>
		</div>
	);
}

export default App;
