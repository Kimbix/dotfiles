import iwctl_network from "ts/Custom_Services/iwctl-network";

export const wlan0_button = Widget.Button({
	child: Widget.Box({
		class_name: "network_button",
		children: [
			Widget.Icon().hook(
				iwctl_network, self => { self.icon = iwctl_network["wlan0"]["icon"]; }
			),
			Widget.Label({
				label: iwctl_network.bind("wlan0").as(str => str["connected_network"] ?? "disconnected"),
			}),
		]
	})
});
