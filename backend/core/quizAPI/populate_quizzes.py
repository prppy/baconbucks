import os
import sys
import django

# Add project directory to the sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from quizAPI.serializers import QuizSerializer, QuestionSerializer, OptionSerializer

input_data = [
    {
        "quiz_name": "CPF Quiz 1",
        "questions": [
            {
                "question_name": "At what age can Singaporeans start withdrawing their CPF savings for retirement?",
                "options": [
                    {"option_text": "55 years old", "is_correct": True},
                    {"option_text": "60 years old", "is_correct": False},
                    {"option_text": "65 years old", "is_correct": False},
                    {"option_text": "70 years old", "is_correct": False}
                ]
            },
            {
                "question_name": "What is the minimum age requirement to open an individual CPF account in Singapore?",
                "options": [
                    {"option_text": "16 years old", "is_correct": False},
                    {"option_text": "18 years old", "is_correct": True},
                    {"option_text": "20 years old", "is_correct": False},
                    {"option_text": "21 years old", "is_correct": False}
                ]
            },
            {
                "question_name": "What is the CPF contribution rate for employees aged 55 and below?",
                "options": [
                    {"option_text": "7.5% by employee, 5% by employer", "is_correct": False},
                    {"option_text": "10% by employee, 10% by employer", "is_correct": False},
                    {"option_text": "15% by employee, 12% by employer", "is_correct": False},
                    {"option_text": "20% by employee, 17% by employer", "is_correct": True}
                ]
            }
        ]
    },
    {
        "quiz_name": "CPF Quiz 2",
        "questions": [
            {
                "question_name": "What percentage of the monthly CPF contribution goes into the Ordinary Account for individuals aged 35 and below?",
                "options": [
                    {"option_text": "23%", "is_correct": True},
                    {"option_text": "21%", "is_correct": False},
                    {"option_text": "37%", "is_correct": False},
                    {"option_text": "20%", "is_correct": False}
                ]
            },
            {
                "question_name": "Which account must have sufficient savings before the CPF Retirement Account can be created?",
                "options": [
                    {"option_text": "Ordinary Account", "is_correct": False},
                    {"option_text": "Special Account", "is_correct": False},
                    {"option_text": "Medisave Account", "is_correct": False},
                    {"option_text": "All of the above", "is_correct": True}
                ]
            },
            {
                "question_name": "Which of the following is NOT a CPF-approved investment option?",
                "options": [
                    {"option_text": "Fixed deposits", "is_correct": False},
                    {"option_text": "Unit trusts", "is_correct": False},
                    {"option_text": "Cryptocurrency", "is_correct": True},
                    {"option_text": "Exchange-traded funds (ETFs)", "is_correct": False}
                ]
            }
        ]
    },
    {
        "quiz_name": "Banking Quiz 1",
        "questions": [
            {
                "question_name": "What is a characteristic of credit cards in Singapore?",
                "options": [
                    {"option_text": "No interest charged", "is_correct": False},
                    {"option_text": "Interest charged on overdue balance", "is_correct": True},
                    {"option_text": "No credit history required", "is_correct": False},
                    {"option_text": "Accepted only in specific stores", "is_correct": False}
                ]
            },
            {
                "question_name": "What is a key benefit of opening a fixed deposit bank account?",
                "options": [
                    {"option_text": "Unlimited withdrawals", "is_correct": False},
                    {"option_text": "No minimum deposit requirement", "is_correct": False},
                    {"option_text": "Higher interest rates with a fixed deposit amount", "is_correct": True},
                    {"option_text": "Flexible interest rates", "is_correct": False}
                ]
            },
            {
                "question_name": "What is the primary function of a debit card in Singapore?",
                "options": [
                    {"option_text": "To take out loans", "is_correct": False},
                    {"option_text": "To make purchases directly from your bank account", "is_correct": True},
                    {"option_text": "To build credit history", "is_correct": False},
                    {"option_text": "To withdraw money without a PIN", "is_correct": False}
                ]
            }
        ]
    },
    {
        "quiz_name": "Banking Quiz 2",
        "questions": [
            {
                "question_name": "What does ‘interest rate’ refer to in banking?",
                "options": [
                    {"option_text": "Fee for opening an account", "is_correct": False},
                    {"option_text": "Percentage of a loan charged as interest to the borrower", "is_correct": True},
                    {"option_text": "The amount of money a bank gives for every deposit", "is_correct": False},
                    {"option_text": "Fee for using a banking service", "is_correct": False}
                ]
            },
            {
                "question_name": "What is an overdraft facility?",
                "options": [
                    {"option_text": "A loan taken for purchasing a home", "is_correct": False},
                    {"option_text": "An account that does not earn interest", "is_correct": False},
                    {"option_text": "A fixed deposit account", "is_correct": False},
                    {"option_text": "Permission to withdraw more money than what is in your account", "is_correct": True}
                ]
            }
        ]
    },
    {
        "quiz_name": "Tax Quiz 1",
        "questions": [
            {
                "question_name": "Which of the following is a tax-deductible expense for individuals in Singapore?",
                "options": [
                    {"option_text": "Overseas travel", "is_correct": False},
                    {"option_text": "Medical expenses", "is_correct": False},
                    {"option_text": "Donations to approved institutions", "is_correct": True},
                    {"option_text": "Monthly grocery bills", "is_correct": False}
                ]
            },
            {
                "question_name": "When is the deadline for filing personal income tax returns in Singapore?",
                "options": [
                    {"option_text": "15 May", "is_correct": False},
                    {"option_text": "15 April", "is_correct": False},
                    {"option_text": "18 May", "is_correct": False},
                    {"option_text": "18 April", "is_correct": True}
                ]
            },
            {
                "question_name": "Which type of income is exempt from tax in Singapore?",
                "options": [
                    {"option_text": "Salary from employment", "is_correct": False},
                    {"option_text": "Rental income", "is_correct": False},
                    {"option_text": "Dividends from unit trusts", "is_correct": False},
                    {"option_text": "Dividends from Singapore resident companies", "is_correct": True}
                ]
            }
        ]
    },
    {
        "quiz_name": "Tax Quiz 2",
        "questions": [
            {
                "question_name": "What is the penalty for late filing of income tax returns in Singapore?",
                "options": [
                    {"option_text": "$100", "is_correct": False},
                    {"option_text": "$200", "is_correct": False},
                    {"option_text": "Up to $1000", "is_correct": True},
                    {"option_text": "Up to $5000", "is_correct": False}
                ]
            },
            {
                "question_name": "What is the maximum amount of tax relief that can be claimed under the CPF Relief for self-employed individuals in Singapore?",
                "options": [
                    {"option_text": "$10,000", "is_correct": False},
                    {"option_text": "$20,000", "is_correct": False},
                    {"option_text": "$30,000", "is_correct": True},
                    {"option_text": "$40,000", "is_correct": False}
                ]
            }
        ]
    },
    {
        "quiz_name": "Insurance Quiz 1",
        "questions": [
            {
                "question_name": "What is an insurance claim?",
                "options": [
                    {"option_text": "The amount you pay for your insurance policy", "is_correct": False},
                    {"option_text": "A request for payment from the insurance company when you experience a loss/damage", "is_correct": True},
                    {"option_text": "The process of evaluating the risk for insurance", "is_correct": False},
                    {"option_text": "Applying for insurance", "is_correct": False}
                ]
            },
            {
                "question_name": "What is the ‘grace period’ in an insurance policy?",
                "options": [
                    {"option_text": "The period during which you can cancel the policy without penalty", "is_correct": False},
                    {"option_text": "The period after the premium is due during which the policyholder can pay without losing coverage", "is_correct": True},
                    {"option_text": "The period in which the insurer can change the terms of the policy", "is_correct": False},
                    {"option_text": "The period before the policy becomes effective", "is_correct": False}
                ]
            },
            {
                "question_name": "What is the difference between term life insurance and whole life insurance?",
                "options": [
                    {"option_text": "Term life insurance is cheaper and lasts for a specific period, while whole life insurance is more expensive and lasts for the policyholder's entire life.", "is_correct": True},
                    {"option_text": "Term life insurance is more expensive and lasts for the policyholder's entire life, while whole life insurance is cheaper and lasts for a specific period.", "is_correct": False},
                    {"option_text": "Term life insurance covers health expenses, while whole life insurance covers funeral costs.", "is_correct": False},
                    {"option_text": "There is no difference between term life and whole life insurance.", "is_correct": False}
                ]
            }
        ]
    },
    {
        "quiz_name": "Insurance Quiz 2",
        "questions": [
            {
                "question_name": "Which of the following best describes ‘liability insurance’?",
                "options": [
                    {"option_text": "Insurance that covers your own medical expenses", "is_correct": False},
                    {"option_text": "Insurance that covers damages you cause to others", "is_correct": True},
                    {"option_text": "Insurance that covers damages others caused on you", "is_correct": False},
                    {"option_text": "Insurance that covers your own housing expenses", "is_correct": False}
                ]
            },
            {
                "question_name": "What does ‘beneficiary’ mean in a life insurance policy?",
                "options": [
                    {"option_text": "The insurance company providing the coverage", "is_correct": False},
                    {"option_text": "The person/entity receiving the policy’s benefits", "is_correct": True},
                    {"option_text": "The underwriter who assessed the policy risk", "is_correct": False},
                    {"option_text": "The person/entity who purchased the insurance policy", "is_correct": False}
                ]
            },
            {
                "question_name": "What is the term for the amount you pay out of pocket before your insurance starts to cover expenses?",
                "options": [
                    {"option_text": "Premium", "is_correct": False},
                    {"option_text": "Deductible", "is_correct": True},
                    {"option_text": "Co-pay", "is_correct": False},
                    {"option_text": "Coverage limit", "is_correct": False}
                ]
            },
            {
                "question_name": "What is a premium in terms of insurance?",
                "options": [
                    {"option_text": "Amount of money paid by the insurer to the policyholder", "is_correct": False},
                    {"option_text": "Amount of money paid by the policyholder to the insurer", "is_correct": True},
                    {"option_text": "Amount of coverage provided by the insurance policy", "is_correct": False},
                    {"option_text": "Amount of time the insurance policy is valid", "is_correct": False}
                ]
            }
        ]
    }
]

# Function to populate quizzes
def populate_quizzes():
    for quiz_data in input_data:
        # Serialize and create quiz instance
        quiz_serializer = QuizSerializer(data=quiz_data)
        if quiz_serializer.is_valid():
            quiz = quiz_serializer.save()
            print(f"Quiz '{quiz.quiz_name}' created successfully!")
            
            # Process each question for the quiz
            for question_data in quiz_data.get('questions', []):
                question_data['quiz'] = quiz.id  # Assign quiz id to question data
                question_serializer = QuestionSerializer(data=question_data)
                if question_serializer.is_valid():
                    question = question_serializer.save()
                    print(f"Question '{question.question_name}' created successfully!")
                    
                    # Process each option for the question
                    for option_data in question_data.get('options', []):
                        option_data['question'] = question.id  # Assign question id to option data
                        option_serializer = OptionSerializer(data=option_data)
                        if option_serializer.is_valid():
                            option_serializer.save()
                            print(f"Option '{option_data['option_text']}' created successfully!")
                        else:
                            print(f"Failed to create option: {option_serializer.errors}")
                else:
                    print(f"Failed to create question: {question_serializer.errors}")
        else:
            print(f"Failed to create quiz: {quiz_serializer.errors}")

# Run the populate function
populate_quizzes()