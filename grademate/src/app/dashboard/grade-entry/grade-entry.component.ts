import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-grade-entry',
  templateUrl: './grade-entry.component.html',
  styleUrls: ['./grade-entry.component.css']
})
export class GradeEntryComponent implements OnInit {
  subjects: any[] = [];
  selectedSubject!: number;
  selectedTable: string = 'activity'; // Default to 'activity'
  assessmentTypes = [
    { value: 'activity', label: 'Activity' },
    { value: 'exercise', label: 'Exercise' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'exam', label: 'Exam' },
    { value: 'project', label: 'Project' }
  ];

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      data => {
        console.log('Subjects loaded:', data);
        this.subjects = data;
      },
      error => {
        console.error('Error loading subjects:', error);
      }
    );
  }

  onSubjectChange(event: any): void {
    console.log('Selected subject:', event.value);
    this.selectedSubject = event.value;
    this.reloadActivities();
  }

  onTableChange(event: any): void {
    console.log('Selected assessment type:', event.value);
    this.selectedTable = event.value;
    this.reloadActivities();
  }

  reloadActivities(): void {
    if (this.selectedTable === 'activity') {
      // Trigger reloading of activities
      const activityComponent = document.querySelector('app-activity') as any;
      if (activityComponent) {
        activityComponent.loadActivities(this.selectedSubject);
      }
    }
  }
}
