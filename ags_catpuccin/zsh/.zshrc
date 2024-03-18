# Created by newuser for 5.9
eval "$(starship init zsh)"
eval "$(zoxide init zsh)"

alias ls='ls --color=auto'
alias la='ls -la --color=auto'
alias lslink='ls -la --color=auto | grep "../"'
zls() { z "$@" && ls --color=auto .; }
zla() { z "$@" && ls -la --color=auto .; }
zlslink() { z "$@" && ls -la --color=auto . | grep '../' }

# manface
alias vim=nvim

# bun completions
[ -s "/home/humberto/.bun/_bun" ] && source "/home/humberto/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
