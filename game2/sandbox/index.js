var fs = require('fs');
var fsPromises = fs.promises;
var Buffer = require('buffer').Buffer;
var data = {
    'Brute': {
        'Trample' : {
            'Top' : "Attack 3, pierce 2",
            'Bottom' : "Move 4, jump -> Attack 2, target all enemies moved through"
        },
        'Eye for an Eye' : {
            'Top' : "Retaliate 2, self: 1 Exp each time you retaliate, Round Status",
            'Bottom' : "Heal 2, range 1, create Earth"
        },
        'Sweeping Blow' : {
            'Top' : "Attack 2, area C",
            'Bottom': "Move 3 -> PUSH 1 target all adjacent enemies"
        },
        'Provoking Roar' : {
            'Top' : "Attack 2, Disarm",
            'Bottom' : "Taunt, Round Status"
        }
    }
}

const Attack = 0x90;
const Move = 0x91;
const Retaliate = 0x92;
const Shield = 0x93;
const Loot = 0x94;
const Heal = 0x95;
const Summon = 0x96;
const Recover = 0x97;


const ListEffects = 0x28
const EffectsWithAmount = 0x29;
const literal = 0x10;

var effects = {
    0x21 : "Fire",
    0x22 : "Frost",
    0x23 : "Air",
    0x24 : "Earth",
    0x25 : "Light",
    0x26 : "Dark",
    0x27 : "Any",
    0x11 : "Bless",
    0x12 : "Curse",
    0x13 : "Disarm",
    0x14 : "Immobilize",
    0x15 : "Wound",
    0x16 : "Muddle",
    0x17 : "Poison",
    0x1C : "Invisibility",
    0x1D : "Stun",
    0x1E : "Strengthen",
    0x30 : "Jump",
    0x31 : "Flying",
    0x32 : "Persistent Bonus",
    0x33 : "Round Bonus",
    0x34 : "Consume"
}

var effectsWithAmount = {
    0x18 : "Push",
    0x19 : "Pull",
    0x1A : "Pierce",
    0x1B : "Target"
}

var AttackCommand = function (amount, 
    effects = [], 
    elements = [], 
    target = 1, 
    range = 1, 
    area = [], 
    experience = 0, 
    isLost = false) {

    this.amount = amount;
    this.elements = elements;
    this.range = range;
    this.area = area;
    this.experience = experience;
    this.isLost = isLost;
}

var testData = "";

var stack = [];
var mask = 0xf;
var main = function() {

    var data = "102110221002281002101A1001101B1002291003100110011000100110011002281000100010022810022890";
    var Spellweaver = {
        "Icy Blast": {
            1 : "102210161002281007101B10012910021003100210011001100010022810021000100228100010011002281001100110022810021001100228100110021002281002100210022810072890",
            2 : "1016100128100191"
        }
    }
    var buf = Buffer.from(Spellweaver["Icy Blast"][2], 'hex');
    fs.writeFileSync('info.dat', buf);

    var fileBuffer = Buffer.alloc(0);

    fsPromises.open('info.dat').then(function (fh) {
        var buffer = Buffer.alloc(1);
        while (true) {
            var num = fs.readSync(fh.fd, buffer, 0, 1, null);
            if (num === 0)
                break;
            fileBuffer = Buffer.concat([fileBuffer, buffer])
        }
    }).then(function () {
        for (var i = 0; i < fileBuffer.length; i++) {
            if (fileBuffer[i] == literal) {
                stack.push(fileBuffer[++i]);
            } else if (fileBuffer[i] == Attack) {
                console.log('Area', stack.pop());
                console.log('Lost', stack.pop() != 0);
                console.log('Experience', stack.pop());
                console.log('Range', stack.pop());
                console.log('Attack', stack.pop());
                var tempDict = stack.pop();
                for (var x = 0; x < Object.keys(tempDict).length; x++) {
                    console.log(effectsWithAmount[Object.keys(tempDict)[x]], tempDict[Object.keys(tempDict)[x]]);
                }
                var tempBuffer = stack.pop();
                for (var x = 0; x < tempBuffer.length; x++) {
                    console.log(effects[tempBuffer[x]]);
                }
            } else if (fileBuffer[i] == ListEffects) {
                var count = stack.pop();
                var tempBuffer = [];
                for (var x = 0; x < count; x++) {
                    tempBuffer.push(stack.pop());
                }
                stack.push(tempBuffer);
            } else if (fileBuffer[i] == EffectsWithAmount) {
                var count = stack.pop();
                var tempDict = {};
                for (var x = 0; x < count; x++) {
                    tempDict[stack.pop()] = stack.pop();
                }
                stack.push(tempDict);
            } else if (fileBuffer[i] == Move) {
                var amount = stack.pop();
                var cond = stack.pop();
                console.log('Amount', amount);
                console.log('Conditions', cond);
            } else if (fileBuffer[i] == Heal) {
                var amount = stack.pop();
                var range = stack.pop();
            }
        }
    });

    // ProcessQueue: Attack 2, Move 2, Attack 2
    // Attack -> choose actor, choose target, draw attack modifier
    // Move -> choose actor, move
    // Heal -> choose actor, choose target, heal
    // Retaliate -> choose actor, choose target
    // Summon -> choose hex
}

main();




