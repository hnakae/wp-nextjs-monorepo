# WP Next.js Monorepo

This is a monorepo containing a Next.js frontend application and a Dockerized WordPress backend, designed to demonstrate how to build a decoupled WordPress site using GraphQL.

## docker

Recommended Workflow

  Here's how you should think about using these
  commands:

   * For daily development: When you're done working for
     the day or just want to shut things down temporarily
     to free up system resources, use:
   1     docker compose stop
      This is the command you should use most often.

   * When you need a fresh start: You should only use
     docker compose down when:
       * You have changed your docker-compose.yml file
         (e.g., added a new port mapping).
       * You have changed a Dockerfile and need to rebuild
         an image (e.g., docker compose up --build).
       * Something is acting strangely and you want to
         reset the containers to a pristine state.

## Info

*   **Next.js Frontend**: Accessible at `http://localhost:3001` (or `http://localhost:3000` if port 3001 is not available).
*   **WordPress Admin**: Accessible at `http://localhost:8080/wp-admin`.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

*   [Docker](https://www.docker.com/get-started) (Docker Desktop recommended)
*   [Node.js](https://nodejs.org/en/download/) and npm (or yarn/pnpm/bun)

### 1. Start Docker Containers

Navigate to the project root directory and bring up the Docker containers:

```bash
npm run docker:up
```

This will start the MariaDB database, WordPress, and the Next.js frontend containers.

### 2. Set up WordPress

Once the WordPress container is running, you need to complete its setup:

1.  **Access WordPress Installation**: Open your web browser and go to `http://localhost:8080`. Follow the on-screen instructions to complete the WordPress installation (e.g., set site title, admin username, password).
2.  **Install and Activate WPGraphQL Plugin**:
    *   Log in to your WordPress admin dashboard (`http://localhost:8080/wp-admin`).
    *   Go to `Plugins` -> `Add New`.
    *   Search for `WPGraphQL`.
    *   Install and activate the plugin.
3.  **Enable Public Introspection for WPGraphQL**:
    *   In the WordPress admin, go to `GraphQL` -> `Settings`.
    *   Under the `General` tab, check the box for `Enable Public Introspection`.
    *   Click `Save Changes`.
4.  **Set Permalinks**:
    *   In the WordPress admin, go to `Settings` -> `Permalinks`.
    *   Select `Post name` (or any other structure besides `Plain`).
    *   Click `Save Changes`.

### 3. Install Node.js Dependencies

Install the necessary Node.js packages for the Next.js frontend:

```bash
npm install
```

### 4. Generate GraphQL Types

Generate the TypeScript types for your GraphQL queries. This step requires the WordPress GraphQL endpoint to be accessible and configured (from step 2).

```bash
npm run codegen
```

### 5. Start the Next.js Development Server

Finally, start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (or `http://localhost:3000`) in your browser to see the Next.js application.








## design and development systems

 so im at the point where i want to make the ui design  with shadcn, but i want to know what is the           │
│    professional way to make a design first so that i can just get straight to building. i want a method that i  │
│    can reliably use consistantly to have a framework for making designs                                         │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

✦ Of course. Adopting a professional design-to-development workflow is key to building UIs efficiently and
  consistently. The goal is to make design decisions before you write code, so that coding becomes a task of
  implementation rather than creation.

  Here is a reliable, industry-standard framework you can use consistently. It's broken into three phases:
  Define, Design, and Implement.

  ---

  The Design Framework

  This process is heavily inspired by Atomic Design and is what most product teams use. It focuses on building a
  system of components, not just pages.

  Phase 1: Define (The Foundation)

  Before you draw a single box, you need a plan.

   1. Create a Basic Style Guide: This is the most critical step for consistency. Define the fundamental "atoms"
      of your design.
       * Colors: Define your color palette. At a minimum, you need:
           * Primary: For main actions (buttons, links).
           * Secondary: For less important actions.
           * Accent: For highlights and special elements.
           * Neutral: A range of grays for text, backgrounds, and borders.
           * Feedback: Colors for success, error, warning, and info states.
       * Typography: Choose your fonts and define a scale.
           * Font: Pick one or two fonts (e.g., a serif for headings, a sans-serif for body).
           * Scale: Define sizes and weights for headings (H1, H2, H3), body text, and captions.
       * Spacing: Define a spacing unit. Using a multiple (e.g., 4px or 8px) for all margins, padding, and gaps
         creates a consistent rhythm. (e.g., 8px, 16px, 24px, 32px).

  Phase 2: Design (From Low to High Fidelity)

  Now you can start visualizing the UI using a design tool. Figma is the industry standard and has a generous free
   tier.

   2. Wireframing (Low-Fidelity):
       * What it is: Create simple, black-and-white layouts for each page or view.
       * Focus: Structure, layout, hierarchy, and user flow. Do not use colors or real text. Use boxes for images
         and lines for text.
       * Goal: To figure out where things go without getting distracted by how they look.

   3. Mockups (High-Fidelity):
       * What it is: Apply your Style Guide (colors, typography) to the wireframes.
       * Focus: This is where you make it look like the final product. You'll design reusable components.
       * The `shadcn` Connection: As you design, think in terms of components. Don't just draw a button; design
         your standard "Button" component. That box with a title and text? That's your "Card" component. This
         maps directly to the shadcn components you'll use later.

  Phase 3: Implement (Translate Design to Code)

  This is where your design work pays off, making the coding process much faster.

   4. Translate the Style Guide:
       * Colors & Fonts: Configure your tailwind.config.mjs and globals.css to match the colors and fonts from
         your Style Guide. shadcn is built on Tailwind, so this is how you theme your components.
       * Spacing: Your spacing system from the Style Guide directly translates to Tailwind's spacing utilities
         (e.g., p-4 for 16px padding if your base unit is 4px).

   5. Build Components:
       * Go through your mockups and build the UI page by page, using the shadcn components as your building
         blocks.
       * Because you already designed the layout and components, you can focus entirely on writing clean
         React/Next.js code. You're no longer making design decisions on the fly.

  Summary & Recommendation


  ┌──────────────┬──────────────────────────────────────┬────────────────────────────────────┐
  │ Phase        │ Action                               │ Tool Recommendation                │
  ├──────────────┼──────────────────────────────────────┼────────────────────────────────────┤
  │ 1. Define    │ Create a Style Guide                 │ A simple text file or a Figma page │
  │ 2. Design    │ Wireframe then create Mockups        │ Figma                              │
  │ 3. Implement │ Translate styles & build with shadcn │ Your code editor                   │
  └──────────────┴──────────────────────────────────────┴────────────────────────────────────┘

  This process gives you a reliable framework that separates concerns: you solve design problems in a design tool
  and code problems in your editor.

  Would you like to start by defining a basic Style Guide for your project? We can outline the colors and
  typography you might need.








╭──────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│  > when people talk about test driven development, how does that look like if i were to use that method  │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

✦ Excellent question. Test-Driven Development (TDD) is a software development process that flips the traditional
  "write code, then test it" workflow on its head. It integrates perfectly with the design-first methodology we
  just discussed.

  In TDD, you write a test that fails before you write the actual code to make it pass.

  This process revolves around a simple, repeating cycle: Red, Green, Refactor.

  ---

  The TDD Cycle: Red, Green, Refactor

  Here’s what that looks like in practice for your project.

  Let's imagine you need a new utility function in your lib/utils.ts file. The function, formatDate, will take an
  ISO date string (like 2025-07-23T10:00:00) and turn it into a human-readable format (like July 23, 2025).

  Step 1: RED - Write a Failing Test

  You start by writing a test for code that doesn't exist yet.

   1. Create the test file: You'd create a new file, lib/utils.test.ts.
   2. Write the test case: You'd write a test that describes what you want the function to do.

    1     // In lib/utils.test.ts
    2     import { formatDate } from './utils';
    3 
    4     describe('formatDate', () => {
    5       it('should format an ISO date string to a long-form date', () => {
    6         const isoDate = '2025-07-23T10:00:00';
    7         const expected = 'July 23, 2025';
    8 
    9         // We expect our function to produce the desired output
   10         expect(formatDate(isoDate)).toBe(expected);
   11       });
   12     });

   3. Run the test: You'd run your test command (e.g., npm test).

      Result: FAILURE (RED). The test fails because formatDate doesn't even exist. You'll get an error like
  ReferenceError: formatDate is not defined. This is the "Red" state. You have a failing test that clearly defines
   your goal.

  Step 2: GREEN - Write the Simplest Code to Pass

  Next, you write the absolute minimum amount of code required to make the test pass. The goal isn't to be
  perfect; it's to get a green light.

   1. Create the function: You open lib/utils.ts and create the function.
   2. Write the minimal code:

   1     // In lib/utils.ts
   2 
   3     // This isn't the final logic, but it will make the test pass.
   4     // It's the "simplest possible thing."
   5     export const formatDate = (dateString: string): string => {
   6       return 'July 23, 2025';
   7     };

   3. Run the test again: You run npm test.

      Result: SUCCESS (GREEN). The test now passes. You are in the "Green" state. Your code meets the minimum
  requirement defined by the test.

  Step 3: REFACTOR - Improve the Code

  Now that you have a passing test acting as a safety net, you can refactor your code to be correct and robust
  without worrying about breaking it.

   1. Improve the implementation: You replace the "cheater" code with the real logic.

    1     // In lib/utils.ts
    2 
    3     // Now, the real implementation
    4     export const formatDate = (dateString: string): string => {
    5       const date = new Date(dateString);
    6       // Use Intl for robust date formatting
    7       return new Intl.DateTimeFormat('en-US', {
    8         year: 'numeric',
    9         month: 'long',
   10         day: 'numeric',
   11       }).format(date);
   12     };

   2. Run the test one more time: You run npm test.

      Result: SUCCESS (GREEN). The test still passes. You are back in the "Green" state, but now your code is
  well-implemented.

  You have successfully developed a feature using TDD. You can now confidently add more tests for edge cases
  (e.g., invalid dates, different locales) by repeating the Red-Green-Refactor cycle for each new piece of
  functionality.

  How TDD Fits Your Workflow

   * With Utility Functions: TDD is perfect for logic-heavy functions like in lib/utils.ts or API calls.
   * With UI Components (`shadcn`): TDD looks slightly different for React components. Instead of testing a
     return value, you test behavior.
       * RED: Write a test that renders a component and asserts that some text is not on the screen.
       * GREEN: Create the component so it renders the text. The test passes.
       * REFACTOR: Style the component with shadcn and Tailwind classes. The test still passes because the text
         is still there.
       * You can also test for interactions: "When I click this button, is the onClick handler called?"

  TDD vs. Traditional Development


  ┌─────────────────────────────────────────────┬────────────────────────────────────────────────────────┐
  │ TDD (Test-First)                            │ Traditional (Code-First)                               │
  ├─────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
  │ 1. Write a failing test (Red)               │ 1. Write the production code                           │
  │ 2. Write simple code to pass (Green)        │ 2. Manually test in the browser                        │
  │ 3. Refactor the code                        │ 3. Write tests (if time permits)                       │
  │ Result: A suite of tests that verify you... │ Result: Code that works, but with less of a safety ... │
  └─────────────────────────────────────────────┴────────────────────────────────────────────────────────┘


  Adopting TDD requires discipline but leads to higher-quality, more reliable code and gives you immense
  confidence when making changes.