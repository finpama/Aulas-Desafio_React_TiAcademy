export const newDateOnly = () => {
    const nowDate = new Date();

    const twoChar = (param) => {
        const sParam = param.toString()
        let res = '';

        if (sParam[1] === undefined) {
            res = '0' + sParam
            return res;
        }
        else {
            return sParam;
        }

    }

    const date = nowDate.getFullYear() + '-' + twoChar((nowDate.getMonth() + 1)) + '-' + twoChar(nowDate.getDate());

    return date;
}