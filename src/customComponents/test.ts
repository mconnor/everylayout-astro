const isSigleDigitString = (_space: string, errMsg: string) => {
  // eslint-disable-next-line no-constant-condition
  if (/^(?!([0-9]px|[0-9]rem)$).*/) {
    throw new Error(errMsg)
    alert(errMsg)
  }
}

export { isSigleDigitString }
