# RaD-GP-C25-P-G3
## Angular Study Aid Application

The Flashcard Study Aid Application is a modern web-based learning tool built with Angular. 
Users can create, manage, and study using digital flashcards, making the learning process more interactive and efficient.

## Features 

- Create, edit and delete flashcard sets 
- Create, edit and delete individual cards in a flashcard set
- Study mode with card flipping and easy navigation between cards 
- User-friendly interface built with Angular Material

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- Angular CLI v20.0.4
- Chrome browser for testing

## Installation and Setup

1. Clone the repository or download the project files to your local machine then navigate to the application:
   ```bash
   cd flashcard-app
   ```

2. Install dependencies by running the following command:
   ```bash
   npm install
   ```

3. Install Angular Animations (if not already installed):
   ```bash
   npm install @angular/animations --legacy-peer-deps
   ```

## How to Run 

1. Start the development server:
   ```bash
   ng serve
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```

Note: The application will automatically reload if you change any of the source files.

## Usage Guide

1. Home Page
    - This is the landing page you will see when the application loads
    - Click "Start Learning Now" to navigate to your flashcard sets

2. Creating Your First Flashcard Set
    - Click the "Create Set" button
    - Enter a name and description for your set
    - Click "Create" to save your new set

3. Adding Cards to Your Set
    - Click the "Add Cards" button on any flashcard set
    - Fill in the "Front" field with your question or term
    - Fill in the "Back" field with the answer or definition
    - Click "Add Card" to save
    - Repeat until you have at least 10 cards

4. Editing Cards
    - Click the edit icon (pencil) on any card
    - Modify the front or back content as you wish
    - Click "Save" to update the card

5. Managing Sets
   - Use the three-dot menu on any set to delete your set
   - Click the edit icon (pencil) on any set to edit set details (set name and description)
   - Edit the set name and description as you wish

6. Studying Your Cards
    - Once you have at least 10 cards, the "Study" button will be enabled
    - Click "Study" to enter study mode
    - Click on cards to flip them and reveal answers
    - Use "Previous" and "Next" buttons to navigate through cards

## Running Tests

The application uses Jasmine and Karma for testing. To run tests:

1. Unit Tests:
   ```bash
   ng test
   ```

2. Coverage Report:
   ```bash
   ng test --code-coverage
   ```

## Technologies Used

- Angular 20.0.0
- Angular Material 20.0.4
- Angular CLI
- Angular Animations
- Angular Forms 
- Karma/Jasmine for testing

## Future Implementation Ideas

1. User Authentication
   - Add user accounts and personal flashcard libraries

2. Learning Analytics
   - Progress tracking
   - Success rates

3. Import/Export capabilities
   - Import files and create cards from files
   - Audio recording feature
   - Video content integration
   - Quiz auto creation from flashcard sets
