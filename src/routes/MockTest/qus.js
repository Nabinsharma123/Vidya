const Questions = [
    {
        "id": 12,
        "Question": "What is output of below program?  int main() {  int i;  for(i=0; i<5; ++i++)  {    printf(\"Hello\");  }  return 0; }",
        "Answer": 2,
        "Options": [
            " Hello is printed 5 times",
            "Compilation Error",
            "Hello is printed 2 times",
            " Hello is printed 3 times"
        ]
    },
    {
        "Answer": 2,
        "Question": "The concept of two functions with same name is know as?",
        "Options": [
            "Operator Overloading",
            "Function Overloading",
            " Function Overriding",
            "Function renaming"
        ],
        "id": 17
    },
    {
        "Question": "What should be the output: int main() {      int a = 10/3;     printf(\"%d\",a);           return 0; }",
        "Options": [
            "3.33",
            "3.0",
            "3",
            "0"
        ],
        "Answer": 3,
        "id": 26
    },
    {
        "Options": [
            "1 time",
            "Compilation Error",
            "Infinite Times",
            "Runtime errors"
        ],
        "Question": "How many times Vidya is printed?  int main() { while(1) {     printf(\"Vidya\"); }  return 0; }",
        "Answer": 3,
        "id": 11
    },
    {
        "Answer": 3,
        "Options": [
            "11",
            "10",
            "compilation error",
            "0"
        ],
        "Question": "What is output of below program? int main() { const int a = 10; printf(\"%d\",++a); return 0; }",
        "id": 20
    },
    {
        "id": 9,
        "Question": "What is the maximum number of arguments that can be passed in a single function?",
        "Answer": 2,
        "Options": [
            "127",
            "253",
            " 361",
            "No limits in number of arguments"
        ]
    },
    {
        "Answer": 3,
        "Question": "Which of the following is NOT possible with any 2 operators in C?",
        "Options": [
            "Different precedence, same associativity",
            "Different precedence, different associativity",
            "Same precedence, different associativit",
            "All of the mentioned"
        ],
        "id": 6
    },
    {
        "Options": [
            "The program must have at least one function.",
            "The program does not require any function.",
            "Input data",
            "Output data"
        ],
        "Answer": 1,
        "Question": "What is required in each C program?",
        "id": 1
    },
    {
        "Answer": 4,
        "Question": "Pointers can be created of following data types?",
        "Options": [
            "character",
            " integer",
            " Unsigned character",
            "All of these"
        ],
        "id": 22
    },
    {
        "Question": "Where in C the order of precedence of operators do not exist?",
        "Options": [
            "Within conditional statements, if, else",
            "Within while, do-while",
            "Within a macro definition",
            "None of the mentioned"
        ],
        "Answer": 4,
        "id": 7
    },
    {
        "Answer": 3,
        "Options": [
            "Compilation Error",
            "Runtime Error",
            " Nothing is printed",
            "Hello is printed infinite times"
        ],
        "Question": "What is output of below program?  int main() {  for(; ;);  for(; ;);     printf(\"Hello\"); return 0; }",
        "id": 13
    },
    {
        "Answer": 3,
        "id": 28,
        "Question": "Which of the following ways are correct to include header file in C program?",
        "Options": [
            "#include<stdio.h>",
            " #include\"stdio.h\"",
            "Both A & B",
            "none"
        ]
    },
    {
        "Answer": 1,
        "id": 25,
        "Options": [
            "#include<stdio.h>",
            "return 0",
            "void main(int argc , char ** argv)",
            "None of above"
        ],
        "Question": "Which of the following is executed by Preprocess?"
    },
    {
        "Options": [
            "1",
            "1.0",
            "1.0000",
            "1.000000"
        ],
        "Question": "#include \"stdio.h\"  int main() { float a = 123/100; printf(\"%f\", a); return 0; }",
        "Answer": 4,
        "id": 29
    },
    {
        "id": 24,
        "Options": [
            "10.5",
            "10",
            "0",
            "Compilation error"
        ],
        "Question": "int main() {     int a = 10.5;     printf(\"%d\",a);     return 0; }",
        "Answer": 2
    },
    {
        "id": 16,
        "Question": "What is the meaning of below lines? void sum (int, int);",
        "Answer": 2,
        "Options": [
            "sum is function which takes int arguments",
            " sum is a function which takes two int arguments and returns void",
            " it will produce compilation error",
            "Can't comment"
        ]
    },
    {
        "Options": [
            " ptr is not a pointer",
            "ptr is a pointer to pointer",
            " Such statement no allowed in C",
            " None of these"
        ],
        "Answer": 2,
        "id": 23,
        "Question": "int **ptr;"
    },
    {
        "Options": [
            "stdio.h",
            "conio.h",
            "stdlib.h",
            "stdlibio.h"
        ],
        "Answer": 2,
        "id": 19,
        "Question": "Libray function getch() belongs to which header file?"
    },
    {
        "Question": "What is an example of iteration in C?",
        "Answer": 4,
        "Options": [
            "for",
            "while",
            "do-while",
            "all of the mentioned"
        ],
        "id": 5
    },
    {
        "Options": [
            "static a = 10; //static as",
            "static int func (int); //parameter as static",
            "static static int a; //a static variable prefixed with static",
            "all of the mentioned"
        ],
        "Question": " Which of following is not accepted in C?",
        "Answer": 3,
        "id": 2
    },
    {
        "Question": "Can we declare function inside structure of C Programming?",
        "Answer": 2,
        "Options": [
            "Yes",
            "no",
            "depends on compiler",
            "Yes but run time error"
        ],
        "id": 21
    },
    {
        "id": 18,
        "Answer": 2,
        "Question": "What is the following is invalid header file in C?",
        "Options": [
            "math.h",
            "mathio.h",
            "string.h",
            " ctype.h"
        ]
    },
    {
        "Question": "Which of the following can never be sent by call-by-value?",
        "Answer": 2,
        "Options": [
            "Variable",
            "Array",
            "Structures",
            " Both Array and Structures"
        ],
        "id": 8
    },
    {
        "id": 27,
        "Options": [
            "10",
            "0",
            "compilation error",
            "Undefined"
        ],
        "Question": "int x = 10;  int main() {     int x = 0;     printf(\"%d\",x);     return 0; }",
        "Answer": 2
    },
    {
        "Answer": 1,
        "Options": [
            "true",
            "false",
            "depends on the compiler",
            "depends on the standard"
        ],
        "Question": "Functions can return enumeration constants in C?",
        "id": 4
    },
    {
        "Options": [
            "2",
            "3",
            "4",
            "1"
        ],
        "Answer": 2,
        "id": 14,
        "Question": "How many loops are there in C"
    },
    {
        "Options": [
            "1970",
            "1972",
            "1978",
            "1979"
        ],
        "Question": "When C Language was invented?",
        "id": 15,
        "Answer": 1
    },
    {
        "Options": [
            "Internal",
            "External",
            "Both Internal and External",
            "External and Internal are not valid terms for functions"
        ],
        "Answer": 2,
        "id": 3,
        "Question": "Functions in C Language are always _________"
    },
    {
        "Question": "Which of the following data types are accepted while declaring bit-fields?",
        "Answer": 1,
        "id": 10,
        "Options": [
            "char",
            "float",
            "double",
            "none of the mentioned"
        ]
    }
]

export default Questions