import "./App.css";
import StationGate from "./components/StationGate/StationGate";
function App() {
	const strArr = [];
	const handlerSubmit = (e) => {
		e.preventDefault();
		const [input] = e.target;
		while (input.value > 0) {
			input.value--;
			strArr.push({
				id: crypto.randomUUID(),
				availableGalons: Math.trunc(Math.random() * 5),
				requiredGalonsTillNextStation: Math.trunc(
					Math.random() * (input.value - 1) + 1
				),
			});
		}
		e.target.reset();
	};

	return (
		<div className="App">
			<h1> Welcome to Gas Station</h1>
			<form onSubmit={handlerSubmit}>
				<input
					onKeyDown={(e) => {
						if (isNaN(e.key) && e.key !== "Backspace") {
							("");
						}
					}}
					className="submitInputValue"
					type="text"
				/>
				<button className="submitButton">Select</button>
			</form>
			{strArr.map((el) => {
				return <StationGate key={el.id} />;
			})}
		</div>
	);
}

export default App;
