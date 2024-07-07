import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { StudentService } from '../services/student.service';
import { SubjectService } from '../services/subject.service';

interface Subject {
  id: number;
  subject_name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedSubMenu: string | null = '';
  selectedMenu = 'home';

  constructor(
    private signupService: SignupService,
    private router: Router,
    private studentService: StudentService,
    private subjectService: SubjectService
  ) {}

  profile = {
    image: '',
    profilePic: './assets/profile-pic.png',
    name: '',
    username: '',
    email: '',
    school: '',
    gender: '',
    birthday: new Date(1990, 1, 1),
    age: 30
  };

  studentData: any;
  newStudentData: any = {
    first_name: '',
    middle_name: '',
    surname: '',
    email: '',
    birthdate: '',
    gender: '',
    password: '',
    university: '',
    academic_level: '',
    username: ''
  };

  getStudent() {
    this.studentService.getStudent().subscribe({
      next: data => {
        this.studentData = data;
        this.profile = {
          image: '',
          profilePic: data.profilePic || './assets/profile-pic.png',
          name: data.name,
          username: data.username,
          email: data.email,
          school: data.university || 'Unknown University',
          gender: data.gender,
          birthday: new Date(data.birthdate),
          age: this.calculateAge(new Date(data.birthdate))
        };
      },
      error: error => {
        console.error('Error fetching student data:', error);
      }
    });
  }

  calculateAge(birthday: Date): number {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  createStudent() {
    this.studentService.createStudent(this.newStudentData).subscribe({
      next: data => {
        console.log('Student created:', data);
        this.getStudent(); // Refresh student data
      },
      error: error => {
        console.error('Error creating student:', error);
      }
    });
  }

  updateStudent() {
    this.studentService.updateStudent(this.studentData).subscribe({
      next: data => {
        console.log('Student updated:', data);
        this.getStudent(); // Refresh student data
      },
      error: error => {
        console.error('Error updating student:', error);
      }
    });
  }

  deleteStudent() {
    const studentId = this.studentData.id;
    this.studentService.deleteStudent(studentId).subscribe({
      next: data => {
        console.log('Student deleted:', data);
        this.studentData = null; // Clear student data
      },
      error: error => {
        console.error('Error deleting student:', error);
      }
    });
  }

  ngOnInit(): void {
    this.getStudent();
    this.loadSubjects();
  }
  
  selectSubMenu(subMenu: string): void {
    this.selectedSubMenu = subMenu;
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

  subjects: Subject[] = [];
  selectedSubjects: boolean[] = [];

  selectMode = false;

  deleteSelected() {
    for (let i = this.selectedSubjects.length - 1; i >= 0; i--) {
      if (this.selectedSubjects[i]) {
        const subjectId = this.subjects[i].id;
        this.subjectService.deleteSubject(subjectId).subscribe(
          () => {
            console.log('Subject deleted successfully.');
            this.subjects.splice(i, 1);
            this.selectedSubjects.splice(i, 1);
          },
          error => {
            console.error('Error deleting subject:', error);
          }
        );
      }
    }
    this.resetSelection();
  }

  addRow() {
    this.subjects.push({ id: 0, subject_name: 'New Subject' }); // Default value for new subjects
    this.selectedSubjects.push(false);
  }

  addSubject(subjectName: string) {
    if (subjectName.trim() !== '') {
      const newSubject: Subject = { id: 0, subject_name: subjectName };
      this.subjectService.createSubject(newSubject).subscribe(
        createdSubject => {
          console.log('Subject created:', createdSubject);
          this.subjects.push(createdSubject);
          this.selectedSubjects.push(false);
        },
        error => {
          console.error('Error creating subject:', error);
          // Handle error, e.g., show error message
        }
      );
    } else {
      console.error('Subject name is required');
      // Handle empty subject name, e.g., show error message
    }
  }

  loadSubjects() {
    this.subjectService.getSubjects().subscribe({
      next: (response) => {
        this.subjects = response;
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
        // Handle error, e.g., show error message
      }
    });
  }

  createSubject(subjectData: Subject) {
    this.subjectService.createSubject(subjectData).subscribe(
      createdSubject => {
        console.log('Subject created:', createdSubject);
        this.loadSubjects(); // Refresh subjects after creation
      },
      error => {
        console.error('Error creating subject:', error);
        // Handle error, e.g., show error message
      }
    );
  }

  updateSubject(subjectData: Subject) {
    const id = subjectData.id;
    this.subjectService.updateSubject(id, subjectData).subscribe(
      updatedSubject => {
        console.log('Subject updated:', updatedSubject);
        this.loadSubjects(); // Refresh subjects after update
      },
      error => {
        console.error('Error updating subject:', error);
        // Handle error, e.g., show error message
      }
    );
  }

  deleteSubject(id: number) {
    this.subjectService.deleteSubject(id).subscribe(
      () => {
        console.log('Subject deleted successfully.');
        this.subjects = this.subjects.filter(subject => subject.id !== id); // Remove from local array
      },
      error => {
        console.error('Error deleting subject:', error);
        // Handle error, e.g., show error message
      }
    );
  }

  toggleSelection() {
    this.selectMode = !this.selectMode;
    if (!this.selectMode) {
      this.resetSelection();
    }
  }

  resetSelection() {
    this.selectedSubjects = new Array(this.subjects.length).fill(false);
  }

  removeSubject(index: number) {
    const subjectId = this.subjects[index].id;
    this.subjectService.deleteSubject(subjectId).subscribe(
      () => {
        console.log('Subject deleted successfully.');
        this.subjects.splice(index, 1);
        this.selectedSubjects.splice(index, 1);
      },
      error => {
        console.error('Error deleting subject:', error);
        // Handle error, e.g., show error message
      }
    );
  }

  logout() {
    // Clear any stored session/token information
    localStorage.removeItem('token'); // Assuming you store token in localStorage
    // You can also clear any other session-related data here if needed

    // Navigate to login page
    this.router.navigate(['/login']); // Adjust '/login' to your actual login page route
  }
}
