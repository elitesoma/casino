<!-- script.js -->
// Plinko Game
function setupPlinko() {
  const canvas = document.getElementById('plinkoCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const pegs = [];
  const rows = 10;
  const pegSpacing = 50;
  const ballRadius = 10;

  // Setup pegs
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= row; col++) {
      pegs.push({
        x: canvas.width / 2 - row * pegSpacing / 2 + col * pegSpacing,
        y: 50 + row * 40
      });
    }
  }

  // Draw board
  function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    pegs.forEach(peg => {
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    });
  }

  drawBoard();
  return { canvas, ctx, pegs, ballRadius };
}

function dropPlinkoBall() {
  const { canvas, ctx, pegs, ballRadius } = setupPlinko();
  let ball = { x: canvas.width / 2, y: 20, vy: 2 };
  const result = document.getElementById('plinkoResult');
  result.textContent = 'Dropping ball...';

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setupPlinko().ctx.fillRect(0, 0, canvas.width, canvas.height);
    pegs.forEach(peg => {
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      // Simple collision
      const dx = ball.x - peg.x;
      const dy = ball.y - peg.y;
      if (Math.sqrt(dx * dx + dy * dy) < ballRadius + 5) {
        ball.vy += 0.1;
        ball.x += (Math.random() - 0.5) * 10;
      }
    });

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#00ff88';
    ctx.fill();

    ball.y += ball.vy;
    ball.vy += 0.1; // Gravity

    if (ball.y < canvas.height) {
      requestAnimationFrame(animate);
    } else {
      const prize = Math.floor(Math.random() * 1000);
      result.textContent = `Landed! You won ${prize} coins!`;
    }
  }

  animate();
}

// Dice Game
function playDice() {
  const guess = document.getElementById('guess').value.toLowerCase();
  const betAmount = document.getElementById('betAmount').value;
  const result = document.getElementById('diceResult');
  const hash = document.getElementById('diceHash');
  if (!guess || (guess !== 'over' && guess !== 'under')) {
    result.textContent = 'Yo, enter "over" or "under"!';
    return;
  }
  if (!betAmount || betAmount <= 0) {
    result.textContent = 'Put in a real bet amount, homie!';
    return;
  }
  const seed = Math.random().toString(36).substring(2);
  const roll = Math.floor(Math.random() * 100) + 1;
  const win = (guess === 'over' && roll > 50) || (guess === 'under' && roll <= 50);
  result.textContent = `Roll: ${roll}. You ${win ? 'hit the jackpot!' : 'busted!'}`;
  hash.textContent = `Provably fair hash: ${seed}`;
}

// Sports Betting
function refreshMatches() {
  const matches = [
    { team1: 'Lakers', team2: 'Warriors', odds: '2.1 vs 1.8' },
    { team1: 'Man Utd', team2: 'Chelsea', odds: '1.9 vs 2.3' }
  ];
  const matchesDiv = document.getElementById('matches');
  matchesDiv.innerHTML = matches.map(match => `
    <div class="bg-gray-700 p-4 rounded">
      <p>${match.team1} vs ${match.team2}</p>
      <p>Odds: ${match.odds}</p>
      <button onclick="alert('Bet placed on ${match.team1}!')" class="text-green-400">Bet Now</button>
    </div>
  `).join('');
}
refreshMatches();

// Login
function fakeLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const result = document.getElementById('loginResult');
  if (!username || !password) {
    result.textContent = 'Fill in both fields, bro!';
    return;
  }
  localStorage.setItem('username', username);
  result.textContent = `Welcome back, ${username}! Let’s gamble!`;
}

// Profile
function updateProfile() {
  const username = localStorage.getItem('username') || 'Guest';
  const profileInfo = document.getElementById('profileInfo');
  const balance = (Math.random() * 0.1).toFixed(4);
  profileInfo.textContent = `Username: ${username}\nWallet: ${balance} BTC`;
}
updateProfile();

// Initialize Plinko on load
setupPlinko();
