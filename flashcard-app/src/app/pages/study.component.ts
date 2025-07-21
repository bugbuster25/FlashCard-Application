import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { FlashcardService } from "../services/flashcard.service"
import { FlashcardSet, Flashcard } from "../models/flashcard.model"

@Component({
  selector: "app-study",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <div class="study-container" *ngIf="currentSet">
      <!-- Beautiful Header -->
      <div class="study-header">
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
            </div>
          </div>
        </div>

        <!-- Enhanced Flashcard -->
        <div class="card-container" *ngIf="currentCard">
          <div class="flashcard-wrapper" (click)="flipCard()">
            <div class="flashcard" [class.flipped]="isFlipped">
              <!-- Front Side -->
              <div class="card-face front">
                <div class="card-header">
                  <mat-icon class="card-icon">help_outline</mat-icon>
                  <span class="card-label">Question</span>
                </div>
                <div class="card-content">
                  <h2>{{ currentCard.front }}</h2>
                </div>
                <div class="card-footer">
                  <div class="flip-hint">
                    <mat-icon>touch_app</mat-icon>
                    <span>Tap to reveal answer</span>
                  </div>
                </div>
              </div>

              <!-- Back Side -->
              <div class="card-face back">
                <div class="card-header">
                  <mat-icon class="card-icon">lightbulb_outline</mat-icon>
                  <span class="card-label">Answer</span>
                </div>
                <div class="card-content">
                  <h2>{{ currentCard.back }}</h2>
                </div>
                <div class="card-footer">
                  <div class="flip-hint">
                    <mat-icon>touch_app</mat-icon>
                    <span>Tap to show question</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Navigation -->
        <div class="navigation-controls">
          <button mat-stroked-button
                  class="nav-btn"
                  [disabled]="currentCardIndex === 0"
                  (click)="previousCard()">
            <mat-icon>chevron_left</mat-icon>
            Previous
          </button>

          <div class="card-counter">
            {{ currentCardIndex + 1 }} / {{ currentSet.cards.length }}
          </div>

          <button mat-stroked-button
                  class="nav-btn"
                  [disabled]="currentCardIndex === currentSet.cards.length - 1"
                  (click)="nextCard()">
            Next
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
    </div>

    <ng-template #noSet>
      <div class="no-set">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <h2>Study Set Not Found</h2>
        <p>The flashcard set you're looking for doesn't exist or has been removed.</p>
        <button mat-raised-button class="back-btn-error" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Back to Sets
        </button>
      </div>
    </ng-template>
  `,
  styles: [
    `
    .study-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding-bottom: 40px;
    }

    /* Beautiful Header */
    .study-header {
      position: relative;
      margin-bottom: 40px;
    }

    .header-background {
      height: 140px;
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

    .q1 { top: 15px; left: 8%; font-size: 24px; }
    .q2 { top: 25px; right: 12%; font-size: 18px; }
    .q3 { bottom: 30px; left: 15%; font-size: 20px; }
    .q4 { bottom: 15px; right: 8%; font-size: 16px; }
    .q5 { top: 50px; left: 45%; font-size: 14px; }
    .q6 { bottom: 45px; right: 35%; font-size: 19px; }

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
      transition: all 0.3s ease;
    }

    .back-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateX(-2px);
    }

    .header-text h1 {
      color: white;
      margin: 0;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .progress-info {
      color: rgba(255, 255, 255, 0.9);
      margin: 4px 0 0 0;
      font-size: 0.95rem;
      font-weight: 500;
    }

    /* Enhanced Flashcard */
    .card-container {
      display: flex;
      justify-content: center;
      margin: 60px 20px 40px 20px;
      perspective: 1000px;
    }

    .flashcard-wrapper {
      width: 100%;
      max-width: 600px;
      height: 400px;
      cursor: pointer;
    }

    .flashcard {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.6s ease;
    }

    .flashcard.flipped {
      transform: rotateY(180deg);
    }

    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      background: white;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .card-face.back {
      transform: rotateY(180deg);
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .card-label {
      font-weight: 600;
      font-size: 0.95rem;
    }

    .card-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 32px;
      text-align: center;
    }

    .card-content h2 {
      margin: 0;
      font-size: 2rem;
      color: #333;
      line-height: 1.3;
      font-weight: 600;
    }

    .card-footer {
      padding: 20px 24px;
      border-top: 1px solid #f0f0f0;
    }

    .flip-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #666;
      font-size: 0.9rem;
    }

    .flip-hint mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .navigation-hint {
      text-align: center;
      color: #666;
      font-size: 0.9rem;
      font-weight: 500;
    }

    /* Enhanced Navigation */
    .navigation-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin: 0 20px;
    }

    .nav-btn {
      border-color: #667eea !important;
      color: #667eea !important;
      font-weight: 500 !important;
      padding: 12px 20px !important;
      border-radius: 8px !important;
      transition: all 0.3s ease;
    }

    .nav-btn:hover:not(:disabled) {
      background: rgba(102, 126, 234, 0.1) !important;
    }

    .nav-btn:disabled {
      border-color: #ccc !important;
      color: #999 !important;
      cursor: not-allowed;
      opacity: 0.6;
    }

    .nav-btn:disabled mat-icon {
      color: #999 !important;
    }

    .card-counter {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    /* No Set Error */
    .no-set {
      text-align: center;
      padding: 80px 20px;
      color: #666;
    }

    .error-icon {
      font-size: 4rem !important;
      width: 4rem !important;
      height: 4rem !important;
      color: #ff6b6b;
      margin-bottom: 20px;
    }

    .no-set h2 {
      margin: 20px 0 10px 0;
      color: #333;
      font-size: 1.8rem;
    }

    .no-set p {
      margin-bottom: 30px;
      font-size: 1.1rem;
      line-height: 1.5;
    }

    .back-btn-error {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      font-weight: 500 !important;
      padding: 14px 28px !important;
      border-radius: 10px !important;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-content {
        padding: 16px 20px;
      }

      .header-text h1 {
        font-size: 1.5rem;
      }

      .card-container {
        margin: 0 16px 32px 16px;
      }

      .flashcard-wrapper {
        height: 350px;
      }

      .card-content h2 {
        font-size: 1.6rem;
      }

      .navigation-controls {
        flex-direction: column;
        gap: 16px;
      }

      .card-counter {
        order: -1;
      }
    }
  `,
  ],
})
export class StudyComponent implements OnInit {
  currentSet: FlashcardSet | null = null
  currentCard: Flashcard | null = null
  currentCardIndex = 0
  isFlipped = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flashcardService: FlashcardService,
  ) {}

  ngOnInit() {
    const setId = this.route.snapshot.paramMap.get("id")
    if (setId) {
      const foundSet = this.flashcardService.getFlashcardSet(setId)
      this.currentSet = foundSet || null
      if (this.currentSet && this.currentSet.cards.length > 0) {
        this.currentCard = this.currentSet.cards[0]
      }
    }
  }

  flipCard() {
    this.isFlipped = !this.isFlipped
  }

  nextCard() {
    if (this.currentSet && this.currentCardIndex < this.currentSet.cards.length - 1) {
      this.currentCardIndex++
      this.currentCard = this.currentSet.cards[this.currentCardIndex]
      this.isFlipped = false
    } else {
      this.goBack()
    }
  }

  previousCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--
      this.currentCard = this.currentSet!.cards[this.currentCardIndex]
      this.isFlipped = false
    }
  }

  goBack() {
    this.router.navigate(["/sets"])
  }
}
