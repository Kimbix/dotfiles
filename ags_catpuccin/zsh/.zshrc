# if [ "$TMUX" = "" ]; then tmux; fi

# manface
alias vim=nvim

# Navigation aliases
alias ..='z ..'
# alias --='z -'

# List aliases
alias ls='ls --color=auto'
alias la='ls -la --color=auto'
alias lslink='ls -la --color=auto | grep "../"'
zls() { z "$@" && ls --color=auto .; }
zla() { z "$@" && ls -la --color=auto .; }
zlslink() { z "$@" && ls -la --color=auto . | grep '../' }

# For control + arrow
bindkey "^[[1;5C" forward-word
bindkey "^[[1;5D" backward-word

# For home, end, delete
bindkey "^[[H" beginning-of-line
bindkey "^[[F" end-of-line
bindkey "^[[3~" delete-char


# bun completions
[ -s "/home/humberto/.bun/_bun" ] && source "/home/humberto/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Created by newuser for 5.9
eval "$(starship init zsh)"
eval "$(zoxide init zsh)"
