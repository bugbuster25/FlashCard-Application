import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface EditCardDialogData {
  front: string;
  back: string;
}

@Component({
  selector: 'app-edit-card-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>
        <mat-icon>edit</mat-icon>
        Edit Card
      </h2>

      <mat-dialog-content>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Front (Question/Term)</mat-label>
          <input matInput [(ngModel)]="cardFront"
                 placeholder="What do you want to learn?"
                 maxlength="500"
                 required>
          <mat-hint>{{ cardFront.length }}/500</mat-hint>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Back (Answer/Definition)</mat-label>
          <textarea matInput [(ngModel)]="cardBack"
                    placeholder="Enter the answer or definition..."
                    rows="4"
                    maxlength="1000"
                    required></textarea>
          <mat-hint>{{ cardBack.length }}/1000</mat-hint>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="cancel()" class="cancel-btn">
          Cancel
        </button>
        <button mat-raised-button (click)="saveCard()"
                [disabled]="!cardFront.trim() || !cardBack.trim()"
                class="save-btn">
          <mat-icon>save</mat-icon>
          Save Changes
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 16px;
    }

    h2 {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #667eea;
      margin-bottom: 24px;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }

    mat-dialog-content {
      min-width: 450px;
      padding: 0 0 24px 0;
    }

    .cancel-btn {
      margin-right: 12px;
      color: #666;
    }

    .save-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      padding: 8px 20px;
      font-weight: 500;
    }

    .save-btn:hover {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .save-btn:disabled {
      background: #ccc !important;
      color: #999 !important;
      cursor: not-allowed;
    }

    /* Form field styling */
    ::ng-deep .mat-mdc-form-field {
      font-size: 14px;
    }

    ::ng-deep .mat-mdc-text-field-wrapper {
      background-color: white;
    }

    ::ng-deep .mat-mdc-form-field-outline {
      color: #ddd;
    }

    ::ng-deep .mat-mdc-form-field-focus-overlay {
      background-color: transparent;
    }

    ::ng-deep .mat-mdc-form-field-focused .mat-mdc-form-field-outline {
      color: #667eea;
    }

    ::ng-deep .mat-mdc-form-field-focused .mat-mdc-floating-label {
      color: #667eea;
    }
  `]
})
export class EditCardDialogComponent {
  cardFront: string;
  cardBack: string;

  constructor(
    private dialogRef: MatDialogRef<EditCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditCardDialogData
  ) {
    this.cardFront = data.front;
    this.cardBack = data.back;
  }

  saveCard() {
    if (this.cardFront.trim() && this.cardBack.trim()) {
      this.dialogRef.close({
        front: this.cardFront.trim(),
        back: this.cardBack.trim()
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
