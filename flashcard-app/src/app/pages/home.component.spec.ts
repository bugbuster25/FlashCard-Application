import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-title')?.textContent).toContain('Welcome To');
    expect(compiled.querySelector('.highlight')?.textContent).toContain('Study Cards');
  });

  it('should render hero subtitle', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-subtitle')?.textContent)
      .toContain('Create personalized flashcard sets and study efficiently');
  });

  it('should have floating animation elements', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const floatingCards = compiled.querySelectorAll('.floating-card');
    expect(floatingCards.length).toBe(3);

    const logoStack = compiled.querySelector('.logo-stack');
    expect(logoStack).toBeTruthy();

    const cardLayers = compiled.querySelectorAll('.card-layer');
    expect(cardLayers.length).toBe(3);
  });
});
