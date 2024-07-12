import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { SubjectService } from '../services/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../services/quiz.service';

interface Subject {
  id: number;
  subject_name: string;
  activity_weight: number;
  quiz_weight: number;
  exercise_weight: number;
  exam_weight: number;
  project_weight: number;
}

interface AssessmentWeights {
  activity_weight: number;
  quiz_weight: number;
  exercise_weight: number;
  exam_weight: number;
  project_weight: number;
}

interface Assessment {
  assessment_name: string;
  score: number;
  total: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedSubjects: boolean[] = [];
  selectedCourses: boolean[] = [];
  selectedSubMenu: string | null = '';
  selectedCourse = '';
  courses: string[] = [];
  selectedMenu = 'courses';
  selectedSubjectId: number | null = null;
  assessmentWeights: AssessmentWeights | null = null;
  subjects: Subject[] = [];
  selectedAssessmentType: string = 'activity'
  assessmentData: Assessment[] = [];

  subjectData = {
    subject_name: '',
    quiz_weight: 0,
    activity_weight: 0,
    exam_weight: 0,
    project_weight: 0,
    exercise_weight: 0
  };

  newSubjectName: string = '';
  selectMode = false;
  showAddModal = false;
  showEditModal = false;
  selectedSubject: Subject = { 
    id: 0, 
    subject_name: '', 
    quiz_weight: 0, 
    activity_weight: 0, 
    exam_weight: 0, 
    project_weight: 0, 
    exercise_weight: 0 
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
  quizzes: any[] = [];
  newQuiz: any = { question: '', score: 0, total: 0 };

  showTotalsTable: boolean = false;
  totals: any = {
    quizTotal: 0,
    activityTotal: 0,
    examTotal: 0,
    exerciseTotal: 0,
    projectTotal: 0,
    grandTotal: 0
  };

  constructor(
    private router: Router,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private snackBar: MatSnackBar,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadQuizzes(): void {
    if (this.selectedSubjectId) {
      this.quizService.getQuizzes(this.selectedSubjectId).subscribe(data => {
        this.quizzes = data;
      });
    }
  }

  addQuiz(): void {
    this.newQuiz.subject_id = this.selectedSubjectId;
    this.quizService.addQuiz(this.newQuiz).subscribe(data => {
      this.loadQuizzes();
    });
  }

  updateQuiz(quiz: any): void {
    this.quizService.updateQuiz(quiz.id, quiz).subscribe(data => {
      this.loadQuizzes();
    });
  }
  
  deleteQuiz(quizId: any): void {
    this.quizService.deleteQuiz(quizId).subscribe(data => {
      this.loadQuizzes();
    });
  }  

  loadSubjects() {
    this.subjectService.getSubjects().subscribe(
      subjects => {
        this.subjects = subjects;
      },
      error => {
        console.error('Error loading subjects:', error);
      }
    );
  }

  loadAssessments() {
    if (this.selectedSubjectId) {
      this.subjectService.getSubjectById(this.selectedSubjectId).subscribe(
        (subject) => {
          this.assessmentWeights = {
            activity_weight: subject.activity_weight,
            quiz_weight: subject.quiz_weight,
            exercise_weight: subject.exercise_weight,
            exam_weight: subject.exam_weight,
            project_weight: subject.project_weight
          };
        },
        (error) => {
          console.error('Error loading assessments:', error);
          this.assessmentWeights = null;  // Ensure assessmentWeights is null in case of error
        }
      );
    } else {
      this.assessmentWeights = null;  // Reset assessmentWeights if no subject is selected
    }
  }

  saveAssessmentWeights() {
    if (this.selectedSubjectId && this.assessmentWeights) {
      const totalWeight = this.assessmentWeights.activity_weight +
                          this.assessmentWeights.quiz_weight +
                          this.assessmentWeights.exercise_weight +
                          this.assessmentWeights.exam_weight +
                          this.assessmentWeights.project_weight;
  
      if (totalWeight > 100) {
        this.snackBar.open('Total weight of all assessments should be less or equal to 100%', 'Close', {
          duration: 3000,
        });
        return; // Stop further execution if validation fails
      }
  
      // Convert percentage weights to decimals
      const payload = {
        id: this.selectedSubjectId,
        activity_weight: this.assessmentWeights.activity_weight / 100,
        quiz_weight: this.assessmentWeights.quiz_weight / 100,
        exercise_weight: this.assessmentWeights.exercise_weight / 100,
        exam_weight: this.assessmentWeights.exam_weight / 100,
        project_weight: this.assessmentWeights.project_weight / 100,
      };
  
      // Call the updateSubject method from SubjectService
      this.subjectService.updateSubject(this.selectedSubjectId, payload).subscribe(
        (response) => {
          // Handle success
          console.log('Assessment weights updated successfully:', response);
          this.snackBar.open('Assessment weights updated successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          // Handle error
          console.error('Error updating assessment weights:', error);
          this.snackBar.open('Failed to update assessment weights', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }  
  
  deleteSelected() {
    for (let i = this.selectedSubjects.length - 1; i >= 0; i--) {
      if (this.selectedSubjects[i]) {
        const subjectId = this.subjects[i].id;
        this.subjectService.deleteSubject(subjectId).subscribe(
          () => {
            this.snackBar.open('Subject deleted successfully', 'Close', { duration: 3000 });
            this.loadSubjects(); // Reload subjects after deletion
          },
          error => {
            console.error('Error deleting subject:', error);
            this.snackBar.open('Something went wrong. Please try again later.', 'Close', { duration: 3000 });
          }
        );
      }
    }
    this.selectedSubjects = []; // Clear selection after deletion
  }
  

  addSubject() {
    this.subjectData.subject_name = this.newSubjectName;
    this.subjectService.addSubject(this.subjectData).subscribe(
      response => {
        this.snackBar.open('Subject added successfully', 'Close', { duration: 3000 });
        this.loadSubjects();
        this.closeAddModal();
      },
      error => {
        console.error('Error adding subject:', error);
        this.snackBar.open('Subject already exists.', 'Close', { duration: 3000 });
      }
    );
  }

  saveEditedSubject() {
    if (this.selectedSubject && this.selectedSubject.subject_name.trim()) {
      // Check if the subject name already exists
      const existingSubject = this.subjects.find(subject => subject.subject_name.toLowerCase() === this.selectedSubject.subject_name.toLowerCase());
      if (existingSubject && existingSubject.id !== this.selectedSubject.id) {
        this.snackBar.open('Subject name already exists. Please choose a different name.', 'Close', { duration: 3000 });
        return;
      }
  
      const totalWeight = this.selectedSubject.quiz_weight +
                          this.selectedSubject.activity_weight +
                          this.selectedSubject.exam_weight +
                          this.selectedSubject.project_weight +
                          this.selectedSubject.exercise_weight;
      if (totalWeight > 100) {
        this.snackBar.open('Total weight of all assessments should be less or equal to 100', 'Close', { duration: 3000 });
        return;
      }
  
      const updatedSubject = {
        id: this.selectedSubject.id,
        subject_name: this.selectedSubject.subject_name,
        quiz_weight: this.selectedSubject.quiz_weight,
        activity_weight: this.selectedSubject.activity_weight,
        exam_weight: this.selectedSubject.exam_weight,
        project_weight: this.selectedSubject.project_weight,
        exercise_weight: this.selectedSubject.exercise_weight,
      };
      this.subjectService.updateSubject(this.selectedSubject.id, updatedSubject).subscribe(
        response => {
          this.snackBar.open('Subject updated successfully', 'Close', { duration: 3000 });
          this.loadSubjects();
          this.closeEditModal();
        },
        error => {
          console.error('Error updating subject:', error);
          this.snackBar.open('Something went wrong. Please try again later', 'Close', { duration: 3000 });
        }
      );
    }
  }
  

  //Courses
  openEditModalSubject(subject: Subject) {
    this.selectedSubject = { ...subject };
    this.showEditModal = true;
  }

  openAddModal() {
    this.newSubjectName = '';
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  toggleSelection() {
    this.selectMode = !this.selectMode;
  }

  toggleAllSelection(event: any) {
    const checked = event.target.checked; // Safely access checked property
    this.selectedSubjects.fill(checked);
  }
  
  selectSubMenu(subMenu: string): void {
    this.selectedSubMenu = subMenu;
  }

  toggleDropdown(menu: string): void {
    this.dropdowns[menu] = !this.dropdowns[menu];
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openEditModal(subject: Subject) {
    this.selectedSubject = { ...subject };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  trackByFn(index: number): number {
    return index;
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }
}
