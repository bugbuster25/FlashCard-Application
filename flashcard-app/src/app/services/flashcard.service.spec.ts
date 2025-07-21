import { TestBed } from '@angular/core/testing';
import { FlashcardService } from './flashcard.service';
import { FlashcardSet, Flashcard } from '../models/flashcard.model';

describe('FlashcardService', () => {
  let service: FlashcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createFlashcardSet', () => {
    it('should create a new flashcard set', () => {
      const name = 'Test Set';
      const description = 'Test Description';

      const result = service.createFlashcardSet(name, description);

      expect(result.name).toBe(name);
      expect(result.description).toBe(description);
      expect(result.cards).toEqual([]);
      expect(result.id).toBeDefined();
      expect(result.createdDate).toBeInstanceOf(Date);
    });

    it('should add the set to the observable stream', (done) => {
      const name = 'Test Set';
      const description = 'Test Description';

      service.createFlashcardSet(name, description);

      service.getFlashcardSets().subscribe(sets => {
        expect(sets.length).toBe(1);
        expect(sets[0].name).toBe(name);
        done();
      });
    });
  });

  describe('updateFlashcardSet', () => {
    it('should update an existing flashcard set', () => {
      const set = service.createFlashcardSet('Original', 'Original Description');
      const newName = 'Updated Name';
      const newDescription = 'Updated Description';

      service.updateFlashcardSet(set.id, newName, newDescription);

      const updatedSet = service.getFlashcardSet(set.id);
      expect(updatedSet?.name).toBe(newName);
      expect(updatedSet?.description).toBe(newDescription);
    });

    it('should not update non-existent set', () => {
      service.updateFlashcardSet('non-existent-id', 'New Name', 'New Description');

      service.getFlashcardSets().subscribe(sets => {
        expect(sets.length).toBe(0);
      });
    });
  });

  describe('addCardToSet', () => {
    it('should add a card to an existing set', () => {
      const set = service.createFlashcardSet('Test Set', 'Description');
      const front = 'Question';
      const back = 'Answer';

      service.addCardToSet(set.id, front, back);

      const updatedSet = service.getFlashcardSet(set.id);
      expect(updatedSet?.cards.length).toBe(1);
      expect(updatedSet?.cards[0].front).toBe(front);
      expect(updatedSet?.cards[0].back).toBe(back);
      expect(updatedSet?.cards[0].id).toBeDefined();
    });

    it('should not add card to non-existent set', () => {
      service.addCardToSet('non-existent-id', 'Question', 'Answer');

      service.getFlashcardSets().subscribe(sets => {
        expect(sets.length).toBe(0);
      });
    });
  });

  describe('updateCardInSet', () => {
    it('should update an existing card', () => {
      const set = service.createFlashcardSet('Test Set', 'Description');
      service.addCardToSet(set.id, 'Original Question', 'Original Answer');

      const newFront = 'Updated Question';
      const newBack = 'Updated Answer';
      service.updateCardInSet(set.id, 0, newFront, newBack);

      const updatedSet = service.getFlashcardSet(set.id);
      expect(updatedSet?.cards[0].front).toBe(newFront);
      expect(updatedSet?.cards[0].back).toBe(newBack);
    });
  });

  describe('deleteFlashcardSet', () => {
    it('should delete an existing set', () => {
      const set = service.createFlashcardSet('Test Set', 'Description');

      service.deleteFlashcardSet(set.id);

      service.getFlashcardSets().subscribe(sets => {
        expect(sets.length).toBe(0);
      });
    });
  });

  describe('deleteCardFromSet', () => {
    it('should delete a card from a set', () => {
      const set = service.createFlashcardSet('Test Set', 'Description');
      service.addCardToSet(set.id, 'Question 1', 'Answer 1');
      service.addCardToSet(set.id, 'Question 2', 'Answer 2');

      service.deleteCardFromSet(set.id, 0);

      const updatedSet = service.getFlashcardSet(set.id);
      expect(updatedSet?.cards.length).toBe(1);
      expect(updatedSet?.cards[0].front).toBe('Question 2');
    });
  });
});
