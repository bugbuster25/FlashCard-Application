export interface Flashcard {
  id: string;
  front: string;  // Question/Term
  back: string;   // Answer/Definition
}

export interface FlashcardSet {
  id: string;
  name: string;
  description: string;
  cards: Flashcard[];
  createdDate: Date;
}
