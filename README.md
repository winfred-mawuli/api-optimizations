# API Performance Optimization - Spring Boot

An interactive presentation website covering API Performance Optimization using DTOs & Mapping Strategies in Spring Boot.

## 🎯 Overview

This is a comprehensive 90-minute interactive lecture presentation built with React and TypeScript, covering essential techniques for optimizing Spring Boot API performance through proper use of Data Transfer Objects (DTOs) and mapping strategies.

## 📚 Learning Objectives

By the end of this presentation, learners will be able to:

- Understand why exposing entities directly is bad for API performance and security
- Implement DTOs (Data Transfer Objects) for safe and efficient data exchange
- Apply manual and automated mapping strategies
- Choose between mapping tools like MapStruct and ModelMapper
- Follow best practices for designing performant and maintainable API responses

## 🚀 Features

- **Interactive Navigation**: Slide-by-slide navigation with progress tracking
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Code Highlighting**: Syntax highlighting for Java, XML, and JSON code examples
- **Performance Comparisons**: Side-by-side comparisons of good vs bad practices
- **Real-world Examples**: Practical code examples and optimization techniques
- **Keyboard Navigation**: Arrow keys, spacebar, Home/End key support

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Code Highlighting**: Prism.js
- **Icons**: Lucide React

## 📖 Presentation Content

### Module Breakdown (90 minutes total):

1. **Introduction to DTOs** (10 min)
   - What are DTOs and why use them
   - Problems with exposing entities directly

2. **Common DTO Use Cases** (10 min)
   - Field projection, data combination, validation

3. **Manual DTO Mapping** (15 min)
   - Creating DTOs manually
   - Pros and cons of manual mapping

4. **ModelMapper - Runtime Mapping** (12 min)
   - Setup and configuration
   - Runtime reflection approach

5. **MapStruct - Compile-time Mapping** (13 min)
   - High-performance compile-time generation
   - Advanced mapping techniques

6. **Performance Optimization Examples** (15 min)
   - Real-world scenarios and solutions

7. **Avoiding N+1 Query Problem** (8 min)
   - Common pitfalls and solutions

8. **Best Practices for DTO Usage** (10 min)
   - Production-ready patterns

9. **Response Wrappers** (5 min)
   - Standardizing API responses

10. **Advanced Performance Strategies** (12 min)
    - Caching, async processing, streaming

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/winfred-mawuli/api-optimizations.git
cd api-optimizations
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎮 Navigation Controls

- **Arrow Keys**: Navigate between slides
- **Spacebar**: Next slide
- **Home**: Go to first slide
- **End**: Go to last slide
- **Menu Button**: Open slide navigation panel

## 📁 Project Structure

```
src/
├── components/
│   ├── CodeBlock.tsx       # Syntax-highlighted code blocks
│   ├── Navigation.tsx      # Slide navigation panel
│   ├── ProgressBar.tsx     # Progress indicator
│   └── SlideContent.tsx    # Main slide content renderer
├── slides.ts               # All presentation content
├── types.ts               # TypeScript type definitions
├── App.tsx                # Main application component
└── main.tsx               # Application entry point
```

## 🎨 Key Features

### Interactive Code Examples

The presentation includes numerous code examples with syntax highlighting:

- Java Spring Boot code
- XML configuration
- JSON responses
- Performance comparisons

### Visual Learning Aids

- Color-coded good vs bad practice comparisons
- Performance impact tables
- Best practice checklists
- Warning and tip callouts

### Responsive Design

- Mobile-friendly navigation
- Adaptive layouts for different screen sizes
- Touch-friendly controls

## 🔧 Customization

### Adding New Slides

Edit `src/slides.ts` to add new content. Each slide supports various content types:

- Text content
- Code blocks with syntax highlighting
- Lists with checkmarks
- Comparison tables
- Warning/tip/benefit callouts
- Data tables

### Styling

The project uses Tailwind CSS for styling. Customize the theme in `tailwind.config.js`.

## 📊 Performance Optimizations Covered

1. **Payload Size Reduction**: Using tailored DTOs
2. **N+1 Query Prevention**: Custom JPQL with DTOs
3. **Serialization Optimization**: Flat DTO structures
4. **Compile-time Mapping**: MapStruct implementation
5. **Caching Strategies**: DTO-based caching
6. **Pagination Optimization**: Projected DTOs
7. **Response Standardization**: API wrapper patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Winfred Mawuli**
- GitHub: [@winfred-mawuli](https://github.com/winfred-mawuli)

## 🙏 Acknowledgments

- Spring Boot team for excellent documentation
- MapStruct team for the powerful mapping framework
- React and TypeScript communities for great tooling

---

**Note**: This is an educational presentation designed for teaching API optimization concepts in Spring Boot applications.