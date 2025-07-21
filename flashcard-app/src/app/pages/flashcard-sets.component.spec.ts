import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FlashcardSetsComponent } from './flashcard-sets.component';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../models/flashcard.model';

describe('FlashcardSetsComponent', () => {
  let component: FlashcardSetsComponent;
  let fixture: ComponentFixture<FlashcardSetsComponent>;
  let mockFlashcardService: jasmine.SpyObj<FlashcardService>;
  let router: Router;

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
      'getFlashcardSets', 'createFlashcardSet', 'updateFlashcardSet', 'deleteFlashcardSet'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        FlashcardSetsComponent,
        NoopAnimationsModule,
        MatDialogModule,
        RouterTestingModule // This provides both Router and ActivatedRoute
      ],
      providers: [
        { provide: FlashcardService, useValue: flashcardServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardSetsComponent);
    component = fixture.componentInstance;
    mockFlashcardService = TestBed.inject(FlashcardService) as jasmine.SpyObj<FlashcardService>;
    router = TestBed.inject(Router);

    // Setup default return value for getFlashcardSets
    mockFlashcardService.getFlashcardSets.and.returnValue(of([]));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load flashcard sets on init', () => {
    const mockSets = [mockFlashcardSet];
    mockFlashcardService.getFlashcardSets.and.returnValue(of(mockSets));

    component.ngOnInit();

    expect(mockFlashcardService.getFlashcardSets).toHaveBeenCalled();
    expect(component.flashcardSets).toEqual(mockSets);
  });

  it('should navigate to edit page when addCards is called', () => {
    spyOn(router, 'navigate');

    component.addCards(mockFlashcardSet);

    expect(router.navigate).toHaveBeenCalledWith(['/edit', mockFlashcardSet.id]);
  });

  it('should create new set when createNewSet is called with valid data', () => {
    const result = { name: 'New Set', description: 'New Description' };
    spyOn(component['dialog'], 'open').and.returnValue({
      afterClosed: () => of(result)
    } as any);

    component.createNewSet();

    expect(mockFlashcardService.createFlashcardSet).toHaveBeenCalledWith(
      result.name,
      result.description
    );
  });

  it('should update set when editSet is called with valid data', () => {
    const updatedSet = {
      ...mockFlashcardSet,
      name: 'Updated Name',
      description: 'Updated Description'
    };

    spyOn(component['dialog'], 'open').and.returnValue({
      afterClosed: () => of(updatedSet)
    } as any);

    component.editSet(mockFlashcardSet);

    expect(mockFlashcardService.updateFlashcardSet).toHaveBeenCalledWith(
      updatedSet.id,
      updatedSet.name,
      updatedSet.description
    );
  });

  it('should delete set when deleteSet is called and confirmed', () => {
    spyOn(component['dialog'], 'open').and.returnValue({
      afterClosed: () => of(true)
    } as any);

    component.deleteSet(mockFlashcardSet);

    expect(mockFlashcardService.deleteFlashcardSet).toHaveBeenCalledWith(mockFlashcardSet.id);
  });

  it('should not delete set when deleteSet is called but not confirmed', () => {
    spyOn(component['dialog'], 'open').and.returnValue({
      afterClosed: () => of(false)
    } as any);

    component.deleteSet(mockFlashcardSet);

    expect(mockFlashcardService.deleteFlashcardSet).not.toHaveBeenCalled();
  });
});
