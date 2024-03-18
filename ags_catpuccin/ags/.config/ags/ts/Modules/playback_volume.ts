// TODO: When fixed, change this to an import
const audio = await Service.import("audio");

export const playback_eventbox = Widget.EventBox({
	on_scroll_up: () => audio.speaker.volume += 0.01,
	on_scroll_down: () => audio.speaker.volume -= 0.01,
	child: Widget.Button({
		on_clicked: () => audio.speaker.is_muted = !audio.speaker.is_muted,
		on_middle_click: () => Utils.exec("hyprctl dispatch exec pavucontrol"),
		child: Widget.Box({
			children: [
				Widget.Icon().hook(audio.speaker, self => {
					const vol = audio.speaker.volume * 100;
					const icon = [
						[101, "overamplified"],
						[67, "high"],
						[34, "medium"],
						[1, "low"],
						[0, "muted"],
					].find(([threshold]) => Number(threshold) <= vol)?.[1];
					self.icon = `audio-volume-${icon}-symbolic`;
				}),
				Widget.Label().hook(audio.speaker, self => {
					const vol = audio.speaker.volume * 100;
					self.label = Math.round(vol).toString().concat("%");
				})
			]
		})
	})
});
