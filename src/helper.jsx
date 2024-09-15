export function calculateFinalCorpus(initialCorpus, monthlyWithdrawal, annualReturn, withdrawalIncrease, years) {
  let corpus = initialCorpus;
  const monthlyReturn = annualReturn / 12;
  let withdrawal = monthlyWithdrawal;

  // Simulate month-by-month over the years
  for (let month = 1; month <= years * 12; month++) {
      // Apply monthly return to the corpus
      corpus += corpus * monthlyReturn;
      
      // Withdraw the monthly amount
      corpus -= withdrawal;

      // Every 12 months, increase the withdrawal by the annual increase percentage
      if (month % 12 === 0) {
          withdrawal *= (1 + withdrawalIncrease);
      }
  }

  return corpus;
}

// Parameters
const initialCorpus = 30000000;       // 3 crore corpus
const monthlyWithdrawal = 80000;      // Initial withdrawal of Rs. 80,000
const annualReturn = 0.12;            // 12% annual return
const withdrawalIncrease = 0.05;      // 5% annual increase in withdrawal
const years = 20;                     // Time period of 20 years

const finalCorpus = calculateFinalCorpus(initialCorpus, monthlyWithdrawal, annualReturn, withdrawalIncrease, years);
console.log(`Final corpus after ${years} years: ₹${finalCorpus.toFixed(2)}`);
