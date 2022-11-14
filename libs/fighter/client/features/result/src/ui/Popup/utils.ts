export function getTitle(profit: number) {
    if (profit === 0) {
        return 'DRAWS'
    }

    if (profit < 0) {
        return 'LOSE!'
    }

    return 'VICTORY!'
}

export function getProfitText(profit: number) {
    if (profit === 0) {
        return '0'
    }

    if (profit < 0) {
        return `${profit}`
    }

    return `+ ${profit}`
}
