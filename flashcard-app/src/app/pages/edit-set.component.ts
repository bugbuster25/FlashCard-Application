import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatDialogModule, MatDialog } from "@angular/material/dialog"
import { MatDividerModule } from "@angular/material/divider"
import { MatTooltipModule } from "@angular/material/tooltip"
import { FlashcardService } from "../services/flashcard.service"
import { FlashcardSet } from "../models/flashcard.model"
import { DeleteCardDialogComponent } from "../components/delete-card-dialog.component"
import { EditCardDialogComponent } from "../components/edit-card-dialog.component"

@Component({
  selector: "app-edit-set",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  template: `
    <div class="edit-container" *ngIf="currentSet">
      <!-- Beautiful Header -->
      <div class="page-header">
        <div class="header-background">
          <!-- Question Mark Pattern -->
          <div class="question-pattern">
            <span class="q-mark q1">?</span>
            <span class="q-mark q2">?</span>
            <span class="q-mark q3">?</span>
            <span class="q-mark q4">?</span>
            <span class="q-mark q5">?</span>
            <span class="q-mark q6">?</span>
          </div>

          <div class="header-content">
            <button mat-icon-button (click)="goBack()" class="back-btn">
              <mat-icon>arrow_back</mat-icon>
            </button>
            <div class="header-text">
              <h1>{{ currentSet.name }}</h1>
              <p>{{ currentSet.cards.length }} card{{ currentSet.cards.length !== 1 ? 's' : '' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <!-- Enhanced Add Card Section -->
        <mat-card class="add-card-section" elevation="2">
          <div class="card-header">
            <mat-icon class="header-icon">add_circle</mat-icon>
            <h2>Create New Card</h2>
          </div>

          <mat-card-content>
            <div class="form-grid">
              <div class="form-group">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Front (Question/Term)</mat-label>
                  <input matInput [(ngModel)]="newCardFront"
                         placeholder="Enter the question or term..."
                         class="card-input">
                </mat-form-field>
              </div>

              <div class="form-group">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Back (Answer/Definition)</mat-label>
                  <textarea matInput [(ngModel)]="newCardBack"
                            placeholder="Enter the answer or definition..."
                            rows="4"
                            class="card-input"></textarea>
                </mat-form-field>
              </div>
            </div>
          </mat-card-content>

          <mat-card-actions class="card-actions">
            <button mat-raised-button
                    class="add-btn"
                    (click)="addCard()"
                    [disabled]="!newCardFront.trim() || !newCardBack.trim()">
              <mat-icon>add</mat-icon>
              Add Card
            </button>
          </mat-card-actions>
        </mat-card>

        <!-- Cards Display Section -->
        <div class="cards-section">
          <div class="section-header">
            <h2>Study Cards</h2>
            <div class="card-count-badge" *ngIf="currentSet.cards.length > 0">
              {{ currentSet.cards.length }}
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="currentSet.cards.length === 0" class="empty-state">
            <div class="empty-icon">
              <mat-icon>collections_bookmark</mat-icon>
            </div>
            <h3>No cards yet!</h3>
            <p>Create your first card above to start building your study set.</p>
          </div>

          <!-- Cards Grid -->
          <div *ngIf="currentSet.cards.length > 0" class="cards-grid">
            <mat-card *ngFor="let card of currentSet.cards; let i = index"
                      class="flashcard-item"
                      elevation="2">

              <mat-card-content class="card-content">
                <div class="card-sides">
                  <div class="card-side front">
                    <div class="side-label">
                      <mat-icon>help_outline</mat-icon>
                      Question
                    </div>
                    <div class="side-content">{{ card.front }}</div>
                  </div>

                  <mat-divider [vertical]="true" class="card-divider"></mat-divider>

                  <div class="card-side back">
                    <div class="side-label">
                      <mat-icon>lightbulb_outline</mat-icon>
                      Answer
                    </div>
                    <div class="side-content">{{ card.back }}</div>
                  </div>
                </div>
              </mat-card-content>

              <mat-card-actions class="card-item-actions">
                <button mat-icon-button
                        class="edit-btn"
                        (click)="editCard(i)"
                        matTooltip="Edit card">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button
                        class="delete-btn"
                        (click)="removeCard(i)"
                        matTooltip="Delete card">
                  <mat-icon>delete_outline</mat-icon>
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>

        <!-- Study Button with Tooltip -->
        <div class="study-section" *ngIf="currentSet.cards.length > 0">
          <div class="study-btn-wrapper"
               [matTooltip]="currentSet.cards.length < 10 ? 'You need at least 10 cards to study' : ''"
               [matTooltipDisabled]="currentSet.cards.length >= 10">
            <button mat-raised-button
                    class="study-btn"
                    [routerLink]="currentSet.cards.length >= 10 ? ['/study', currentSet.id] : null"
                    [disabled]="currentSet.cards.length < 10"
                    (click)="currentSet.cards.length < 10 ? $event.preventDefault() : null">
              <mat-icon>play_arrow</mat-icon>
              Start Studying
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .edit-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    /* Beautiful Header */
    .page-header {
      position: relative;
      margin-bottom: 32px;
    }

    .header-background {
      height: 160px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }

    .question-pattern {
      position: absolute;
      inset: 0;
      opacity: 0.15;
    }

    .q-mark {
      position: absolute;
      color: white;
      font-weight: bold;
      font-family: serif;
    }

    .q1 { top: 20px; left: 10%; font-size: 28px; }
    .q2 { top: 30px; right: 15%; font-size: 20px; }
    .q3 { bottom: 40px; left: 20%; font-size: 24px; }
    .q4 { bottom: 20px; right: 10%; font-size: 18px; }
    .q5 { top: 60px; left: 50%; font-size: 16px; }
    .q6 { bottom: 60px; right: 40%; font-size: 22px; }

    .header-content {
      position: relative;
      display: flex;
      align-items: center;
      padding: 24px 32px;
      height: 100%;
    }

    .back-btn {
      color: white;
      background: rgba(255, 255, 255, 0.2);
      margin-right: 16px;
      backdrop-filter: blur(10px);
    }

    .back-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .header-text h1 {
      color: white;
      margin: 0;
      font-size: 2rem;
      font-weight: 600;
    }

    .header-text p {
      color: rgba(255, 255, 255, 0.8);
      margin: 4px 0 0 0;
      font-size: 1rem;
    }

    /* Content Wrapper */
    .content-wrapper {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Enhanced Add Card Section */
    .add-card-section {
      margin-bottom: 40px;
      border-radius: 16px;
      overflow: hidden;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 24px 16px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .header-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .card-header h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .form-grid {
      display: grid;
      gap: 20px;
      padding: 24px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .full-width {
      width: 100%;
    }

    .card-input {
      font-size: 1rem;
    }

    .card-actions {
      padding: 0 24px 24px 24px;
      display: flex;
      justify-content: flex-end;
    }

    .add-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      font-weight: 500;
      padding: 12px 24px;
      font-size: 1rem;
    }

    .add-btn:disabled {
      background: #ccc !important;
      color: #999 !important;
      cursor: not-allowed;
    }

    /* Cards Section */
    .cards-section {
      margin-bottom: 40px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .section-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .card-count-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-weight: 500;
      font-size: 0.9rem;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .empty-icon mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      color: #ccc;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 16px 0 8px 0;
      color: #333;
      font-size: 1.5rem;
    }

    .empty-state p {
      font-size: 1.1rem;
      line-height: 1.5;
    }

    /* Cards Grid */
    .cards-grid {
      display: grid;
      gap: 16px;
    }

    .flashcard-item {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .flashcard-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }

    .card-content {
      padding: 24px 24px 16px 24px !important;
    }

    .card-sides {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 24px;
      align-items: start;
    }

    .card-side {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .side-label {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #666;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .side-label mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .side-content {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      min-height: 60px;
      display: flex;
      align-items: center;
      font-size: 1rem;
      line-height: 1.4;
    }

    .card-divider {
      height: 80px;
      align-self: center;
    }

    .card-item-actions {
      padding: 0 24px 16px 24px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    .edit-btn {
      color: #667eea;
      border: 1px solid #667eea;
      transition: all 0.3s ease;
      width: 40px;
      height: 40px;
      min-width: 40px;
      padding: 0;
    }

    .edit-btn:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .delete-btn {
      color: #f44336;
      transition: all 0.3s ease;
      width: 40px;
      height: 40px;
      min-width: 40px;
      padding: 0;
    }

    .delete-btn:hover {
      background: rgba(244, 67, 54, 0.1);
    }

    /* Study Section */
    .study-section {
      text-align: center;
      padding: 40px 0;
    }

    .study-btn-wrapper {
      display: inline-block;
    }

    .study-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      font-weight: 500;
      padding: 16px 32px;
      font-size: 1.1rem;
      border-radius: 8px;
      min-width: 200px;
    }

    .study-btn:disabled {
      background: #ccc !important;
      color: #999 !important;
      cursor: not-allowed;
    }

    .study-count {
      opacity: 0.9;
      font-size: 0.9rem;
      margin-left: 8px;
    }

    /* Progress Indicator */
    .progress-indicator {
      margin-top: 20px;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }

    .progress-text {
      color: #666;
      font-size: 0.95rem;
      margin-bottom: 12px;
      font-weight: 500;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background-color: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-content {
        padding: 16px 20px;
      }

      .header-text h1 {
        font-size: 1.5rem;
      }

      .content-wrapper {
        padding: 0 16px;
      }

      .card-sides {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .card-divider {
        display: none;
      }

      .form-grid {
        padding: 16px;
      }

      .card-header {
        padding: 16px;
      }

      .card-actions {
        padding: 0 16px 16px 16px;
      }
    }
  `,
  ],
})
export class EditSetComponent implements OnInit {
  currentSet: FlashcardSet | null = null
  newCardFront = ""
  newCardBack = ""

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flashcardService: FlashcardService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    const setId = this.route.snapshot.paramMap.get("id")
    if (setId) {
      const foundSet = this.flashcardService.getFlashcardSet(setId)
      this.currentSet = foundSet || null
    }
  }

  addCard() {
    if (this.currentSet && this.newCardFront.trim() && this.newCardBack.trim()) {
      this.flashcardService.addCardToSet(this.currentSet.id, this.newCardFront.trim(), this.newCardBack.trim())

      // Clear the form
      this.newCardFront = ""
      this.newCardBack = ""

      // Refresh the current set
      const updatedSet = this.flashcardService.getFlashcardSet(this.currentSet.id)
      this.currentSet = updatedSet || null
    }
  }

  editCard(index: number) {
    if (this.currentSet && this.currentSet.cards[index]) {
      const card = this.currentSet.cards[index];
      const dialogRef = this.dialog.open(EditCardDialogComponent, {
        width: "600px",
        data: {
          front: card.front,
          back: card.back
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && this.currentSet) {
          this.flashcardService.updateCardInSet(
            this.currentSet.id,
            index,
            result.front,
            result.back
          );

          // Refresh the current set
          const updatedSet = this.flashcardService.getFlashcardSet(this.currentSet.id);
          this.currentSet = updatedSet || null;
        }
      });
    }
  }

  removeCard(index: number) {
    if (this.currentSet) {
      const card = this.currentSet.cards[index]
      const dialogRef = this.dialog.open(DeleteCardDialogComponent, {
        width: "400px",
        data: {
          front: card.front,
          back: card.back,
        },
      })

      dialogRef.afterClosed().subscribe((result) => {
        if (result && this.currentSet) {
          this.flashcardService.deleteCardFromSet(this.currentSet.id, index);

          // Refresh the current set
          const updatedSet = this.flashcardService.getFlashcardSet(this.currentSet.id);
          this.currentSet = updatedSet || null;
        }
      })
    }
  }

  goBack() {
    this.router.navigate(["/sets"])
  }
}
