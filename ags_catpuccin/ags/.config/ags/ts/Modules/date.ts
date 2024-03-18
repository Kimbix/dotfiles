const date_short_format : string = "date +'%-d/%-m'";
const date_long_format : string = "date +'%A %-d of %B'";

let date_variable = date_short_format;
const date_string = Variable(Utils.exec(date_variable));

Utils.interval(1000, () => {
	date_string.setValue(Utils.exec(date_variable));
});

export const date_button = Widget.Button({
	child: Widget.Box({
		children: [
			Widget.Icon({ icon: "x-office-calendar-symbolic" }),
			Widget.Label({
				label: date_string.bind(),
			})
		]
	}),
	on_clicked: () => {
		date_variable = (date_variable == date_short_format ? date_long_format : date_short_format);
		date_string.setValue(Utils.exec(date_variable));
	}
});

