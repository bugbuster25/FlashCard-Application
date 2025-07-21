import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>
        <mat-icon class="warning-icon">warning</mat-icon>
        Delete Flashcard Set
      </h2>

      <mat-dialog-content>
        <p>Are you sure you want to delete <strong>"{{ data.setName }}"</strong>?</p>
        <p class="warning-text">
          This action cannot be undone. All cards in this set will be permanently deleted.
        </p>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="cancel()" class="cancel-btn">
          Cancel
        </button>
        <button mat-raised-button (click)="confirm()" class="delete-btn">
          <mat-icon>delete</mat-icon>
          Delete Set
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 8px;
    }

    h2 {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #d32f2f;
      margin-bottom: 20px;
    }

    .warning-icon {
      color: #ff9800;
    }

    mat-dialog-content {
      min-width: 350px;
      padding: 0 0 20px 0;
    }

    .warning-text {
      background-color: #fff3e0;
      padding: 12px;
      border-radius: 4px;
      color: #e65100;
      font-size: 0.9em;
      margin-top: 16px;
    }

    .cancel-btn {
      margin-right: 8px;
    }

    .delete-btn {
      background-color: #f44336 !important;
      color: white !important;
    }

    .delete-btn:hover {
      background-color: #d32f2f !important;
    }

    strong {
      color: #1976d2;
    }
  `]
})
export class DeleteConfirmationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { setName: string; cardCount?: number }
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
