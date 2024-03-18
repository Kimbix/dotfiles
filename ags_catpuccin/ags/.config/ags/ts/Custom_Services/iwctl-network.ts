class IwctlNetworkService extends Service {
	static {
		Service.register(
			this,
			{
				"station-changed": ["jsobject"],
			},
			{
				"stations": ["string", "r"],
				"wlan0": ["string", "r"],
			},
		);
	}

	#stations : { [key: string] : object } = this.get_stations_dictionary();

	get stations() {
		return this.#stations;
	}

	get wlan0() {
		return this.#stations["wlan0"];
	}

	private get_rssi_icon(info : string) {
		if (!info) { return "network-wireless-offline-symbolic"; }
		const strength : number = -Number(info.split("_")[0]);
		const icon = [
			[30, "excellent"],
			[60, "good"],
			[70, "ok"],
			[80, "weak"],
		].find(([threshold]) => strength < Number(threshold))?.[1] ?? "none";
		const ret = `network-wireless-signal-${icon}-symbolic`; 
		return ret;
	}

	private get_station_information(station : string) {
		const info = Utils.exec(`iwctl station ${station} show`)
			.replace(/\b \b/igm, "_")
			.split(/\n/)
			.splice(4)
			.map(str => [str.split(/\s+/)[1], str.split(/\s+/)[2]])
			.reduce((dictionary, property) => {
				dictionary[property[0].toLowerCase()] = property[1];
				return dictionary; }, {});
		info["icon"] = this.get_rssi_icon(info["rssi"]);
		return info;
	}

	private get_stations_dictionary() {
		return Utils.exec("iwctl station list")
			.split("\n")
			.splice(4)
			.map(str => str.split(/\s+/)[1])
			.reduce((dictionary, station) => {
				dictionary[station] = this.get_station_information(station);
				return dictionary; }, {});
	}

	constructor() {
		super();

		this.#stations = this.get_stations_dictionary();
		for (const station in this.#stations) {
			const file = `/tmp/ags/devices/${station}`;
			Utils.execAsync(`bash -c 'ip monitor dev ${station} link | while read -r line; do echo $line > ${file}; done'`);
			Utils.monitorFile(file, () => {
				this.#stations[station] = this.get_station_information(station);

				this.emit("changed");
				this.notify("stations");
				this.notify(station);

				this.emit("station-changed", this.#stations);
			});
		}

	}
}

const service = new IwctlNetworkService;
export default service;
