import { divide } from "ts/Functions/numerics";

const ram_variable = Variable("ram variable not updated", {
	poll: [5000, "free", out => Math.round(
		100 *
		divide(out.split("\n")
			.find(line => line.includes("Mem:"))
			?.split(/\s+/)
			.splice(1, 2)
			.map((str: string) => Number(str))
			?? [1, 0]))
		.toString()
		.concat("%")
	]
});

export const ram_button = Widget.Button({
	child: Widget.Box({
		children: [Widget.Icon({ icon: "memory-symbolic" }), Widget.Label({ label: ram_variable.bind() })]
	})
});
