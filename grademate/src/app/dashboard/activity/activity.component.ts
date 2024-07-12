import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnChanges {
  @Input() subjectId: number | null = null;
  activities: any[] = [];
  newActivityScore: number = 0;
  newActivityTotal: number = 0;
  showAddActivityModal: boolean = false;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    if (this.subjectId) {
      this.loadActivities(this.subjectId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subjectId'] && !changes['subjectId'].firstChange) {
      this.loadActivities(this.subjectId!);
    }
  }

  loadActivities(subjectId: number): void {
    this.activityService.getActivities(subjectId).subscribe(
      activities => this.activities = activities,
      error => console.error('Error loading activities:', error)
    );
  }

  updateActivity(activity: any): void {
    const activityData = { id: activity.id, subject_id: this.subjectId, score: activity.score, total: activity.total };
    this.activityService.updateActivity(activity.id, [activityData]).subscribe(
      () => this.loadActivities(this.subjectId!),
      error => console.error('Error updating activity:', error)
    );
  }

  deleteActivity(activity: any): void {
    this.activityService.deleteActivity(activity).subscribe(
      response => {
        console.log('Activity deleted successfully:', response);
        if (this.subjectId) {
          this.loadActivities(this.subjectId); // Refresh the list after deletion
        }
      },
      error => {
        console.error('Error deleting activity:', error);
      }
    );
  }  

  openAddActivityModal(): void {
    this.showAddActivityModal = true;
  }

  closeAddActivityModal(): void {
    this.showAddActivityModal = false;
    this.newActivityScore = 0;
    this.newActivityTotal = 0;
  }

  addActivity(): void {
    const newActivity = [{ subject_id: this.subjectId, score: this.newActivityScore, total: this.newActivityTotal }];
    this.activityService.addActivity(newActivity).subscribe(
      () => {
        this.closeAddActivityModal();
        this.loadActivities(this.subjectId!);
      },
      error => console.error('Error adding activity:', error)
    );
  }
}
