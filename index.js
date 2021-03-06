var readline = require('readline-sync');
const chalk = require('chalk');
const itemNames = ['spoon', 'fork', 'tin foil hat', 'paper breastplate'];

function itemDrop() {
    this.name = chalk.green(itemNames[Math.floor(Math.random() * Math.floor(4))]);
    this.attack = Math.ceil(Math.random() * Math.floor(3));
}

function Player(name) {
    this.name = chalk.green(name);
    this.hp = 100;
    this.inventory = [new itemDrop()];
    this.attack = 10; 
    this.walk = function() {
       return Math.floor(Math.random() * Math.floor(100))
    }
}

function Mob(name) {
    this.name = chalk.red(name);
    this.hp = Math.ceil(Math.random() * Math.floor(100));
    this.inventory;
    this.attack = 10;
}

const name = readline.question(chalk.blue(`Hello, what is your ${chalk.green('name')}? `));

let toon = new Player(name);
console.log('\n');

function toonBattle(enemy) {
    while (toon.hp > 0 && enemy.hp > 0) {
        readline.setDefaultOptions({limit: ['r', 'f']});
        const action = readline.question(chalk.red('Press r to run away or f to fight to the death. '));
        const runSuccess = Math.floor(Math.random() * Math.floor(100));
        const enemyDamage = Math.floor(Math.random() * Math.floor(enemy.attack));
        if (action === 'r') {
            if (runSuccess >= 50) {
                console.log('\n');
                console.log(`You run away like the coward you are from the ${enemy.name}!`);
                console.log('\n');
                enemy.hp = 0;
                continueAdventure();
            } else {
                console.log('\n');
                console.log(`You were mauled during your attempt to flee and suffered ${enemyDamage} points damage`);
                toon.hp -= enemyDamage;
                console.log('\n');
                toonBattle(enemy)
            }
        } else {
            const toonDamage = Math.floor(Math.random() * Math.floor(toon.attack));
            const enemyDamage = Math.floor(Math.random() * Math.floor(enemy.attack));
            console.log(`\n`);
            console.log(`You take a swing at the ${enemy.name} dealing ${toonDamage} points damage`);
            enemy.hp -= toonDamage;
            console.log(`${enemy.name} has ${chalk.red(enemy.hp)} hp left`);
            console.log(`\n`);
            console.log(`${enemy.name} takes a swing at you deal ${enemyDamage} points damage`);
            toon.hp -= enemyDamage;
            console.log(`${chalk.green('You')} have ${chalk.green(toon.hp)} health left`);
            console.log(`\n`);
            if (toon.hp <= 0) {
                console.log('You have died!');
            } else if (enemy.hp <= 0) {
                console.log('You Won!');
                console.log(`You gain ${chalk.green('15 health')}`);
                toon.hp += 15;
                console.log(`The ${enemy.name} droped a ${enemy.inventory.name}`)
                toon.attack += enemy.inventory.attack;
                toon.inventory.push(enemy.inventory);
                console.log(`\n`);
                continueAdventure();
            }
        }
    }
}

function continueAdventure() {
    readline.setDefaultOptions({limit: ['w', 'q', 'print']});
    let action = readline.question(chalk.blue('Press w to proceed print to see status or q to quit your adventure. '));
    if (action === 'w') {
        checkForEncounter();
    } else if (action === 'print') {
        console.log(`\n`);
        console.log(`Your name is ${toon.name}`);
        console.log(`You have ${chalk.green(toon.hp)} hit points`);
        console.log(`You have the following items in your inventory:`)
        toon.inventory.forEach(i => console.log(i.name));
        continueAdventure();
    } else {
    }
}

function checkForEncounter() {
    const mobs = ['Wolf', 'Bear', 'Harry Potter Fanatic']
    const mobName = mobs[Math.floor(Math.random() * Math.floor(3))]
    const enemy = new Mob(mobName);
    enemy.inventory =  new itemDrop(itemNames[Math.floor(Math.random() * Math.floor(4))]);
    let walkScore = toon.walk();
    if (walkScore < 25) {
        console.log(`\n`);
        console.log(`You have been attacked by a ${enemy.name} who has ${enemy.hp} hp`);
        console.log(`\n`);
        toonBattle(enemy);
    } else {
        console.log(`Your journey continues uneventful`);
        console.log(`\n`);
        continueAdventure();
    }
}


continueAdventure();