function get(id) {
    return Number(document.getElementById(id).value)
}

function fmt(number) {
    return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(
        number,
    )
}

function calculate() {
    const years = get("years")
    let salary = get("salary")
    const super_rate = get("superRate") / 100
    const super_additional = get("superOther")
    const wpi = get("wpi") / 100
    const roi = get("roi") / 100
    let balance = get("balance")
    const fees = get("fees") / 100
    const insurance = get("feesFixed")
    const tax = get("tax") / 100
    const age = get("age")
    let inflation = 0
    const results = document.getElementById("results")
    const currentYear = new Date().getFullYear() 
    results.innerHTML = ""
    for(let i =1; i < years; i++) {
        let contrib = (salary * super_rate) + super_additional
        contrib -= contrib * tax

        balance += contrib

        let earnings = balance * roi
        earnings -= earnings * tax

        balance += balance * roi
        balance -= balance * fees
        balance -= insurance
        if (balance < 0) balance = 0

        inflation += (balance * 0.03)

        salary += salary * wpi
        const resultText = `Year: ${currentYear+i} Age: ${age+i} - Balance: ${fmt(balance)}. Balance (Inflation Adjusted): ${fmt(balance * 1.03 ** -i)}.  Salary: ${fmt(salary)}`
        console.log(resultText)
        
        results.innerHTML += resultText + "<br/>" 
    }
}
