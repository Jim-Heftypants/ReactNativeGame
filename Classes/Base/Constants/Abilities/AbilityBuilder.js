class Ability {
    constructor(name, levelReq, cooldown, abilityFunc) {
        this.name = name;
        this.levelReq = levelReq;
        this.cooldown = cooldown;
        this.abilityFunc = abilityFunc;
        this.onCooldown = false;
        console.log("Creating ability: " + this.name);
    }

    useAbility(Character, Data) {
        if (Character.level < levelReq) {
            console.log(Character.name + "'s level too low to use " + abilityName);
            return;
        }
        if (!Data) {
            console.log("Data missing for " + abilityName);
            return;
        }
        if (onCooldown) {
            console.log(abilityName + " still on cooldown!");
            return;
        }
        this.abilityFunc(Character, Data);
        this.printCast(Character, Data)
        onCooldown = true;
        setTimeout(() => {
            onCooldown = false;
        }, cooldown * 1000);
    }

    printCast() {
        console.log(this.abilityName + " called by " + Character.data.name + " on " + Data);
    }

    getName() {
        return this.name;
    }
}

export default Ability;