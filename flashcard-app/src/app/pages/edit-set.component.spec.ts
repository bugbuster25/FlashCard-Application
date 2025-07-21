import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { EditSetComponent } from './edit-set.component';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../models/flashcard.model';

describe('EditSetComponent', () => {
  let component: EditSetComponent;
  let fixture: ComponentFixture<EditSetComponent>;
  let mockFlashcardService: jasmine.SpyObj<FlashcardService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockFlashcardSet: FlashcardSet = {
    id: '1',
    name: 'Test Set',
    description: 'Test Description',
    cards: [
      { id: '1', front: 'Question 1', back: 'Answer 1' },
      { id: '2', front: 'Question 2', back: 'Answer 2' }
    ],
    createdDate: new Date()
  };

  beforeEach(async () => {
    const flashcardServiceSpy = jasmine.createSpyObj('FlashcardService', [
      'getFlashcardSet', 'addCardToSet', 'updateCardInSet', 'deleteCardFromSet'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        EditSetComponent,
        NoopAnimationsModule,
        RouterTestingModule,
        MatDialogModule // Import the actual MatDialogModule
      ],
      providers: [
        { provide: FlashcardService, useValue: flashcardServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
        // Remove MatDialog mock - let TestBed provide the real one
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSetComponent);
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
  });

  // Add other basic tests without dialog testing for now
  it('should navigate back to sets', () => {
    component.goBack();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sets']);
  });
});
