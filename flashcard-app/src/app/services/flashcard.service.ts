import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlashcardSet, Flashcard } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private flashcardSets: FlashcardSet[] = [];
  private flashcardSetsSubject = new BehaviorSubject<FlashcardSet[]>([]);

  constructor() {
    //this.loadSampleData(); // Load sample data for testing
  }

  // Get all flashcard sets
  getFlashcardSets(): Observable<FlashcardSet[]> {
    return this.flashcardSetsSubject.asObservable();
  }

  // Get a specific flashcard set by ID
  getFlashcardSet(id: string): FlashcardSet | undefined {
    return this.flashcardSets.find(set => set.id === id);
  }

  // Create a new flashcard set
  createFlashcardSet(name: string, description: string): FlashcardSet {
    const newSet: FlashcardSet = {
      id: this.generateId(),
      name,
      description,
      cards: [],
      createdDate: new Date()
    };

    this.flashcardSets.push(newSet);
    this.flashcardSetsSubject.next([...this.flashcardSets]);
    return newSet;
  }

  // Update a flashcard set (NEW METHOD)
  updateFlashcardSet(id: string, name: string, description: string): void {
    const set = this.getFlashcardSet(id);
    if (set) {
      set.name = name;
      set.description = description;
      this.flashcardSetsSubject.next([...this.flashcardSets]);
    }
  }

  // Add a card to a set
  addCardToSet(setId: string, front: string, back: string): void {
    const set = this.getFlashcardSet(setId);
    if (set) {
      const newCard: Flashcard = {
        id: this.generateId(),
        front,
        back
      };
      set.cards.push(newCard);
      this.flashcardSetsSubject.next([...this.flashcardSets]);
    }
  }

  // Update a card in a set
  updateCardInSet(setId: string, cardIndex: number, front: string, back: string): void {
    const set = this.getFlashcardSet(setId);
    if (set && set.cards[cardIndex]) {
      set.cards[cardIndex].front = front;
      set.cards[cardIndex].back = back;
      this.flashcardSetsSubject.next([...this.flashcardSets]);
    }
  }

  // Delete a flashcard set
  deleteFlashcardSet(id: string): void {
    this.flashcardSets = this.flashcardSets.filter(set => set.id !== id);
    this.flashcardSetsSubject.next([...this.flashcardSets]);
  }

  // Delete a card from a set
  deleteCardFromSet(setId: string, cardIndex: number): void {
    const set = this.getFlashcardSet(setId);
    if (set && set.cards[cardIndex]) {
      set.cards.splice(cardIndex, 1);
      this.flashcardSetsSubject.next([...this.flashcardSets]);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
