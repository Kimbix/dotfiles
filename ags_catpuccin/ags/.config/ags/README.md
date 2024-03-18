## Hello

> This is my ags configuration, it's currently work in progress as with everything ever in the linux space

## Dependencies

- Built for hyprland (Workspaces and keyboard layout)
- Currently using iwd and trying to develop a crude service for it
- Audio require pipewire-pulse (or pulseaudio if you're still using that)
- CPU / RAM just uses top and the free command (thanks AGS docs)
- Date is handled by the date command (don't even know how you wouldn't have that installed)
- Systray handled by AGS
- Notifications handled by AGS

## TODOs:

### Minor details

- [ ] Open pavucontrol when clicking audio buttons
- [ ] Open calendar when clicking date and time
- [ ] Open btop / htop / top when clicking cpu and ram usage
- [ ] Fix that annoying undefined keyboard layout thing at startup
- [ ] Change workspaces so that instead of using labels they use icons

### Mayor development 

- [ ] Make a notification center
- [ ] Make a lock screen
- [ ] Make a audio menu
- [ ] Application launcher
- [ ] Workspace previewer
- [ ] Make a pretty network menu
- [ ] Add opened workspace applications to the bar, allow to minimize and maximize each
- [ ] Allow for scss reloading (Ags reloading itself might be too difficult)

### Refactoring

- [ ] Make scss prettier
- [ ] Give classes to everything

