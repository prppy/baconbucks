import os
import sys
import django

# Add project directory to the sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from quizAPI.serializers import QuizSerializer, QuestionSerializer, OptionSerializer
from quizAPI.models import Quiz, Question, Option

input_data = [
    {
        "quiz_name": "CPF 1",
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
        "quiz_name": "CPF 2",
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
        "quiz_name": "Banking 1",
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
        "quiz_name": "Banking 2",
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
            },
            {
                "question_name": "What is the function of an Automated Teller Machine (ATM)?",
                "options": [
                    {"option_text": "To process online payments", "is_correct": False},
                    {"option_text": "To withdraw and deposit cash", "is_correct": True},
                    {"option_text": "To apply for loans", "is_correct": False},
                    {"option_text": "To trade stocks", "is_correct": False}
                ]
            }
        ]
    },
    {
        "quiz_name": "Tax 1",
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
        "quiz_name": "Tax 2",
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
            },
            {
                "question_name": "What is the Goods and Services Tax (GST) rate in Singapore as of 2024?",
                "options": [
                    {"option_text": "5%", "is_correct": False},
                    {"option_text": "7%", "is_correct": False},
                    {"option_text": "9%", "is_correct": True},
                    {"option_text": "10%", "is_correct": False}
                ]
            }
        ]
    },
    {
        "quiz_name": "Insurance 1",
        "questions": [
            {
                "question_name": "What is an insurance claim?",
                "options": [
                    {"option_text": "A request for payment by the insurance company", "is_correct": True},
                    {"option_text": "A policy premium", "is_correct": False},
                    {"option_text": "A type of insurance policy", "is_correct": False},
                    {"option_text": "An investment product", "is_correct": False}
                ]
            },
            {
                "question_name": "What does a life insurance policy cover?",
                "options": [
                    {"option_text": "Medical expenses", "is_correct": False},
                    {"option_text": "Home repairs", "is_correct": False},
                    {"option_text": "Income loss due to death", "is_correct": True},
                    {"option_text": "Travel expenses", "is_correct": False}
                ]
            },
            {
                "question_name": "Which type of insurance is mandatory for car owners in Singapore?",
                "options": [
                    {"option_text": "Health insurance", "is_correct": False},
                    {"option_text": "Travel insurance", "is_correct": False},
                    {"option_text": "Home insurance", "is_correct": False},
                    {"option_text": "Motor insurance", "is_correct": True}
                ]
            }
        ]
    },
    {
        "quiz_name": "Insurance 2",
        "questions": [
            {
                "question_name": "What does an insurance premium refer to?",
                "options": [
                    {"option_text": "The amount paid to maintain insurance coverage", "is_correct": True},
                    {"option_text": "The amount received from an insurance claim", "is_correct": False},
                    {"option_text": "The cost of an insurance policy", "is_correct": False},
                    {"option_text": "A type of insurance benefit", "is_correct": False}
                ]
            },
            {
                "question_name": "What is a deductible in an insurance policy?",
                "options": [
                    {"option_text": "The amount the insurer pays before benefits kick in", "is_correct": False},
                    {"option_text": "The amount the policyholder pays before benefits kick in", "is_correct": True},
                    {"option_text": "The total coverage amount of the policy", "is_correct": False},
                    {"option_text": "The monthly payment for the policy", "is_correct": False}
                ]
            },
            {
                "question_name": "Which type of insurance covers medical expenses?",
                "options": [
                    {"option_text": "Life insurance", "is_correct": False},
                    {"option_text": "Travel insurance", "is_correct": False},
                    {"option_text": "Health insurance", "is_correct": True},
                    {"option_text": "Home insurance", "is_correct": False}
                ]
            }
        ]
    }
]

# Function to populate quizzes
def populate_quizzes():
    for quiz_data in input_data:
        # Create quiz instance
        quiz_serializer = QuizSerializer(data={"quiz_name": quiz_data["quiz_name"]})
        if quiz_serializer.is_valid():
            quiz = quiz_serializer.save()
            print(f"Quiz '{quiz.quiz_name}' created successfully!")

            # Process each question for the quiz
            for question_data in quiz_data.get('questions', []):
                question = Question.objects.create(
                    quiz=quiz,
                    question_name=question_data["question_name"]
                )
                print(f"Question '{question.question_name}' created successfully!")

                # Process each option for the question
                for option_data in question_data.get('options', []):
                    option = Option.objects.create(
                        question=question,
                        option_text=option_data["option_text"],
                        is_correct=option_data["is_correct"]
                    )
                    print(f"Option '{option.option_text}' created successfully!")
        else:
            print(f"Failed to create quiz: {quiz_serializer.errors}")

# Run the populate function
populate_quizzes()