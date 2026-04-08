# Premium Interactive Wall Calendar

A fully responsive, highly interactive web calendar component built with React, Vite, and plain CSS. Designed to simulate the physical presence of a wall calendar while deeply integrating cutting-edge digital aesthetics like glassmorphism and 3D micro-animations.

**Live Demo**: [https://rishi9911.github.io/interactive-wall-calendar/](https://rishi9911.github.io/interactive-wall-calendar/)

## ⚡ Core Features
- **Wall Calendar Aesthetic**: Features a dedicated Hero space loaded dynamically with 12 handcrafted high-quality landscape photos tied distinctly to every single month, blending form flawlessly with the bottom function blocks.
- **Dynamic Day Range Selector**: Select a start and end date effortlessly. The UI beautifully visualizes your selection utilizing heavily custom pseudo-elements (`::before` / `::after`) to render deep blue gradients on the endpoint dates, perfectly connecting them over a soft translucent highlighted track. 
- **Persistently Integrated Notes**: Uses `localStorage` to actually bind your textual notes contextually to your date selection logic! If you select a specific range and write a note, it will vanish when you select a new date... and perfectly restore itself natively when you reselect your original dates!
- **Flawlessly Responsive**: Desktop users experience a gorgeous segmented side-by-side Layout showcasing the glass grid and notes. Drop below `768px`, and the CSS instantly triggers a smooth vertical collapsing layout that stacks the touch-optimized Day Grid safely above the unified notepad for ultimate mobile comfort.

## ✨ Creative Liberties (Stand Out Mechanics)
Instead of just completing bare-minimum baseline requirements, this repository contains several highly polished creative additions:
1. **Interactive 3D Page Flipping**: Recreating the distinct physical feel of a wire-bound calendar, the interface triggers a custom CSS `@keyframes` logic leveraging `preserve-3d` and pure `rotateX` geometry tied to the very top edge. Pressing `<` or `>` physically "flips" the grid out of existence.
2. **Custom Image Architecture**: Don't like the generated month landscapes? Overlaid firmly on the design is an implicit uploader that tracks user-uploaded photos cleanly persisting them per-month. 
3. **Advanced Premium CSS**: Complete lack of UI frameworks. The entire system floats luxuriously over an animated gradient using state-of-the-art frosted Glassmorphism (`backdrop-filter`) rendering strategies.

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rishi9911/interactive-wall-calendar.git
   cd interactive-wall-calendar
   ```

2. **Install the dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production** 
   ```bash
   npm run build
   ```
