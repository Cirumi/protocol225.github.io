// ==================== ЗВУКОВОЙ ДВИЖОК ====================
const AudioEngine = {
    ctx: null,
    init() {
        if (this.ctx) return;
        try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    },
    play(type) {
        if (!this.ctx) this.init();
        if (!this.ctx || this.ctx.state === 'suspended') this.ctx?.resume();
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain); gain.connect(this.ctx.destination);
        try {
            switch(type) {
                case 'card': osc.type='sine'; osc.frequency.setValueAtTime(600,t); osc.frequency.exponentialRampToValueAtTime(300,t+0.1); gain.gain.setValueAtTime(0.08,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.15); osc.start(t); osc.stop(t+0.15); break;
                case 'win': osc.type='triangle'; osc.frequency.setValueAtTime(400,t); osc.frequency.exponentialRampToValueAtTime(800,t+0.2); gain.gain.setValueAtTime(0.1,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.3); osc.start(t); osc.stop(t+0.3); break;
                case 'lose': osc.type='sawtooth'; osc.frequency.setValueAtTime(400,t); osc.frequency.exponentialRampToValueAtTime(100,t+0.3); gain.gain.setValueAtTime(0.06,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.35); osc.start(t); osc.stop(t+0.35); break;
                case 'draw': osc.type='sine'; osc.frequency.setValueAtTime(300,t); osc.frequency.setValueAtTime(250,t+0.1); gain.gain.setValueAtTime(0.07,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.2); osc.start(t); osc.stop(t+0.2); break;
                case 'drawCard': osc.type='sine'; osc.frequency.setValueAtTime(500,t); osc.frequency.setValueAtTime(700,t+0.05); gain.gain.setValueAtTime(0.05,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.1); osc.start(t); osc.stop(t+0.1); break;
                case 'steal': osc.type='triangle'; osc.frequency.setValueAtTime(800,t); osc.frequency.exponentialRampToValueAtTime(1200,t+0.15); gain.gain.setValueAtTime(0.07,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.2); osc.start(t); osc.stop(t+0.2); break;
                case 'combo': osc.type='square'; osc.frequency.setValueAtTime(300,t); osc.frequency.setValueAtTime(450,t+0.1); osc.frequency.setValueAtTime(600,t+0.2); gain.gain.setValueAtTime(0.08,t); gain.gain.exponentialRampToValueAtTime(0.001,t+0.35); osc.start(t); osc.stop(t+0.35); break;
                case 'victory': [523,659,784,1047].forEach((f,i)=>{ const o=this.ctx.createOscillator(),g=this.ctx.createGain(); o.connect(g);g.connect(this.ctx.destination); o.type='triangle'; o.frequency.setValueAtTime(f,t+i*0.15); g.gain.setValueAtTime(0.08,t+i*0.15); g.gain.exponentialRampToValueAtTime(0.001,t+i*0.15+0.2); o.start(t+i*0.15); o.stop(t+i*0.15+0.2); }); break;
            }
        } catch(e) {}
    }
};

// ==================== КОНСТАНТЫ ====================
const CLASSES = { MILITARY:'military', CRIMINAL:'criminal', CIVILIAN:'civilian', SUPPORT:'support', AGENT:'agent', LIZA:'liza' };

const ALL_CARDS = [
    { id:'m1', name:'Танк', stars:4, class:CLASSES.MILITARY, icon:'🪖' }, { id:'m2', name:'Джип', stars:4, class:CLASSES.MILITARY, icon:'🚙' },
    { id:'m3', name:'Дрон', stars:3, class:CLASSES.MILITARY, icon:'🛸' }, { id:'m4', name:'Капитан', stars:3, class:CLASSES.MILITARY, icon:'🎖️' },
    { id:'m5', name:'Снайпер', stars:2, class:CLASSES.MILITARY, icon:'🎯' }, { id:'m6', name:'Тяж. солдат', stars:2, class:CLASSES.MILITARY, icon:'💂' },
    { id:'m7', name:'Военный', stars:2, class:CLASSES.MILITARY, icon:'🪖' }, { id:'m8', name:'Солдат', stars:1, class:CLASSES.MILITARY, icon:'👮' },
    { id:'c1', name:'Лиза²', stars:225, class:CLASSES.LIZA, icon:'👁️', isLiza:true },
    { id:'c2', name:'Хамелеон', stars:5, class:CLASSES.CRIMINAL, icon:'🦎' }, { id:'c3', name:'Клокер', stars:5, class:CLASSES.CRIMINAL, icon:'🕵️' },
    { id:'c4', name:'Чикатило', stars:5, class:CLASSES.CRIMINAL, icon:'🔪' }, { id:'c5', name:'Уничтожитель', stars:4, class:CLASSES.CRIMINAL, icon:'💣' },
    { id:'c6', name:'Пироман', stars:3, class:CLASSES.CRIMINAL, icon:'🔥' }, { id:'c7', name:'Мутант', stars:3, class:CLASSES.CRIMINAL, icon:'🧟' },
    { id:'c8', name:'Маньяк', stars:2, class:CLASSES.CRIMINAL, icon:'🪓' }, { id:'c9', name:'Террорист', stars:1, class:CLASSES.CRIMINAL, icon:'💀' },
    { id:'v1', name:'Кадет', stars:1, class:CLASSES.CIVILIAN, icon:'👦' }, { id:'v2', name:'Христианин', stars:1, class:CLASSES.CIVILIAN, icon:'✝️' },
    { id:'s1', name:'Медик', stars:5, class:CLASSES.SUPPORT, icon:'🚑' }, { id:'s2', name:'Молния', stars:4, class:CLASSES.SUPPORT, icon:'⚡' },
    { id:'s3', name:'Аптечка', stars:4, class:CLASSES.SUPPORT, icon:'💊' }, { id:'s4', name:'Инженер', stars:3, class:CLASSES.SUPPORT, icon:'🔧' },
    { id:'s5', name:'Доктор', stars:1, class:CLASSES.SUPPORT, icon:'🩺' },
    { id:'a1', name:'Анти-агент', stars:5, class:CLASSES.AGENT, icon:'🕶️', isAntiAgent:true, isAgent:true },
    { id:'a2', name:'Агент', stars:2, class:CLASSES.AGENT, icon:'🕴️', isAgent:true },
];

const COMBO_RECIPES = [
    { id:'combo_infantry', name:'Отряд пехоты', icon:'🪖', stars:3, class:CLASSES.MILITARY, description:'Солдат + Военный + Снайпер', cards:['m8','m7','m5'] },
    { id:'combo_elite', name:'Элитный спецназ', icon:'🎖️', stars:6, class:CLASSES.MILITARY, description:'Капитан + Тяж.солдат + Дрон', cards:['m4','m6','m3'] },
    { id:'combo_armor', name:'Бронеколонна', icon:'🚙', stars:8, class:CLASSES.MILITARY, description:'Танк + Джип + Капитан', cards:['m1','m2','m4'] },
    { id:'combo_terror', name:'Террор-ячейка', icon:'💣', stars:7, class:CLASSES.CRIMINAL, description:'Террорист + Маньяк + Уничтожитель', cards:['c9','c8','c5'] },
    { id:'combo_psycho', name:'Псих-отряд', icon:'🔥', stars:8, class:CLASSES.CRIMINAL, description:'Пироман + Мутант + Чикатило', cards:['c6','c7','c4'] },
    { id:'combo_medical', name:'Мед-бригада', icon:'🚑', stars:9, class:CLASSES.SUPPORT, description:'Медик + Аптечка + Доктор (+3⭐)', cards:['s1','s3','s5'], isSupportCombo:true, bonusStars:3 },
    { id:'combo_engineering', name:'Инженерный корпус', icon:'🔧', stars:7, class:CLASSES.SUPPORT, description:'Инженер + Молния + Дрон (+2⭐)', cards:['s4','s2','m3'], isSupportCombo:true, bonusStars:2 }
];

// ==================== API ====================
const JSONBIN_API_KEY = '$2a$10$CKMC.ahtZuFY9e5STCeTOerv6m/MBp9zZIZajplMIqrvgSzozEBuW';
const JSONBIN_BASE = 'https://api.jsonbin.io/v3/b';
const USERS_BIN_ID = '67e3c5a8ad19ca34f8f1a2c3';

// ==================== ГЛОБАЛЬНОЕ СОСТОЯНИЕ ====================
let mainDeck = [], discardPile = [], playerHand = [], enemyHand = [];
let roundActive = true, playerPassed = false, enemyPassed = false;
let gameOver = false, playerTurn = true, lastBattleResult = null;
let turnHistory = [], stats = { playerWins:0, enemyWins:0, draws:0 };
let playedPlayerCard = null, playedEnemyCard = null;
let pendingBattle = false, selectedComboCards = [];
let stealMode = false, stealCallback = null;
let currentTheme = 'cyberpunk';
let gameMode = 'bot';
let currentUser = null;
let onlineRoomId = null, onlinePlayerNumber = 0, onlinePollingInterval = null;
let playerUsedPass = false;
let playerSupportBonus = 0;

// ==================== УТИЛИТЫ ====================
function shuffle(arr) { const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function getCardClassText(card) { const m={military:'Военный',criminal:'Преступник',civilian:'Мирный',support:'Вспомогат.',agent:'Агент',liza:'Преступник'}; return m[card.class]||''; }
function getCardClassCSS(card) { return card.isLiza?'liza':card.class; }
function isAgentCard(card) { return card.isAgent||card.isAntiAgent; }
function isCombatCard(card) { return card.class!==CLASSES.SUPPORT&&!card.isSupportCombo; }
function isSupportCard(card) { return card.class===CLASSES.SUPPORT||card.isSupportCombo; }
function getTotalStars(hand) { return hand.reduce((sum, c) => sum + (c.stars || 0), 0); }
function generateCode() { return Math.random().toString(36).substring(2, 8).toUpperCase(); }
function hashPassword(pw) { return btoa(pw.split('').reverse().join('') + 'salt_225'); }

function showFloatingText(text, color, x, y) {
    const overlay = document.getElementById('effects-overlay');
    if(!overlay) return;
    const el = document.createElement('div'); el.className = 'floating-text'; el.textContent = text;
    el.style.color = color; el.style.left = x+'px'; el.style.top = y+'px';
    overlay.appendChild(el); setTimeout(() => el.remove(), 1500);
}

function shakeScreen() {
    const c = document.querySelector('.game-container');
    if(c) { c.classList.add('screen-shake'); setTimeout(() => c.classList.remove('screen-shake'), 400); }
}

function findComboForCards(cardIds) {
    const sorted = [...cardIds].sort();
    return COMBO_RECIPES.find(r => { const rs=[...r.cards].sort(); return rs.length===sorted.length && rs.every((id,i)=>id===sorted[i]); });
}

// ==================== ТЕМЫ ====================
function setTheme(theme) {
    document.body.className = 'theme-' + theme; currentTheme = theme;
    const names = { cyberpunk:'КИБЕРПАНК', military:'ВОЕННАЯ', crimson:'КРОВАВАЯ', forest:'ЛЕСНАЯ', ocean:'ОКЕАН', sunset:'ЗАКАТ' };
    const el = document.getElementById('theme-name'); if(el) el.textContent = names[theme] || theme.toUpperCase();
    document.querySelectorAll('.theme-option').forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
    localStorage.setItem('protocol225-theme', theme);
}

// ==================== АККАУНТЫ В JSONBIN ====================
async function loadAllUsers() {
    try {
        const response = await fetch(`${JSONBIN_BASE}/${USERS_BIN_ID}/latest`, { headers: { 'X-Master-Key': JSONBIN_API_KEY } });
        if(!response.ok) return { users: [] };
        const data = await response.json();
        return data.record || { users: [] };
    } catch(e) { return { users: [] }; }
}

async function saveAllUsers(usersData) {
    await fetch(`${JSONBIN_BASE}/${USERS_BIN_ID}`, {
        method: 'PUT', headers: { 'Content-Type':'application/json', 'X-Master-Key':JSONBIN_API_KEY, 'X-Bin-Private':'false' },
        body: JSON.stringify(usersData)
    });
}

async function registerUser(username, password) {
    const data = await loadAllUsers();
    if(data.users.find(u => u.username.toLowerCase() === username.toLowerCase())) throw new Error('Пользователь уже существует');
    const newUser = { username, password: hashPassword(password), avatar:'👤', code:generateCode(), friends:[], wins:0, losses:0, draws:0, createdAt: new Date().toISOString() };
    data.users.push(newUser); await saveAllUsers(data);
    return newUser;
}

async function loginUser(username, password) {
    const data = await loadAllUsers();
    const user = data.users.find(u => u.username.toLowerCase()===username.toLowerCase() && u.password===hashPassword(password));
    if(!user) throw new Error('Неверный логин или пароль');
    return user;
}

async function updateUserStats(username, statsUpdate) {
    const data = await loadAllUsers();
    const user = data.users.find(u => u.username === username);
    if(user) {
        if(statsUpdate.wins!==undefined) user.wins += statsUpdate.wins;
        if(statsUpdate.losses!==undefined) user.losses += statsUpdate.losses;
        if(statsUpdate.draws!==undefined) user.draws += statsUpdate.draws;
        if(statsUpdate.friends!==undefined) user.friends = statsUpdate.friends;
        await saveAllUsers(data);
    }
}

async function addFriendByCode(myUsername, friendCode) {
    const data = await loadAllUsers();
    const friend = data.users.find(u => u.code === friendCode);
    if(!friend) throw new Error('Пользователь с таким кодом не найден');
    if(friend.username === myUsername) throw new Error('Нельзя добавить себя');
    const me = data.users.find(u => u.username === myUsername);
    if(me.friends.find(f => f.code === friendCode)) throw new Error('Уже в друзьях');
    me.friends.push({ username:friend.username, code:friendCode });
    await saveAllUsers(data);
    return me.friends;
}

// ==================== ИНТЕРФЕЙС АККАУНТА ====================
function showLoginScreen() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('auth-menu').style.display = 'flex';
    document.getElementById('auth-title').textContent = 'ВХОД';
    document.getElementById('auth-error').textContent = '';
    const savedLogin = localStorage.getItem('protocol225-user-login');
    if(savedLogin) {
        document.getElementById('auth-username').value = savedLogin;
        document.getElementById('auth-error').textContent = 'Введите пароль для ' + savedLogin;
    }
}

function showRegisterScreen() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('auth-menu').style.display = 'flex';
    document.getElementById('auth-title').textContent = 'РЕГИСТРАЦИЯ';
    document.getElementById('auth-error').textContent = '';
}

async function handleLogin() {
    const username = document.getElementById('auth-username').value.trim();
    const password = document.getElementById('auth-password').value;
    if(!username||!password) { document.getElementById('auth-error').textContent='Заполните все поля'; return; }
    try { currentUser = await loginUser(username, password); onLoginSuccess(); }
    catch(e) { document.getElementById('auth-error').textContent = e.message; }
}

async function handleRegister() {
    const username = document.getElementById('auth-username').value.trim();
    const password = document.getElementById('auth-password').value;
    if(!username||!password) { document.getElementById('auth-error').textContent='Заполните все поля'; return; }
    if(username.length<3) { document.getElementById('auth-error').textContent='Логин минимум 3 символа'; return; }
    if(password.length<4) { document.getElementById('auth-error').textContent='Пароль минимум 4 символа'; return; }
    try { currentUser = await registerUser(username, password); onLoginSuccess(); }
    catch(e) { document.getElementById('auth-error').textContent = e.message; }
}

function onLoginSuccess() {
    // Сохраняем ТОЛЬКО логин для автозаполнения
    localStorage.setItem('protocol225-user-login', currentUser.username);
    
    document.getElementById('auth-menu').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
    document.getElementById('user-info-display').textContent = `${currentUser.avatar} ${currentUser.username}`;
    document.getElementById('user-stats-display').textContent = `Побед: ${currentUser.wins} | Поражений: ${currentUser.losses} | Ничьих: ${currentUser.draws}`;
    document.getElementById('my-code-display').textContent = currentUser.code;
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('register-btn-menu').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'inline-block';
    updateFriendsList();
}

function logout() {
    localStorage.removeItem('protocol225-user-login');
    currentUser = null;
    document.getElementById('main-menu').style.display = 'flex';
    document.getElementById('user-info-display').textContent = '👤 Гость';
    document.getElementById('user-stats-display').textContent = '';
    document.getElementById('login-btn').style.display = 'inline-block';
    document.getElementById('register-btn-menu').style.display = 'inline-block';
    document.getElementById('logout-btn').style.display = 'none';
    const c = document.getElementById('friends-list-container');
    if(c) c.innerHTML = '<p class="empty-text">Войдите для списка друзей</p>';
}

async function updateFriendsList() {
    if(!currentUser) return;
    const data = await loadAllUsers();
    const me = data.users.find(u => u.username === currentUser.username);
    if(me) {
        currentUser.friends = me.friends;
        const c = document.getElementById('friends-list-container');
        if(!c) return;
        if(me.friends.length===0) { c.innerHTML='<p class="empty-text">Нет друзей</p>'; return; }
        c.innerHTML = me.friends.map(f => `
            <div class="friend-item">
                <span>${f.username} (${f.code})</span>
                <div>
                    <button onclick="challengeFriend('${f.code}')">⚔️</button>
                    <button onclick="removeFriendFromList('${f.code}')">❌</button>
                </div>
            </div>
        `).join('');
    }
}

async function addFriendByUI() {
    const code = document.getElementById('friend-code-input').value.trim();
    if(!code||!currentUser) return;
    try { currentUser.friends = await addFriendByCode(currentUser.username, code); document.getElementById('friend-code-input').value=''; updateFriendsList(); }
    catch(e) { alert(e.message); }
}

async function removeFriendFromList(code) {
    if(!currentUser) return;
    currentUser.friends = currentUser.friends.filter(f => f.code !== code);
    await updateUserStats(currentUser.username, { friends: currentUser.friends });
    updateFriendsList();
}

function challengeFriend(code) {
    document.getElementById('friends-menu').style.display='none';
    document.getElementById('online-menu').style.display='flex';
    document.getElementById('join-room-input').value = code;
    joinOnlineRoom();
}

// ==================== ОНЛАЙН ====================
async function saveToJSONBin(data) {
    const isNew = !onlineRoomId || onlineRoomId.length < 20;
    const url = isNew ? JSONBIN_BASE : `${JSONBIN_BASE}/${onlineRoomId}`;
    const method = isNew ? 'POST' : 'PUT';
    const response = await fetch(url, {
        method, headers: { 'Content-Type':'application/json', 'X-Master-Key':JSONBIN_API_KEY, 'X-Bin-Private':'false' },
        body: JSON.stringify(data)
    });
    if(!response.ok) throw new Error('Ошибка сохранения');
    const result = await response.json();
    const binId = result.metadata?.id || result.id;
    if(binId) onlineRoomId = binId;
    return binId;
}

async function loadFromJSONBin(binId) {
    const response = await fetch(`${JSONBIN_BASE}/${binId}/latest`, { headers:{'X-Master-Key':JSONBIN_API_KEY} });
    if(!response.ok) throw new Error('Комната не найдена');
    const result = await response.json();
    return result.record;
}

async function createOnlineRoom() {
    document.getElementById('online-status').textContent = 'Создание...';
    try {
        onlinePlayerNumber = 1;
        const allIds = shuffle(ALL_CARDS).map(c => c.id);
        const gameState = {
            player1:{ name:currentUser?.username||'Игрок1', hand:allIds.splice(0,6), passed:false },
            player2:{ name:'Ожидание...', hand:[], passed:false },
            deck:allIds, discardPile:[], turn:1, status:'waiting'
        };
        const binId = await saveToJSONBin(gameState);
        onlineRoomId = binId;
        document.getElementById('room-code-display').textContent = binId;
        document.getElementById('room-created-info').style.display = 'block';
        document.getElementById('online-status').textContent = 'Отправь код другу. Ожидание...';
        if(onlinePollingInterval) clearInterval(onlinePollingInterval);
        onlinePollingInterval = setInterval(async () => {
            try { const state = await loadFromJSONBin(binId); if(state.status==='playing'&&onlinePlayerNumber===1) { clearInterval(onlinePollingInterval); startOnlineGame(state); } } catch(e) {}
        }, 2000);
    } catch(e) { document.getElementById('online-status').textContent = 'Ошибка: '+e.message; }
}

async function joinOnlineRoom() {
    const roomId = document.getElementById('join-room-input').value.trim();
    if(!roomId) return;
    document.getElementById('online-status').textContent = 'Подключение...';
    try {
        const gameState = await loadFromJSONBin(roomId);
        if(gameState.status!=='waiting') { document.getElementById('online-status').textContent='Комната занята'; return; }
        onlineRoomId = roomId; onlinePlayerNumber = 2;
        const deckIds = [...gameState.deck];
        gameState.player2 = { name:currentUser?.username||'Игрок2', hand:deckIds.splice(0,6), passed:false };
        gameState.deck = deckIds; gameState.status = 'playing'; gameState.turn = 1;
        await saveToJSONBin(gameState);
        document.getElementById('online-status').textContent = 'Подключено!';
        setTimeout(() => startOnlineGame(gameState), 500);
    } catch(e) { document.getElementById('online-status').textContent = 'Ошибка: '+e.message; }
}

function startOnlineGame(gameState) {
    gameMode = 'online';
    const allCardsMap = {}; ALL_CARDS.forEach(c => allCardsMap[c.id] = {...c});
    mainDeck = gameState.deck.map(id => allCardsMap[id]).filter(c=>c);
    discardPile = (gameState.discardPile||[]).map(id => allCardsMap[id]).filter(c=>c);
    playerHand = (onlinePlayerNumber===1 ? gameState.player1.hand : gameState.player2.hand).map(id => allCardsMap[id]).filter(c=>c);
    enemyHand = [];
    document.getElementById('main-menu').style.display='none';
    document.getElementById('online-menu').style.display='none';
    document.getElementById('game-container').style.display='flex';
    document.getElementById('game-mode-text').textContent = `Онлайн: ${currentUser?.username||'Вы'}`;
    document.getElementById('enemy-name').textContent = '🌐 Соперник';
    roundActive=true; playerPassed=false; enemyPassed=false; gameOver=false;
    playerTurn=(gameState.turn===onlinePlayerNumber); pendingBattle=false;
    playerUsedPass=false; playerSupportBonus=0;
    playedPlayerCard=null; playedEnemyCard=null; lastBattleResult=null;
    turnHistory=[]; stats={playerWins:0,enemyWins:0,draws:0};
    renderAll();
    if(!playerTurn) startOnlinePollingForTurn();
}

function startOnlinePollingForTurn() {
    if(onlinePollingInterval) clearInterval(onlinePollingInterval);
    onlinePollingInterval = setInterval(async () => {
        try {
            const state = await loadFromJSONBin(onlineRoomId);
            if(state.status==='finished') { clearInterval(onlinePollingInterval); return; }
            if(state.turn===onlinePlayerNumber && state.status==='playing') { clearInterval(onlinePollingInterval); updateFromOnlineState(state); }
        } catch(e) {}
    }, 2000);
}

function updateFromOnlineState(state) {
    const allCardsMap = {}; ALL_CARDS.forEach(c => allCardsMap[c.id] = {...c});
    mainDeck = state.deck.map(id => allCardsMap[id]).filter(c=>c);
    discardPile = (state.discardPile||[]).map(id => allCardsMap[id]).filter(c=>c);
    const myData = onlinePlayerNumber===1 ? state.player1 : state.player2;
    const enemyData = onlinePlayerNumber===1 ? state.player2 : state.player1;
    playerHand = myData.hand.map(id => allCardsMap[id]).filter(c=>c);
    if(enemyData.hand) enemyHand = enemyData.hand.map(id => allCardsMap[id]).filter(c=>c);
    playerPassed = myData.passed; enemyPassed = enemyData.passed;
    playerTurn = true; pendingBattle = false;
    playedPlayerCard = null; playedEnemyCard = null;
    if(playerPassed && enemyPassed) endRound();
    renderAll();
}

async function sendOnlineMove(action) {
    if(!onlineRoomId || gameMode!=='online') return;
    try {
        const state = await loadFromJSONBin(onlineRoomId);
        if(onlinePlayerNumber===1) { state.player1.hand=playerHand.map(c=>c.id); state.player1.passed=playerPassed; }
        else { state.player2.hand=playerHand.map(c=>c.id); state.player2.passed=playerPassed; }
        state.deck = mainDeck.map(c=>c.id); state.discardPile = discardPile.map(c=>c.id);
        state.turn = onlinePlayerNumber===1 ? 2 : 1; state.action = action;
        await saveToJSONBin(state);
        playerTurn = false; renderAll();
        startOnlinePollingForTurn();
    } catch(e) { document.getElementById('status-message').textContent = 'Ошибка: '+e.message; }
}

// ==================== БОЙ ====================
function resolveBattle(c1, c2, bonus1=0, bonus2=0) {
    const s1=c1.stars+bonus1, s2=c2.stars+bonus2;
    if(isAgentCard(c1)&&isAgentCard(c2)) return {winner:'draw', text:'Агенты уничтожают друг друга'};
    if(isAgentCard(c1)) return {winner:'card1', text:'Агент ликвидирует цель', steal:true, isAntiAgent:c1.isAntiAgent||false};
    if(isAgentCard(c2)) return {winner:'card2', text:'Агент ликвидирует цель', steal:true, isAntiAgent:c2.isAntiAgent||false};
    if(c1.isLiza) return {winner:'card1', text:'Лиза² уничтожает (225⭐)'};
    if(c2.isLiza) return {winner:'card2', text:'Лиза² уничтожает (225⭐)'};
    if(c1.class===CLASSES.CRIMINAL&&c1.stars>=3&&c1.stars<=5&&c2.class===CLASSES.MILITARY&&c2.stars>=1&&c2.stars<=3) return {winner:'card1',text:`Сильный преступник (${s1}⭐) одолел (${s2}⭐)`};
    if(c2.class===CLASSES.CRIMINAL&&c2.stars>=3&&c2.stars<=5&&c1.class===CLASSES.MILITARY&&c1.stars>=1&&c1.stars<=3) return {winner:'card2',text:`Сильный преступник (${s2}⭐) одолел (${s1}⭐)`};
    if(c1.class===CLASSES.MILITARY&&c2.class===CLASSES.CRIMINAL) return {winner:'card1',text:'Военные > Преступников'};
    if(c2.class===CLASSES.MILITARY&&c1.class===CLASSES.CRIMINAL) return {winner:'card2',text:'Военные > Преступников'};
    if(c1.class===CLASSES.CRIMINAL&&c2.class===CLASSES.CIVILIAN) return {winner:'card1',text:'Преступники > Мирных'};
    if(c2.class===CLASSES.CRIMINAL&&c1.class===CLASSES.CIVILIAN) return {winner:'card2',text:'Преступники > Мирных'};
    if(s1>s2) return {winner:'card1',text:`Больше звёзд (${s1}>${s2})`};
    if(s2>s1) return {winner:'card2',text:`Больше звёзд (${s2}>${s1})`};
    if(c1.class===c2.class) return {winner:'draw',text:'Один. класс + звёзды — ничья'};
    return {winner:'draw',text:'Равные звёзды — ничья'};
}

function stealCard(fromHand, isAntiAgent, callback) {
    if(fromHand.length===0) { if(callback)callback(null); return; }
    if(isAntiAgent) {
        showStealMenu(fromHand, (index) => { if(index===null){callback(null);return;} callback(fromHand.splice(index,1)[0]); });
    } else {
        callback(fromHand.splice(Math.floor(Math.random()*fromHand.length),1)[0]);
    }
}

function drawForPlayer() { let d=0; while(playerHand.length<6&&mainDeck.length>0){ playerHand.push(mainDeck.pop()); d++; } return d; }
function drawForEnemy() { let d=0; while(enemyHand.length<6&&mainDeck.length>0){ enemyHand.push(mainDeck.pop()); d++; } return d; }

// ==================== ХОДЫ ====================
function playerPlayCard(index) {
    if(!roundActive||!playerTurn||playerPassed||gameOver||pendingBattle||stealMode) return;
    const card = playerHand[index];
    if(card.class===CLASSES.SUPPORT) {
        if(!playedPlayerCard) { document.getElementById('status-message').textContent='Сначала выложите боевую карту'; return; }
        if(playerSupportBonus>=3) { document.getElementById('status-message').textContent='Максимум +3⭐'; return; }
        playerSupportBonus++;
        discardPile.push(playerHand.splice(index,1)[0]);
        addHistory('player', card, `+1⭐ (всего +${playerSupportBonus}⭐)`, '');
        AudioEngine.play('card');
        document.getElementById('status-message').textContent=`+1⭐ (всего +${playerSupportBonus}⭐)`;
        renderAll(); return;
    }
    if(card.isSupportCombo) {
        if(!playedPlayerCard) { document.getElementById('status-message').textContent='Сначала выложите боевую карту'; return; }
        playerSupportBonus += card.bonusStars;
        discardPile.push(playerHand.splice(index,1)[0]);
        addHistory('player', card, `+${card.bonusStars}⭐ (всего +${playerSupportBonus}⭐)`, '');
        AudioEngine.play('card');
        document.getElementById('status-message').textContent=`+${card.bonusStars}⭐ к карте!`;
        renderAll(); return;
    }
    AudioEngine.play('card');
    const played = playerHand.splice(index,1)[0];
    playedPlayerCard = played;
    addHistory('player', played, playerSupportBonus>0?`+${playerSupportBonus}⭐`:'', null);
    playerTurn = false; pendingBattle = true;
    renderAll();
    if(gameMode==='online') { sendOnlineMove({type:'play',card:played.id,bonus:playerSupportBonus}); }
    else { setTimeout(()=>enemyPlay(played, playerSupportBonus), 700); }
}

function playerPass() {
    if(!roundActive||!playerTurn||playerUsedPass||gameOver||pendingBattle) return;
    playerPassed = true; playerUsedPass = true;
    addHistory('player', {name:'ПАС',stars:0,icon:'🚫',class:'none'}, '', null);
    playerTurn = false;
    if(enemyPassed) { endRound(); return; }
    renderAll();
    if(gameMode==='online') { sendOnlineMove({type:'pass'}); }
    else { setTimeout(()=>enemyPlay(null), 500); }
}

function giveTurn() {
    if(!roundActive||!playerTurn||playerUsedPass||gameOver||pendingBattle) return;
    playerUsedPass = true;
    addHistory('player', {name:'ОТДАЛ ХОД',stars:0,icon:'🔄',class:'none'}, '', null);
    playerTurn = false;
    renderAll();
    if(gameMode==='online') { sendOnlineMove({type:'pass'}); }
    else { setTimeout(()=>enemyPlay(null), 400); }
}

function playerDraw() {
    if(!roundActive||gameOver||pendingBattle) return;
    if(mainDeck.length===0) { document.getElementById('status-message').textContent='Колода пуста!'; return; }
    if(playerHand.length>=6) { document.getElementById('status-message').textContent='Уже 6 карт!'; return; }
    AudioEngine.play('drawCard');
    const drawn = drawForPlayer();
    document.getElementById('status-message').textContent=`Добрано: ${drawn}`;
    renderAll();
}

// ==================== МОДАЛКИ ====================
function showStealMenu(hand, cb) {
    stealMode=true; stealCallback=cb;
    document.getElementById('steal-modal').classList.add('active');
    const grid = document.getElementById('steal-cards-grid'); grid.innerHTML = '';
    hand.forEach((c,i)=>{ const d=renderCard(c,false,i,true); d.addEventListener('click',()=>{ document.getElementById('steal-modal').classList.remove('active'); stealMode=false; cb(i); }); grid.appendChild(d); });
}

function showComboMenu() {
    if(playerHand.length<2) { document.getElementById('status-message').textContent='Недостаточно карт'; return; }
    document.getElementById('combo-modal').classList.add('active');
    selectedComboCards=[]; updateComboSelection();
}
function closeComboMenu() { document.getElementById('combo-modal').classList.remove('active'); }

function toggleComboCard(i) {
    const idx=selectedComboCards.indexOf(i);
    if(idx>=0) selectedComboCards.splice(idx,1);
    else { if(selectedComboCards.length>=3) selectedComboCards.shift(); selectedComboCards.push(i); }
    updateComboSelection();
}

function updateComboSelection() {
    const grid=document.getElementById('combo-cards-grid'); grid.innerHTML='';
    playerHand.forEach((c,i)=>{ const d=renderCard(c,false,i,true); if(selectedComboCards.includes(i)) d.classList.add('selected'); d.addEventListener('click',()=>toggleComboCard(i)); grid.appendChild(d); });
    const info=document.getElementById('combo-info'), btn=document.getElementById('combo-confirm-btn');
    if(selectedComboCards.length>=2) {
        const ids=selectedComboCards.map(i=>playerHand[i].id), combo=findComboForCards(ids);
        if(combo){ info.innerHTML=`<div style="color:#4aff4a;font-size:14px;">✅ ${combo.name} (${combo.stars}⭐)</div><div style="font-size:10px;color:#aaa;">${combo.description||''}</div>`; btn.disabled=false; btn.textContent='СОЗДАТЬ: '+combo.name; }
        else { info.innerHTML='<div style="color:#ffaa00;">⚠️ Нет комбинации</div>'; btn.disabled=true; btn.textContent='НЕТ КОМБО'; }
    } else { info.innerHTML='<div style="color:#888;">Выберите 2-3 карты</div>'; btn.disabled=true; btn.textContent='ВЫБЕРИТЕ КАРТЫ'; }
    renderComboTable();
}

function renderComboTable() {
    const container = document.getElementById('combo-table-container');
    if(!container) return;
    let html = '<table class="combo-table"><thead><tr><th>Комбо</th><th>Карта 1</th><th>Карта 2</th><th>Карта 3</th><th>⭐</th></tr></thead><tbody>';
    COMBO_RECIPES.forEach(combo => {
        const names = combo.cards.map(id => { const c = ALL_CARDS.find(x => x.id===id); return c ? `${c.icon} ${c.name}` : '???'; });
        const hasAll = combo.cards.every(id => playerHand.some(c => c.id===id));
        html += `<tr class="${hasAll?'combo-available':''}">
            <td>${combo.icon} <b>${combo.name}</b></td>
            <td>${names[0]||''}</td><td>${names[1]||''}</td><td>${names[2]||''}</td>
            <td style="color:#ffd700;font-weight:700;">${combo.stars}⭐${combo.isSupportCombo?' (+'+combo.bonusStars+')':''}</td>
        </tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
}

function confirmCombo() {
    if(selectedComboCards.length<2) return;
    const ids=selectedComboCards.map(i=>playerHand[i].id), combo=findComboForCards(ids);
    if(!combo) return;
    AudioEngine.play('combo');
    [...selectedComboCards].sort((a,b)=>b-a).forEach(i=>playerHand.splice(i,1));
    const comboCard = { id:combo.id, name:combo.name, stars:combo.stars, class:combo.class, icon:combo.icon, isCombo:true, isSupportCombo:combo.isSupportCombo||false, bonusStars:combo.bonusStars||0 };
    playerHand.push(comboCard);
    addHistory('player', comboCard, `Комбо: ${combo.name} (${combo.stars}⭐)`, '');
    showFloatingText('КОМБО!','#ffd700',window.innerWidth/2-40,window.innerHeight/2-60);
    closeComboMenu(); renderAll();
}

// ==================== БОТ ====================
function enemyPlay(playerCard, playerBonus=0) {
    if(gameOver||!roundActive){pendingBattle=false;return;}
    if(enemyHand.length<6&&mainDeck.length>0) drawForEnemy();
    if(enemyPassed){pendingBattle=false;playerTurn=true;renderAll();return;}
    if(!enemyHand.some(c=>isCombatCard(c))){checkStarVictory();if(!gameOver){enemyPassed=true;if(playerPassed)endRound();}pendingBattle=false;playerTurn=true;renderAll();return;}
    const combat=enemyHand.filter(c=>isCombatCard(c)).sort((a,b)=>a.stars-b.stars);
    const chosen=combat[0], idx=enemyHand.indexOf(chosen);
    playedEnemyCard=enemyHand.splice(idx,1)[0];
    let enemyBonus = 0;
    const supportCards = enemyHand.filter(c => c.class===CLASSES.SUPPORT);
    if(supportCards.length>0 && !isAgentCard(playedEnemyCard) && !playedEnemyCard.isLiza) {
        const sIdx = enemyHand.indexOf(supportCards[0]);
        enemyHand.splice(sIdx,1);
        enemyBonus = 1;
    }
    AudioEngine.play('card');
    let rt='', rtype='';
    if(playerCard){
        const r=resolveBattle(playerCard, playedEnemyCard, playerBonus, enemyBonus);
        if(r.winner==='card1'){rt='Победа: '+r.text;rtype='win';stats.playerWins++;AudioEngine.play('win');discardPile.push(playedEnemyCard);playedEnemyCard=null;if(r.steal&&enemyHand.length>0){stealCard(enemyHand,r.isAntiAgent,(s)=>{if(s)playerHand.push(s);finishBattle(rtype);});renderAll();return;}}
        else if(r.winner==='card2'){rt='Поражение: '+r.text;rtype='lose';stats.enemyWins++;AudioEngine.play('lose');shakeScreen();discardPile.push(playerCard);playedPlayerCard=null;if(r.steal&&playerHand.length>0){stealCard(playerHand,true,(s)=>{if(s)enemyHand.push(s);finishBattle(rtype);});renderAll();return;}}
        else {rt='Ничья: '+r.text;rtype='draw';stats.draws++;AudioEngine.play('draw');discardPile.push(playerCard);discardPile.push(playedEnemyCard);playedPlayerCard=null;playedEnemyCard=null;}
    } else {rt='Карта выложена';rtype='';}
    addHistory('enemy', chosen, rt, rtype);
    lastBattleResult={text:rt,type:rtype}; finishBattle(rtype); renderAll();
}

function finishBattle(rt){
    setTimeout(()=>{if(rt==='win')playedEnemyCard=null;if(rt==='lose')playedPlayerCard=null;if(rt==='draw'){playedPlayerCard=null;playedEnemyCard=null;}lastBattleResult=null;pendingBattle=false;playerSupportBonus=0;renderAll();},rt?1500:500);
    if(playerPassed&&enemyPassed){setTimeout(()=>endRound(),1500);return;}
    setTimeout(()=>{if(!gameOver&&roundActive&&!(playerPassed&&enemyPassed)){playerTurn=true;renderAll();}},rt?1600:600);
    checkWinCondition();
}

function checkStarVictory(){
    const pc=playerHand.some(c=>isCombatCard(c)),ec=enemyHand.some(c=>isCombatCard(c));
    if(!pc&&!ec){const ps=getTotalStars(playerHand),es=getTotalStars(enemyHand);if(ps>es){gameOver=true;AudioEngine.play('victory');document.getElementById('status-message').textContent=`🏆 ПОБЕДА ПО ЗВЁЗДАМ! (${ps}>${es})`;}else if(es>ps){gameOver=true;AudioEngine.play('lose');document.getElementById('status-message').textContent=`💀 ПОРАЖЕНИЕ (${ps}<${es})`;shakeScreen();}roundActive=false;renderAll();}
}

function endRound(){
    roundActive=false;pendingBattle=false;playedPlayerCard=null;playedEnemyCard=null;lastBattleResult=null;
    playerSupportBonus=0;playerUsedPass=false;
    drawForPlayer();drawForEnemy();
    document.getElementById('battle-result').textContent='';document.getElementById('vs-text').textContent='⚔️';
    checkWinCondition();renderAll();
}

function newRound(){
    if(gameOver){newGame();return;}
    roundActive=true;playerPassed=false;enemyPassed=false;playerTurn=true;pendingBattle=false;
    lastBattleResult=null;playedPlayerCard=null;playedEnemyCard=null;
    playerSupportBonus=0;playerUsedPass=false;
    document.getElementById('battle-result').textContent='';document.getElementById('vs-text').textContent='⚔️';renderAll();
}

function checkWinCondition(){
    if(playerHand.length===0&&mainDeck.length===0){gameOver=true;AudioEngine.play('victory');document.getElementById('status-message').textContent='🏆 ПОБЕДА!';if(currentUser)updateUserStats(currentUser.username,{wins:1});}
    else if(enemyHand.length===0&&mainDeck.length===0){gameOver=true;AudioEngine.play('lose');document.getElementById('status-message').textContent='💀 ПОРАЖЕНИЕ';if(currentUser)updateUserStats(currentUser.username,{losses:1});shakeScreen();}
    if(!gameOver)checkStarVictory();
}

function newGame(){
    if(onlinePollingInterval)clearInterval(onlinePollingInterval);
    const all=shuffle(ALL_CARDS); mainDeck=[...all]; discardPile=[]; playerHand=[]; enemyHand=[];
    for(let i=0;i<6;i++){if(mainDeck.length)playerHand.push(mainDeck.pop());if(mainDeck.length)enemyHand.push(mainDeck.pop());}
    roundActive=true;playerPassed=false;enemyPassed=false;playerTurn=true;gameOver=false;pendingBattle=false;
    lastBattleResult=null;turnHistory=[];stats={playerWins:0,enemyWins:0,draws:0};
    playedPlayerCard=null;playedEnemyCard=null;playerSupportBonus=0;playerUsedPass=false;
    document.getElementById('battle-result').textContent='';document.getElementById('vs-text').textContent='⚔️';renderAll();
}

// ==================== ОТРИСОВКА ====================
function renderCard(card, isEnemy=false, index=null, clickable=true) {
    const div = document.createElement('div'); div.className = 'card';
    if(isEnemy && gameMode!=='online') { div.classList.add('card-back'); div.innerHTML='<span style="font-size:20px;">🂠</span>'; return div; }
    div.classList.add(getCardClassCSS(card));
    if(card.isCombo) { div.style.borderColor='#ffd700'; div.style.boxShadow='0 0 15px rgba(255,215,0,0.5)'; }
    if(index!==null && clickable) { div.dataset.index=index; div.addEventListener('click',()=>{if(!stealMode)playerPlayCard(index);}); }
    else if(!clickable) { div.style.opacity='0.5'; div.style.cursor='not-allowed'; }
    div.innerHTML = `${card.isCombo?'<div style="position:absolute;top:2px;right:2px;font-size:8px;">🔗</div>':''}<div class="card-icon">${card.icon}</div><div class="card-name">${card.name}</div><div class="card-stars">${'⭐'.repeat(Math.min(card.stars,5))}${card.stars>5?' '+card.stars:''}</div><div class="card-class">${getCardClassText(card)}</div>`;
    return div;
}

function renderBattleCard(card, bonus=0) {
    const div = document.createElement('div'); div.className = 'card'; div.classList.add(getCardClassCSS(card));
    if(card.isCombo) { div.style.borderColor='#ffd700'; div.style.boxShadow='0 0 15px rgba(255,215,0,0.5)'; }
    div.style.cursor='default';
    let bonusHTML = bonus>0 ? `<div style="color:#4aff4a;font-size:9px;position:absolute;bottom:2px;">+${bonus}⭐</div>` : '';
    div.innerHTML = `${card.isCombo?'<div style="position:absolute;top:2px;right:2px;font-size:8px;">🔗</div>':''}<div class="card-icon">${card.icon}</div><div class="card-name">${card.name}</div><div class="card-stars">${'⭐'.repeat(Math.min(card.stars,5))}${card.stars>5?' '+card.stars:''}</div>${bonusHTML}<div class="card-class">${getCardClassText(card)}</div>`;
    return div;
}

function renderAll() {
    const pr = document.getElementById('player-cards'); pr.innerHTML = '';
    const canAct = roundActive && playerTurn && !playerPassed && !gameOver && !pendingBattle && !stealMode;
    playerHand.forEach((c,i) => pr.appendChild(renderCard(c,false,i,canAct)));
    const er = document.getElementById('enemy-cards'); er.innerHTML = '';
    enemyHand.forEach(c => er.appendChild(renderCard(c, true)));
    const ps = document.getElementById('player-battle-slot'); ps.innerHTML='<span class="slot-label">Вы</span>';
    if(playedPlayerCard) { ps.appendChild(renderBattleCard(playedPlayerCard, playerSupportBonus)); ps.classList.add('active'); } else ps.classList.remove('active');
    const es = document.getElementById('enemy-battle-slot'); es.innerHTML='<span class="slot-label">Противник</span>';
    if(playedEnemyCard) { es.appendChild(renderBattleCard(playedEnemyCard)); es.classList.add('active'); } else es.classList.remove('active');
    document.getElementById('player-count').textContent = `Карт: ${playerHand.length}`;
    document.getElementById('enemy-count').textContent = `Карт: ${enemyHand.length}`;
    document.getElementById('deck-count').textContent = mainDeck.length;
    document.getElementById('discard-count').textContent = discardPile.length;
    document.getElementById('player-wins').textContent = stats.playerWins;
    document.getElementById('enemy-wins').textContent = stats.enemyWins;
    document.getElementById('draws').textContent = stats.draws;
    const br = document.getElementById('battle-result'), vt = document.getElementById('vs-text');
    if(lastBattleResult) { br.textContent=lastBattleResult.text; br.className='battle-result '+lastBattleResult.type; vt.textContent=lastBattleResult.type==='win'?'✅':lastBattleResult.type==='lose'?'❌':'💀'; vt.className='vs-text '+lastBattleResult.type; }
    else { br.textContent=''; br.className='battle-result'; vt.textContent='⚔️'; vt.className='vs-text'; }
    const passBtn=document.getElementById('pass-btn'), giveBtn=document.getElementById('give-turn-btn'), drawBtn=document.getElementById('draw-btn'), comboBtn=document.getElementById('combo-btn');
    if(passBtn) passBtn.disabled = !canAct||playerUsedPass;
    if(giveBtn) giveBtn.disabled = !canAct||playerUsedPass;
    if(drawBtn) drawBtn.disabled = !roundActive||mainDeck.length===0||playerHand.length>=6||pendingBattle;
    if(comboBtn) comboBtn.disabled = !canAct||playerHand.length<2;
    updateStatus();
}

function updateStatus() {
    const s = document.getElementById('status-message'); if(gameOver) return;
    if(stealMode) s.textContent='Выберите карту для кражи';
    else if(!roundActive) s.textContent='Раунд завершён. «НОВЫЙ РАУНД».';
    else if(pendingBattle) s.textContent='Сражение...';
    else if(playerTurn&&!playerPassed) s.textContent=gameMode==='online'?'Ваш ход (онлайн)':'Ваш ход';
    else s.textContent=gameMode==='online'?'Ожидание соперника...':'Ход компьютера...';
}

function addHistory(actor, card, resultText, resultType) {
    turnHistory.push({actor,card,resultText,resultType}); if(turnHistory.length>50) turnHistory.shift();
}

// ==================== НАВИГАЦИЯ ====================
function showMenu() { document.getElementById('game-container').style.display='none'; document.getElementById('main-menu').style.display='flex'; }
function startBotGame() { gameMode='bot'; document.getElementById('main-menu').style.display='none'; document.getElementById('game-container').style.display='flex'; newGame(); }
function toggleRules() { document.getElementById('rules-modal').classList.toggle('active'); }
function showOnlineMenu() { document.getElementById('main-menu').style.display='none'; document.getElementById('online-menu').style.display='flex'; }
function showFriendsMenu() { document.getElementById('main-menu').style.display='none'; document.getElementById('friends-menu').style.display='flex'; updateFriendsList(); }

// ==================== ИНИЦИАЛИЗАЦИЯ ====================
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('protocol225-theme') || 'cyberpunk'; setTheme(saved);
    
    // Автозаполнение логина (пароль не храним)
    const savedLogin = localStorage.getItem('protocol225-user-login');
    if(savedLogin) {
        document.getElementById('auth-username').value = savedLogin;
    }
    
    document.getElementById('start-game-btn').addEventListener('click', ()=>{ if(!currentUser){showLoginScreen();return;} startBotGame(); });
    document.getElementById('online-btn').addEventListener('click', ()=>{ if(!currentUser){showLoginScreen();return;} showOnlineMenu(); });
    document.getElementById('friends-btn').addEventListener('click', ()=>{ if(!currentUser){showLoginScreen();return;} showFriendsMenu(); });
    document.getElementById('menu-rules-btn').addEventListener('click', toggleRules);
    document.getElementById('theme-btn').addEventListener('click', ()=>document.getElementById('theme-selector').classList.toggle('active'));
    document.querySelectorAll('.theme-option').forEach(btn=>btn.addEventListener('click',()=>{setTheme(btn.dataset.theme);document.getElementById('theme-selector').classList.remove('active');}));
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('login-btn').addEventListener('click', showLoginScreen);
    document.getElementById('register-btn-menu').addEventListener('click', showRegisterScreen);
    document.getElementById('auth-login-btn').addEventListener('click', handleLogin);
    document.getElementById('auth-register-btn').addEventListener('click', handleRegister);
    document.getElementById('auth-back-btn').addEventListener('click', ()=>{ document.getElementById('auth-menu').style.display='none'; document.getElementById('main-menu').style.display='flex'; });
    document.getElementById('add-friend-btn').addEventListener('click', addFriendByUI);
    document.getElementById('copy-code-btn').addEventListener('click', ()=>navigator.clipboard.writeText(currentUser?.code||'').then(()=>alert('Код скопирован!')));
    document.getElementById('friends-back-btn').addEventListener('click', ()=>{ document.getElementById('friends-menu').style.display='none'; document.getElementById('main-menu').style.display='flex'; });
    document.getElementById('create-room-btn').addEventListener('click', createOnlineRoom);
    document.getElementById('join-room-btn').addEventListener('click', joinOnlineRoom);
    document.getElementById('copy-room-btn').addEventListener('click', ()=>navigator.clipboard.writeText(document.getElementById('room-code-display').textContent).then(()=>alert('Код скопирован!')));
    document.getElementById('online-back-btn').addEventListener('click', ()=>{ document.getElementById('online-menu').style.display='none'; document.getElementById('main-menu').style.display='flex'; });
    document.getElementById('pass-btn').addEventListener('click', playerPass);
    document.getElementById('give-turn-btn').addEventListener('click', giveTurn);
    document.getElementById('draw-btn').addEventListener('click', playerDraw);
    document.getElementById('combo-btn').addEventListener('click', showComboMenu);
    document.getElementById('combo-confirm-btn').addEventListener('click', confirmCombo);
    document.getElementById('combo-cancel-btn').addEventListener('click', closeComboMenu);
    document.getElementById('new-round-btn').addEventListener('click', newRound);
    document.getElementById('menu-btn').addEventListener('click', showMenu);
    document.getElementById('close-rules-btn').addEventListener('click', toggleRules);
    document.getElementById('main-deck-pile').addEventListener('click', playerDraw);
    document.getElementById('rules-modal').addEventListener('click', function(e){if(e.target===this)toggleRules();});
    document.getElementById('steal-modal').addEventListener('click', function(e){if(e.target===this){this.classList.remove('active');stealMode=false;if(stealCallback)stealCallback(null);}});
    document.getElementById('combo-modal').addEventListener('click', function(e){if(e.target===this)closeComboMenu();});
    document.body.addEventListener('click', ()=>{ AudioEngine.init(); if(AudioEngine.ctx?.state==='suspended') AudioEngine.ctx.resume(); }, {once:true});
});

window.challengeFriend = challengeFriend;
window.removeFriendFromList = removeFriendFromList;