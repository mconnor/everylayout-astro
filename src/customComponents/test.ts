const isSigleDigitString = (_space: string, errMsg: string) => {
    console.log(_space)
    if (/^(?!([0-9]px|[0-9]rem)$).*/) {
        throw new Error(errMsg)
        alert(errMsg)
    }
}

export { isSigleDigitString }
