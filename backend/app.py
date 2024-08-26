from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate_tax', methods=['POST'])
def calculate_tax():
    data = request.json
    income = data.get('income', 0)

    # Define thresholds and rates
    personal_allowance = 12570
    basic_rate_threshold = 37700 + personal_allowance
    higher_rate_threshold = 125140
    additional_rate_threshold = 150000

    # Calculate Personal Allowance Reduction for High Earners
    if income > 100000:
        personal_allowance = max(0, personal_allowance - (income - 100000) / 2)

    # Calculate taxable income
    taxable_income = max(0, income - personal_allowance)

    # Calculate tax
    basic_rate_tax = 0
    higher_rate_tax = 0
    additional_rate_tax = 0

    if taxable_income <= 37700:
        basic_rate_tax = taxable_income * 0.2
        print (basic_rate_tax)
    else:
        basic_rate_tax = 37700 * 0.2
        if taxable_income <= higher_rate_threshold:
            higher_rate_tax = (taxable_income - 37700) * 0.4
            print(higher_rate_tax)
        else:
            higher_rate_tax = (higher_rate_threshold - 37700) * 0.4
            additional_rate_tax = (taxable_income - higher_rate_threshold) * 0.45
            print(additional_rate_tax)

    total_tax = basic_rate_tax + higher_rate_tax + additional_rate_tax
    print("total tax =",total_tax)

    # National Insurance Calculation

    # National Insurance Calculation
    weekly_income = income / 52  # Calculate weekly income
    ni = 0

    if weekly_income > 967:
        # Apply both rates: 8% on income between £242 and £967, 2% above £967
        ni = ((967 - 242) * 0.08) + ((weekly_income - 967) * 0.02)
    elif weekly_income > 242:
        # Apply 8% rate for the income between £242 and £967
        ni = (weekly_income - 242) * 0.08

    print("NI weekly",+ ni)
    # Convert weekly NI back to yearly
    ni_yearly = ni * 52
    print("NI yearly",+ ni_yearly)


    # Take Home Calculation
    take_home = income - total_tax - ni_yearly
    print("take home =", take_home)

    return jsonify({
        'income': income,
        'personalAllowance': personal_allowance,
        'taxableIncome': taxable_income,
        'basicRateTax': basic_rate_tax,
        'higherRateTax': higher_rate_tax,
        'additionalRateTax': additional_rate_tax,
        'totalTax': total_tax,
        'nationalInsurance': ni_yearly,
        'takeHome': take_home
    })

@app.route('/')
def home():
    return "Welcome to the Tax Calculator!"

if __name__ == '__main__':
    app.run(debug=True)