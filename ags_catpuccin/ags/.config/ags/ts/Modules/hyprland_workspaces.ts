import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";

const dispatch = (ws : string) => hyprland.messageAsync(`dispatch workspace ${ws}`);
export const workspaces_box = Widget.EventBox({
	on_scroll_up: () => dispatch("+1"),
	on_scroll_down: () => dispatch("-1"),
	child: Widget.Box({
		class_name: "workspaces_box",
		children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.Button({
			attribute: i,
			label: `${i}`,
			on_clicked: () => dispatch(i.toString()),
		})),

		setup: self => self.hook(hyprland, () => self.children.forEach(btn => {
			btn.label = "";
			if (hyprland.active.workspace.id == btn.attribute) { btn.label = ""; }
			else if (hyprland.workspaces.some(ws => ws.id == btn.attribute)) { btn.label = ""; }
		})),
	}),
});
