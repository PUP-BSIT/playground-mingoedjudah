import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [MatInputModule, MatFormFieldModule, MatProgressBarModule, MatIconModule]
})

export class MaterialModule {}