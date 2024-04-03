import { cpu_button } from "ts/Modules/SystemMonitor/cpu";
import { ram_button } from "ts/Modules/SystemMonitor/ram";

export const monitor_box = Widget.Box({
	class_name: "usage_box",
	spacing: 0,
	children: [cpu_button, ram_button]
});
