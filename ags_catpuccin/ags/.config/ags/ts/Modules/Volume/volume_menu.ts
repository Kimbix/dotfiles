import { Orientation } from "types/@girs/gtk-3.0/gtk-3.0.cjs";
import { Stream } from "types/service/audio";

const audio = await Service.import("audio");


const playback_source = (str: Stream) =>
	Widget.Box({
		attribute: str.id,
		vertical: true,
		children: [
			Widget.Box({
				children: [
					Widget.Icon({ icon: str.icon_name }),
					Widget.Label({
						label: str.name?.trim()
					})
				]
			}),
			Widget.Slider({
				class_name: "slider",
				draw_value: false,
				hexpand: true,
				on_change: ({ value }) => {
					str.volume = value / 100;
				},
				// I really really detest the fact that this works
				// Because for some F#cking reason if i dont bind, it doesnt work
				value: Utils.merge([str.bind("volume")], (a: number) => a * 100),
				min: 0.0,
				max: 150.0,
				step: 5.0,
			}),
		],
	});

const volume_menu_title = Widget.Label({
	class_name: "volume_menu_title",
	hpack: "start",
	label: "Volume Menu",
});

const audio_sources_list = Widget.Box({
	vertical: true,
	setup: (self) => self
		// Hook for stream added
		.hook(audio, (self, id) => {
			const app = audio.apps.find((x) => x["id"] == id);
			if (app == undefined) { return; }
			self.children = self.children.concat(playback_source(app));
		}, "stream-added")
		// Hook for stream removed
		.hook(audio, (self, id) => {
			self.children = self.children.filter((x) => x.attribute != id);
		}, "stream-removed")
});

export const volume_menu = Widget.Window({
	name: "volume-menu",
	anchor: ["bottom", "right"],
	exclusivity: "normal",
	layer: "top",
	monitor: 0,
	child: Widget.Box({
		orientation: Orientation.VERTICAL,
		class_name: "volume-menu",
		children: [
			volume_menu_title,
			audio_sources_list
		]
	}),
	visible: true,
});

