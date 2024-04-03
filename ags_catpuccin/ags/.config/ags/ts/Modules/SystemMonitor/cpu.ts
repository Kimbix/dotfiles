import { divide } from "ts/Functions/numerics";

const cpu_variable = Variable("cpu variable not updated", {
	poll: [5000, "top -b -n 1", out => Math.round(divide([100, Number(out.split("\n")
		.find(line => line.includes("Cpu(s)"))
		?.split(/\s+/)[1]
		.replace(",", "."))]) * 100)
		.toString()
		.concat("%")
	],
});

export const cpu_button = Widget.Button({
	child: Widget.Box({
		children: [Widget.Icon({ icon: "cpu-64-bit-symbolic" }), Widget.Label({ label: cpu_variable.bind() })]
	})
});
