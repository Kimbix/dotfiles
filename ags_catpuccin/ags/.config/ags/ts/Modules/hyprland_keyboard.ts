import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";

let keyboard_name = "";

export const layout_button = Widget.Button({
	on_clicked: () => Utils.exec(`hyprctl switchxkblayout ${keyboard_name} next`),
	child: Widget.Box({
		children: [
			Widget.Icon({ icon: "preferences-desktop-keyboard-symbolic" }),
			Widget.Label().hook(
				hyprland,
				(self, keyboardname : string, layoutname : string) => {
					self.label = `${layoutname}`.slice(0,2).toUpperCase();
					keyboard_name = keyboardname;
				},
				"keyboard-layout")
		]
	})
});


