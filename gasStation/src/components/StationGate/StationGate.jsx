import styles from "./stationGate.module.css";

function StationGate({ stationInfo, stationNumber }) {
	return (
		<div className={styles.gasStation}>
			<h2>Gas Station {stationNumber + 1}</h2>

			<p>Available galons: {stationInfo.availableGalons}</p>
			<p>
				Rrequired galons till next station:{" "}
				{stationInfo.requiredGalonsTillNextStation}
			</p>
		</div>
	);
}

export default StationGate;
