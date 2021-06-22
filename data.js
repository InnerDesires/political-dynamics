const DATA = {
    byParty: [
        {
            "partyName": "Комуністи ", "group ": 1, "flowFactor": 25, "rating":
                [{ "year": "1991", "value": 27.3 }]
        },
        {
            "partyName": "Лівий центр ", "group ": 1, "flowFactor": 7, "rating":
                [{ "year": "1991 ", "value": 7.7 }]
        },
        {
            "partyName": "Прогресивні соціалісти ", "flowFactor": 2, "rating":
                [{ "year": "1991 ", "value": 3.8 }], "group ": 2
        },
        {
            "partyName": "Громада ", "flowFactor": 12, "rating":
                [{ "year": "1991 ", "value": 8.6 }], "group ": 2
        },
        {
            "partyName": "СДПУ ", "flowFactor": 23, "rating":
                [{ "year": "1991 ", "value": 5.5 }], "group ": 2
        },
        {
            "partyName": "Зелені ", "flowFactor": 19, "rating":
                [{ "year": "1991 ", "value": 5.3 }], "group ": 2
        },
        {
            "partyName": "НДП ", "flowFactor": 45, "rating":
                [{ "year": "1991 ", "value": 19.7 }], "group ": 2
        },
        {
            "partyName": "НРУ, УНР ", "flowFactor": 5, "rating":
                [{ "year": "1991 ", "value": 10.4 }], "group ": 3
        },
        {
            "partyName": "Позафракційні ", "flowFactor": 10, "rating":
                [{ "year": "1991 ", "value": 11.7 }], "group ": 3
        },
        {
            "partyName": "Соціалісти ", "group ": 1, "flowFactor": 15, "rating":
                [{ "year": "1991 ", "value": 0 }]
        },
        {
            "partyName": "СелПУ ", "group ": 2, "flowFactor": 5, "rating":
                [{ "year": "1991 ", "value": 0 }]
        },
        {
            "partyName": "Батьківщина ", "flowFactor": 8, "rating":
                [{ "year": "1991 ", "value": 0 }], "group ": 3
        },
        {
            "partyName": "Солідарність ", "flowFactor": 4, "rating":
                [{ "year": "1991 ", "value": 0 }], "group ": 1
        },
        {
            "partyName": "Трудова Україна ", "flowFactor": 64, "rating":
                [{ "year": "1991 ", "value": 0 }], "group ": 2
        },
        {
            "partyName": "Відродження регіонів ", "flowFactor": 12, "rating":
                [{ "year": "1991 ", "value": 0 }], "group ": 3
        },
        {
            "partyName": "Реформи-Конгрес ", "flowFactor": 7, "rating":
                [{ "year": "1991 ", "value": 0 }], "group ": 1
        }]
}

let newData = createHistory(DATA, 10);
console.log(newData);

function createHistory(data, yearsCount) {
    let startingYear = parseInt(data.byParty[0].rating[0].year);
    for (let i = 1; i <= yearsCount; i++) {
        let currentYear = startingYear + i;
        let groups = {};
        for (let i = 0; i < data.byParty.length; i++) {
            if (groups[data.byParty[i].group]) {
                groups[data.byParty[i].group].push(i)
            } else {
                groups[data.byParty[i].group] = [i];
            }
            data.byParty[i].rating.push({
                year: currentYear,
                value: 0
            })
        }
        for (let i = 0; i < data.byParty.length; i++) {
            let length = data.byParty[i].rating.length
            let lastRating = data.byParty[i].rating[length - 2].value;
            let newRating = lastRating * (1 - data.byParty[i].flowFactor / 100);
            data.byParty[i].rating[length - 1].value = data.byParty[i].rating[length - 1].value === 0 ? newRating : data.byParty[i].rating[length - 1].value + newRating;
            let toGive = lastRating - newRating;
            let currentGroup = groups[data.byParty[i].group];
            while (toGive > 0) {
                let part = toGive > 0.3 ? toGive * Math.random() / 2 : toGive;
                toGive -= part;
                let randomIndex = currentGroup[Math.floor(Math.random() * currentGroup.length)];
                data.byParty[randomIndex].rating[length - 1].value += part;
            }
        }
    }

    return data;
}

