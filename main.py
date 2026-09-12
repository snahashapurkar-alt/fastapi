from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "Welcome to fastapi Project"
    }

class Student(BaseModel):
    id : int
    name : str
    course : str

students = [{
    "id": 1,
    "name": "Bhoomi",
    "course": "Python"
},
{
    "id": 2,
    "name": "Aishu",
    "course": "Python"
},
{
    
    "id": 2,
    "name": "Akshata",
    "course": "Java"
},
{
    
    "id": 2,
    "name": "Sneha",
    "course": "Java"
}]

@app.get("/students")
def get_students():
    return students

@app.get("/students/{students_id}")
def get_students(students_id:int):
    for student in students:
        if student["id"] == students_id:
            return student
    return "Student details not found"

@app.get("/s")
def get_students(course: str = None):
    if course:
        return [
            student
            for student in students
                if student["course"].lower() == course.lower()
        ]
    return students

@app.post("/students")
def create_student(student:Student):

    students.append(student.model_dump())

    return {
        "message": "Student created",
        "student": student
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)