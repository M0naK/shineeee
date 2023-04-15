const game = document.getElementById('game');
const gamestart = document.getElementById('gamestart');
const gameclear = document.getElementById('gameclear');
const scoreElem = document.getElementById('score');
let score = 0;

gamestart.classList.add('centered');
gameclear.classList.add('centered');

function createImage(src, onclick) {
  const img = new Image();
  img.src = src;
  img.onclick = onclick;
  return img;
}

function getRandomImage() {
  const index = Math.floor(Math.random() * 10) + 1;
  return {
    index: index,
    name: `teki${index}.png`,
  };
}

function tapImage(event) {
  const img = event.target;
  const prevLeft = img.style.left;
  const prevTop = img.style.top;
  img.src = 'bakuha.png';
  img.onload = () => {
    img.style.left = prevLeft;
    img.style.top = prevTop;
  };
  img.onclick = null;
  score++;
  scoreElem.textContent = `殺した人数：${score}人`;
  if (score >= 20) {
    gameclear.style.display = 'block';
    clearEnemies();
    playSound('happy.mp3');
  } else {
    playSound('bakuha.mp3');
  }
  setTimeout(() => {
    game.removeChild(img);
  }, 500);
}

function clearEnemies() {
  const enemies = game.querySelectorAll('img[src^="teki"], img[src="bakuha.png"]');
  enemies.forEach((img) => {
    game.removeChild(img);
  });
}

function spawnImage() {
  if (score < 20) {
    const randomImage = getRandomImage();
    const img = createImage(randomImage.name, tapImage);
    img.onload = () => {
      const maxWidthPercentage = 100 - img.width / window.innerWidth * 100;
      img.style.left = `${Math.random() * maxWidthPercentage}%`;
      const maxHeightPercentage = 100 - img.height / window.innerHeight * 100;
      img.style.top = `${Math.random() * maxHeightPercentage}%`;
      game.appendChild(img);
    };
    setTimeout(spawnImage, Math.random() * 500 + 300);
  }
}

function playSound(src) {
  const audio = new Audio(src);
  audio.play();
}

function resetGame() {
  clearEnemies();
  score = 0;
  scoreElem.textContent = `殺した人数：${score}人`;
  gameclear.style.display = 'none';
  game.appendChild(gamestart);
}

gamestart.onclick = () => {
  game.removeChild(gamestart);
  spawnImage();
};

gameclear.onclick = () => {
  resetGame();
};
