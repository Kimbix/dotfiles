const time_short_format = "date +'%_I:%M'";
const time_long_format = "date +'%H:%M:%S %p'";

let time_variable = time_short_format;
const time_string = Variable(Utils.exec(time_variable));

Utils.interval(1000, () => {
	time_string.setValue(Utils.exec(time_variable));
});

export const time_button = Widget.Button({
	child: Widget.Box({
		children: [
			Widget.Icon({ icon: "emoji-recent-symbolic" }),
			Widget.Label({
				label: time_string.bind(),
			})
		]
	}),
	on_clicked: () => {
		time_variable = (time_variable == time_short_format ? time_long_format : time_short_format);
		time_string.setValue(Utils.exec(time_variable));
	}
});

