import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupService } from './services/signup.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmailAuthComponent } from './email-auth/email-auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginService } from './services/login.service';
import { StudentService } from './services/student.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SubjectService } from './services/subject.service';
import { QuizService } from './services/quiz.service';
import { ExerciseService } from './services/exercise.service';
import { ActivityService } from './services/activity.service';
import { ExamService } from './services/exam.service';
import { ProjectService } from './services/project.service';
import { GradeEntryComponent } from './dashboard/grade-entry/grade-entry.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivityComponent } from './dashboard/activity/activity.component';
import { QuizComponent } from './dashboard/quiz/quiz.component';
import { ProjectComponent } from './dashboard/project/project.component';
import { ExamComponent } from './dashboard/exam/exam.component';
import { ExerciseComponent } from './dashboard/exercise/exercise.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PasswordRecoveryComponent,
    EmailAuthComponent,
    HomeComponent,
    AboutUsComponent,
    FaqsComponent,
    HeaderComponent,
    FooterComponent,
    GradeEntryComponent,
    ActivityComponent,
    QuizComponent,
    ProjectComponent,
    ExamComponent,
    ExerciseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [LoginService, 
              SignupService, 
              StudentService, 
              SubjectService, 
              QuizService, 
              ExamService,
              ProjectService,
              ExerciseService,
              ActivityService,
              provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
