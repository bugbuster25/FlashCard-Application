import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardSet } from '../models/flashcard.model';

@Component({
  selector: 'app-edit-set-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>
        <mat-icon>edit</mat-icon>
        Edit Flashcard Set
      </h2>

      <mat-dialog-content>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Set Name</mat-label>
          <input matInput [(ngModel)]="setName"
                 placeholder="e.g., Maths Basics, Physical Science Terms"
                 maxlength="50"
                 required>
          <mat-hint>{{ setName.length }}/50</mat-hint>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput [(ngModel)]="setDescription"
                    placeholder="Brief description of what you'll be studying"
                    rows="3"
                    maxlength="200"></textarea>
          <mat-hint>{{ setDescription.length }}/200</mat-hint>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="cancel()" class="cancel-btn">
          Cancel
        </button>
        <button mat-raised-button (click)="updateSet()"
                [disabled]="!setName.trim()"
                class="update-btn">
          <mat-icon>save</mat-icon>
          Update Set
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
      color: #1976d2;
      margin-bottom: 24px;
      font-size: 1.5rem;
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

    .update-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      padding: 8px 20px;
      font-weight: 500;
    }

    .update-btn:hover {
      background-color: #1565c0 !important;
    }

    .update-btn:disabled {
      background: #ccc !important;
      color: #999 !important;
      cursor: not-allowed;
    }

    /* Fix form field styling */
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
  `]
})
export class EditSetDialogComponent {
  setName: string;
  setDescription: string;

  constructor(
    private dialogRef: MatDialogRef<EditSetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FlashcardSet
  ) {
    // Initialize with existing set data
    this.setName = data.name;
    this.setDescription = data.description;
  }

  updateSet() {
    if (this.setName.trim()) {
      this.dialogRef.close({
        id: this.data.id,
        name: this.setName.trim(),
        description: this.setDescription.trim()
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
