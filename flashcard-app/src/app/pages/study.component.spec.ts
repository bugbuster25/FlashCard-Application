import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StudyComponent } from './study.component';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../models/flashcard.model';

describe('StudyComponent', () => {
  let component: StudyComponent;
  let fixture: ComponentFixture<StudyComponent>;
  let mockFlashcardService: jasmine.SpyObj<FlashcardService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockFlashcardSet: FlashcardSet = {
    id: '1',
    name: 'Test Set',
    description: 'Test Description',
    cards: [
      { id: '1', front: 'Question 1', back: 'Answer 1' },
      { id: '2', front: 'Question 2', back: 'Answer 2' },
      { id: '3', front: 'Question 3', back: 'Answer 3' }
    ],
    createdDate: new Date()
  };

  beforeEach(async () => {
    const flashcardServiceSpy = jasmine.createSpyObj('FlashcardService', ['getFlashcardSet']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [StudyComponent, BrowserAnimationsModule],
      providers: [
        { provide: FlashcardService, useValue: flashcardServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudyComponent);
    component = fixture.componentInstance;
    mockFlashcardService = TestBed.inject(FlashcardService) as jasmine.SpyObj<FlashcardService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    mockFlashcardService.getFlashcardSet.and.returnValue(mockFlashcardSet);
    expect(component).toBeTruthy();
  });

  it('should load flashcard set on init', () => {
    mockFlashcardService.getFlashcardSet.and.returnValue(mockFlashcardSet);

    component.ngOnInit();

    expect(mockFlashcardService.getFlashcardSet).toHaveBeenCalledWith('1');
    expect(component.currentSet).toEqual(mockFlashcardSet);
    expect(component.currentCard).toEqual(mockFlashcardSet.cards[0]);
  });

  it('should flip card when flipCard is called', () => {
    component.isFlipped = false;

    component.flipCard();

    expect(component.isFlipped).toBe(true);
  });

  it('should navigate to next card', () => {
    mockFlashcardService.getFlashcardSet.and.returnValue(mockFlashcardSet);
    component.ngOnInit();
    component.currentCardIndex = 0;

    component.nextCard();

    expect(component.currentCardIndex).toBe(1);
    expect(component.currentCard).toEqual(mockFlashcardSet.cards[1]);
    expect(component.isFlipped).toBe(false);
  });

  it('should navigate to previous card', () => {
    mockFlashcardService.getFlashcardSet.and.returnValue(mockFlashcardSet);
    component.ngOnInit();
    component.currentCardIndex = 1;

    component.previousCard();

    expect(component.currentCardIndex).toBe(0);
    expect(component.currentCard).toEqual(mockFlashcardSet.cards[0]);
    expect(component.isFlipped).toBe(false);
  });

  it('should not go to previous card when at first card', () => {
    mockFlashcardService.getFlashcardSet.and.returnValue(mockFlashcardSet);
    component.ngOnInit();
    component.currentCardIndex = 0;

    component.previousCard();

    expect(component.currentCardIndex).toBe(0);
  });

  it('should go back to sets when at last card and next is called', () => {
    mockFlashcardService.getFlashcardSet.and.returnValue(mockFlashcardSet);
    component.ngOnInit();
    component.currentCardIndex = mockFlashcardSet.cards.length - 1;

    component.nextCard();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sets']);
  });

  it('should navigate back to sets when goBack is called', () => {
    component.goBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sets']);
  });
});