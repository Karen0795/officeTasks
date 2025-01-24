import "./App.css";
import Result from "./components/Result/Result";
import StationGate from "./components/StationGate/StationGate";
import {
	selectStation,
	setStationGateCount,
} from "./store/slices/stationSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
	const { strArr } = useSelector(selectStation);
	const dispatch = useDispatch();

	const handlerCalculated = () => {
		let currentRemainder = 0;
		let startIndex = 0;
		for (let i = 0; i < strArr.length; i++) {
			if (currentRemainder < 0) {
				currentRemainder = 0;
				startIndex = i + 1;
			}
			const newResult = {
				...strArr[i],
				availableGalons: strArr[i].availableGalons + currentRemainder,
			};
			currentRemainder =
				newResult.availableGalons - newResult.requiredGalonsTillNextStation;
		}
		if (startIndex) {
			for (let i = 0; i < startIndex - 1; i++) {
				const newResult = {
					...strArr[i],
					availableGalons: strArr[i].availableGalons + currentRemainder,
				};
				currentRemainder =
					newResult.availableGalons - newResult.requiredGalonsTillNextStation;
			}
		}
		if (currentRemainder < 0) {
			return "Immposible";
		} else {
			return startIndex == 0 ? startIndex + 1 : startIndex;
		}
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
		handlerCalculated();
	};
	console.log(handlerCalculated());

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
					placeholder="Enter Gas Station count"
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
			<Result resultOfCalculating={handlerCalculated()} />
		</div>
	);
}

export default App;
