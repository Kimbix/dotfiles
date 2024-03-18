#!/bin/bash

workspaces () {
	WS=$(hyprctl workspaces | grep -o 'ID [0-9]' | grep -o '[0-9]' | tr '\n' ' ')
	AWS=$(hyprctl activeworkspace | grep -o 'ID [0-9]' | grep -o '[0-9]')
	OUTPUT="(box :space-evenly 'false' :orientation 'v' :halign 'center' :valign 'center' :class 'workspace-button'"

	for i in {0..9}; do
		if [[ $AWS == $i ]]; then
			OUTPUT=$OUTPUT" (box :halign 'center' :valign 'center' :class 'workspace-button-focused' (eventbox (label :text '$i')))"
		elif [[ $WS =~ $i ]]; then
			OUTPUT=$OUTPUT" (box :halign 'center' :valign 'center' :class 'workspace-button-active' (eventbox (label :text '$i')))"
		else
			OUTPUT=$OUTPUT" (box :halign 'center' :valign 'center' :class 'workspace-button-inactive' (eventbox (label :text '$i')))"
		fi
	done
	echo $OUTPUT")"
}

workspaces
socat -u UNIX-CONNECT:/tmp/hypr/"$HYPRLAND_INSTANCE_SIGNATURE"/.socket2.sock - | while read -r; do 
	workspaces
done
