// import React, { useState } from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import axios from 'axios';
// import { Bar, Pie } from 'react-chartjs-2'; // Import Pie from react-chartjs-2
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js';

// import Menu from './Menu';
// import AboutUs from './AboutUs';
// import Contact from './Contact';
// import Footer from './Footer';  // Import Footer component
// import './App.css';


// // Registering components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// function UKTaxCalculator() {
//   const [income, setIncome] = useState('');
//   const [result, setResult] = useState(null);

//   // Define the data object for the bar chart
//   const barData = {
//     labels: ['Tax-Free Allowance', 'Basic Rate (20%)', 'Higher Rate (40%)', 'National Insurance'],
//     datasets: [
//       {
//         label: 'Tax Breakdown for £70,000 Income',
//         data: [12570, 37700, 19730, 3350],
//         backgroundColor: ['green', 'blue', 'orange', 'purple'],
//       },
//     ],
//   };

//   // Chart options for responsive resizing
//   const barOptions = {
//     maintainAspectRatio: false,
//   };

//   // Prepare the data for the pie chart based on the result
//   const pieData = result ? {
//     labels: ['Tax', 'National Insurance', 'Net Income'],
//     datasets: [
//       {
//         data: [
//           result.totalTax, // Tax
//           result.nationalInsurance, // National Insurance
//           result.takeHome // Net Income
//         ],
//         backgroundColor: ['red', 'blue', 'green'],
//       },
//     ],
//   } : null;

//   const pieOptions = {
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'right',
//       },
//     },
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/calculate_tax', { income: parseFloat(income) });
//       setResult(response.data);
//     } catch (error) {
//       console.error("Error calculating tax:", error);
//     }
//   };

//   const formatCurrency = (value) => {
//     return `£ ${value.toFixed(2)}`;
//   };

//   return (
//     <div className="container">
//         <h1>Take Home Tax Calculator</h1>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Annual Income before Tax (£):
//             <input
//               type="number"
//               value={income}
//               onChange={(e) => setIncome(e.target.value)}
//               required
//             />
//           </label>
//           <button type="submit">Calculate Tax</button>
//         </form>

//         {/* Conditionally Displayed Results */}
//         {result && (
//           <div className="content-main">
//             <h2>Your Results</h2>
//             <p>
//               Based on the details you have provided and a salary of {formatCurrency(result.income)}, your estimated take home is as follows.
//             </p>
//             {/* Table Layout - Keep this as is */}
//             <table>
//               <thead>
//                 <tr>
//                   <th></th>
//                   <th>Gross Income</th>
//                   <th>Taxable Income</th>
//                   <th>Tax</th>
//                   <th>National Insurance</th>
//                   <th>Take Home</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Yearly</td>
//                   <td>{formatCurrency(result.income)}</td>
//                   <td>{formatCurrency(result.taxableIncome)}</td>
//                   <td>{formatCurrency(result.totalTax)}</td>
//                   <td>{formatCurrency(result.nationalInsurance)}</td>
//                   <td>{formatCurrency(result.takeHome)}</td>
//                 </tr>
//                 <tr>
//                   <td>Monthly</td>
//                   <td>{formatCurrency(result.income / 12)}</td>
//                   <td>{formatCurrency(result.taxableIncome / 12)}</td>
//                   <td>{formatCurrency(result.totalTax / 12)}</td>
//                   <td>{formatCurrency(result.nationalInsurance / 12)}</td>
//                   <td>{formatCurrency(result.takeHome / 12)}</td>
//                 </tr>
//                 <tr>
//                   <td>Weekly</td>
//                   <td>{formatCurrency(result.income / 52)}</td>
//                   <td>{formatCurrency(result.taxableIncome / 52)}</td>
//                   <td>{formatCurrency(result.totalTax / 52)}</td>
//                   <td>{formatCurrency(result.nationalInsurance / 52)}</td>
//                   <td>{formatCurrency(result.takeHome / 52)}</td>
//                 </tr>
//                 <tr>
//                   <td>Daily</td>
//                   <td>{formatCurrency(result.income / 365)}</td>
//                   <td>{formatCurrency(result.taxableIncome / 365)}</td>
//                   <td>{formatCurrency(result.totalTax / 365)}</td>
//                   <td>{formatCurrency(result.nationalInsurance / 365)}</td>
//                   <td>{formatCurrency(result.takeHome / 365)}</td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Breakdown and Pie Chart Layout */}
//             <div style={{ display: 'flex', marginTop: '20px' }}>
//               {/* Breakdown Section */}
//               <div style={{ flex: '1', marginRight: '20px' }}>
//                 <div className="breakdown">
//                   <h3>£{formatCurrency(result.income)} Annual Gross Income - Tax Breakdown for the 2024 Tax Year</h3>
//                   <ul>
//                     <li>Gross Income: {formatCurrency(result.income)}</li>
//                     <li><b>Your Take Home Monthly Pay: {formatCurrency(result.takeHome / 12)}</b></li>
//                     <li>Tax Free Personal Allowance: £12,570.00</li>
//                     <li>Total Taxable After Allowances: {formatCurrency(result.taxableIncome)}</li>
//                     <li>Basic Rate Tax at 20%: {formatCurrency(result.basicRateTax)}</li>
//                     <li>Total Tax Deducted: {formatCurrency(result.totalTax)}</li>
//                     <li>Class 1 National Insurance Deduction: {formatCurrency(result.nationalInsurance)}</li>
//                     <li>Total Deducted: {formatCurrency(result.totalTax + result.nationalInsurance)}</li>
//                     <li>Net Income: {formatCurrency(result.takeHome)}</li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Pie Chart Section */}
//               <div style={{ flex: '1' }}>
//                 {pieData && <Pie data={pieData} options={pieOptions} />}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Always Displayed Content */}
//         <div className="content">
//           <h1>Understanding UK Tax for 2024/25</h1>
//           <section>
//             <h2>What is Income Tax?</h2>
//             <p>Income Tax is a tax you pay on your income, and the amount you pay depends on how much you earn. In the UK, Income Tax is calculated on earnings above a certain threshold, known as the Personal Allowance. For the 2024/25 tax year, this threshold is £12,570. Earnings up to this amount are tax-free. Beyond this threshold, different rates apply based on the income bracket.</p>
//           </section>

//           <section>
//             <h2>How is Income Tax Calculated?</h2>
//             <p>Income Tax in the UK is calculated based on various income bands and tax rates. The government sets these rates, which can change during the annual budget. For the 2024/25 tax year, the Income Tax bands are as follows:</p>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Income Band</th>
//                   <th>Tax Rate</th>
//                   <th>Description</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Up to £12,570</td>
//                   <td>0%</td>
//                   <td>Personal allowance (tax-free)</td>
//                 </tr>
//                 <tr>
//                   <td>£12,571 to £50,270</td>
//                   <td>20%</td>
//                   <td>Basic rate</td>
//                 </tr>
//                 <tr>
//                   <td>£50,271 to £125,140</td>
//                   <td>40%</td>
//                   <td>Higher rate</td>
//                 </tr>
//                 <tr>
//                   <td>Over £125,141</td>
//                   <td>45%</td>
//                   <td>Additional rate</td>
//                 </tr>
//               </tbody>
//             </table>
//           </section>

//           {/* Always Displayed Content */}

//           <h2>Visualizing the Tax Breakdown</h2>
//           <p>To provide a clear understanding, here’s a graphical representation of how taxes are distributed based on the different tax bands and the National Insurance contributions.</p>
//           <div style={{ width: '700px', height: '350px', margin: '0 auto' }}>
//             <Bar data={barData} options={barOptions} />
//           </div>

//           {/* Additional Article Content */}
//           <section>
//             <h2>Understanding UK Tax in 2024</h2>
//             <p>Understanding the UK tax system can be complex, especially with frequent updates and changes to tax laws. This blog post aims to provide a comprehensive guide to understanding UK taxes in 2024, including the different types of taxes, thresholds, and important deadlines. We will also provide official links for further reading and address frequently asked questions (FAQs).</p>

//             {/* Article Sections */}
//             <section>
//               <h3>1. Overview of the UK Tax System</h3>
//               <p>The UK tax system is overseen by HM Revenue and Customs (HMRC), which is responsible for collecting taxes, administering tax laws, and ensuring compliance. The main types of taxes that individuals and businesses might encounter include:</p>
//               <ul>
//                 <li><b>Income Tax</b>: Paid on most types of income, including earnings from employment, self-employment, pensions, savings, and investments.</li>
//                 <li><b>National Insurance Contributions (NICs)</b>: Payments made by both employees and employers to qualify for certain benefits, including the State Pension.</li>
//                 <li><b>Value Added Tax (VAT)</b>: A consumption tax charged on most goods and services sold in the UK.</li>
//                 <li><b>Corporation Tax</b>: Paid by companies on their profits.</li>
//                 <li><b>Capital Gains Tax (CGT)</b>: Charged on the profit when you sell an asset that has increased in value.</li>
//                 <li><b>Inheritance Tax</b>: A tax on the estate of someone who has died.</li>
//               </ul>
//             </section>

//             <section>
//               <h3>2. Income Tax in 2024</h3>
//               <p>Income Tax is typically the most relevant tax for individuals. It is applied on earnings over a certain threshold. In 2024, the tax rates and thresholds are:</p>
//               <ul>
//                 <li><b>Personal Allowance</b>: £12,570 (This is the amount of income you can earn before you start paying Income Tax).</li>
//                 <li><b>Basic Rate</b>: 20% on income over £12,570 and up to £50,270.</li>
//                 <li><b>Higher Rate</b>: 40% on income over £50,270 and up to £150,000.</li>
//                 <li><b>Additional Rate</b>: 45% on income over £150,000.</li>
//               </ul>
//               <h4>Changes for 2024:</h4>
//               <p>The key changes to note for 2024 include:</p>
//               <ul>
//                 <li>A freeze on the Personal Allowance and tax thresholds until April 2026, as announced in the previous budget.</li>
//                 <li>Potential adjustments to tax reliefs and deductions, particularly for higher earners.</li>
//               </ul>
//               <p>For more information on Income Tax, you can visit the <a href="https://www.gov.uk/income-tax-rates">official HMRC page on Income Tax</a>.</p>
//             </section>

//             <section>
//               <h3>3. National Insurance Contributions (NICs)</h3>
//               <p>National Insurance Contributions are payments made to qualify for certain state benefits. The rates for 2024 are:</p>
//               <ul>
//                 <li><b>Class 1</b>: Paid by employees and employers. Employees pay 12% on earnings between £12,570 and £50,270, and 2% on earnings above £50,270. Employers pay 13.8% on earnings above £9,100.</li>
//                 <li><b>Class 2</b>: Paid by self-employed individuals, set at a flat rate of £3.15 per week.</li>
//                 <li><b>Class 4</b>: Also for the self-employed, 9% on profits between £12,570 and £50,270, and 2% on profits above £50,270.</li>
//               </ul>
//               <p>For more details, visit the <a href="https://www.gov.uk/national-insurance">HMRC National Insurance page</a>.</p>
//             </section>

//             {/* Add more sections as needed */}

//             <section>
//               <h3>9. Frequently Asked Questions (FAQs)</h3>
//               <h4>Q: Do I need to file a tax return?</h4>
//               <p>A: You need to file a tax return if you are self-employed, earn over £100,000, have rental income, or have other untaxed income. More details can be found on the <a href="https://www.gov.uk/self-assessment-tax-returns">HMRC Self-Assessment page</a>.</p>

//               <h4>Q: How do I check my tax code?</h4>
//               <p>A: Your tax code is usually found on your payslip, P60, or your personal tax account online. It indicates the amount of tax-free income you're entitled to. You can learn more on the <a href="https://www.gov.uk/tax-codes">HMRC tax codes page</a>.</p>

//               <h4>Q: What happens if I miss the tax return deadline?</h4>
//               <p>A: Missing the deadline results in an immediate £100 penalty, with additional charges for further delays. Visit the <a href="https://www.gov.uk/self-assessment-tax-returns/penalties">HMRC late filing penalties page</a> for more details.</p>

//               <h4>Q: Can I claim tax relief?</h4>
//               <p>A: Yes, you can claim tax relief on certain expenses, like work uniforms or professional subscriptions. For more on tax relief, see the <a href="https://www.gov.uk/tax-relief-for-employees">HMRC tax relief page</a>.</p>
//             </section>

//             <p>Understanding UK taxes can be daunting, but staying informed of the latest rates, thresholds, and deadlines can help you manage your tax responsibilities effectively. Always consult the official HMRC website or a professional advisor for the most current and personalized advice.</p>

//             <p>For any further questions, visit the <a href="https://www.gov.uk/contact-hmrc">HMRC contact page</a> to get in touch with HM Revenue and Customs directly.</p>
//           </section>
//         </div>
//       {/* <Footer /> Add the Footer component here */}
//     </div>
//   );
// }
// export default UKTaxCalculator;
