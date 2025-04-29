export const validate = (formData, error, setError) => {
    console.log('validate 실행됨')
    const newerror = {...error}
    Object.entries(error).forEach((item) => {
        if (!formData[item[0]]) newerror[item[0]] = true
    })
    setError(newerror)
    console.log(newerror)
    return Object.values(newerror).includes(true)
}