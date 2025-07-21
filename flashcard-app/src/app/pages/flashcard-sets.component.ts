import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, Router } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatMenuModule } from "@angular/material/menu"
import { MatDialogModule, MatDialog } from "@angular/material/dialog"
import { MatTooltipModule } from "@angular/material/tooltip"
import { FlashcardService } from "../services/flashcard.service"
import { FlashcardSet } from "../models/flashcard.model"
import { CreateSetDialogComponent } from "../components/create-set-dialog.component"
import { EditSetDialogComponent } from "../components/edit-set-dialog.component"
import { DeleteConfirmationDialogComponent } from "../components/delete-confirmation-dialog.component"

@Component({
  selector: "app-flashcard-sets",
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, MatDialogModule, MatTooltipModule],
  template: `
    <div class="sets-container">
      <!-- Header -->
      <header class="sets-header">
        <div class="header-content">
          <div class="header-left">
            <button mat-button routerLink="/" class="home-btn">
              <mat-icon>home</mat-icon>
              Home
            </button>
            <div class="divider">|</div>
            <h1>Study Cards</h1>
          </div>

          <div class="header-right">
            <button mat-raised-button
                    class="create-btn"
                    (click)="createNewSet()">
              <mat-icon>add</mat-icon>
              Create Set
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Empty State -->
        <div *ngIf="flashcardSets.length === 0" class="empty-state">
          <mat-icon class="large-icon">folder_open</mat-icon>
          <h2>No flashcard sets yet</h2>
          <p>Create your first set to get started studying!</p>
          <button mat-raised-button
                  class="create-btn"
                  (click)="createNewSet()">
            <mat-icon>add_circle</mat-icon>
            Create Your First Set
          </button>
        </div>

        <!-- Sets Grid -->
        <div *ngIf="flashcardSets.length > 0" class="sets-grid">
          <mat-card *ngFor="let set of flashcardSets" class="set-card">
            <!-- Blue Gradient Header with Question Marks -->
            <div class="card-header">
              <!-- Question Mark Pattern -->
              <div class="question-pattern">
                <span class="q-mark q1">?</span>
                <span class="q-mark q2">?</span>
                <span class="q-mark q3">?</span>
                <span class="q-mark q4">?</span>
                <span class="q-mark q5">?</span>
              </div>

              <!-- Three Dots Menu -->
              <button mat-icon-button
                      class="menu-btn"
                      [matMenuTriggerFor]="setMenu">
                <mat-icon>more_vert</mat-icon>
              </button>

              <mat-menu #setMenu="matMenu">
                <button mat-menu-item (click)="deleteSet(set)" class="delete-item">
                  <mat-icon>delete</mat-icon>
                  <span>Delete Set</span>
                </button>
              </mat-menu>

              <!-- Card Count -->
              <div class="card-count">
                {{set.cards.length}} cards
              </div>
            </div>

            <mat-card-content class="card-content">
              <div class="set-info">
                <h3 class="set-title">{{set.name}}</h3>
                <p class="set-description">{{set.description || 'No description'}}</p>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons">
                <!-- Study Button with Tooltip Wrapper -->
                <div class="study-btn-wrapper"
                     [matTooltip]="set.cards.length < 10 ? 'You need at least 10 cards to study' : ''"
                     [matTooltipDisabled]="set.cards.length >= 10">
                  <button mat-raised-button
                          class="study-btn"
                          [routerLink]="set.cards.length >= 10 ? ['/study', set.id] : null"
                          [disabled]="set.cards.length < 10"
                          (click)="set.cards.length < 10 ? $event.preventDefault() : null">
                    <mat-icon>play_arrow</mat-icon>
                    Study

                  </button>
                </div>

                <button mat-stroked-button
                        class="add-cards-btn"
                        (click)="addCards(set)">
                  <mat-icon>add</mat-icon>
                  Add Cards
                </button>

                <button mat-icon-button
                        class="edit-btn"
                        (click)="editSet(set)"
                        matTooltip="Edit set details">
                  <mat-icon>edit</mat-icon>
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </main>

      <!-- Mobile Floating Action Button -->
      <button mat-fab
              class="fab"
              (click)="createNewSet()">
        <mat-icon>add</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
    .sets-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    /* Header Styles - UPDATED FOR BETTER ALIGNMENT */
    .sets-header {
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-bottom: 1px solid #e0e0e0;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;
      height: 100%;
    }

    /* UPDATED: Make Home button same size as Study Cards title */
    .home-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
      font-weight: 600 !important;
      font-size: 1.25rem !important;
      height: 40px !important;
      padding: 0 8px !important;
      min-width: auto !important;
    }

    .divider {
      color: #ccc;
      font-size: 1.2rem;
      height: 24px;
      display: flex;
      align-items: center;
    }

    /* UPDATED: Match Home button size */
    .header-left h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
      height: 40px;
      display: flex;
      align-items: center;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
      height: 100%;
    }

    .create-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      font-weight: 500 !important;
      height: 32px !important;
      padding: 0 14px !important;
      font-size: 0.9rem !important;
    }

    /* Main Content */
    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .empty-state {
      text-align: center;
      padding: 80px 20px;
      color: #666;
    }

    .large-icon {
      font-size: 4rem !important;
      width: 4rem !important;
      height: 4rem !important;
      color: #ccc;
      margin-bottom: 20px;
    }

    .empty-state h2 {
      margin: 20px 0 10px 0;
      color: #333;
    }

    .empty-state p {
      margin-bottom: 30px;
      font-size: 1.1rem;
    }

    /* Sets Grid */
    .sets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    .set-card {
      overflow: hidden;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .set-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    /* Card Header with Blue Gradient */
    .card-header {
      height: 96px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }

    /* Question Mark Pattern */
    .question-pattern {
      position: absolute;
      inset: 0;
      opacity: 0.2;
    }

    .q-mark {
      position: absolute;
      color: white;
      font-weight: bold;
      font-family: serif;
    }

    .q1 { top: 8px; left: 16px; font-size: 24px; }
    .q2 { top: 16px; right: 32px; font-size: 18px; }
    .q3 { bottom: 12px; left: 32px; font-size: 20px; }
    .q4 { bottom: 8px; right: 16px; font-size: 14px; }
    .q5 { top: 32px; left: 64px; font-size: 16px; }

    /* Menu Button */
    .menu-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      color: white;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .set-card:hover .menu-btn {
      opacity: 1;
    }

    .edit-item {
      color: #1976d2 !important;
    }

    .delete-item {
      color: #f44336 !important;
    }

    /* Card Count */
    .card-count {
      position: absolute;
      bottom: 12px;
      left: 16px;
      color: white;
      font-weight: 500;
      font-size: 0.9rem;
    }

    /* Card Content */
    .card-content {
      padding: 20px !important;
    }

    .set-info {
      margin-bottom: 20px;
    }

    .set-title {
      margin: 0 0 8px 0;
      font-size: 1.3rem;
      font-weight: 600;
      color: #333;
      line-height: 1.3;
    }

    .set-description {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Action Buttons */
    .action-buttons {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .study-btn-wrapper {
      flex: 1;
    }

    .study-btn {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      font-weight: 500 !important;
    }

    .study-btn:disabled {
      background: #ccc !important;
      color: #999 !important;
      cursor: not-allowed;
    }

    .card-requirement {
      font-size: 0.8rem;
      opacity: 0.8;
      margin-left: 4px;
    }

    .add-cards-btn {
      flex: 1;
      border-color: #667eea !important;
      color: #667eea !important;
      font-weight: 500 !important;
    }

    .add-cards-btn:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
    }

    .edit-btn {
      border: 1px solid #667eea;
      color: #667eea;
    }

    .edit-btn:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    /* Floating Action Button */
    .fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      z-index: 1000;
    }

    /* UPDATED: Better responsive design */
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 12px;
        height: auto;
        padding: 12px 16px;
      }

      .header-left {
        justify-content: center;
        width: 100%;
      }

      .header-right {
        justify-content: center;
        width: 100%;
      }

      .sets-grid {
        grid-template-columns: 1fr;
      }

      .divider {
        display: none;
      }

      .fab {
        display: block;
      }
    }

    @media (min-width: 769px) {
      .fab {
        display: none;
      }
    }
  `,
  ],
})
export class FlashcardSetsComponent implements OnInit {
  flashcardSets: FlashcardSet[] = []

  constructor(
    private flashcardService: FlashcardService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.flashcardService.getFlashcardSets().subscribe((sets) => {
      this.flashcardSets = sets
    })
  }

  createNewSet() {
    const dialogRef = this.dialog.open(CreateSetDialogComponent, {
      width: "500px",
      disableClose: false,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.flashcardService.createFlashcardSet(result.name, result.description)
      }
    })
  }

  editSet(set: FlashcardSet) {
    const dialogRef = this.dialog.open(EditSetDialogComponent, {
      width: "500px",
      disableClose: false,
      data: set
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.flashcardService.updateFlashcardSet(result.id, result.name, result.description)
      }
    })
  }

  deleteSet(set: FlashcardSet) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: "400px",
      data: {
        setName: set.name,
        cardCount: set.cards.length,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.flashcardService.deleteFlashcardSet(set.id)
      }
    })
  }

  addCards(set: FlashcardSet) {
    // Navigate to edit page or implement add cards functionality
    this.router.navigate(["/edit", set.id])
  }
}
