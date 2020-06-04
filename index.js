var readline = require('readline-sync');
const chalk = require('chalk');
const itemNames = ['spoon', 'fork', 'tin foil hat', 'paper breastplate'];

function itemDrop() {
    this.name = itemNames[Math.floor(Math.random() * Math.floor(4))];
    this.attack = Math.ceil(Math.random() * Math.floor(3));
}

// const startingEquipment = new itemDrop();

function Player(name) {
    this.name = name;
    this.hp = 100;
    this.inventory = [new itemDrop()];
    this.attack = 10; 
    this.walk = function() {
       return Math.floor(Math.random() * Math.floor(100))
    }
}

function Mob(name) {
    this.name = name;
    this.hp = Math.floor(Math.random() * Math.floor(100));
    this.inventory;
    this.attack = 10;
}

const name = readline.question(chalk.green('Hello, what is your name? '));

let toon = new Player(name);
console.log('\b');
console.log(toon.attack);

const toonBattle = (enemy) => {
    while (toon.hp > 0 && enemy.hp > 0) {
        const toonDamage = Math.floor(Math.random() * Math.floor(toon.attack));
        const enemyDamage = Math.floor(Math.random() * Math.floor(enemy.attack));
        console.log('You take a swing at the ' + enemy.name + ' dealing ' + toonDamage + ' points damage');
        enemy.hp -= toonDamage;
        console.log(enemy.name + ' has ' + enemy.hp + ' hp left')
        console.log(enemy.name + ' takes a swing at you deal ' + enemyDamage + ' points damage');
        toon.hp -= enemyDamage;
        console.log('You have ' + toon.hp + ' health left')
        if (toon.hp <= 0) {
            console.log('You have died!');
        };
        if (enemy.hp <= 0) {
            console.log('You Won!');
            console.log('You gain 15 health');
            toon.hp += 15;
            console.log('The ' + enemy.name + ' droped a ' + enemy.inventory.name)
            toon.attack += enemy.inventory.attack;
            toon.inventory.push(enemy.inventory);
            console.log(toon.attack);
            delete enemy;

            continueAdventure();
        }


    }
    // toon.inventory.push(enemy.inventory)
    // console.log(enemy.inventory)
    // console.log(toon);
}



const runOrFight = (enemy) => {
    readline.setDefaultOptions({limit: ['r', 'f']});
    const action = readline.question(chalk.red('Press r to run away or f to fight to the death. '));
    if (action === 'r') {
        const runSuccess = Math.floor(Math.random() * Math.floor(100));
        const enemyDamage = Math.floor(Math.random() * Math.floor(enemy.attack));
        if (runSuccess >= 50) {
            console.log('\b');
            console.log('You run away like the coward you are from the ' + enemy.name +'!');
            console.log('\b');
            delete enemy;
            continueAdventure();
        } else {
            console.log('\b');
            console.log('You were mauled during your attempt to flee and suffered ' + enemyDamage + ' points damage');
            toon.hp -= enemyDamage;
            console.log('\b');
            runOrFight(enemy)
        }
        
    } else {
        toonBattle(enemy);
    }
}

const checkForEncounter = () => {
    const mobs = ['Wolf', 'Bear', 'Harry Potter Fanatic']
    const mobName = mobs[Math.floor(Math.random() * Math.floor(3))]
    const enemy = new Mob(mobName);
    enemy.inventory =  new itemDrop(itemNames[Math.floor(Math.random() * Math.floor(4))]);
    if (toon.walk() < 25) {
        console.log('\b');
        console.log('You have been attacked by a ' + enemy.name + ' who has ' + enemy.hp + ' hp');
        console.log('\b');
        runOrFight(enemy);
    } else {
        console.log('Your journey continues uneventful');
        continueAdventure();
    }
}

const continueAdventure = () => {
    readline.setDefaultOptions({limit: ['w', 'q', 'print']});
    const action = readline.question(chalk.green('Press w to proceed print to see status or q to quit your adventure. '));
    if (action === 'w') {
        checkForEncounter();
    } else if (action === 'print') {
        console.log('Your name is ' + toon.name);
        console.log(`You have ${toon.hp} hit points`);
        console.log('You have the following items in your inventory:')
        toon.inventory.forEach(i => console.log(i.name));
        continueAdventure();
    }
}
continueAdventure();


