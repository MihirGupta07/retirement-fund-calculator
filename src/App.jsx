import { useState } from "react";
import "./App.css";

function App() {
  // State variables for input fields
  const [initialCorpus, setInitialCorpus] = useState("");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [withdrawalIncrease, setWithdrawalIncrease] = useState("");
  const [years, setYears] = useState(""); // Now dynamic
  const [finalCorpus, setFinalCorpus] = useState(null);
  const [monthlyDetails, setMonthlyDetails] = useState([]);

  // Function to calculate the corpus after the specified number of years
  const calculateFinalCorpus = () => {
    let corpus = parseFloat(initialCorpus);
    const monthlyReturn = parseFloat(annualReturn) / 12 / 100;
    let withdrawal = parseFloat(monthlyWithdrawal);
    const withdrawalIncreaseRate = parseFloat(withdrawalIncrease) / 100;
    const totalMonths = parseInt(years) * 12;

    let details = []; // For storing month-wise details

    for (let month = 1; month <= totalMonths; month++) {
      // Apply monthly return to the corpus
      const interestEarned = corpus * monthlyReturn;
      corpus += interestEarned;

      // Withdraw the monthly amount
      corpus -= withdrawal;

      // Store details for each month
      details.push({
        month: (month%12) ,
        interestEarned: interestEarned.toFixed(2),
        withdrawal: withdrawal.toFixed(2),
        remainingCorpus: corpus.toFixed(2),
        year: Math.floor(month/12) + 1,
      });

      // Every 12 months, increase the withdrawal by the annual increase percentage
      if (month % 12 === 0) {
        withdrawal *= (1 + withdrawalIncreaseRate);
      }
    }

    setFinalCorpus(corpus.toFixed(2)); // Set final corpus to 2 decimal places
    setMonthlyDetails(details); // Update the table data
  };

  return (
    <div className="App">
      <h1>Retirement Corpus Calculator</h1>
      
      <div className="input-container">
        <label>Initial Corpus (₹):</label>
        <input
          type="number"
          value={initialCorpus}
          onChange={(e) => setInitialCorpus(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Monthly Withdrawal (₹):</label>
        <input
          type="number"
          value={monthlyWithdrawal}
          onChange={(e) => setMonthlyWithdrawal(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Annual Return (%):</label>
        <input
          type="number"
          value={annualReturn}
          onChange={(e) => setAnnualReturn(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Withdrawal Increase (% per year):</label>
        <input
          type="number"
          value={withdrawalIncrease}
          onChange={(e) => setWithdrawalIncrease(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label>Years:</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />
      </div>

      <button onClick={calculateFinalCorpus}>Calculate</button>

      {finalCorpus && (
        <div className="result">
          <h2>Final Corpus after {years} years: ₹{finalCorpus}</h2>
        </div>
      )}

      {/* Table showing month-wise details */}
      {monthlyDetails.length > 0 && (
        <table className="details-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Interest Earned (₹)</th>
              <th>Withdrawal (₹)</th>
              <th>Remaining Corpus (₹)</th>
            </tr>
          </thead>
          <tbody>
            {monthlyDetails.map((detail) => (
              <tr key={detail.month}>
                <td>{detail.month}</td>
                <td>{detail.year}</td>
                <td>{detail.interestEarned}</td>
                <td>{detail.withdrawal}</td>
                <td>{detail.remainingCorpus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
