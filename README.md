# The Legend Of Bumbweb

## About
A simple browser-based game built with HTML, CSS, JavaScript, and Bulma CSS, featuring characters from *The Legend of Bumbo* and Edmund McMillen's *The Binding of Isaac*.

## Architecture

This game is entirely client-side. All game logic, rendering, and state management happen in the browser via JavaScript, with Bulma CSS handling the layout and styling. There's no backend or server-side processing required to play.

## Getting Started
### Clone the repository

```bash
git clone https://github.com/MaxiTonoto/bumbweb-html5
cd bumbweb-html5
```

### Running the game

Opening index.html may not work due to browser restrictions on local file access. Thus, the use of **VS Code Live Server**, **Python http server** or **Node's http server** is recommended

Python: ```python -m http.server```
Node: ```npx http-server .```

## Examples
### Dice attack
<img width="1280" height="720" alt="1 (1)" src="https://github.com/user-attachments/assets/b0199a73-3868-48fb-93e9-a1c4904d7142" />

### Magic usage
<img width="1280" height="720" alt="3 (1)" src="https://github.com/user-attachments/assets/1eda9b9b-a55d-4016-84e2-27f4ddd5867a" />

## Note on Commit History
This repository does not include the original commit history. The game was originally built using Django Templates, and was later manually "migrated" to a vanilla HTML5 version.
