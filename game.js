// 游戏状态
const gameState = {
    cultivation: '练气期',
    cultivationLevel: 1,
    spirit: 100,
    maxSpirit: 100,
    spiritStones: 0,
    equipment: {
        weapon: null,
        armor: null,
        accessory: null
    },
    currentScene: 'start',
    // 添加战斗相关状态
    inBattle: false,
    currentEnemy: null,
    learnedSpells: [],
    // 添加战斗属性
    attack: 10,
    defense: 5,
    hp: 100,
    maxHp: 100,
    isBossBattle: false
};

// 装备数据
const equipment = {
    weapons: [
        { id: 'wooden_sword', name: '木剑', damage: 5, spiritCost: 10, price: 50 },
        { id: 'iron_sword', name: '铁剑', damage: 8, spiritCost: 15, price: 100 },
        { id: 'spirit_sword', name: '灵剑', damage: 12, spiritCost: 20, price: 200 },
        { id: 'fire_sword', name: '火灵剑', damage: 15, spiritCost: 25, price: 300, element: 'fire' },
        { id: 'wind_sword', name: '风灵剑', damage: 15, spiritCost: 25, price: 300, element: 'wind' }
    ],
    armors: [
        { id: 'cotton_robe', name: '布衣', defense: 3, spiritCost: 5, price: 50 },
        { id: 'spirit_robe', name: '灵衣', defense: 6, spiritCost: 10, price: 100 },
        { id: 'immortal_robe', name: '仙衣', defense: 10, spiritCost: 15, price: 200 },
        { id: 'fire_robe', name: '火灵衣', defense: 12, spiritCost: 20, price: 300, element: 'fire' },
        { id: 'wind_robe', name: '风灵衣', defense: 12, spiritCost: 20, price: 300, element: 'wind' }
    ],
    accessories: [
        { id: 'spirit_ring', name: '聚灵戒指', spiritBonus: 10, price: 100 },
        { id: 'cultivation_ring', name: '修炼戒指', cultivationBonus: 5, price: 100 },
        { id: 'wealth_ring', name: '聚财戒指', spiritStoneBonus: 5, price: 150 },
        { id: 'fire_ring', name: '火灵戒指', spiritBonus: 15, price: 200, element: 'fire' },
        { id: 'wind_ring', name: '风灵戒指', spiritBonus: 15, price: 200, element: 'wind' }
    ]
};

// 敌人数据
const enemies = {
    // 普通野兽
    wild_beast: {
        name: '野兽',
        hp: 50,
        attack: 8,
        defense: 3,
        spiritStones: 20,
        possibleDrops: ['weapons', 'armors', 'accessories']
    },
    spirit_beast: {
        name: '灵兽',
        hp: 80,
        attack: 12,
        defense: 5,
        spiritStones: 40,
        possibleDrops: ['weapons', 'armors', 'accessories']
    },
    demon: {
        name: '魔物',
        hp: 100,
        attack: 15,
        defense: 8,
        spiritStones: 60,
        possibleDrops: ['weapons', 'armors', 'accessories']
    },
    // 修仙者
    cultivator_1: {
        name: '练气期修士',
        hp: 70,
        attack: 10,
        defense: 6,
        spiritStones: 30,
        possibleDrops: ['weapons', 'armors', 'accessories'],
        description: '一位初入修仙的修士，实力较弱。'
    },
    cultivator_2: {
        name: '筑基期修士',
        hp: 120,
        attack: 18,
        defense: 12,
        spiritStones: 80,
        possibleDrops: ['weapons', 'armors', 'accessories'],
        description: '一位已经筑基的修士，实力不俗。'
    },
    // 特殊妖兽
    fire_dragon: {
        name: '火蛟',
        hp: 150,
        attack: 25,
        defense: 15,
        spiritStones: 100,
        possibleDrops: ['weapons', 'armors', 'accessories'],
        element: 'fire',
        description: '一条修炼成精的火蛟，擅长火系法术。'
    },
    wind_phoenix: {
        name: '风凰',
        hp: 130,
        attack: 22,
        defense: 12,
        spiritStones: 90,
        possibleDrops: ['weapons', 'armors', 'accessories'],
        element: 'wind',
        description: '一只修炼成精的风凰，擅长风系法术。'
    },
    spirit_tiger: {
        name: '灵虎',
        hp: 180,
        attack: 28,
        defense: 18,
        spiritStones: 120,
        possibleDrops: ['weapons', 'armors', 'accessories'],
        description: '一只修炼成精的猛虎，力大无穷。'
    },
    // 魔道修士
    demon_cultivator: {
        name: '魔道修士',
        hp: 140,
        attack: 20,
        defense: 10,
        spiritStones: 70,
        possibleDrops: ['weapons', 'armors', 'accessories'],
        description: '一位修炼魔功的修士，手段狠辣。'
    },
    // 特殊事件敌人
    treasure_guardian: {
        name: '宝库守护者',
        hp: 200,
        attack: 30,
        defense: 20,
        spiritStones: 150,
        possibleDrops: ['weapons', 'armors', 'accessories'],
        description: '守护宝库的神秘存在，实力强大。'
    }
};

// 添加Boss数据
const bosses = {
    // 练气期Boss
    spirit_king: {
        name: '灵兽之王',
        hp: 300,
        attack: 35,
        defense: 20,
        spiritStones: 500,
        possibleDrops: ['weapons', 'armors', 'accessories'],
        description: '森林中的王者，统领着众多灵兽。',
        specialAbility: '召唤灵兽',
        phase: 1,
        maxPhase: 2
    },
    // 筑基期Boss
    demon_lord: {
        name: '魔道之主',
        hp: 500,
        attack: 45,
        defense: 30,
        spiritStones: 1000,
        possibleDrops: ['weapons', 'armors', 'accessories'],
        description: '魔道修士的领袖，掌握着强大的魔功。',
        specialAbility: '魔气爆发',
        phase: 1,
        maxPhase: 3
    },
    // 金丹期Boss
    immortal_emperor: {
        name: '仙帝',
        hp: 800,
        attack: 60,
        defense: 40,
        spiritStones: 2000,
        possibleDrops: ['weapons', 'armors', 'accessories'],
        description: '传说中的仙帝，掌控着天地之力。',
        specialAbility: '天地法则',
        phase: 1,
        maxPhase: 4
    }
};

// 场景数据
const scenes = {
    start: {
        text: "你出生在一个普通的山村，直到有一天，一位仙人路过，发现你具有修仙的灵根。仙人告诉你，你有着非凡的修仙天赋，并给了你一本基础功法。",
        choices: [
            { text: "开始修炼", nextScene: 'cultivation', action: () => {} },
            { text: "查看功法", nextScene: 'manual', action: () => {} }
        ]
    },
    cultivation: {
        text: "你盘坐在蒲团上，开始修炼。周围的灵气缓缓流入你的体内，你感觉自己的修为在慢慢提升。",
        choices: [
            { text: "继续修炼", nextScene: 'cultivation_result', action: () => cultivate() },
            { text: "休息一下", nextScene: 'rest', action: () => rest() },
            { text: "外出历练", nextScene: 'exploration', action: () => {} }
        ]
    },
    cultivation_result: {
        text: "经过一番修炼，你的修为有所提升。",
        choices: [
            { text: "继续修炼", nextScene: 'cultivation', action: () => {} },
            { text: "查看状态", nextScene: 'status', action: () => {} }
        ]
    },
    manual: {
        text: "你翻开功法，上面记载着基础的修炼方法和一些简单的法术。",
        choices: [
            { text: "学习法术", nextScene: 'spell_learning', action: () => {} },
            { text: "返回修炼", nextScene: 'cultivation', action: () => {} }
        ]
    },
    spell_learning: {
        text: "你开始学习基础法术。",
        choices: [
            { text: "学习火球术", nextScene: 'spell_result', action: () => learnSpell('fireball') },
            { text: "学习御风术", nextScene: 'spell_result', action: () => learnSpell('wind') },
            { text: "返回功法", nextScene: 'manual', action: () => {} }
        ]
    },
    spell_result: {
        text: "法术学习成功！",
        choices: [
            { text: "继续学习", nextScene: 'spell_learning', action: () => {} },
            { text: "返回修炼", nextScene: 'cultivation', action: () => {} }
        ]
    },
    rest: {
        text: "你休息了一会儿，感觉精神好多了。",
        choices: [
            { text: "继续修炼", nextScene: 'cultivation', action: () => {} },
            { text: "查看状态", nextScene: 'status', action: () => {} }
        ]
    },
    status: {
        text: "你查看自己的状态：",
        choices: [
            { text: "返回修炼", nextScene: 'cultivation', action: () => {} }
        ]
    },
    exploration: {
        text: "你离开修炼之地，准备外出历练。",
        choices: [
            { text: "探索森林", nextScene: 'forest', action: () => {} },
            { text: "探索山洞", nextScene: 'cave', action: () => {} },
            { text: "挑战Boss", nextScene: 'boss_selection', action: () => {} },
            { text: "返回修炼", nextScene: 'cultivation', action: () => {} }
        ]
    },
    forest: {
        text: "你进入了一片神秘的森林，这里灵气浓郁，但也充满了危险。",
        choices: [
            { text: "继续探索", nextScene: 'random_encounter', action: () => randomEncounter() },
            { text: "返回", nextScene: 'exploration', action: () => {} }
        ]
    },
    cave: {
        text: "你进入了一个幽深的山洞，这里似乎隐藏着一些秘密。",
        choices: [
            { text: "继续探索", nextScene: 'random_encounter', action: () => randomEncounter() },
            { text: "返回", nextScene: 'exploration', action: () => {} }
        ]
    },
    random_encounter: {
        text: "你遇到了一个敌人！",
        choices: [
            { text: "战斗", nextScene: 'battle', action: () => startBattle() },
            { text: "逃跑", nextScene: 'exploration', action: () => escape() }
        ]
    },
    battle: {
        text: "战斗开始！",
        choices: [
            { text: "普通攻击", nextScene: 'battle_result', action: () => battleTurn() },
            { text: "使用法术", nextScene: 'battle_result', action: () => useSpell() },
            { text: "防御", nextScene: 'battle_result', action: () => battleTurn(true) }
        ]
    },
    battle_result: {
        text: "战斗结果：",
        choices: [
            { text: "继续探索", nextScene: 'exploration', action: () => {} }
        ]
    },
    boss_selection: {
        text: "选择要挑战的Boss：",
        choices: [
            { text: "灵兽之王", nextScene: 'boss_battle', action: () => selectBoss('spirit_king') },
            { text: "魔道之主", nextScene: 'boss_battle', action: () => selectBoss('demon_lord') },
            { text: "仙帝", nextScene: 'boss_battle', action: () => selectBoss('immortal_emperor') },
            { text: "返回", nextScene: 'exploration', action: () => {} }
        ]
    },
    boss_battle: {
        text: "Boss战开始！",
        choices: [
            { text: "普通攻击", nextScene: 'boss_battle_result', action: () => bossBattleTurn() },
            { text: "使用法术", nextScene: 'boss_battle_result', action: () => useSpell() },
            { text: "防御", nextScene: 'boss_battle_result', action: () => bossBattleTurn(true) }
        ]
    },
    boss_battle_result: {
        text: "战斗结果：",
        choices: [
            { text: "继续战斗", nextScene: 'boss_battle', action: () => {} },
            { text: "逃跑", nextScene: 'exploration', action: () => escape() }
        ]
    }
};

// 随机遭遇敌人
function randomEncounter() {
    const enemyTypes = Object.keys(enemies);
    let availableEnemies = [...enemyTypes];
    
    // 根据玩家修为调整敌人出现概率
    if (gameState.cultivation === '练气期') {
        // 练气期主要遇到普通野兽和练气期修士
        availableEnemies = ['wild_beast', 'spirit_beast', 'cultivator_1'];
    } else if (gameState.cultivation === '筑基期') {
        // 筑基期可以遇到所有类型的敌人
        availableEnemies = enemyTypes;
    }
    
    // 添加Boss出现概率
    const bossChance = Math.random();
    if (bossChance < 0.1) { // 10%的概率遇到Boss
        const bossTypes = Object.keys(bosses);
        const randomBoss = bossTypes[Math.floor(Math.random() * bossTypes.length)];
        gameState.currentEnemy = { ...bosses[randomBoss] };
        gameState.isBossBattle = true;
    } else {
        const randomEnemy = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
        gameState.currentEnemy = { ...enemies[randomEnemy] };
        gameState.isBossBattle = false;
    }
    
    gameState.inBattle = true;
}

// 开始战斗
function startBattle() {
    if (!gameState.currentEnemy) {
        randomEncounter();
    }
    const enemy = gameState.currentEnemy;
    let battleText = `你遇到了${enemy.name}！\n`;
    if (enemy.description) {
        battleText += `${enemy.description}\n`;
    }
    battleText += `敌人生命值：${enemy.hp}\n你的生命值：${gameState.hp}`;
    document.getElementById('story-text').textContent = battleText;
}

// 战斗回合
function battleTurn(defending = false) {
    const enemy = gameState.currentEnemy;
    let battleText = '';

    if (defending) {
        battleText += '你选择了防御！\n';
    } else {
        // 玩家攻击
        const damage = Math.max(0, gameState.attack - enemy.defense);
        enemy.hp -= damage;
        battleText += `你对${enemy.name}造成了${damage}点伤害！\n`;
    }

    // 敌人攻击
    if (enemy.hp > 0) {
        let enemyDamage = Math.max(0, enemy.attack - gameState.defense);
        
        // 如果是元素敌人，增加额外伤害
        if (enemy.element) {
            enemyDamage += 5;
            battleText += `${enemy.name}使用了${enemy.element}系法术！\n`;
        }
        
        gameState.hp -= enemyDamage;
        battleText += `${enemy.name}对你造成了${enemyDamage}点伤害！\n`;
    }

    // 检查战斗结果
    if (enemy.hp <= 0) {
        battleText += `\n你击败了${enemy.name}！\n`;
        battleText += `获得了${enemy.spiritStones}灵石！\n`;
        addSpiritStones(enemy.spiritStones);
        
        // 随机掉落装备
        const dropChance = Math.random();
        if (dropChance < 0.3) { // 30%的掉落概率
            const dropType = enemy.possibleDrops[Math.floor(Math.random() * enemy.possibleDrops.length)];
            const dropList = equipment[dropType];
            const droppedItem = dropList[Math.floor(Math.random() * dropList.length)];
            battleText += `\n获得了装备：${droppedItem.name}！\n`;
            // 自动装备掉落物品
            gameState.equipment[dropType.slice(0, -1)] = droppedItem;
        }
    } else if (gameState.hp <= 0) {
        battleText += '\n你被击败了！\n';
        gameState.hp = gameState.maxHp;
        gameState.spirit = Math.floor(gameState.maxSpirit * 0.5);
    }

    document.getElementById('story-text').textContent = battleText;
    gameState.inBattle = false;
    gameState.currentEnemy = null;
}

// 使用法术
function useSpell() {
    if (gameState.learnedSpells.length === 0) {
        alert('你还没有学习任何法术！');
        return;
    }
    const spell = gameState.learnedSpells[0]; // 使用第一个学习的法术
    const spiritCost = 30;
    if (gameState.spirit >= spiritCost) {
        gameState.spirit -= spiritCost;
        const enemy = gameState.currentEnemy;
        const damage = 20; // 法术伤害
        enemy.hp -= damage;
        alert(`使用${spell}造成了${damage}点伤害！`);
        battleTurn(true);
    } else {
        alert('灵力不足，无法使用法术！');
    }
}

// 逃跑
function escape() {
    const escapeChance = Math.random();
    if (escapeChance < 0.5) { // 50%的逃跑概率
        alert('成功逃脱！');
        gameState.hp = Math.max(0, gameState.hp - 20); // 逃跑时受到一些伤害
    } else {
        alert('逃跑失败！');
        startBattle();
    }
}

// 学习法术
function learnSpell(spellName) {
    const spiritCost = 30;
    if (gameState.spirit >= spiritCost) {
        gameState.spirit -= spiritCost;
        if (!gameState.learnedSpells.includes(spellName)) {
            gameState.learnedSpells.push(spellName);
            alert(`成功学习${spellName}！`);
        } else {
            alert('你已经学会了这个法术！');
        }
    } else {
        alert('灵力不足，无法学习法术！');
    }
}

// 购买装备
function purchaseEquipment(type, itemId) {
    const item = equipment[type].find(item => item.id === itemId);
    if (item && gameState.spiritStones >= item.price) {
        gameState.spiritStones -= item.price;
        gameState.equipment[type.slice(0, -1)] = item;
        alert(`购买了 ${item.name}！`);
    } else {
        alert('灵石不足！');
    }
}

// 添加灵石
function addSpiritStones(amount) {
    gameState.spiritStones += amount;
    alert(`获得了 ${amount} 灵石！`);
}

// 更新游戏状态显示
function updateDisplay() {
    document.getElementById('cultivation').textContent = gameState.cultivation;
    document.getElementById('spirit').textContent = gameState.spirit;
    document.getElementById('spirit-stones').textContent = gameState.spiritStones;
    
    // 更新装备显示
    document.getElementById('weapon').textContent = gameState.equipment.weapon ? gameState.equipment.weapon.name : '无';
    document.getElementById('armor').textContent = gameState.equipment.armor ? gameState.equipment.armor.name : '无';
    document.getElementById('accessory').textContent = gameState.equipment.accessory ? gameState.equipment.accessory.name : '无';
}

// 显示当前场景
function showScene(sceneId) {
    const scene = scenes[sceneId];
    document.getElementById('story-text').textContent = scene.text;
    
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.onclick = () => {
            if (choice.action) choice.action();
            showScene(choice.nextScene);
        };
        choicesContainer.appendChild(button);
    });
    
    updateDisplay();
}

// 修炼功能
function cultivate() {
    const spiritCost = 20;
    if (gameState.spirit >= spiritCost) {
        gameState.spirit -= spiritCost;
        gameState.cultivationLevel += 1;
        if (gameState.cultivationLevel >= 10) {
            gameState.cultivation = '筑基期';
            gameState.cultivationLevel = 1;
            alert('恭喜突破到筑基期！');
        }
        alert('修炼成功！修为提升！');
    } else {
        alert('灵力不足，需要休息！');
    }
}

// 休息功能
function rest() {
    gameState.spirit = Math.min(gameState.maxSpirit, gameState.spirit + 30);
    alert('休息完成，灵力恢复！');
}

// 选择Boss
function selectBoss(bossId) {
    gameState.currentEnemy = { ...bosses[bossId] };
    gameState.inBattle = true;
    gameState.isBossBattle = true;
}

// Boss战斗回合
function bossBattleTurn(defending = false) {
    const boss = gameState.currentEnemy;
    let battleText = '';

    if (defending) {
        battleText += '你选择了防御！\n';
    } else {
        // 玩家攻击
        const damage = Math.max(0, gameState.attack - boss.defense);
        boss.hp -= damage;
        battleText += `你对${boss.name}造成了${damage}点伤害！\n`;
    }

    // Boss攻击
    if (boss.hp > 0) {
        let bossDamage = Math.max(0, boss.attack - gameState.defense);
        
        // Boss特殊能力
        if (boss.hp <= boss.maxHp * (1 - boss.phase / boss.maxPhase)) {
            boss.phase++;
            battleText += `\n${boss.name}进入了第${boss.phase}阶段！\n`;
            battleText += `${boss.name}使用了${boss.specialAbility}！\n`;
            
            // 不同Boss的特殊能力效果
            switch(boss.specialAbility) {
                case '召唤灵兽':
                    bossDamage += 15;
                    battleText += '召唤出了强大的灵兽助战！\n';
                    break;
                case '魔气爆发':
                    bossDamage += 20;
                    battleText += '释放出强大的魔气！\n';
                    break;
                case '天地法则':
                    bossDamage += 25;
                    battleText += '掌控天地之力！\n';
                    break;
            }
        }
        
        gameState.hp -= bossDamage;
        battleText += `${boss.name}对你造成了${bossDamage}点伤害！\n`;
    }

    // 检查战斗结果
    if (boss.hp <= 0) {
        battleText += `\n你击败了${boss.name}！\n`;
        battleText += `获得了${boss.spiritStones}灵石！\n`;
        addSpiritStones(boss.spiritStones);
        
        // Boss必定掉落装备
        const dropType = boss.possibleDrops[Math.floor(Math.random() * boss.possibleDrops.length)];
        const dropList = equipment[dropType];
        const droppedItem = dropList[Math.floor(Math.random() * dropList.length)];
        battleText += `\n获得了装备：${droppedItem.name}！\n`;
        // 自动装备掉落物品
        gameState.equipment[dropType.slice(0, -1)] = droppedItem;

        // 击败Boss后提升修为
        if (gameState.cultivation === '练气期') {
            gameState.cultivationLevel += 5;
        } else if (gameState.cultivation === '筑基期') {
            gameState.cultivationLevel += 3;
        }
    } else if (gameState.hp <= 0) {
        battleText += '\n你被击败了！\n';
        gameState.hp = gameState.maxHp;
        gameState.spirit = Math.floor(gameState.maxSpirit * 0.5);
    }

    document.getElementById('story-text').textContent = battleText;
    gameState.inBattle = false;
    gameState.currentEnemy = null;
    gameState.isBossBattle = false;
}

// 初始化游戏
function initGame() {
    showScene('start');
}

// 启动游戏
window.onload = initGame; 