
import { date_button } from "ts/Modules/date";
import { time_button } from "ts/Modules/time";
import { cpu_button } from "ts/Modules/cpu";
import { ram_button } from "ts/Modules/ram";
import { wlan0_button } from "ts/Modules/network";
import { layout_button } from "ts/Modules/hyprland_keyboard";

import { playback_eventbox } from "ts/Modules/playback_volume";
import { recording_eventbox } from "ts/Modules/recording_volume";

import { workspaces_box } from "ts/Modules/hyprland_workspaces";
import { systray_box } from "ts/Modules/systray";

import { NotificationPopups } from "ts/Modules/notifications";



// BOXES

const layout_box = Widget.Box({
	class_name: "layout_box",
	spacing: 0,
	children: [ layout_button ]
});

const datetime_box = Widget.Box({
	class_name: "datetime_box",
	spacing: 0,
	children: [ date_button, time_button ]
});

const usage_box = Widget.Box({
	class_name: "usage_box",
	spacing: 0,
	children: [ cpu_button, ram_button ]
});

const audio_box = Widget.Box({
	class_name: "audio_box",
	children: [ playback_eventbox, recording_eventbox ]
});

const network_box = Widget.Box({
	class_name: "network_box",
	children: [ wlan0_button ]
});

// END BOXES


const left_widgets = Widget.Box({
	hpack: "start",
	homogeneous: false,
	vertical: false,
	children: [ workspaces_box ]
});


const right_widgets = Widget.Box({
	hpack: "end",
	homogeneous: false,
	vertical: false,
	children: [ layout_box, usage_box, network_box, audio_box, datetime_box, systray_box ]
});


const myBar = Widget.Window({
	name: "bar",
	monitor: 0,
	exclusivity: "exclusive",
	anchor: ["bottom", "left", "right"],
	child: Widget.CenterBox({
		class_name: "bar_centerbox",
		start_widget: left_widgets,
		end_widget: right_widgets,
	}),
});

const scss = `${App.configDir}/style.scss`;
const css = "/tmp/ags/output_style.css";
Utils.exec(`rm ${css}`);
Utils.exec(`sassc ${scss} ${css}`);

App.addIcons(`${App.configDir}/assets`);
App.config({
	style: `${css}`,
	windows: [ NotificationPopups(), myBar ]
});
