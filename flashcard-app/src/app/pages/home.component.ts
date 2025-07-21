import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="hero-container">
      <section class="hero-section">
        <div class="hero-content">
          <div class="logo-animation">
            <div class="floating-card card-1">📚</div>
            <div class="floating-card card-2">🧠</div>
            <div class="floating-card card-3">⭐</div>
            <div class="main-logo">
              <div class="logo-stack">
                <div class="card-layer layer-1"></div>
                <div class="card-layer layer-2"></div>
                <div class="card-layer layer-3"></div>
              </div>
            </div>
          </div>

          <h1 class="hero-title">
            Welcome To
            <span class="highlight">Study Cards</span>
          </h1>

          <p class="hero-subtitle">
            Create personalized flashcard sets and study efficiently.
            The smart way to learn and remember anything.
          </p>

          <div class="cta-buttons">
            <button mat-raised-button class="primary-cta" routerLink="/sets">
              <mat-icon>rocket_launch</mat-icon>
              Start Learning Now
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-container {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
    }

    .hero-section {
      padding: 80px 20px 120px;
      text-align: center;
      position: relative;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    .logo-animation {
      position: relative;
      margin-bottom: 40px;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .main-logo {
      position: relative;
      z-index: 3;
    }

    .logo-stack {
      position: relative;
      width: 80px;
      height: 80px;
    }

    .card-layer {
      position: absolute;
      width: 60px;
      height: 80px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }

    .layer-1 {
      background: #1976d2;
      transform: rotate(-10deg) translateX(-10px);
      z-index: 1;
    }

    .layer-2 {
      background: #42a5f5;
      transform: rotate(0deg);
      z-index: 2;
    }

    .layer-3 {
      background: #90caf9;
      transform: rotate(10deg) translateX(10px);
      z-index: 3;
    }

    .floating-card {
      position: absolute;
      font-size: 2rem;
      animation: float 6s ease-in-out infinite;
      background: white;
      padding: 12px;
      border-radius: 50%;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .card-1 {
      top: -20px;
      left: -60px;
      animation-delay: 0s;
    }

    .card-2 {
      top: -30px;
      right: -60px;
      animation-delay: 2s;
    }

    .card-3 {
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      animation-delay: 4s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(5deg); }
      66% { transform: translateY(-10px) rotate(-5deg); }
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      color: white;
      margin-bottom: 24px;
      line-height: 1.2;
    }

    .highlight {
      background: linear-gradient(45deg, #ffd700, #ffed4e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      color: rgba(255,255,255,0.9);
      margin-bottom: 40px;
      line-height: 1.6;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      justify-content: center;
    }

    .primary-cta {
      background: linear-gradient(45deg, #ff6b6b, #ee5a24) !important;
      color: white !important;
      padding: 16px 32px !important;
      font-size: 1.1rem !important;
      font-weight: 600 !important;
      border-radius: 50px !important;
      box-shadow: 0 8px 25px rgba(238, 90, 36, 0.3) !important;
      transition: all 0.3s ease !important;
    }

    .primary-cta:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 35px rgba(238, 90, 36, 0.4) !important;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }
    }
  `]
})
export class HomeComponent { }
