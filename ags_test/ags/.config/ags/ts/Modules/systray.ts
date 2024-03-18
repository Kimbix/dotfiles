import { TrayItem } from "resource:///com/github/Aylur/ags/service/systemtray.js";

const systemtray = await Service.import("systemtray");

const SysTrayItem = (item : TrayItem) => Widget.Button({
	child: Widget.Icon().bind("icon", item, "icon"),
	tooltip_markup: item.bind("tooltip_markup"),
	on_primary_click: (_, event) => item.activate(event),
	on_secondary_click: (_, event) => item.openMenu(event),
});

export const systray_box = Widget.Box({
	class_name: "systray_box",
	children: systemtray.bind("items").as((i : TrayItem[]) => i.map(SysTrayItem))
});
