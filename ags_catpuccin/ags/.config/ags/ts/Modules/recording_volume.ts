// TODO: When fixed, change this to an import
const audio = await Service.import("audio");

export const recording_eventbox = Widget.EventBox({
	on_scroll_up: () => audio.microphone.volume += 0.01,
	on_scroll_down: () => audio.microphone.volume -= 0.01,
	child: Widget.Button({
		on_primary_click: () => audio.microphone.is_muted = !audio.microphone.is_muted,
		on_middle_click: () => Utils.exec("hyprctl dispatch exec pavucontrol"),
		child: Widget.Box({
			children: [
				Widget.Icon().hook(audio.microphone, self => {
					const vol = audio.microphone.volume * 100;
					const icon = [
						[67, "high"],
						[34, "medium"],
						[1, "low"],
						[0, "muted"],
					].find(([threshold]) => Number(threshold) <= vol)?.[1];
					self.icon = `microphone-sensitivity-${icon}-symbolic`;
				}),
				Widget.Label().hook(audio.microphone, self => {
					const vol = audio.microphone.volume * 100;
					self.label = Math.round(vol).toString().concat("%");
				})
			]
		})
	})
});
