export default function validateName(name) {
    if (validateCharacters(name)) {
        console.log("Invalid characters used in name!");
        return false;
    }

    return checkDuplicate(name).then((duplicateName) => {
        if (duplicateName) {
            console.log("Character name is already taken!");
            return false;
        }
        return true;
    })
}

async function checkDuplicate(name) {
    return getData(name).then((data) => {
        return !!data;
    })
}

function validateCharacters(name) {
    for (let i = 0; i < name.length; i++) {
        if (name.charCodeAt(i) < 32 || name.charCodeAt(i) === 127) return false;
    }
    return true;
}