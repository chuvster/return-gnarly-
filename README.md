# FAIRE LMS - Accessible Learning Management System

FAIRE LMS is a modern, accessible Learning Management System designed to provide an inclusive educational experience for all students, with particular attention to accessibility features and user-friendly design.

## 🌟 Features

### Core Functionality
- **Course Management**: Browse and manage your enrolled courses
- **Assessment Tracking**: View and track your assessment progress
- **Responsive Design**: Fully responsive interface that works on all devices
- **Dark Mode Support**: Complete dark mode implementation for better accessibility
- **Real-time Search**: Search through your courses with instant results

### Accessibility Features
- **Font Size Adjustment**: Dynamic font scaling that affects all text elements
- **High Contrast Mode**: Enhanced contrast options for better visibility
- **Reduced Motion**: Option to minimize animations for users with motion sensitivity
- **Screen Reader Support**: Full compatibility with screen readers
- **Keyboard Navigation**: Complete keyboard accessibility
- **Dyslexia-Friendly Font**: OpenDyslexic font option for better readability
- **Focus Indicators**: Enhanced focus indicators for better navigation
- **Skip Links**: Quick navigation to main content

### User Interface
- **Modern Design**: Clean, intuitive interface with rounded corners and shadows
- **Fixed Navigation**: Sticky navigation bar for easy access
- **Tooltips**: Helpful tooltips for all interactive elements
- **Loading States**: Smooth loading animations and states
- **Error Handling**: Graceful error handling with user-friendly messages

## 🎨 Design System

### Color Scheme
- **Light Mode**:
  - Background: `#FFFEFA`
  - Primary: `#9BC2E4`
  - Text: `#3F3734`
  - Cards: White with subtle shadows

- **Dark Mode**:
  - Background: `#1E2A36`
  - Navbar: `#2B4C6F`
  - Cards: `#34596F`
  - Text: `#FFFFF3`

### Typography
- **Primary Font**: System fonts with OpenDyslexic option
- **Dynamic Sizing**: Scalable font system (16px base, up to 3x scaling)
- **Hierarchy**: Clear heading structure (H1-H6) with proportional scaling

## 🛠 Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful, customizable icons

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Vercel**: Deployment platform

### Key Libraries
- **React Hook Form**: Form handling
- **React Context**: State management
- **Next.js Image**: Optimized image handling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/faire-lms.git
   cd faire-lms
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables
Create a `.env.local` file in the root directory:
```env
# Add any environment variables here
NEXT_PUBLIC_API_URL=your_api_url_here
```

## 📱 Usage

### Navigation
- **My Courses**: View all your enrolled courses
- **Assessments**: Access your assessments and track progress
- **Accessibility Panel**: Customize your viewing experience

### Accessibility Settings
1. Click the **Settings** icon in the top navigation
2. Adjust the following settings:
   - **Font Size**: Scale text from 16px to 48px
   - **High Contrast**: Enhance color contrast
   - **Reduced Motion**: Minimize animations
   - **Dark Mode**: Switch between light and dark themes
   - **Dyslexia-Friendly Font**: Enable OpenDyslexic font

### Course Management
- Browse courses in the main dashboard
- Click on any course to view details
- Access course modules, assignments, and resources
- Track your progress through course completion

## 🏗 Project Structure

```
faire-lms/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── AccessibilityPanel.tsx
│   │   ├── AssessmentPage.tsx
│   │   ├── CourseDetail.tsx
│   │   ├── CourseGrid.tsx
│   │   ├── LecturePage.tsx
│   │   ├── Navigation.tsx
│   │   ├── StudentPage.tsx
│   │   └── ThemeSwitch.tsx
│   ├── contexts/           # React contexts
│   │   ├── FontProvider.tsx
│   │   └── ThemeProvider.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Next.js pages
│   └── styles/             # Global styles
├── public/                 # Static assets
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

## 🎯 Key Components

### AccessibilityPanel
- Centralized accessibility controls
- Real-time preview of changes
- Persistent settings storage

### CourseGrid
- Responsive grid layout
- Course cards with progress indicators
- Hover effects and animations

### Navigation
- Fixed positioning
- Mobile-responsive menu
- Active state indicators

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper accessibility attributes
- Follow Tailwind CSS conventions

### Adding New Features
1. Create components in `src/components/`
2. Add types in component files or create separate type files
3. Update navigation if needed
4. Test accessibility features
5. Update this README

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add proper TypeScript types
- Include accessibility features
- Test on multiple devices and screen sizes
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenDyslexic Font**: Created by Abelardo Gonzalez
- **Lucide Icons**: Beautiful, customizable icons
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework

## 📞 Support

For support, email support@faire-lms.com or create an issue in this repository.

## 🔮 Roadmap

- [ ] Student collaboration features
- [ ] Advanced assessment types
- [ ] Mobile app development
- [ ] Integration with external LMS systems
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Offline functionality

---

**FAIRE LMS** - Making education accessible for everyone. 📚✨