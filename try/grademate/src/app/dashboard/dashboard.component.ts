import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { StudentService } from '../services/student.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedCourses: boolean[] = [];
  selectedSubMenu: string | null = '';
  selectedCourse = '';
  courses: string[] = [];
  selectedMenu = 'courses';
  selectedSubject: string = '';
  selectedAssessmentType: string = '';

  quizWeight: number = 0;
  exerciseWeight: number = 0;
  activityWeight: number = 0;
  examWeight: number = 0;
  projectWeight: number = 0;
  totalPercentage: number = 0;
  totalMessage: string = '';
  grades: (number | null)[] = [];
  weights: (number | null)[] = [];
  assessments: string[] = ['Quiz', 'Exercise', 'Activity', 'Exam', 'Project'];

  saveGrades(): void {
    // Implement logic to save grades to backend or perform other actions
    console.log('Selected Subject:', this.selectedSubject);
    console.log('Selected Assessment Type:', this.selectedAssessmentType);
    console.log('Grades:', this.grades);
  }

  calculateTotal() {
    this.totalPercentage = this.quizWeight + this.exerciseWeight + this.activityWeight + this.examWeight + this.projectWeight;
  
    // Optionally, notify the user if the total exceeds 100 or less than 100
    if (this.totalPercentage > 100) {
      this.totalMessage = 'Total percentage exceeds 100%. Please adjust weights.';
    } else if (this.totalPercentage < 100) {
      this.totalMessage = 'Total percentage is less than 100%.';
    } else {
      this.totalMessage = ''; // Clear message when total is exactly 100
    }
  }

  saveWeights() {
    this.calculateTotal();
    // Optionally, save the weights or perform other actions here
  }  

  updateTotalPercentage(event: any): void {
    const inputValue = event.target.innerText.trim();
    const totalPercentage = parseFloat(inputValue);
    if (!isNaN(totalPercentage)) {
      // Ensure totalPercentage is 100 and update your data structure
      console.log(`Updated total percentage to ${totalPercentage}`);
    }
  }

  //account
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

  newCourseName: string = '';
  editCourseName: string = '';
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  courseToEditIndex: number | null = null;
  courseToDeleteIndex: number | null = null;
  isDeleteSelectedModalOpen = false;
  isLogoutModalOpen: boolean = false;
  dropdowns: Record<string, boolean> = {
    quizzes: false,
    activities: false,
    exams: false,
    projects: false
  };

  loggedInUsername = '';
  logout: any;

  constructor(
    private signupService: SignupService,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

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

  // Assessments
  quizzes: any[] = [];
  newAssessmentName: string = '';
  newAssessmentGrade: number | null = null;
  newAssessmentWeight: number | null = null;
  currentAssessmentType: string = '';
  isAssessmentModalOpen: boolean = false;
  assessmentToEditIndex: number | null = null;
  assessmentToDeleteIndex: number | null = null;
  
  selectSubMenu(subMenu: string): void {
    this.selectedSubMenu = subMenu;
  }

  toggleDropdown(menu: string): void {
    this.dropdowns[menu] = !this.dropdowns[menu];
  }

  // Courses
  addCourse(): void {
    if (this.newCourseName) {
      this.courses.push(this.newCourseName);
      this.newCourseName = '';
      this.selectedCourses.push(false);
      this.closeModal();
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openEditModal(course: string, index: number): void {
    this.editCourseName = course;
    this.courseToEditIndex = index;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  updateCourse(): void {
    if (this.editCourseName && this.courseToEditIndex !== null) {
      this.courses[this.courseToEditIndex] = this.editCourseName;
      this.editCourseName = '';
      this.courseToEditIndex = null;
      this.closeEditModal();
    }
  }

  openDeleteModal(index: number): void {
    this.courseToDeleteIndex = index;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.courseToDeleteIndex = null;
  }

  confirmDelete(): void {
    if (this.courseToDeleteIndex !== null) {
      this.courses.splice(this.courseToDeleteIndex, 1);
      this.selectedCourses.splice(this.courseToDeleteIndex, 1);
      this.courseToDeleteIndex = null;
      this.closeDeleteModal();
    }
  }

  openDeleteSelectedModal(): void {
    this.isDeleteSelectedModalOpen = true;
  }

  closeDeleteSelectedModal(): void {
    this.isDeleteSelectedModalOpen = false;
  }

  confirmDeleteSelected(): void {
    const indicesToDelete: number[] = this.selectedCourses
      .map((selected, index) => (selected ? index : -1))
      .filter(index => index !== -1)
      .sort((a, b) => b - a);

    indicesToDelete.forEach(index => {
      this.courses.splice(index, 1);
      this.selectedCourses.splice(index, 1);
    });

    this.closeDeleteSelectedModal();
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedCourses = this.selectedCourses.map(() => checked);
  }

  anyCourseSelected(): boolean {
    return this.selectedCourses.some(selected => selected);
  }

  checkSelectedCourses(): void {
    if (this.selectedCourses.every(selected => !selected)) {
      const selectAllCheckbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = false;
      }
    }
  }

  checkSubjectSelection(): void {
    if (!this.selectedCourse) {
      alert('Please select a subject before proceeding.');
    }
  }

  navigateCell(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    const cell = target.closest('td');
    if (!cell) return;

    const row = cell.closest('tr');
    if (!row) return;

    const table = row.closest('table');
    if (!table) return;

    let cellIndex = Array.from(row.children).indexOf(cell);
    let newRow: HTMLElement | null = null;
    let newCell: HTMLElement | null = null;

    switch (event.key) {
        case 'ArrowUp':
            newRow = row.previousElementSibling as HTMLElement;
            if (newRow) {
                newCell = newRow.children[cellIndex] as HTMLElement;
            }
            break;
        case 'ArrowDown':
            newRow = row.nextElementSibling as HTMLElement;
            if (newRow) {
                newCell = newRow.children[cellIndex] as HTMLElement;
            }
            break;
        case 'ArrowLeft':
            if (cellIndex > 0) {
                newCell = row.children[cellIndex - 1] as HTMLElement;
            }
            break;
        case 'ArrowRight':
            if (cellIndex < row.children.length - 1) {
                newCell = row.children[cellIndex + 1] as HTMLElement;
            }
            break;
    }

    if (newCell) {
        newCell.focus();
        event.preventDefault();
    }
  }

  isDarkMode: boolean = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    const elements = document.querySelectorAll('.header, .sidebar, .content, .table-container, table, th, td, .card, .menu-item, button, .modal-content');
    elements.forEach((element) => {
      element.classList.toggle('dark-mode', this.isDarkMode);
    });
  }

  trackByFn(index: number): number {
    return index;
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
    if (menu === 'logout') {
      this.openLogoutModal();
    }
  }

  openLogoutModal(): void {
    this.isLogoutModalOpen = true;
  }

  closeLogoutModal(): void {
    this.isLogoutModalOpen = false;
  }

  confirmLogout(): void {
    this.router.navigate(['/login']);
  }
}